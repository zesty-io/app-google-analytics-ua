import { useState, useEffect } from "react";
import { PageviewTraffic } from "./components/PageviewTraffic";
import { InboundTraffic } from "./components/InboundTraffic";
import { SocialTraffic } from "./components/SocialTraffic";
import { TopPerforming } from "./components/TopPerforming";
import { GoogleAuthOverlay } from "./components/GoogleAuthOverlay";
import { GaTable } from "../Table/GaTable";
import shelldata from "./shelldata";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

export default function Analytics({ instance, token }) {
  const [gaAuthenticated, setGaAuthenticated] = useState(true); // we need check if the google profile id is available
  const [gaLegacyAuth, setGaLegacyAuth] = useState(false); // we need response body from cloud function could change this
  const [googleProfileId, setGoogleProfileId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [domainList, setDomainList] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState("No Selected Domain");
  const ZestyAPI = new window.Zesty.FetchWrapper(instance.ZUID, token, {
    authAPIURL: `${process.env.REACT_APP_AUTH_API}`,
    instancesAPIURL: `${process.env.REACT_APP_INSTANCE_API}`,
    accountsAPIURL: `${process.env.REACT_APP_ACCOUNTS_API}`,
    mediaAPIURL: `${process.env.REACT_APP_MEDIA_API}`,
    sitesServiceURL: `${process.env.REACT_APP_SITES_SERVICE}`,
  });
  const [googleProfile, setGoogleProfile] = useState(null);
  const [googleUrchinId, setGoogleUrchinId] = useState(null);

  useEffect(async () => {
    const user = await ZestyAPI.verify();
    if (user.data === null) return setGaAuthenticated(false);
    setUserId(user.data);

    const responseDomain = await getGaDomain();
    if (!responseDomain.ok) return setGaLegacyAuth(true);
    const domains = await responseDomain.json();
    console.log(domains);
    setDomainList(domains.items);

    const settings = await ZestyAPI.getSettings();
    if (Object.keys(settings.data).length === 0)
      return setGaAuthenticated(false);

    const gaProfile = settings.data.find(
      (setting) => setting.key === "google_profile_id"
    );
    setGoogleProfile(gaProfile);

    const urchinId = settings.data.find(
      (setting) => setting.key === "google_urchin_id"
    );
    setGoogleUrchinId(urchinId);

    if (
      gaProfile &&
      urchinId &&
      gaProfile.value !== "" &&
      urchinId.value !== ""
    ) {
      const selectDomain = domains.items.find(
        (domain) => domain.defaultProfileId === gaProfile.value
      );
      if (selectDomain) {
        setGoogleProfileId(selectDomain.defaultProfileId);
        setSelectedDomain(selectDomain.name);
        setGaAuthenticated(true);
      } else {
        setShowModal(true);
      }
    } else {
      setShowModal(true);
    }
  }, []);

  const getGaDomain = () => {
    return fetch(
      `${process.env.REACT_APP_SERVICE_GOOGLE_DOMAINS}?zuid=${instance.ZUID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  const changeDomainSelection = async (domain) => {
    setGoogleProfileId(domain.defaultProfileId);
    setSelectedDomain(domain.name);
    setShowModal(false);

    googleProfile["value"] = domain.defaultProfileId;
    googleUrchinId["value"] = domain.id;

    await ZestyAPI.updateSetting(googleProfile.ZUID, googleProfile);
    await ZestyAPI.updateSetting(googleUrchinId.ZUID, googleUrchinId);
  };

  return (
    <>
      {/* Googgle Authentication Modal */}
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: 20,
        }}
        open={!gaAuthenticated || gaLegacyAuth}
        onClick={() => {}}
      >
        <GoogleAuthOverlay
          gaLegacyAuth={gaLegacyAuth}
          gaAuthenticated={gaAuthenticated}
          user={userId}
          instance={instance}
        />
      </Backdrop>
      {/* Domain Selection Modal */}
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: 4,
          }}
        >
          <Box
            sx={{
              paddingBottom: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <Typography sx={{ fontWeight: 600, fontSize: "14pt" }}>
                Choose from domain list
              </Typography>
            </Box>
            <Box>
              <IconButton
                color="secondary"
                aria-label="upload picture"
                component="button"
                onClick={() => setShowModal(false)}
              >
                <CloseRoundedIcon />
              </IconButton>
            </Box>
          </Box>
          <GaTable
            domains={domainList}
            selectedDomain={selectedDomain}
            onCellClick={changeDomainSelection}
          />
        </Card>
      </Modal>
      <Box p={4}>
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
              {selectedDomain}
            </Typography>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setShowModal(true)}
            >
              Select Domain
            </Button>
          </Box>
        </Box>
        <Grid container spacing={4}>
          <Grid item xs={12} md={7} lg={7}>
            <PageviewTraffic
              setGALegacyStatus={setGaLegacyAuth}
              instanceZUID={instance.ZUID}
              profileID={googleProfileId}
              data={shelldata.shellBarData}
            />
          </Grid>
          <Grid item xs={12} md={5} lg={5}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  marginBottom: 4,
                }}
              >
                <InboundTraffic
                  setGALegacyStatus={setGaLegacyAuth}
                  instanceZUID={instance.ZUID}
                  profileID={googleProfileId}
                  data={shelldata.shellDoughnutData}
                />
              </Box>
              <Box>
                <SocialTraffic
                  setGALegacyStatus={setGaLegacyAuth}
                  instanceZUID={instance.ZUID}
                  profileID={googleProfileId}
                  data={shelldata.shellDoughnutData}
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <TopPerforming
              instanceZUID={instance.ZUID}
              profileID={googleProfileId}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
// );
