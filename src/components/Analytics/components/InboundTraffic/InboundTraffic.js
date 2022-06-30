import React, {useEffect, useState} from 'react' 
import { Doughnut } from "react-chartjs-2";
import { request } from "../../../../utility/request";
import GraphContainer from '../GraphContainer';
import PieChartOutlineOutlinedIcon from '@mui/icons-material/PieChartOutlineOutlined';

export const InboundTraffic = ({ data, domainSet, setGALegacyStatus, instanceZUID, profileID}) => {

    const [chartData, setChartData] = useState(data)
    const [loading, setLoading] = useState(false)
    useEffect(async () => {
      if (profileID !== null) {
        setLoading(true)
        const result = await getInboundTraffic()

        if(!result.ok) return setGALegacyStatus(true)

        const data = await result.json()

        setChartData(data.chartJSData)
        setLoading(false)
      }
    }, [profileID])

    const getInboundTraffic = () => {
      return fetch(
        `${process.env.REACT_APP_SERVICE_GOOGLE_ANALYTICS_READ}/?zuid=${instanceZUID}`,
        {
          method: "POST",
          credentials: "omit",
          headers: {
            "Content-Type": "text/plain",
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
      <GraphContainer title="Inbound Traffic" subTitle="Last 14 Days" loading={loading}>
        <Doughnut
            data={chartData}
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
