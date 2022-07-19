import React, { useEffect, useState } from "react";
import { CustomDatePicker } from "../DatePicker/DatePicker";
import DomainPicker from "../DomainPicker/DomainPicker";
import { Box, Typography } from "@mui/material";
import { useGoogle } from "../../../context/GoogleContext";
import { useFetchWrapper } from "../../../services/useFetchWrapper";

export default function NavBar({ zuid, token }) {
    const { googleDetails, setGoogleDetails } = useGoogle();
    const [domainList, setDomainList] = useState([]);
    const { getGoogleSetting } = useFetchWrapper(zuid, token)

    useEffect(async () => {
  
      const responseDomain = await getGaDomain();
      const domains = await responseDomain.json();
      setDomainList(domains.items);
  
    }, []);

    useEffect(async () => {

      if(domainList.length !== 0){

        const gData = await getGoogleSetting()
        const selectedProfile = domainList.find(domain => domain.defaultProfileId === gData.gaProfile.value)
        setGoogleDetails(selectedProfile)
        
      }

    }, [domainList])

    const getGaDomain = () => {
        return fetch(
            `${process.env.REACT_APP_SERVICE_GOOGLE_DOMAINS}?zuid=${zuid}`,
            {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            }
        );
    };

    const onDomainSelect = (domain) => {
        setGoogleDetails(domain)
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
