import React, {useContext, useState, useRef } from "react";
import CustomSnackbar from "../components/ui/SnackBar/SnackBar";

const SnackBarContext = React.createContext()

export function useNotify(){
    return useContext(SnackBarContext)
}

export function SnackBarProvider({children}){

    const snackBarRef = useRef(null)

    return (
        <>
            <SnackBarContext.Provider value={snackBarRef}>
                <CustomSnackbar ref={snackBarRef} />
                {children}
            </SnackBarContext.Provider>
        </>
    )

}