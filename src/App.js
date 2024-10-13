import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovableDashboard from "./components/MovableDashboard";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<MovableDashboard />} />
			</Routes>
		</Router>
	);
}

export default App;
