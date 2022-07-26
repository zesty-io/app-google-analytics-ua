import { Box, Typography } from "@mui/material"
import { useGoogle } from "../../context/GoogleContext";
import { useDateRange } from "../../context/DateRangeContext";
import { useEffect, useState } from "react";
import { useFetchWrapper } from "../../services/useFetchWrapper";
import { useAnalyticsApi } from "../../services/useAnalyticsApi";
import GraphContainer from "../ui/GraphContainer";
import { Chart } from "react-google-charts";


export default function Journey({instance, token}){

    const { googleDetails } = useGoogle()
    const dateRange = useDateRange() 
    const [data, setData] = useState(null)
    const { getUserFlowInteraction } = useAnalyticsApi(instance.ZUID)

    useEffect(async () => {
        if(googleDetails){
            const response = await getUserFlowInteraction(googleDetails.defaultProfileId, dateRange)
            const result = formatArray(response.googleData)
            setData(result)
        }
    }, [dateRange, googleDetails])  
    
    useEffect(() => {
        console.log(data)
    }, [data])

    const getBaseUrl = (url) => {
        return url.split("?")[0].split("#")[0]
    }
    
    const testData = [
        ["From", "To", "Weight"],
        ["Brazil", "Portugal", 5],
        ["Brazil", "France", 1],
        ["Brazil", "Spain", 1],
        ["Brazil", "England", 1],
        ["Canada", "Portugal", 1],
        ["Canada", "France", 5],
        ["Canada", "England", 1],
        ["Mexico", "Portugal", 1],
        ["Mexico", "France", 1],
        ["Mexico", "Spain", 5],
        ["Mexico", "England", 1],
        ["USA", "Portugal", 1],
        ["USA", "France", 1],
        ["USA", "Spain", 1],
        ["USA", "England", 5],
        ["Portugal", "Angola", 2],
        ["Portugal", "Senegal", 1],
        ["Portugal", "Morocco", 1],
        ["Portugal", "South Africa", 3],
        ["France", "Angola", 1],
        ["France", "Senegal", 3],
        ["France", "Mali", 3],
        ["France", "Morocco", 3],
        ["France", "South Africa", 1],
        ["Spain", "Senegal", 1],
        ["Spain", "Morocco", 3],
        ["Spain", "South Africa", 1],
        ["England", "Angola", 1],
        ["England", "Senegal", 1],
        ["England", "Morocco", 2],
        ["England", "South Africa", 7],
        ["South Africa", "China", 200],
        ["South Africa", "India", 1],
        ["South Africa", "Japan", 3],
        ["Angola", "China", 5],
        ["Angola", "India", 1],
        ["Angola", "Japan", 3],
        ["Senegal", "China", 5],
        ["Senegal", "India", 1],
        ["Senegal", "Japan", 3],
        ["Mali", "China", 5],
        ["Mali", "India", 1],
        ["Mali", "Japan", 3],
        ["Morocco", "China", 5],
        ["Morocco", "India", 1],
        ["Morocco", "Japan", 1000],
      ];
      
    const formatArray = (array) => {
        return array.reports[0].data.rows.map(row => {
            return {
                entrancePage : getBaseUrl(row.dimensions[0]),
                nextPage : getBaseUrl(row.dimensions[1]),
                value : row.metrics[0].values[0]
            }
        })
    }

    const options = {
        sankey: {
          link: { color: { fill: "#d799ae" } },
          node: {
            colors: ["#a61d4c"],
            label: { color: "#871b47" },
          },
        },
    };

    return (
        <>
            <GraphContainer title="Journey" subTitle={dateRange.selectedItem} >
                <Chart 
                 chartType="Sankey"
                 width="100%"
                 data={testData}
                 options={options} />
            </GraphContainer>
        </>
    )

}