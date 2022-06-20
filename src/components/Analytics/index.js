import cx from "classnames";
import moment from "moment";
import { useState, useEffect } from 'react' 
// import { ContentVelocity } from "./components/ContentVelocity";
import { PageviewTraffic } from "./components/PageviewTraffic";
import { InboundTraffic } from "./components/InboundTraffic";
import { SocialTraffic } from "./components/SocialTraffic";
import { TopPerforming } from "./components/TopPerforming";
import { RecentlyEdited } from "./components/RecentlyEdited";
import { GoogleAuthOverlay } from "./components/GoogleAuthOverlay";
import { fetchRecentItems } from "../../utility/user";
import shelldata from "./shelldata";
import styles from "./Analytics.less";
import { request } from '../../utility/request'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Typography from "@mui/material/Typography";
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import Container from '@mui/material/Container'

//GRAPH DATA

import { getPageTraffic, getInboundTraffic, getSocialTraffic } from '../../lib/graphData'

export default function Analytics(state) {

  const [recentlyEditedItems, setRecentlyEditedItems] = useState([])
  const [favoriteModels, setFavoriteModels] = useState([])
  const [loading, setLoading] = useState(true)
  const [webEngineOn, setWebEngineOn] = useState(true)
  const [gaAuthenticated, setGaAuthenticated] = useState(Boolean(state.instance.google_profile_id))
  const [gaLegacyAuth, setGaLegacyAuth] = useState(false)
  const [googleProfileId, setGoogleProfileId] = useState('')
  const [domainSet, setDomainSet] = useState(Boolean(
    state.instance.domains &&
    state.instance.domains[0] &&
    state.instance.domains[0].domain
  ))

  const [pageTraffic, setPageTraffic] = useState(shelldata.shellBarData)
  const [inboundTraffic, setInboundTraffic] = useState(shelldata.shellDoughnutData)
  const [socialTraffic, setSocialTraffic] = useState(shelldata.shellDoughnutData)

  useEffect(async ()=> {
    
    fetchGAProfile(state.instance.ID).then(async (data) => {

        const result = await data.json()
        if(result.length !== 0) {

          setGaAuthenticated(false)
          setGaLegacyAuth(true)

          const pageTrafficData = await getPageTraffic(state.instance.ID, result[0].profile_id)
          setPageTraffic(pageTrafficData.chartJSData)

          const inboundTrafficData = await getInboundTraffic(state.instance.ID, result[0].profile_id)
          setInboundTraffic(inboundTrafficData.chartJSData)

          const getSocialTrafficData = await getSocialTraffic(state.instance.ID, result[0].profile_id)
          setSocialTraffic(getSocialTrafficData.chartJSData)

          
        }
    })

    if (state.instance.google_profile_id) {
      const start = moment().subtract(120, "days").format("YYYY-MM-DD");
      fetchRecentItems(state.instance.user.ZUID, state.instance.ZUID, start)
        .then((res) => {
          if (res && res.data) {
            setRecentlyEditedItems(getLastEditedItems(res.data))
            setFavoriteModels(getFavoriteModels(res.data))
            setLoading(false)
          } else {
            setLoading(false)
          }
        });
      }
  }, [])


    const fetchGAProfile = (user_id) => {

      return fetch(`http://localhost:7373/checkGaProfile`, {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
          user_id : user_id
        })
      })

    }

    const fetchRecentItems = (userZUID, instanceZUID, start) => {
      return request(
        `https://${instanceZUID + process.env.REACT_APP_API_INSTANCE}search/items?q=${userZUID}&order=created&dir=DESC&start_date=${start}`
      )
    }

    const setGALegacyStatus = (status) => {
      setGaLegacyAuth(status)
    };
    /**
      Group items by model
      [
        [contentModelZUID, [item, item, ...]]
      ]
    **/
    const getFavoriteModels = (items) => {
      const grouped = items.reduce((acc, item) => {
        if (acc[item.meta.contentModelZUID]) {
          acc[item.meta.contentModelZUID].push(item);
        } else {
          acc[item.meta.contentModelZUID] = [item];
        }
        return acc;
      }, {});

      const sorted = Object.keys(grouped)
        .filter((item) => grouped[item][0].web.metaTitle)
        .map((contentModelZUID) => {
          return [contentModelZUID, grouped[contentModelZUID].slice(0, 3)];
        })
        .sort((a, b) => {
          if (a[1].length < b[1].length) {
            return 1;
          }
          if (a[1].length > b[1].length) {
            return -1;
          }
          return 0;
        });

      // Top three most edited models
      return sorted.slice(0, 3);
    }

    const getLastEditedItems = (items) => {
      return [...items]
        .sort((a, b) => {
          if (a.meta.updatedAt < b.meta.updatedAt) {
            return 1;
          }
          if (a.meta.updatedAt > b.meta.updatedAt) {
            return -1;
          }
          return 0;
        })
        .slice(0, 5);
    }

   

      return (
        <>
        {/* <Grid container spacing={2}>
            <Grid item xs={7}>
                <Card >
                  <CardContent>
                    <Box display="flex" justifyContent="center">
                        <Box>
                          <BarChartOutlinedIcon fontSize="large" sx={{ fontSize: 40, paddingRight : '10px' }} />
                        </Box>
                        <Box flexGrow={1}>
                          <Typography variant="h5" gutterBottom component="div">Pageview / Traffic</Typography>
                        </Box>
                        <Box>
                        <Typography variant="overline" gutterBottom component="div">Last 14 Days</Typography>
                        </Box>
                    </Box>
                    <Box>
                      Sample
                    </Box>
                  </CardContent>
                </Card>
            </Grid>
            <Grid item xs={5} alignItems="stretch">
                <InboundTraffic
                  setGALegacyStatus={setGALegacyStatus}
                  instanceZUID={state.instance.ZUID}
                  profileID={state.instance.google_profile_id}
                  data={shelldata.shellDoughnutData()}
                  domainSet={domainSet}
                />
                <SocialTraffic
                  setGALegacyStatus={setGALegacyStatus}
                  instanceZUID={state.instance.ZUID}
                  profileID={state.instance.google_profile_id}
                  data={shelldata.shellDoughnutData()}
                  domainSet={domainSet}
                />
            </Grid>
        </Grid> */}
        <Container maxWidth="xl">
        <Grid container spacing={4} p={4}>
            <Grid item xs={7}>
                <PageviewTraffic
                  setGALegacyStatus={setGALegacyStatus}
                  instanceZUID={state.instance.ID}
                  profileID={googleProfileId}
                  data={pageTraffic}
                  domainSet={domainSet}
                />
            </Grid>
            <Grid item xs={5}>
                <Box sx={{
                  display : "flex",
                  flexDirection : 'column'
                }}>
                  <Box
                    sx={{
                      marginBottom : 4
                    }}>
                    <InboundTraffic
                      setGALegacyStatus={setGALegacyStatus}
                      instanceZUID={state.instance.ZUID}
                      profileID={state.instance.ID}
                      data={inboundTraffic}
                      domainSet={domainSet}
                    />
                  </Box>
                  <Box>
                    <SocialTraffic
                      setGALegacyStatus={setGALegacyStatus}
                      instanceZUID={state.instance.ZUID}
                      profileID={state.instance.google_profile_id}
                      data={socialTraffic}
                      domainSet={domainSet}
                    />
                  </Box>
                  
                  
                </Box>
            </Grid>
        </Grid>
        </Container>
      
              {/* {(!gaAuthenticated || gaLegacyAuth) && (
                <GoogleAuthOverlay
                  gaLegacyAuth={gaLegacyAuth}
                  domainSet={domainSet}
                  gaAuthenticated={gaAuthenticated}
                  user={state.instance.user}
                  instance={state.instance}
                />
              )} */}
             
        </>
      );
  }
// );
