import GraphContainer from "../ui/GraphContainer";
import { Line } from "react-chartjs-2"
import { useEffect, useState } from "react";
import MetricSelection from "./MetricSelection";
import { Typography, Box } from "@mui/material";
import { useDateRange } from "../../context/DateRangeContext";
import moment from "moment";

export function PageContentGraph({ selectedPath, data, isLoading = true }){
    
    const dateRange = useDateRange()
    const [selectedMetricsY1, setSelectedMetricsY1] = useState(null)
    const [selectedMetricsY2, setSelectedMetricsY2] = useState(null)

    useEffect(() => {

      if(data && data.datasets[0].label !== "Loading") setSelectedMetricsY1("PageViews")

    }, [data])
    
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
        return data.datasets.filter(data => data.label === selectedMetricsY1).map(data => { return {...data,  yAxisID: 'y1'}}).shift()
      }
      return null
    }

    const getY2 = () => {
      if(selectedMetricsY2){
        return data.datasets.filter(data => data.label === selectedMetricsY2).map(data => { return {...data,  yAxisID: 'y2'}}).shift()
      }
      return null
    }

    const MetricSelectionComponent = () => {

      return (
        <>
          <Box sx={{ display : "flex", gap: 2, alignItems : "center", justifyContent : "center" }}>
            <MetricSelection metrics={data.datasets} selectedMetrics={selectedMetricsY1} onSelect={onSelectY1} />
            <Typography>
              vs
            </Typography>
            <MetricSelection metrics={data.datasets} selectedMetrics={selectedMetricsY2} onSelect={onSelectY2} />
          </Box>
        </>
      )
    }

    const formatTicksY2 = (value, index, ticks) => {
      if(!selectedMetricsY2) return;
      if(selectedMetricsY2.includes("Time")) return moment().startOf('day').seconds(Number(value)).format('HH:mm:ss');
      if(selectedMetricsY2.includes("Rate")) return value + "%";
      if(selectedMetricsY2.includes("Value")) return value + "$";

      return value;
    }

    const formatTicksY1 = (value, index, ticks) => {
      if(!selectedMetricsY1) return;
      if(selectedMetricsY1.includes("Time")) return moment().startOf('day').seconds(Number(value)).format('HH:mm:ss');
      if(selectedMetricsY1.includes("Rate")) return value + "%";
      if(selectedMetricsY1.includes("Value")) return value + "$";

      return value;
    }



    return (
        <>
            <GraphContainer title="Metric" loading={isLoading} subTitle={dateRange.selectedItem} rightMenu={<MetricSelectionComponent />}>
                <Line
                    data={{
                        labels : data.labels,
                        datasets:[
                          getY1(),
                          getY2()
                        ].filter(dataset => dataset !== null),
                    }}
                    // width={500}
                    height={400}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      bezierCurve: false,
                      scales: {
                        yAxes: [{
                            id: 'y1',                             
                            type: 'linear',
                            position: 'left',
                            ticks : {
                              callback: formatTicksY1
                            }
                        }, {
                            id: 'y2',                             
                            type: 'linear',
                            position: 'right',
                            ticks : {
                              callback: formatTicksY2
                            }
                        }],
                        xAxes : [{
                          ticks : {
                            callback: function(value, index, ticks) {
                                return moment(value).format('YYYY-MM-DD');
                            }
                          }
                        }]
                      },
                      
                    }}
                />
            </GraphContainer>
        </>
    )
}