import { DateRangeProvider } from "./DateRangeContext";
import { SnackBarProvider } from "./SnackBarContext";
import { GoogleProvider } from "./GoogleContext";

export default function ContextWrapper({ children }){

    return (
        <DateRangeProvider>
            <SnackBarProvider>
                <GoogleProvider>
                    {children}
                </GoogleProvider>
            </SnackBarProvider>
        </DateRangeProvider>
    )

}