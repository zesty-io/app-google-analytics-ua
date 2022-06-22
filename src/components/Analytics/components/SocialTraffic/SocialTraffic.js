import React, { useState, useEffect } from 'react'
import { Doughnut } from "react-chartjs-2";
import { request } from "../../../../utility/request";
import GraphContainer from '../GraphContainer';

export const SocialTraffic = ({ setGALegacyStatus, instanceZUID, profileID, data, domainSet }) => {

  const [chartData, setChartData] = useState(data)

  // useEffect(() => {

  //   if(domainSet){
  //     getSocialTraffic().then((json) => {
  //         if (json && json.chartJSData) {
  //           setChartData(json.chartJSData)
  //         } else if (json && json.status === 400) {
  //           setGALegacyStatus(true);
  //         }
  //       })
  //   }

  // }, [])

  const getSocialTraffic = () => {
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
                dateRanges: [{ startDate: "14daysAgo", endDate: "today" }],
                metrics: [{ expression: "ga:sessions" }],
                dimensions: [{ name: "ga:socialNetwork" }],
                dimensionFilterClauses: [
                  {
                    filters: [
                      {
                        dimensionName: "ga:socialNetwork",
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
    <GraphContainer title="Social Traffic" subTitle="Last 14 Days">
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
  )

}
