import React, {useEffect, useState} from 'react' 
import { Doughnut } from "react-chartjs-2";
import { request } from "../../../../utility/request";
import GraphContainer from '../GraphContainer';
import PieChartOutlineOutlinedIcon from '@mui/icons-material/PieChartOutlineOutlined';

export const InboundTraffic = ({ data, domainSet, setGALegacyStatus, instanceZUID, profileID}) => {

    const [chartData, setChartData] = useState(data)

    // useEffect(() => {
    //   if (domainSet) {
    //     getInboundTraffic().then((json) => {
    //       if (json && json.chartJSData) {
    //           setChartData(json.chartJSData)
    //       } else if (json && json.status === 400) {
    //         setGALegacyStatus(true);
    //       }
    //     });
    //   }
    // }, [])

    const getInboundTraffic = () => {
      return request(
        `${process.env.REACT_APP_SERVICE_GOOGLE_ANALYTICS_READ}/?zuid=${instanceZUID}`,
        {
          method: "POST",
          credentials: "omit",
          headers: {
            "Content-Type": "plain/text",
          },
          body: JSON.stringify({
            gaRequest: {
              reportRequests: [
                {
                  viewId: profileID,
                  dateRanges: [{ startDate: "14daysAgo", endDate: "yesterday" }],
                  metrics: [{ expression: "ga:sessions" }],
                  dimensions: [{ name: "ga:medium" }],
                  dimensionFilterClauses: [
                    {
                      filters: [
                        {
                          dimensionName: "ga:medium",
                          not: true,
                          expressions: ["(not set)"],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            type: "pie",
          }),
        }
      );
    }

    return (
      <GraphContainer title="Inbound Traffic" subTitle="Last 14 Days" icon={<PieChartOutlineOutlinedIcon sx={{ fontSize: 34, paddingRight : '10px', opacity : '0.5' }} />}>
        <Doughnut
            data={data}
            // width={250}
            height={220}
            options={{
              maintainAspectRatio: false,
              legend: {
                display: true,
                position: "left",
              },
            }}
          />
      </GraphContainer>
    );

}
