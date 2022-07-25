import React, { useEffect, useState } from "react";
import { CustomDatePicker } from "../DatePicker/DatePicker";
import DomainPicker from "../DomainPicker/DomainPicker";
import { Box, Typography } from "@mui/material";
import { useGoogle } from "../../../context/GoogleContext";
import { useFetchWrapper } from "../../../services/useFetchWrapper";
import { useAnalyticsApi } from "../../../services/useAnalyticsApi";

export default function NavBar({ zuid, token }) {
  const { getGaDomain } = useAnalyticsApi(zuid)
    const { googleDetails, setGoogleDetails, setIsAuthenticated } = useGoogle();
    const [domainList, setDomainList] = useState([]);
    const { getGoogleSetting, updateSetting } = useFetchWrapper(zuid, token)
    const [googleProfile, setGoogleProfile] = useState(null)
    const [showSelection, setShowSelection] = useState(false)

    useEffect(async () => {

      try{
        const domains = await getGaDomain();
        setDomainList(domains.items);
        setIsAuthenticated(true)
      }catch(err){
        console.log(err)
        setIsAuthenticated(false)
      }
    
    }, []);

    useEffect(async () => {
      
      if(domainList && domainList.length !== 0){

        const gData = await getGoogleSetting()
        const selectedProfile = domainList.find(domain => domain.defaultProfileId === gData.gaProfile.value)

        if(gData.gaProfile.value === "" && gData.urchinId.value === "") setShowSelection(true)

        setGoogleProfile(gData)
        setGoogleDetails(selectedProfile)
        
      }
    }, [domainList])

 
    const onDomainSelect = async (domain) => {

      setGoogleDetails(domain)

      var profile = googleProfile.gaProfile
      var urchin = googleProfile.urchinId

      profile["value"] = domain.defaultProfileId
      urchin["value"] =  domain.id

      await updateSetting(profile.ZUID, profile);
      await updateSetting(urchin.ZUID, urchin);
    }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          paddingBottom: "0px",
          alignItems: "center",
          paddingBottom: 4,
        }}
      >
        
        <Box sx={{ flexGrow: 1 }}>
        { googleDetails && (
          <>
            <Box sx={{ display : "flex" }}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: "600",
                  fontSize: "16pt",
                  color: "#5b667d",
                }}
              >
                {googleDetails ? googleDetails.name : "No Domain Selected"}
              </Typography>
              <DomainPicker 
                domainList={domainList}
                onSelect={onDomainSelect}
                domainSelect={googleDetails}
                buttonName="Change"
                variant="text"
                size="small"
              />
            </Box>
           
            <Typography
              variant="h2"
              sx={{
                fontWeight: "200",
                fontSize: "12pt",
                color: "#5b667d",
              }}
            >
              {googleDetails && googleDetails.websiteUrl}
            </Typography>
            
          </>
        )}
        { !googleDetails && (

          <DomainPicker 
            domainList={domainList}
            onSelect={onDomainSelect}
            domainSelect={googleDetails}
            show={showSelection}
          />
        )}
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          <CustomDatePicker />
        </Box>
      </Box>
    </>
  );
}
