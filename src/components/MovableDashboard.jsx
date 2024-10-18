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
			data: "sales",
			title: "Sales and Profit",
			axes: { x: "X Axis", y: "Y Axis" },
		},
		{
			id: "g",
			type: "line",
			data: "customers",
			title: "Customer Trends",
			axes: { x: "X Axis", y: "Y Axis" },
		},
		{
			id: "h",
			type: "pie",
			data: "products",
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
			data: newChartData,
			title: `${newChartData.charAt(0).toUpperCase() + newChartData.slice(1)} ${
				newChartType.charAt(0).toUpperCase() + newChartType.slice(1)
			} Chart`,
			axes: axisPairs,
		};

		setCharts([...charts, newChart]);
		setLayouts((prevLayouts) => ({
			...prevLayouts,
			lg: [...prevLayouts.lg, { i: newChartId, x: 0, y: Infinity, w: 6, h: 3 }],
		}));
		closeModal();
	};

	const renderChart = (chart) => {
		const axes = chart.axes && chart.axes.length > 0 ? chart.axes[0] : {};

		switch (chart.type) {
			case "bar":
				return (
					<SalesBarChart
						xAxisLabel={axes.x || "X Axis"}
						yAxisLabel={axes.y || "Y Axis"}
					/>
				);
			case "line":
				return (
					<CustomerLineChart
						xAxisLabel={axes.x || "X Axis"}
						yAxisLabel={axes.y || "Y Axis"}
					/>
				);
			case "pie":
				return <ProductPieChart />;
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
					<div key="c" className="bg-white overflow-hidden shadow rounded-lg">
						<div className="px-4 py-5 sm:p-6">
							<h2 className="text-lg font-medium text-gray-900">
								Recent Orders
							</h2>
							<ul className="mt-3 divide-y divide-gray-200">
								<li className="py-3">Order #1234</li>
								<li className="py-3">Order #5678</li>
							</ul>
						</div>
					</div>
					<div key="d" className="bg-white overflow-hidden shadow rounded-lg">
						<div className="px-4 py-5 sm:p-6">
							<h2 className="text-lg font-medium text-gray-900">
								Top Products
							</h2>
							<ul className="mt-3 divide-y divide-gray-200">
								<li className="py-3">Product A</li>
								<li className="py-3">Product B</li>
							</ul>
						</div>
					</div>
					<div key="e" className="bg-white overflow-hidden shadow rounded-lg">
						<div className="px-4 py-5 sm:p-6">
							<h2 className="text-lg font-medium text-gray-900">
								User Feedback
							</h2>
							<p className="mt-3 text-sm text-gray-500">
								Great product! Very useful.
							</p>
						</div>
					</div>
					{charts.map((chart) => (
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

			{isModalOpen && (
				<div
					className="fixed z-10 inset-0 overflow-y-auto"
					aria-labelledby="modal-title"
					role="dialog"
					aria-modal="true"
				>
					<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
						<div
							className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
							aria-hidden="true"
						></div>
						<span
							className="hidden sm:inline-block sm:align-middle sm:h-screen"
							aria-hidden="true"
						>
							&#8203;
						</span>
						<div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
							<div className="absolute top-0 right-0 pt-4 pr-4">
								<button
									type="button"
									className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
									onClick={closeModal}
								>
									<span className="sr-only">Close</span>
									<X className="h-6 w-6" aria-hidden="true" />
								</button>
							</div>
							<div className="sm:flex sm:items-start">
								<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
									<h3
										className="text-lg leading-6 font-medium text-gray-900"
										id="modal-title"
									>
										Add New Chart
									</h3>
									<div className="mt-2">
										<div className="mb-4">
											<label
												htmlFor="chart-type"
												className="block text-sm font-medium text-gray-700"
											>
												Chart Type
											</label>
											<select
												id="chart-type"
												name="chart-type"
												className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
												value={newChartType}
												onChange={(e) => setNewChartType(e.target.value)}
											>
												<option value="bar">Bar Chart</option>
												<option value="line">Line Chart</option>
												<option value="pie">Pie Chart</option>
											</select>
										</div>
										<div className="mb-4">
											<label
												htmlFor="data-source"
												className="block text-sm font-medium text-gray-700"
											>
												Data Source
											</label>
											<select
												id="data-source"
												name="data-source"
												className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
												value={newChartData}
												onChange={(e) => setNewChartData(e.target.value)}
											>
												<option value="sales">Sales Data</option>
												<option value="customers">Customer Data</option>
												<option value="products">Product Data</option>
											</select>
										</div>
										<div className="mb-4">
											<label className="block text-sm font-medium text-gray-700">
												Axis Labels
											</label>
											{axisPairs.map((pair, index) => (
												<div
													key={index}
													className="mt-1 flex rounded-md shadow-sm"
												>
													<input
														type="text"
														placeholder="X Axis Label"
														value={pair.x}
														onChange={(e) =>
															handleAxisChange(index, "x", e.target.value)
														}
														className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
													/>
													<input
														type="text"
														placeholder="Y Axis Label"
														value={pair.y}
														onChange={(e) =>
															handleAxisChange(index, "y", e.target.value)
														}
														className="-ml-px flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
													/>
												</div>
											))}
											<button
												type="button"
												onClick={addAxisPair}
												className="mt-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
											>
												Add Axis Pair
											</button>
										</div>
									</div>
								</div>
							</div>
							<div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
								<button
									type="button"
									className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
									onClick={addNewChart}
								>
									Add Chart
								</button>
								<button
									type="button"
									className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
									onClick={closeModal}
								>
									Cancel
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
