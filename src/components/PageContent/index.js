import React, { useEffect, useState } from 'react'
import NavBar from '../ui/NavBar/NavBar'
import GraphContainer from '../ui/GraphContainer'
import { useDateRange } from '../../context/DateRangeContext'
import { useGoogle } from '../../context/GoogleContext'
import { shelldata } from '../analytics/graph'
import { Line } from "react-chartjs-2";
import { Box } from '@mui/material'
import { PageContentTable } from './PageContentTable'

export default function PageContent({ instance, token }){

    const dateRange = useDateRange()
    const {googleDetails, setGoogleDetails} = useGoogle()
    const [chartData, setChartData] =useState(shelldata.shellBarData)

    useEffect(async () => {

        if(googleDetails){
            
            const response = await getTopTenContent()
            const data = await response.json()
            console.log(data)
            setChartData(data.chartJSData)

        }
        

    }, [googleDetails, dateRange])

    const getTopTenContent = () => {
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
                      { expression: "ga:exits" },
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
                    filtersExpression : 'ga:pagePath==/'
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
                flexDirection : "column"
            }}>
                <GraphContainer title="Content Pages" subTitle={dateRange.selectedItem}>
                    <Line
                        data={chartData}
                        // width={500}
                        height={400}
                        options={{
                        maintainAspectRatio: false,
                        bezierCurve: false,
                        scales: {
                            yAxes: [
                            {
                                display: true,
                                
                            },
                            ],
                            xAxes: [
                            {
                                display: true,
                            },
                            ],
                        },
                        options: {
                            legend: {
                            display: true,
                            position: "bottom",
                            },
                        },
                        }}
                    />
                </GraphContainer>
                <PageContentTable zuid={instance.ZUID} />
            </Box>
        </>
    )
}