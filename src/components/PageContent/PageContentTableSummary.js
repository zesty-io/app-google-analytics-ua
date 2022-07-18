import { 
        Card, 
        Grid, 
        Box,
        Typography,
        Divider
    } from '@mui/material'
import { useEffect, useState } from 'react'
import moment from 'moment'

export function PageContentTableSummary({ data, selectedPath, chartData }){

    const [summaryData, setSummaryData] = useState([]) 

    useEffect(() => {

        if(data.length !== 0){

            const returnData = formatData(selectedPath.length === 0 ? data : chartData)
            console.log(chartData)
            setSummaryData(returnData)
            
        }
        
    }, [chartData, selectedPath, data])

    const formatHeaderText = (text) => {
        return text.replace("ga:", "").replace(/([A-Z])/g, ' $1').trim().toUpperCase()
    }

    const formatData = (data) => {

        var metricHeader = data.reports[0].columnHeader.metricHeader.metricHeaderEntries.map(metric => formatHeaderText(metric.name));
        var metricData = data.reports[0].data.totals[0].values.map((value, i) => {

            if(i == 4) return moment.utc(Number(value), 'ss').format('HH:mm:ss') // Format to time
            if(i == 0) return Number(Math.round(value + "e" + 2) + "e-" + 2) + '$' // add percentage
            if([1,2].includes(i)) return Number(Math.round(value + "e" + 2) + "e-" + 2) + '%'

            return Number(Math.round(value + "e" + 2) + "e-" + 2)
        })

        return { metricHeader, metricData}

    }

    const GridItem = ({ headerTitle, value }) => (
        <>
        <Grid item sx={{ padding : 4 }}>
            <Typography sx={{ fontWeight : "bold", fontSize:"10pt" }}>{headerTitle}</Typography>
            <Box sx={{ marginTop : "10px"}}>
                <Typography sx={{ fontWeight : "bold" }}>{value}</Typography>
                <Typography sx={{ fontSize : "10pt" }}>% of Total : 100%</Typography>
            </Box>
            
        </Grid>
        <Divider orientation="vertical" flexItem/>
        </>
        
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