import GraphContainer from "../ui/GraphContainer";
import { Line } from "react-chartjs-2"
import { useEffect, useState } from "react";
import { shelldata } from "../analytics/graph";

export function PageContentGraph({ zuid, dateRange, googleDetails, selectedPath=[] }){

    const [chartData, setChartData] = useState(shelldata.shellBarData)

    useEffect(async () => {
        
        if(googleDetails){
            let paths = "";
            let filterMetricDataSet = {}
            if(selectedPath.length !== 0){
                paths = selectedPath.map(path => 'ga:pagePath==' + path).join(",")
            }
            const response = await getBarChartData(paths)
            const data = await response.json()
            

            setChartData(data.chartJSData)

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
        </>
    )

}