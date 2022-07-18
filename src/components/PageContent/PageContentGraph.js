import GraphContainer from "../ui/GraphContainer";
import { Line } from "react-chartjs-2"
import { useEffect, useState } from "react";
import { shelldata } from "../analytics/graph";
import MetricSelection from "./MetricSelection";
import Box from '@mui/material/Box'
import { Typography } from "@mui/material";
import { useDateRange } from "../../context/DateRangeContext";

export function PageContentGraph({ selectedPath, data }){

    const dateRange = useDateRange()
    const [selectedMetricsY1, setSelectedMetricsY1] = useState(null)
    const [selectedMetricsY2, setSelectedMetricsY2] = useState(null)
    
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


    return (
        <>
            <GraphContainer title="Metric" subTitle={dateRange.selectedItem} rightMenu={<MetricSelectionComponent />}>
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