import { AppLoader } from "@zesty-io/react-app-loader";
import ContextWrapper from "./context";
import AppWrapper from "./components/ui/AppWrapper/AppWrapper";


function App() {

	return (
		<AppLoader>
			<AppWrapper />
		</AppLoader>
	);
}

export default App;

