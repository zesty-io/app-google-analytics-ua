import React, { useEffect, useState } from 'react'
import { useDateRange } from '../../context/DateRangeContext'
import { useGoogle } from '../../context/GoogleContext'
import { shelldata } from '../analytics/graph'
import { Box } from '@mui/material'
import { PageContentTable } from './PageContentTable'
import { PageContentGraph } from './PageContentGraph'

export default function PageContent({ instance }){

    const dateRange = useDateRange()
    const {googleDetails, setGoogleDetails} = useGoogle()
    const [selectedPagePath, setSelectedPagePath] = useState([])
    const [chartData, setChartData] = useState(shelldata.shellBarData)
    const [googleData, setGoogleData] = useState([])

    useEffect(async () => {

        if(googleDetails){
            let paths = "";
            if(selectedPagePath.length !== 0){
                paths = selectedPagePath.map(path => 'ga:pagePath==' + path).join(",")
            }
    
            const response = await getBarChartData(paths)
            const data = await response.json()
            console.log(data)
            setChartData(data.chartJSData)
            setGoogleData(data.googleData)
            
        }
    }, [googleDetails, selectedPagePath, dateRange])


    const onCheckChange = (event, name) => {

        if(event.target.checked) return setSelectedPagePath([...selectedPagePath, name ])
        setSelectedPagePath(selectedPagePath.filter(site => site !== name))
        
    }

    const getBarChartData = (paths) => {
        return fetch(
          `${process.env.REACT_APP_SERVICE_GOOGLE_ANALYTICS_READ}/?zuid=${instance.ZUID}`,
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
                    dimensions: [
                        { name: "ga:date" },
                    ],
                    orderBys: [
                      {
                        fieldName: "ga:pageViews",
                        sortOrder: "DESCENDING",
                      },
                    ],
                    filtersExpression : paths
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
            <Box sx={{ 
                display : "flex",
                gap : 4,
                flexDirection : "column",
            }}>
                <PageContentGraph selectedPath={selectedPagePath} data={chartData} />
                <PageContentTable 
                    zuid={instance.ZUID} 
                    selectedPagePath={selectedPagePath} 
                    dateRange={dateRange} 
                    googleDetails={googleDetails} 
                    onCheckChange={onCheckChange}
                    chartData={googleData} />
            </Box>
        </>
    )
}