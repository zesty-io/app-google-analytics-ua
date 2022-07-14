import { useState, useEffect } from "react";
import { PageviewTraffic, InboundTraffic, SocialTraffic, TopPerforming, shelldata } from './graph'
import { GoogleAuthOverlay } from "../ui/AuthOverlay";
import { GaTable } from "../ui/Table/GaTable";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { CustomDatePicker } from "../ui/DatePicker/DatePicker";
import CustomSnackbar from "../ui/SnackBar/SnackBar";
import { useGoogle } from "../../context/GoogleContext";
import { useDateRange } from "../../context/DateRangeContext";

export default function Analytics({ instance, token }) {
  const { googleDetails, setGoogleDetails } = useGoogle()
  const dateRange = useDateRange()
  

  return (
    <>
        <Grid container spacing={4}>
          <Grid item xs={12} md={7} lg={7}>
            <PageviewTraffic
              instanceZUID={instance.ZUID}
              googleDetails={googleDetails}
              data={shelldata.shellBarData}
              dateRange={dateRange}
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
                   instanceZUID={instance.ZUID}
                   googleDetails={googleDetails}
                    data={shelldata.shellDoughnutData}
                   dateRange={dateRange}
                />
              </Box>
              <Box>
                <SocialTraffic
                   instanceZUID={instance.ZUID}
                   googleDetails={googleDetails}
                   dateRange={dateRange}
                  data={shelldata.shellDoughnutData}
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <TopPerforming
              instanceZUID={instance.ZUID}
              googleDetails={googleDetails}
              dateRange={dateRange}
            />
          </Grid>
        </Grid>
    </>
  );
}
// );
