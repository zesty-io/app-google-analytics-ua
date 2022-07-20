import { 
        Card, 
        Grid, 
        Box,
        Typography,
        Divider
    } from '@mui/material'
import { useEffect, useState } from 'react'
import moment from 'moment'

export function PageContentTableSummary({ data, selectedPath, tableData }){

    const [summaryData, setSummaryData] = useState([]) 
    const [formatSelectedData, setFormatSeletedData] = useState([])

    useEffect(() => {

        if(tableData.length !== 0){

            let result = []
            let formatChartData = null
            // const returnData = formatData(selectedPath.length === 0 ? data : chartData)
            const returnData = formatData(data)
            if(selectedPath.length !== 0) formatChartData = formatData(tableData)
            
            returnData.forEach((value, i) => {
                result.push({
                    ...value,
                    selectedValue : formatChartData !== null ? formatChartData[i].data : value.data
                })
            })
            
            setSummaryData(result)

        }
        
    }, [tableData, selectedPath, data])

    const formatHeaderText = (text) => {
        return text.replace("ga:", "").replace(/([A-Z])/g, ' $1').trim().toUpperCase()
    }

    const formatData = (data) => {

        let objArray = [];

        var metricHeader = data.reports[0].columnHeader.metricHeader.metricHeaderEntries.map(metric => formatHeaderText(metric.name));
        var metricData = data.reports[0].data.totals[0].values.map((value, i) => {

            return Number(Math.round(value + "e" + 2) + "e-" + 2)
        })

        metricHeader.forEach((value, i) => {
            objArray.push({
                label : value,
                data : metricData[i]
            })
        })


        return objArray

    }

    const avg = (num1, num2) => {
        
        if(num1 == 0 || num2 == 0) return 0

        var startPos = 0
        var endPos = Number(num1)
        var currentPos = Number(num2)

        var distance = endPos - startPos;
        var displacement = currentPos - startPos;

        return Math.round((displacement / distance) * 100)
    }
    
    const time = (value) => {
        return moment.utc(Number(value), 'ss').format('HH:mm:ss')
    }

    const GridItem = (props) => (
        <>
            <Grid item sx={{ padding : 4 }}>
                <Typography sx={{ fontWeight : "bold", fontSize:"10pt", color : '#5b667d' }}>{props.label}</Typography>    
                <Box sx={{ marginTop : "5px"}}>
                    <Typography sx={{ fontSize : "18pt", fontWeight : "bold", marginBottom : "5px" }}>{props.selectedValue !== null ? props.selectedValue : props.data}</Typography>
                    <Typography sx={{ fontSize : "10pt" }}>{`% of Total : ${avg(props.data, props.selectedValue)}%`}</Typography>
                    <Typography sx={{ fontSize : "10pt", color : '#5b667d' }}>{`(${props.data})`}</Typography>
                </Box>
            </Grid>
            <Divider orientation="vertical" flexItem/>
        </>
        
    )
    const GridItemTime = (props) => (
        <>
            <Grid item sx={{ padding : 4 }}>
                <Typography sx={{ fontWeight : "bold", fontSize:"10pt", color : '#5b667d'}}>{props.label}</Typography>    
                <Box sx={{ marginTop : "5px"}}>
                    <Typography sx={{ fontSize : "18pt", fontWeight : "bold", marginBottom : "5px" }}>{time(props.selectedValue !== null ? props.selectedValue : props.data)}</Typography>
                    <Typography sx={{ fontSize : "10pt" }}>{`Avg for view: ${time(props.data)}`}</Typography>
                    <Typography sx={{ fontSize : "10pt", color : '#5b667d' }}>{`( ${avg(props.data, props.selectedValue)}%)`}</Typography>
                </Box>
            </Grid>
            <Divider orientation="vertical" flexItem/>
        </>
        
    )

    const GridItemRate = (props) => (
        <>
            <Grid item sx={{ padding : 4 }}>
                <Typography sx={{ fontWeight : "bold", fontSize:"10pt", color : '#5b667d' }}>{props.label}</Typography>    
                <Box sx={{ marginTop : "5px"}}>
                    <Typography sx={{ fontSize : "18pt", fontWeight : "bold", marginBottom : "5px" }}>{props.selectedValue !== null ? props.selectedValue : props.data}%</Typography>
                    <Typography sx={{ fontSize : "10pt" }}>{`Avg for view : ${avg(props.data, props.selectedValue)}%`}</Typography>
                    <Typography sx={{ fontSize : "10pt", color : '#5b667d' }}>{`(${props.data}%)`}</Typography>
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
                    
                    {summaryData.length !== 0 && summaryData.map((value) => {
                        
                        if(value.label.includes('TIME')) return <GridItemTime {...value} />
                        if(value.label.includes('RATE')) return <GridItemRate {...value} />

                        return <GridItem {...value} />
                        
                    })}
                    
                </Grid>
            </Card>
        </>
    )

}