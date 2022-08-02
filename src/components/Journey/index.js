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
import JourneyGraph from "./JourneyGraph";


export default function Journey({instance, token}){
    const notify = useNotify();
    const { googleDetails } = useGoogle()
    const dateRange = useDateRange() 
    const { getPageJourney } = useAnalyticsApi(instance.ZUID)
    const [isLoading, setIsLoading] = useState(false)
    const [ slice, setSlice ] = useState(10)
    const [ url, setUrl ] = useState(null)
    const [ entranceUrl, setEntranceUrl ] = useState([])
    const [rawData, setRawData] = useState(null)

    useEffect(async () => {
        if(googleDetails){
            try{
                setIsLoading(true)
                const responseJourney = await getPageJourney(googleDetails.defaultProfileId, dateRange)
                const entrances = getEntranceUrl(responseJourney.googleData)
                setRawData(responseJourney)
                setEntranceUrl(entrances)
                setIsLoading(false)
            }catch (error) {
                setIsLoading(false)
                notify.current.error(error.message);
        
              }
            
        }
    }, [googleDetails, dateRange])  

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

    const RightComponent = () => (
        <Box sx={{ display : "flex", gap : 4, alignItems : "center" }}>
            <EntranceSelector data={entranceUrl} value={url} onChange={handleUrlChange}/>
            <Slicer value={slice} onChange={optimizeSliceChange} />
        </Box>
    )


    return (
        <>
            <GraphContainer title="User Journey - Beta" subTitle={dateRange.selectedItem} loading={isLoading} rightMenu={<RightComponent />}>
                <JourneyGraph data={rawData} filter={url} slice={slice} />
            </GraphContainer>
        </>
    )

}