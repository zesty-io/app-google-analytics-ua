import React, { useEffect, useState } from 'react'
import { useDateRange } from '../../context/DateRangeContext'
import { useGoogle } from '../../context/GoogleContext'
import { shelldata } from '../analytics/graph'
import { Box } from '@mui/material'
import { PageContentTable } from './PageContentTable'
import { PageContentGraph } from './PageContentGraph'

export default function PageContent({ instance }){

    const dateRange = useDateRange()
    const {googleDetails, setGoogleDetails} = useGoogle()
    const [selectedPagePath, setSelectedPagePath] = useState([])

    const onCheckChange = (event, name) => {

        if(event.target.checked) return setSelectedPagePath([...selectedPagePath, name ])
        setSelectedPagePath(selectedPagePath.filter(site => site !== name))
        
     }

    return (
        <>
            <Box sx={{ 
                display : "flex",
                gap : 4,
                flexDirection : "column"
            }}>
                <PageContentGraph zuid={instance.ZUID} dateRange={dateRange} googleDetails={googleDetails} selectedPath={selectedPagePath} />
                <PageContentTable zuid={instance.ZUID} selectedPagePath={selectedPagePath} dateRange={dateRange} googleDetails={googleDetails} onCheckChange={onCheckChange} />
            </Box>
        </>
    )
}