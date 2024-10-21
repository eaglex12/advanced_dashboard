import React, { useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import {
	SalesBarChart,
	CustomerLineChart,
	ProductPieChart,
} from "./MultiChart";
import { PlusCircle, X } from "lucide-react";

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function MovableDashboard() {
	const [layouts, setLayouts] = useState({
		lg: [
			{ i: "a", x: 0, y: 0, w: 6, h: 2 },
			{ i: "b", x: 6, y: 0, w: 6, h: 2 },
			{ i: "c", x: 0, y: 2, w: 4, h: 2 },
			{ i: "d", x: 4, y: 2, w: 4, h: 2 },
			{ i: "e", x: 8, y: 2, w: 4, h: 2 },
			{ i: "f", x: 0, y: 4, w: 6, h: 3 },
			{ i: "g", x: 6, y: 4, w: 6, h: 3 },
			{ i: "h", x: 0, y: 7, w: 6, h: 3 },
		],
	});

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [newChartType, setNewChartType] = useState("bar");
	const [newChartData, setNewChartData] = useState("sales");
	const [axisPairs, setAxisPairs] = useState([{ x: "", y: "" }]);
	const [charts, setCharts] = useState([
		{
			id: "f",
			type: "bar",
			data: [],
			title: "Sales and Profit",
			axes: { x: "X Axis", y: "Y Axis" },
		},
		{
			id: "g",
			type: "line",
			data: [],
			title: "Customer Trends",
			axes: { x: "X Axis", y: "Y Axis" },
		},
		{
			id: "h",
			type: "pie",
			data: [],
			title: "Product Distribution",
			axes: { x: "X Axis", y: "Y Axis" },
		},
	]);

	const onLayoutChange = (layout, layouts) => {
		setLayouts(layouts);
	};

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => {
		setIsModalOpen(false);
		setAxisPairs([{ x: "", y: "" }]);
	};

	const addAxisPair = () => {
		setAxisPairs([...axisPairs, { x: "", y: "" }]);
	};

	const handleAxisChange = (index, axis, value) => {
		const newAxisPairs = [...axisPairs];
		newAxisPairs[index][axis] = value;
		setAxisPairs(newAxisPairs);
	};

	const addNewChart = () => {
		if (
			!newChartType ||
			!newChartData ||
			axisPairs.some((pair) => !pair.x || !pair.y)
		) {
			alert(
				"Please provide all fields: chart type, data source, and axis names."
			);
			return;
		}

		const newChartId = String.fromCharCode(97 + charts.length);
		const newChart = {
			id: newChartId,
			type: newChartType,
			data: axisPairs, // Store axis pairs as data
			title: `${newChartData.charAt(0).toUpperCase() + newChartData.slice(1)} ${
				newChartType.charAt(0).toUpperCase() + newChartType.slice(1)
			} Chart`,
			axes: axisPairs, // Keep the axis pairs
		};

		setLayouts((prevLayouts) => ({
			...prevLayouts,
			lg: [...prevLayouts.lg, { i: newChartId, x: 0, y: Infinity, w: 6, h: 3 }],
		}));

		setCharts((prevCharts) => [...prevCharts, newChart]); // Add new chart to charts state

		closeModal();
	};

	const renderChart = (chart) => {
		console.log("🚀 ~ renderChart ~ chart:", chart);

		// Check if data is empty
		if (!chart.data || chart.data.length === 0) {
			return; // Placeholder message
		}

		const axes = chart.axes && chart.axes.length > 0 ? chart.axes[0] : {};

		switch (chart.type) {
			case "bar":
				return (
					<SalesBarChart
						xAxisLabel={axes.x || "X Axis"}
						yAxisLabel={axes.y || "Y Axis"}
						data={chart.data}
					/>
				);
			case "line":
				return (
					<CustomerLineChart
						xAxisLabel={axes.x || "X Axis"}
						yAxisLabel={axes.y || "Y Axis"}
						data={chart.data}
					/>
				);
			case "pie":
				return <ProductPieChart data={chart.data} />;
			default:
				return null;
		}
	};

	return (
		<div className="min-h-screen bg-gray-100">
			<nav className="bg-white shadow-md">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center py-6">
						<h1 className="text-2xl font-bold text-gray-900">
							Movable Dashboard
						</h1>
						<button
							onClick={openModal}
							className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							<PlusCircle className="mr-2 h-5 w-5" />
							Add New Chart
						</button>
					</div>
				</div>
			</nav>

			<main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
				<ResponsiveGridLayout
					className="layout"
					layouts={layouts}
					onLayoutChange={onLayoutChange}
					breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
					cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
					rowHeight={100}
				>
					{/* Predefined static dashboard items */}
					<div key="a" className="bg-white overflow-hidden shadow rounded-lg">
						<div className="px-4 py-5 sm:p-6">
							<h2 className="text-lg font-medium text-gray-900">
								Sales Overview
							</h2>
							<p className="mt-1 text-3xl font-semibold text-gray-900">
								$10,000
							</p>
							<p className="mt-2 text-sm text-gray-500">Total Sales</p>
						</div>
						<div className="bg-gray-50 px-4 py-4 sm:px-6">
							<button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
								View Details
							</button>
						</div>
					</div>
					<div key="b" className="bg-white overflow-hidden shadow rounded-lg">
						<div className="px-4 py-5 sm:p-6">
							<h2 className="text-lg font-medium text-gray-900">
								User Activity
							</h2>
							<p className="mt-1 text-3xl font-semibold text-gray-900">1,234</p>
							<p className="mt-2 text-sm text-gray-500">Active Users</p>
						</div>
						<div className="bg-gray-50 px-4 py-4 sm:px-6">
							<button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
								View Report
							</button>
						</div>
					</div>

					{/* Dynamically rendered charts */}
					{charts &&
						charts.map((chart) => (
							<div
								key={chart.id}
								className="bg-white overflow-hidden shadow rounded-lg"
							>
								<div className="px-4 py-5 sm:p-6">
									<h2 className="text-lg font-medium text-gray-900">
										{chart.title}
									</h2>
									<div className="mt-3">{renderChart(chart)}</div>
								</div>
							</div>
						))}
				</ResponsiveGridLayout>
			</main>

			{/* Modal for adding new chart */}
			{isModalOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
					<div className="bg-white rounded-lg p-4 w-full max-w-md">
						<h2 className="text-lg font-medium mb-4">Add New Chart</h2>
						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-700">
								Chart Type
							</label>
							<select
								value={newChartType}
								onChange={(e) => setNewChartType(e.target.value)}
								className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
							>
								<option value="bar">Bar</option>
								<option value="line">Line</option>
								<option value="pie">Pie</option>
							</select>
						</div>

						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-700">
								Data Source
							</label>
							<input
								type="text"
								value={newChartData}
								onChange={(e) => setNewChartData(e.target.value)}
								className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
								placeholder="Enter data source (e.g., sales)"
							/>
						</div>

						<div>
							{axisPairs.map((pair, index) => (
								<div key={index} className="flex space-x-2 mb-2">
									<input
										type="text"
										value={pair.x}
										onChange={(e) =>
											handleAxisChange(index, "x", e.target.value)
										}
										className="flex-1 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
										placeholder="X Axis Label"
									/>
									<input
										type="text"
										value={pair.y}
										onChange={(e) =>
											handleAxisChange(index, "y", e.target.value)
										}
										className="flex-1 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
										placeholder="Y Axis Label"
									/>
									<button
										type="button"
										onClick={() => {
											const newAxisPairs = [...axisPairs];
											newAxisPairs.splice(index, 1);
											setAxisPairs(newAxisPairs);
										}}
										className="text-red-500 hover:text-red-700"
									>
										<X className="h-5 w-5" />
									</button>
								</div>
							))}
						</div>
						<button
							type="button"
							onClick={addAxisPair}
							className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
						>
							Add Axis Pair
						</button>

						<div className="flex justify-end mt-4">
							<button
								onClick={addNewChart}
								className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							>
								Save Chart
							</button>
							<button
								onClick={closeModal}
								className="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
