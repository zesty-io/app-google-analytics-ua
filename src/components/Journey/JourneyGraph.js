import { useEffect, useState } from "react"
import { Chart } from "react-google-charts";
import { Box } from "@mui/material"

export default function JourneyGraph({ data, filter, slice }){

    const [graphData, setGraphData] = useState(null)
    const [summary, setSummary] = useState(null)

    useEffect(() => {
        if(data){
            const formatData = formatJourney(data.googleData)
            setGraphData(formatData)
        }
    }, [data, filter, slice])

    const formatJourney = (data) => {

        let raw = data.reports[0].data.rows
        let totals = data.reports[0].data.totals[0].values[1]
        let levels = {}
        let i = 1
        
        if(!raw) return null

        do{
            if(i === 1){
                var filterData = raw.filter(item => item.dimensions[0] === "(entrance)")
                raw = removeArray(raw, filterData)
                levels[`Level${i}`] = filter !== null ? filterData.filter(item => item.dimensions[1] === filter.label).slice(0, slice) : filterData.slice(0, slice)
            }else{
                let bufferData = []
                levels[`Level${i - 1}`].forEach((data, i) => {
                    let levelData = raw.filter(item => data.dimensions[1] === item.dimensions[0])
                    if(levelData.length !== 0) bufferData.push(...levelData)
                })
                raw = removeArray(raw, bufferData)
                levels[`Level${i}`] = bufferData.sort(compare).slice(0, slice)
            }
            console.log(raw)
            i = i + 1
        }
        while(i < 20)

        let sankeyData = [["From", "To", "Visit"]]
        for (var key in levels) {
            if (levels.hasOwnProperty(key)) {
                levels[key].forEach(item => {
                    if(item.dimensions[0] !== item.dimensions[1] && !ifSankeyExist(sankeyData, item)) sankeyData.push([item.dimensions[0], item.dimensions[1], Number(item.metrics[0].values[1])])
                })
            }
        }

        const maxEntrance = sankeyData.filter(value => value[0] === '(entrance)').reduce((prev, current) => (prev[2] > current[2] ? prev : current), [])
        const maxPage = sankeyData.filter(value => value[0] === maxEntrance[1]).reduce((prev, current) => (prev[2] > current[2] ? prev : current), [])
       
        setSummary({
            entrance : maxEntrance,
            page : maxPage,
            aveVisit : ave(totals, maxPage.length !== 0 ? maxPage[2] : maxEntrance[2])
        })
        return sankeyData
    }

    const ave = (a, b) => {
        return ((b / a) * 100).toFixed(2)
    }

    const ifSankeyExist = (base, data) => {
        
        let value = false

        base.forEach(items => {
            if(items[0] === data.dimensions[0] && items[1] === data.dimensions[1]){
                value = true
            }
            if(items[0] === data.dimensions[1]){
                value = true
            } 
            
        })

        return value

    }

    const compare = (a, b) => {
        if ( a.metrics[0].values[1] > b.metrics[0].values[1]){
            return -1;
        }
        if ( a.metrics[0].values[1] < b.metrics[0].values[1]){
            return 1;
        }
        return 0;
    }

    const removeArray = (base, remove) => {
        let newArray = []

        base.forEach(item => {
            if(!remove.includes(item)) newArray.push(item)
        })

        return newArray
    }

    var colors = [
        '#7a56ff', 
        '#36a2eb', 
        '#ffce56', 
        '#41ead4', 
        '#ff0022', 
        '#56ff7a', 
        '#ff56db', 
        '#ff7a56', 
        '#56dbff', 
        '#7a56ff', 
        '#36a2eb', 
        '#ffce56', 
        '#41ead4', 
        '#ff0022', 
        '#56ff7a', 
        '#ff56db', 
        '#ff7a56', 
        '#56dbff'];

    var options = {
        sankey: { 
            node: { 
                nodePadding: 20,
                colors: colors
            },
            link: {
                colorMode: 'gradient',
                colors: colors
            }
        },
    };


    return (
        <>
            <Box sx={{ width : "100%", height: 1000 }}>
                {graphData !== null && (
                    <>
                    
                        <Box
                            sx={{
                                textAlign : "right",
                                marginBottom : "20px"
                            }}>
                            { summary.page.length !== 0 && `The top page "${summary.page[1]}" from the "${summary.entrance[1]}" entrance received ${summary.page[2]} visits (${summary.aveVisit}%) of traffic flow`}
                            { summary.page.length === 0 && `The page "${summary.entrance[1]}" received ${summary.entrance[2]} visits (${summary.aveVisit}%) of traffic flow`}
                        </Box>
                        <Chart 
                            chartType="Sankey"  
                            width="100%"
                            height={800}
                            data={graphData === null ? [["From", "To", "Visit"], ["From", "To", 0],] : graphData}
                            options={options} />
                        
                    </>
                )}
            </Box>
        </>
    )

}