import shelldata from "../ui/ShellData/shelldata";
import { PageviewTraffic } from "./PageviewTraffic";
import { InboundTraffic } from "./InboundTraffic";
import { SocialTraffic } from "./SocialTraffic";
import { TopPerforming } from './TopPerforming';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useGoogle } from "../../context/GoogleContext";
import { useDateRange } from "../../context/DateRangeContext";

export default function Overview({ instance, token }) {
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
