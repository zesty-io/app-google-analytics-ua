
import React, { useState, useContext } from 'react'


const DateRangeContext = React.createContext()
const DateRangeUpdateContext = React.createContext()

export function useDateRange(){
    return useContext(DateRangeContext)
}

export function useDateRangeUpdate(){
    return useContext(DateRangeUpdateContext)
}

export function DateRangeProvider({ children }){

    const [dateRange, setDateRange] = useState({
        selectedItem : "Last 30 Days",
        startDate : "30daysAgo",
        endDate : "today"
    })

    const updateDateRange = (date) => setDateRange(date)

    return (
        <>
            <DateRangeContext.Provider value={dateRange}>
                <DateRangeUpdateContext.Provider value={updateDateRange}>
                    { children }
                </DateRangeUpdateContext.Provider>
            </DateRangeContext.Provider>
        </>
    )

}