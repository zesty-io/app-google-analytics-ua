import { AppLoader } from "@zesty-io/react-app-loader";
import Analytics from "./components";
import { DateRangeProvider } from './context/DateRangeContext'

function App() {

	return (
		
		<DateRangeProvider>
			<AppLoader
				token={process.env.REACT_APP_TOKEN}
				instance={{ZUID: `${process.env.REACT_APP_ZUID}`, ID : 8355121}}>
					<Analytics />
			</AppLoader>
		</DateRangeProvider>
	);
}

export default App;

