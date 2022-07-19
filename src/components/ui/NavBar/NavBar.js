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

    const ZestyAPI = new window.Zesty.FetchWrapper(zuid, token, {
      authAPIURL: `${process.env.REACT_APP_AUTH_API}`,
      instancesAPIURL: `${process.env.REACT_APP_INSTANCE_API}`,
      accountsAPIURL: `${process.env.REACT_APP_ACCOUNTS_API}`,
      mediaAPIURL: `${process.env.REACT_APP_MEDIA_API}`,
      sitesServiceURL: `${process.env.REACT_APP_SITES_SERVICE}`,
    });

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
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          <CustomDatePicker />
          <DomainPicker 
            domainList={domainList}
            onSelect={onDomainSelect}
            domainSelect={googleDetails}
            />
        </Box>
      </Box>
    </>
  );
}
