import React, { useState, useEffect } from 'react'
import { PureComponent } from "react";
import { Doughnut } from "react-chartjs-2";
import { Card, CardHeader, CardContent, CardFooter } from "@zesty-io/core/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import { request } from "../../../../utility/request";

import styles from "./SocialTraffic.less";

export const SocialTraffic = ({ setGALegacyStatus, instanceZUID, profileID, data, domainSet }) => {

  const [chartData, setChartData] = useState(data)

  useEffect(() => {

    if(domainSet){
      getSocialTraffic().then((json) => {
          if (json && json.chartJSData) {
            setChartData(json.chartJSData)
          } else if (json && json.status === 400) {
            setGALegacyStatus(true);
          }
        })
    }

  }, [])

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
    <Card>
      <CardHeader>
        <h2 className={styles.columns}>
          <div className={styles.column}>
            <FontAwesomeIcon className={styles.muted} icon={faHashtag} />
            Social Traffic
          </div>
          <div
            className={`${styles.column} ${styles.muted} ${styles.isAlignedRight}`}
          >
            Last 14 Days
          </div>
        </h2>
      </CardHeader>
      <CardContent>
        <Doughnut
          data={chartData}
          // width={250}
          height={250}
          options={{
            maintainAspectRatio: false,
            legend: {
              display: true,
              position: "left",
            },
          }}
        />
      </CardContent>
    </Card>
  )

}