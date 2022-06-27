import cx from "classnames";
import moment from "moment";
import { GaHeader } from '../Header/GaHeader'
import { useState, useEffect } from 'react' 
// import { ContentVelocity } from "./components/ContentVelocity";
import { PageviewTraffic } from "./components/PageviewTraffic";
import { InboundTraffic } from "./components/InboundTraffic";
import { SocialTraffic } from "./components/SocialTraffic";
import { TopPerforming } from "./components/TopPerforming";
import { GoogleAuthOverlay } from "./components/GoogleAuthOverlay";
import shelldata from "./shelldata";
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Backdrop from '@mui/material/Backdrop'


export default function Analytics({instance, token}) {

  const [gaAuthenticated, setGaAuthenticated] = useState(true) // we need check if the google profile id is available
  const [gaLegacyAuth, setGaLegacyAuth] = useState(false)  // we need response body from cloud function could change this
  const [domainSet, setDomainSet] = useState(Boolean(
    instance.domains &&
    instance.domains[0] &&
    instance.domains[0].domain
  ))
  const [pageTraffic, setPageTraffic] = useState(shelldata.shellBarData)
  const [inboundTraffic, setInboundTraffic] = useState(shelldata.shellDoughnutData)
  const [socialTraffic, setSocialTraffic] = useState(shelldata.shellDoughnutData)
  const [googleProfileId, setGoogleProfileId] = useState(null)
  const [userId, setUserId] = useState(null)
  

  useEffect(async ()=> {
    
    const ZestyAPI = new window.Zesty.FetchWrapper(instance.ZUID, token, {
      authAPIURL: `${process.env.REACT_APP_AUTH_API}`,
      instancesAPIURL: `${process.env.REACT_APP_INSTANCE_API}`,
      accountsAPIURL: `${process.env.REACT_APP_ACCOUNTS_API}`,
      mediaAPIURL: `${process.env.REACT_APP_MEDIA_API}`,
      sitesServiceURL: `${process.env.REACT_APP_SITES_SERVICE}`
    })
    
    const user = await ZestyAPI.verify()

    if(user.data === null) return setGaAuthenticated(false)

    setUserId(user.data)

    const settings = await ZestyAPI.getSettings()

    if(Object.keys(settings.data).length === 0) return setGaAuthenticated(false)

    
    const gaProfile = settings.data.find((setting) => setting.key === 'google_profile_id')
    
    if(gaProfile){
      setGoogleProfileId(gaProfile.value)
      setGaAuthenticated(true)
    }
  

  }, [])

      return (
        <> 
        <GaHeader />
        <Grid container spacing={4} p={4}>
          <Backdrop
            sx={{ color: '#fff'}}
            open={!gaAuthenticated || gaLegacyAuth}
            onClick={() => {}}
          >
                <GoogleAuthOverlay
                  gaLegacyAuth={gaLegacyAuth}
                  domainSet={domainSet}
                  gaAuthenticated={gaAuthenticated}
                  user={userId}
                  instance={instance}
                />

          </Backdrop>
            <Grid item xs={12} md={7} lg={7}>
                <PageviewTraffic
                  setGALegacyStatus={setGaLegacyAuth}
                  instanceZUID={instance.ZUID}
                  profileID={googleProfileId}
                  data={pageTraffic}
                  domainSet={domainSet}
                />
            </Grid>
            <Grid item xs={12} md={5} lg={5}>
                <Box sx={{
                  display : "flex",
                  flexDirection : 'column'
                }}>
                  <Box
                    sx={{
                      marginBottom : 4
                    }}>
                    <InboundTraffic
                      setGALegacyStatus={setGaLegacyAuth}
                      instanceZUID={instance.ZUID}
                      profileID={googleProfileId}
                      data={inboundTraffic}
                      domainSet={domainSet}
                    />
                  </Box>
                  <Box>
                    <SocialTraffic
                      setGALegacyStatus={setGaLegacyAuth}
                      instanceZUID={instance.ZUID}
                      profileID={googleProfileId}
                      data={socialTraffic}
                      domainSet={domainSet}
                    />
                  </Box>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <TopPerforming 
                  instanceZUID={instance.ZUID}
                  profileID={googleProfileId} />
            </Grid>
        </Grid>
        </>
      );
  }
// );
