import { useState, useEffect } from 'react'
import { PureComponent } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@zesty-io/core/Card";
import { WithLoader } from "@zesty-io/core/WithLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleUp } from "@fortawesome/free-solid-svg-icons";
import { request } from "../../../../utility/request";
import GraphContainer from '../GraphContainer'; 


export function TopPerforming({ profileID, instanceZUID }) {

  const [headers, setHeaders] = useState([])
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getTopTenContent().then((json) => {
      if (json && json.tableData) {
        // find the numbers that are long
        // truncate at 2 decimal places
        // this is highly dependant on the format
        // that the fetch returns ex: [[path, number, number, number], ...]
        const truncatedData = json.tableData.data.map((row) => {
          return row.map((col) => {
            // will not attempt conversion on a path
            if (Number(col)) {
              return Number(Math.round(col + "e" + 2) + "e-" + 2);
            } else {
              return col;
            }
          });
        });

        setHeaders(json.tableData.headers)
        setData(truncatedData)
        setLoading(false)

      } else {

        setLoading(false)

      }
    });
  }, [])

 

  const getTopTenContent = () => {
    return fetch(
      `${process.env.REACT_APP_SERVICE_GOOGLE_ANALYTICS_READ}/?zuid=${instanceZUID}`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          gaRequest: {
            reportRequests: [
              {
                viewId: profileID,
                dateRanges: [{ startDate: "14daysAgo", endDate: "today" }],
                metrics: [
                  { expression: "ga:sessions" },
                  { expression: "ga:avgSessionDuration" },
                  { expression: "ga:bounceRate" },
                ],
                dimensions: [{ name: "ga:pagePath" }],
                orderBys: [
                  {
                    fieldName: "ga:sessions",
                    sortOrder: "DESCENDING",
                  },
                ],
                pageSize: 10,
              },
            ],
          },
          type: "bar",
        }),
      }
    );
  }

    return (

      <GraphContainer title="Top Performing Content">
         <WithLoader
            condition={!loading}
            message="Loading Top Performing Content"
          >
            {headers.length && data.length ? (
              <table>
                <tr>
                  {headers.map((item) => (
                    <th>{item}</th>
                  ))}
                </tr>
                {data.map((data) => (
                  <tr>
                    {data.map((field) => (
                      <td>{field}</td>
                    ))}
                  </tr>
                ))}
              </table>
            ) : (
              "No content performance data to display"
            )}
          </WithLoader>
      </GraphContainer>
     
    );
  }