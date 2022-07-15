import { AppLoader } from "@zesty-io/react-app-loader";
import ContextWrapper from "./context";
import AppWrapper from "./components/ui/AppWrapper/AppWrapper";


function App() {

	return (
		<AppLoader
			token={process.env.REACT_APP_TOKEN}
			instance={{
					ZUID: `${process.env.REACT_APP_ZUID}`, 
					ID : process.env.REACT_APP_INSTANCE_ID
				}}>
			<AppWrapper />
		</AppLoader>
	);
}

export default App;

