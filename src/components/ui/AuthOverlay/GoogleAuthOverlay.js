import {useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faKey, faPlug } from "@fortawesome/free-solid-svg-icons";
import Button from "@mui/material/Button";
import PublicIcon from "@mui/icons-material/Public";
import GaAuthenticate from "./GaAuthenticate";
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Backdrop from '@mui/material/Backdrop';

export const GoogleAuthOverlay = ({ user, instance, isAuthenticated = true }) => {

  const [state, setState] = useState({
    titles: {
      noDomain: "Please Setup a Domain before Authenticating",
      notAuthenticated: "Please Authenticate Google Analytics",
      legacyAuthentication: "Google needs to be Re-authenticated",
    },
    descriptions: {
      noDomain:
        "A domain can be set in Zesty.io accounts. Open up your instance settings, and set a domain. Once a domain is set, an authentication button will appear here.",
      notAuthenticated:
        "Someone in your organization with Google Analytics access needs to authenticate this Zesty.io instance. Before authenticating, the domain associated with this instance needs to be registed in Google Analytics.",
      legacyAuthentication:
        "Traffic is being tracked, but your Google Authentication is from Legacy Zesty.io and needs to be re-authenticated to access new metrics. Someone in your organization with Google Analytics access needs to do this.",
    },
    generalDescription:
      "Authenticating Google Analytics will automate GA tags in your Web Engine renders pages. If you use Zesty.io purely headlessly, Google Analytics will on provide value on rendered web views.",
  })


  const createAnalyticsPopup = (evt) => {
    var address = encodeURI(
      process.env.REACT_APP_SERVICE_GOOGLE_ANALYTICS_AUTH +
        "?user_id=" +
        user +
        "&account_id=" +
        instance.ID 
    );

    var win = window.open(
      address,
      "analytics",
      "width=700,height=450,left=" +
        (evt.target.offsetLeft + 400) +
        ",top=" +
        evt.target.offsetTop
    );

  };

    return (
      <>
       <Backdrop
        sx={{
          color: "#fff",
          zIndex: 20,
        }}
        open={!isAuthenticated}
        onClick={() => {}}
      >
        <Box
          sx={{
            display : "flex",
            flexDirection : "column",
            justifyItems : 'center',
            alignItems : 'center',
          }}>
          <Box
            sx={{
              display : 'flex',
              flexDirection : 'column',
              justifyItems : 'center',
              alignItems : 'center',
              padding : '20px',
              backgroundColor : "rgba(0, 0, 0, 0.5);",
              borderRadius : '5px',
              marginBottom : '20px'
            }}>
            <img
              alt="Google Analytics Logo"
              style={{ width : '300px' }}
              src="https://developers.google.com/analytics/images/terms/logo_lockup_analytics_icon_vertical_white_2x.png"
            />
            <div style={{ textAlign : 'center', display: "flex" }}>
              <FontAwesomeIcon icon={faPlug}/>{" "}<Typography sx={{ marginLeft : '10px' }}>Zesty.io WebEngine™ Integration</Typography>
            </div>
          </Box>
            <Box
              sx={{
                width : '700px',
                display : 'flex',
                flexDirection : 'column',
                justifyItems : 'center',
                alignItems : 'center'
              }}>
            
              {/* {gaLegacyAuth ? (
                <>
                  <Typography variant="h5">{state.titles.legacyAuthentication}</Typography>
                  <Typography variant="p" sx={{ fontWeight : '200' }}>{state.descriptions.legacyAuthentication}</Typography>
                </>
              ) : ( */}
                <>
                  <Typography variant="h5">{state.titles.notAuthenticated}</Typography>
                  <Typography variant="p" sx={{ fontWeight : '200' }}>{state.descriptions.notAuthenticated}</Typography>
                </>
              {/* )} */}

              {/* Exported this button in order to utilize usePermission hook */}
              <GaAuthenticate onClick={createAnalyticsPopup} />
          </Box>
        </Box>
      </Backdrop>
      </>
   
    );
}
