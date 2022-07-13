import { AppLoader } from "@zesty-io/react-app-loader";
import Analytics from "./components";
import PageContent from "./components/PageContent";
import ContextWrapper from "./context";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from "./components/ui/NavBar/NavBar";
import { Typography, Button, Box } from "@mui/material";

const AppWrapper = (props) => {
	return (
		<>
			<Box p={4}>
				<NavBar zuid={props.instance.ZUID}/>
				<Router>
					<Routes>
						<Route path="/" element={<Analytics {...props} />} />
						<Route path="/content" element={<PageContent {...props} />} />
					</Routes>
				</Router>
				
			</Box>
		</>
	)
}

function App() {

	return (
		<ContextWrapper>
			<AppLoader
				token={process.env.REACT_APP_TOKEN}
				instance={{ZUID: `${process.env.REACT_APP_ZUID}`, ID : 8355121}}>
				<AppWrapper />
			</AppLoader>
		</ContextWrapper>
	);
}

export default App;

