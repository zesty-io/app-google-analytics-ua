import { 
        Card, 
        Grid, 
        Box,
        Typography
    } from '@mui/material'
import { useEffect, useState } from 'react'
import moment from 'moment'

export function PageContentTableSummary({ data, selectedPath }){

    const [summaryData, setSummaryData] = useState([]) 

    useEffect(() => {
        if(data.length !== 0){

            const returnData = formatData(data)
            console.log(returnData)
            setSummaryData(returnData)
    
        }
      
    }, [data, selectedPath])

    const formatHeaderText = (text) => {
        return text.replace("ga:", "").replace(/([A-Z])/g, ' $1').trim().toUpperCase()
    }

    const formatData = (data) => {

        var metricHeader = data.reports[0].columnHeader.metricHeader.metricHeaderEntries.map(metric => formatHeaderText(metric.name));
        var metricData = data.reports[0].data.totals[0].values.map((value, i) => {
            if(i == 4) return moment.utc(Number(value), 'ss').format('HH:mm:ss')
            return Number(Math.round(value + "e" + 2) + "e-" + 2)
        })

        return { metricHeader, metricData}

    }

    const GridItem = ({ headerTitle, value }) => (
        <Grid item sx={{ padding : 4 }}>
            <Typography sx={{ fontWeight : "bold", fontSize:"10pt" }}>{headerTitle}</Typography>
            <Box sx={{ marginTop : "10px"}}>
                <Typography sx={{ fontWeight : "bold" }}>{value}</Typography>
                <Typography sx={{ fontSize : "10pt" }}>% of Total : 100%</Typography>
            </Box>
        </Grid>
    )

    return (
        <>
            <Card>
                <Grid container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start">
                    
                    {summaryData.length !== 0 && summaryData.metricHeader.map((metric, i) => (
                        <GridItem headerTitle={metric} value={summaryData.metricData[i]} />
                    ))}
                    
                    
                </Grid>
            </Card>
        </>
    )

}