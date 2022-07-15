import { useState, useEffect } from 'react'
import GraphContainer from '../ui/GraphContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import { useNotify } from '../../context/SnackBarContext';
import { PageContentTableSummary } from './PageContentTableSummary';


export function PageContentTable({ zuid, selectedPagePath, onCheckChange, googleDetails, dateRange }) {

  const notify = useNotify()
  const [headers, setHeaders] = useState([])
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [googleData, setGoogleData] = useState([])



  useEffect(async () => {

    if(googleDetails){
      try{
        setLoading(true)
        const result = await getTopTenContent()
        
        if(!result.ok) throw result
  
        const json = await result.json()
        setGoogleData(json.googleData)
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
      }catch(err){
        const error = await err.json()
        console.log(error)
        setLoading(false)
        return notify.current.error(error.error)
      }
      
    }
  }, [googleDetails, dateRange])

  const getTopTenContent = () => {
    return fetch(
      `${process.env.REACT_APP_SERVICE_GOOGLE_ANALYTICS_READ}/?zuid=${zuid}`,
      {
        method: "POST",
        headers: {
          "content-type": "text/plain",
        },
        body: JSON.stringify({
          gaRequest: {
            reportRequests: [
              {
                viewId: googleDetails.defaultProfileId,
                dateRanges: [{ startDate: dateRange.startDate, endDate: dateRange.endDate }],
                metrics: [
                    { expression: "ga:pageValue" },
                    { expression: "ga:exitRate" },
                    { expression: "ga:bounceRate" },
                    { expression: "ga:entrances" },
                    { expression: "ga:avgTimeOnPage" },
                    { expression: "ga:uniquePageviews" },
                    { expression: "ga:pageViews" },
                ],
                dimensions: [{ name: "ga:pagePath" }],
                orderBys: [
                  {
                    fieldName: "ga:pageViews",
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
      <>
      <PageContentTableSummary data={googleData} selectedPath={selectedPagePath} />
      <GraphContainer title="Pages" loading={loading} >
        
          {headers.length && data.length ? (
              
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  {headers.map((item) => (
                    <TableCell>{item.replace(/([A-Z])/g, ' $1').trim()}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((data, i) => {    
                    const isItemSelected = selectedPagePath.includes(data[0]);
                    const labelId = `enhanced-table-checkbox-${i}`;
                    
                    return (
                        <TableRow
                          sx={{
                            backgroundColor : selectedPagePath.length !== 0 ? selectedPagePath.includes(data[0]) ?   "#ffffff" : "#f2f4fb" : "#ffffff"
                          }}>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    color="secondary"
                                    checked={isItemSelected}
                                    onChange={(event) => onCheckChange(event, data[0])}
                                    inputProps={{
                                    'aria-labelledby': labelId,
                                    }}
                                />
                            </TableCell>
                            {data.map((field) => (
                            <TableCell>{field}</TableCell>
                            ))}
                        </TableRow>
                    )
                })}
              </TableBody>
            </Table>
          ) : (
            "No content performance data to display"
          )} 
      </GraphContainer>
      </>
    );
  }