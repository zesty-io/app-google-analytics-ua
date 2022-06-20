import React, { useEffect, useState } from 'react'
import { Line } from "react-chartjs-2";
import { request } from "../../../../utility/request";
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import GraphContainer from '../GraphContainer';


export const PageviewTraffic = ({ setGALegacyStatus, instanceZUID, profileID, data, domainSet }) => {

    const [chartData, setChartData] = useState(data)

    // useEffect(async () => {

    //   if (domainSet) {

    //     const result = await getBarChartData2()
    //     const data = await result.json()

    //     setChartData(data.chartJSData)
       
    //   }
    // }, [])

    const getBarChartData2 = () => {

        return fetch(`http://localhost:7373/getPageViewData/?user_id=${instanceZUID}`, {
          method : 'POST',
          headers : {
            'Content-Type' : 'application/json'
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

    // const getBarChartData = () => {
    //   return request(
    //     `${process.env.REACT_APP_SERVICE_GOOGLE_ANALYTICS_READ}/?zuid=${instanceZUID}`,
    //     {
    //       method: "POST",
    //       credentials: "omit",
    //       headers: {
    //         "Content-Type": "plain/text",
    //       },
    //       body: JSON.stringify({
    //         gaRequest: {
    //           reportRequests: [
    //             {
    //               viewId: profileID,
    //               dateRanges: [
    //                 {
    //                   startDate: "14daysAgo",
    //                   endDate: "today",
    //                 },
    //               ],
    //               metrics: [
    //                 { expression: "ga:sessions" },
    //                 { expression: "ga:pageviews" },
    //               ],
    //               dimensions: [
    //                 { name: "ga:date" },
    //                 { name: "ga:dayOfWeekName" },
    //                 { name: "ga:month" },
    //                 { name: "ga:day" },
    //                 { name: "ga:year" },
    //               ],
    //               orderBys: [
    //                 {
    //                   fieldName: "ga:date",
    //                   orderType: "VALUE",
    //                   sortOrder: "ASCENDING",
    //                 },
    //               ],
    //             },
    //           ],
    //         },
    //         type: "bar",
    //         excludeLabelDimensions: [0],
    //       }),
    //     }
    //   );
    // }

    return (
      
      <GraphContainer title="Pageview / Traffic" subTitle="Last 14 Days" icon={ <BarChartOutlinedIcon sx={{ fontSize: 34, paddingRight : '10px', opacity : '0.5' }} />}>
          <Line
            data={data}
            // width={500}
            height={575}
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
