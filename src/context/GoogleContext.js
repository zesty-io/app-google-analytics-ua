import React, { useContext, useState } from 'react'

const GoogleContext = React.createContext()

export function useGoogle(){
    return useContext(GoogleContext)
}

export function GoogleProvider({children}){
    
    const [googleDetails, setGoogleDetails] = useState(null)

    return (
        <GoogleContext.Provider value={{ googleDetails, setGoogleDetails }}>
            {children}
        </GoogleContext.Provider>
    )

}