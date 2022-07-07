import { useState, useEffect } from 'react'
import { WithLoader } from "@zesty-io/core/WithLoader";
import GraphContainer from '../../../ui/GraphContainer'; 
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress';


export function TopPerforming({ profileID, instanceZUID }) {

  const [headers, setHeaders] = useState([])
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(async () => {

    if(profileID !== null){
      setLoading(true)
      const result = await getTopTenContent()
      
      if(!result.ok) return setLoading(false)

      const json = await result.json()
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
    }
  }, [profileID])

  const getTopTenContent = () => {
    return fetch(
      `${process.env.REACT_APP_SERVICE_GOOGLE_ANALYTICS_READ}/?zuid=${instanceZUID}`,
      {
        method: "POST",
        headers: {
          "content-type": "text/plain",
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

      <GraphContainer title="Top Performing Content" loading={loading}>
        
          {headers.length && data.length ? (
              
            <Table>
              <TableHead>
                <TableRow>
                  {headers.map((item) => (
                    <TableCell sx={{
                      fontWeight : 600
                    }}>{item.replace(/([A-Z])/g, ' $1').trim()}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((data, i) => (
                  <TableRow>
                    {data.map((field) => (
                      <TableCell>{field}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            "No content performance data to display"
          )} 
      </GraphContainer>
     
    );
  }