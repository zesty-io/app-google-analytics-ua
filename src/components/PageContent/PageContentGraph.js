import GraphContainer from "../ui/GraphContainer";
import { Line } from "react-chartjs-2"
import { useEffect, useState } from "react";
import { shelldata } from "../analytics/graph";
import MetricSelection from "./MetricSelection";

export function PageContentGraph({ zuid, dateRange, googleDetails, selectedPath=[] }){

    const [chartData, setChartData] = useState(shelldata.shellBarData)
    const [selectedMetrics, setSelectedMetrics] = useState([])

    useEffect(async () => {
        
        if(googleDetails){

            let paths = "";
            if(selectedPath.length !== 0){
                paths = selectedPath.map(path => 'ga:pagePath==' + path).join(",")
            }

            const response = await getBarChartData(paths)
            const data = await response.json()
            const chart = data.chartJSData
            if(selectedMetrics.length === 0) setSelectedMetrics([chart.datasets[0].label])
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

    const onSelect = (event, metric) => {

        if(event.target.checked) return setSelectedMetrics([...selectedMetrics, metric.label])

        setSelectedMetrics(selectedMetrics.filter(selectedMetric => selectedMetric !== metric.label))
       
    }

    return (
        <>
            <GraphContainer title="Content Pages" subTitle={dateRange.selectedItem} rightMenu={<MetricSelection metrics={chartData.datasets} selectedMetrics={selectedMetrics} onSelect={onSelect} />}>
                <Line
                    data={{
                        datasets : chartData.datasets.filter(metric => selectedMetrics.includes(metric.label)),
                        labels : chartData.labels
                    }}
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
        </>
    )

}