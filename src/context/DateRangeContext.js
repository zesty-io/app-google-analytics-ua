
import React, { useState, useContext } from 'react'
import moment from 'moment'

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
        selectedItem : "Last 7 Days",
        startDate : moment().subtract(7, "days").startOf("month").format("YYYY-MM-DD"),
        endDate : moment().format("YYYY-MM-DD"),
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