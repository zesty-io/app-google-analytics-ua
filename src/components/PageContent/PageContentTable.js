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
import { useAnalyticsApi } from '../../services/useAnalyticsApi';


export function PageContentTable({ selectedPagePath, onCheckChange, tableData, isLoading = true}) {

  const notify = useNotify()
  const [headers, setHeaders] = useState([])
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(async () => {

    if(tableData.length !== 0){

      try{
        
       
        const truncatedData = tableData.tableData.data.map((row) => {
          return row.map((col) => {
            // will not attempt conversion on a path
            if (Number(col)) {
              return Number(Math.round(col + "e" + 2) + "e-" + 2);
            } else {
              return col;
            }
          });
        });
        
        setHeaders(tableData.tableData.headers)
        setData(truncatedData)

      }catch(error){
        setLoading(false)
        notify.current.error(error.message)
      }
      
    }
  }, [tableData, selectedPagePath])

    return (
      <>
      <GraphContainer title="Pages" loading={isLoading} >
        
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