import React, { useEffect, useState } from 'react'
import { Line } from "react-chartjs-2";
import { request } from "../../../../utility/request";
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import GraphContainer from '../GraphContainer';


export const PageviewTraffic = ({ setGALegacyStatus, instanceZUID, profileID, data, domainSet }) => {

    const [chartData, setChartData] = useState(data)

    useEffect(async () => {
      
      if(profileID !== null && domainSet){
        
        const result = await getBarChartData()
        if(!result.ok) return setGALegacyStatus(true)
        const data = await result.json()
        setChartData(data.chartJSData)
        setGALegacyStatus(false)

      }

    }, [profileID])

    const getBarChartData = () => {

        return fetch(`${process.env.REACT_APP_SERVICE_GOOGLE_ANALYTICS_READ}/?zuid=${instanceZUID}`, {
          method : 'POST',
          credentials: "omit",
          headers : {
            'Content-Type' : 'application/json',
          },
          body : JSON.stringify({
            gaRequest: {
              reportRequests: [
                {
                  viewId: profileID,
                  dateRanges: [
                    {
                      startDate: "14daysAgo",
                      endDate: "today",
                    },
                  ],
                  metrics: [
                    { expression: "ga:sessions" },
                    { expression: "ga:pageviews" },
                  ],
                  dimensions: [
                    { name: "ga:date" },
                    { name: "ga:dayOfWeekName" },
                    { name: "ga:month" },
                    { name: "ga:day" },
                    { name: "ga:year" },
                  ],
                  orderBys: [
                    {
                      fieldName: "ga:date",
                      orderType: "VALUE",
                      sortOrder: "ASCENDING",
                    },
                  ],
                },
              ],
            },
            type: "bar",
            excludeLabelDimensions: [0],
          })
        })

    }

    return (
      
      <GraphContainer title="Pageview Traffic" subTitle="Last 14 Days" icon={ <BarChartOutlinedIcon sx={{ fontSize: 34, paddingRight : '10px', opacity : '0.5' }} />}>
          <Line
            data={chartData}
            // width={500}
            height={553}
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
                    display: false,
                    
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
    );

}
