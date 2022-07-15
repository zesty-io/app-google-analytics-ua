import GraphContainer from "../ui/GraphContainer";
import { Line } from "react-chartjs-2"
import { useEffect, useState } from "react";
import { shelldata } from "../analytics/graph";
import MetricSelection from "./MetricSelection";
import Box from '@mui/material/Box'
import { Typography } from "@mui/material";

export function PageContentGraph({ zuid, dateRange, googleDetails, selectedPath=[] }){

    const [chartData, setChartData] = useState(shelldata.shellBarData)
    const [selectedMetricsY1, setSelectedMetricsY1] = useState(null)
    const [selectedMetricsY2, setSelectedMetricsY2] = useState(null)
    const [compareMetrics, setCompareMetrics] = useState([])

    useEffect(async () => {
        
        if(googleDetails){

            let paths = "";
            if(selectedPath.length !== 0){
                paths = selectedPath.map(path => 'ga:pagePath==' + path).join(",")
            }

            const response = await getBarChartData(paths)
            const data = await response.json()
            const chart = data.chartJSData
            setChartData(chart)

        }

    }, [dateRange, googleDetails, selectedPath])


    const getBarChartData = (paths) => {
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
                      { expression: "ga:exits" },
                      { expression: "ga:bounceRate" },
                      { expression: "ga:entrances" },
                      { expression: "ga:avgTimeOnPage" },
                      { expression: "ga:timeOnPage" },
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

    const onSelectY1 = (event, metric) => {
      if(event.target.checked) return setSelectedMetricsY1(metric)
      setSelectedMetricsY1(null)
    }

    const onSelectY2 = (event, metric) => {
      if(event.target.checked) return setSelectedMetricsY2(metric)
      setSelectedMetricsY2(null)
    }

    const getY1 = () => {
      if(selectedMetricsY1){
        return chartData.datasets.filter(data => data.label === selectedMetricsY1).map(data => { return {...data,  yAxisID: 'y1'}})[0]
      }
      return null
    }

    const getY2 = () => {
      if(selectedMetricsY2){
        return chartData.datasets.filter(data => data.label === selectedMetricsY2).map(data => { return {...data,  yAxisID: 'y2'}})[0]
      }
      return null
    }

    const MetricSelectionComponent = () => {

      return (
        <>
          <Box sx={{ display : "flex", gap: 2 }}>
            <MetricSelection metrics={chartData.datasets} selectedMetrics={selectedMetricsY1} onSelect={onSelectY1} />
            <Typography>
              vs
            </Typography>
            <MetricSelection metrics={chartData.datasets} selectedMetrics={selectedMetricsY2} onSelect={onSelectY2} />
          </Box>
         
        </>
      )
    }


    return (
        <>
            <GraphContainer title="Content Pages" subTitle={dateRange.selectedItem} rightMenu={<MetricSelectionComponent />}>
                <Line
                    data={{
                        labels : chartData.labels,
                        datasets:[
                          getY1(),
                          getY2()
                        ].filter(dataset => dataset !== null),
                    }}
                    // width={500}
                    height={400}
                    options={{
                      maintainAspectRatio: false,
                      bezierCurve: false,
                      scales: {
                        yAxes: [{
                            id: 'y1',                             
                            type: 'linear',
                            position: 'left',
                        }, {
                            id: 'y2',                             
                            type: 'linear',
                            position: 'right',
                        }]
                       
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
        </>
    )

}