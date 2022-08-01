import { Box, Typography } from "@mui/material"
import { useGoogle } from "../../context/GoogleContext";
import { useDateRange } from "../../context/DateRangeContext";
import { useEffect, useState, useCallback } from "react";
import { useAnalyticsApi } from "../../services/useAnalyticsApi";
import GraphContainer from "../ui/GraphContainer";
import { Chart } from "react-google-charts";
import Slicer from "./Slicer";
import EntranceSelector from "./EntranceSelector";
import { useNotify } from "../../context/SnackBarContext";


export default function Journey({instance, token}){
    const notify = useNotify();
    const { googleDetails } = useGoogle()
    const dateRange = useDateRange() 
    const [data, setData] = useState(null)
    const { getPageJourney } = useAnalyticsApi(instance.ZUID)
    const [isLoading, setIsLoading] = useState(false)
    const [ slice, setSlice ] = useState(10)
    const [ url, setUrl ] = useState(null)
    const [ entranceUrl, setEntranceUrl ] = useState([])
    const [summary, setSummary] = useState(null)

    useEffect(async () => {
        if(googleDetails){
            try{
                setIsLoading(true)
                const responseJourney = await getPageJourney(googleDetails.defaultProfileId, dateRange)
                const journey = formatJourney(responseJourney.googleData)
                const entrances = getEntranceUrl(responseJourney.googleData)
                setData(journey)
                setEntranceUrl(entrances)
                setIsLoading(false)
            }catch (error) {
                setIsLoading(false)
                notify.current.error(error.message);
        
              }
            
        }
    }, [dateRange, googleDetails, slice, url])  

    const debounce = (func) => {
        let timer;
        return function (...args){
            const context = this;
            if(timer) clearTimeout(timer)
            timer = setTimeout(() => {
                timer = null
                func.apply(context, args)
            }, 500)
        }
    }

    const handleSliceChange = (event) =>{
        setSlice(event.target.value)
    }
    const handleUrlChange = (value) =>{
        if(value === null) return setUrl(null)
        setUrl(value)
    }

    const optimizeSliceChange =  useCallback(debounce(handleSliceChange), [])

    const getEntranceUrl = (data) => {
        let raw = data.reports[0].data.rows
        if(!raw) return []
        var filterData = raw.filter(item => item.dimensions[0] === "(entrance)")
        var url = filterData.map(item => {
            return {
                label :  item.dimensions[1]
            }
        })

        return url


    }

    const formatJourney = (data) => {

        
        let raw = data.reports[0].data.rows
        let totals = data.reports[0].data.totals[0].values[1]
        let levels = {}
        let i = 1
        if(!raw){
            setSummary(null)
            return [["From", "To", "Visit"], ["No Data 1", "No Data 2", 0]]
        } 
        do{
            if(i === 1){
                var filterData = raw.filter(item => item.dimensions[0] === "(entrance)")
                raw = removeArray(raw, filterData)
                levels[`Level${i}`] = url !== null ? filterData.filter(item => item.dimensions[1] === url.label).slice(0, slice) : filterData.slice(0, slice)
            }else{
                let bufferData = []
                levels[`Level${i - 1}`].forEach((data, i) => {
                    let levelData = raw.filter(item => data.dimensions[1] === item.dimensions[0])
                    if(levelData.length !== 0) bufferData.push(...levelData)
                })
                raw = removeArray(raw, bufferData)
                levels[`Level${i}`] = bufferData.sort(compare).slice(0, slice)
            }
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
        
        if(maxEntrance.length !== 0 && maxPage.length !== 0){
            setSummary({
                entrance : maxEntrance,
                page : maxPage,
                aveVisit : ave(totals, maxPage.length !== 0 ? maxPage[2] : maxEntrance[2])
            })
    
        }

        return sankeyData
    }

    const ave = (a, b) => {
        console.log(a, b)
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

    const RightComponent = () => (
        <Box sx={{ display : "flex", gap : 4, alignItems : "center" }}>
            <EntranceSelector data={entranceUrl} value={url} onChange={handleUrlChange}/>
            <Slicer value={slice} onChange={optimizeSliceChange} />
        </Box>
    )

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
            <GraphContainer title="User Journey - Beta" subTitle={dateRange.selectedItem} loading={isLoading} rightMenu={<RightComponent />}>
                {summary !== null && (
                    <Box
                        sx={{
                            textAlign : "right",
                            marginBottom : "20px"
                        }}>
                        {`The top page "${summary.page[1]}" from the "${summary.entrance[1]}" entrance received ${summary.page[2]} visits (${summary.aveVisit}%) of traffic flow`}
                    </Box>
                )}
                <Chart 
                 chartType="Sankey"
                 width="100%"
                 height={800}
                 data={data === null ? [["From", "To", "Visit"], ["From", "To", 0],] : data}
                 options={options} />
            </GraphContainer>
        </>
    )

}