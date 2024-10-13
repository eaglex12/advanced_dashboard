import React, { useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import {
	SalesBarChart,
	CustomerLineChart,
	ProductPieChart,
} from "./MultiChart";

const ResponsiveGridLayout = WidthProvider(Responsive);

const cardStyle = {
	backgroundColor: "#ffffff",
	border: "1px solid #e0e0e0",
	borderRadius: "8px",
	boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
	padding: "16px",
	display: "flex",
	flexDirection: "column",
	height: "100%",
};

const cardHeaderStyle = {
	marginBottom: "12px",
};

const cardTitleStyle = {
	fontSize: "18px",
	fontWeight: "bold",
	margin: "0",
};

const cardContentStyle = {
	flex: 1,
};

const buttonStyle = {
	backgroundColor: "#007bff",
	color: "#ffffff",
	border: "none",
	borderRadius: "4px",
	padding: "8px 12px",
	cursor: "pointer",
	fontSize: "14px",
	marginTop: "8px",
};

const navbarStyle = {
	backgroundColor: "#f8f9fa",
	padding: "10px 20px",
	marginBottom: "20px",
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
};

const modalStyle = {
	position: "fixed",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	backgroundColor: "#ffffff",
	padding: "20px",
	borderRadius: "8px",
	boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
	zIndex: 1000,
};

const overlayStyle = {
	position: "fixed",
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	backgroundColor: "rgba(0, 0, 0, 0.5)",
	zIndex: 999,
};

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
	const [charts, setCharts] = useState([
		{ id: "f", type: "bar", data: "sales", title: "Sales and Profit" },
		{ id: "g", type: "line", data: "customers", title: "Customer Trends" },
		{ id: "h", type: "pie", data: "products", title: "Product Distribution" },
	]);

	const onLayoutChange = (layout, layouts) => {
		setLayouts(layouts);
	};

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	const addNewChart = () => {
		const newChartId = String.fromCharCode(97 + charts.length); // Generate new ID (i, j, k, ...)
		const newChart = {
			id: newChartId,
			type: newChartType,
			data: newChartData,
			title: `${newChartData.charAt(0).toUpperCase() + newChartData.slice(1)} ${
				newChartType.charAt(0).toUpperCase() + newChartType.slice(1)
			} Chart`,
		};

		setCharts([...charts, newChart]);
		setLayouts((prevLayouts) => ({
			...prevLayouts,
			lg: [
				...prevLayouts.lg,
				{ i: newChartId, x: 0, y: Infinity, w: 6, h: 3 }, // Add new layout item
			],
		}));
		closeModal();
	};

	const renderChart = (chart) => {
		switch (chart.type) {
			case "bar":
				return <SalesBarChart />;
			case "line":
				return <CustomerLineChart />;
			case "pie":
				return <ProductPieChart />;
			default:
				return null;
		}
	};

	return (
		<div>
			<div style={navbarStyle}>
				<h1 style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}>
					Movable Dashboard
				</h1>
				<button onClick={openModal} style={buttonStyle}>
					Add New Chart
				</button>
			</div>

			<ResponsiveGridLayout
				className="layout"
				layouts={layouts}
				onLayoutChange={onLayoutChange}
				breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
				cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
				rowHeight={100}
			>
				<div key="a" style={cardStyle}>
					<div style={cardHeaderStyle}>
						<h2 style={cardTitleStyle}>Sales Overview</h2>
					</div>
					<div style={cardContentStyle}>
						<p>Total Sales: $10,000</p>
						<button style={buttonStyle}>View Details</button>
					</div>
				</div>
				<div key="b" style={cardStyle}>
					<div style={cardHeaderStyle}>
						<h2 style={cardTitleStyle}>User Activity</h2>
					</div>
					<div style={cardContentStyle}>
						<p>Active Users: 1,234</p>
						<button style={buttonStyle}>View Report</button>
					</div>
				</div>
				<div key="c" style={cardStyle}>
					<div style={cardHeaderStyle}>
						<h2 style={cardTitleStyle}>Recent Orders</h2>
					</div>
					<div style={cardContentStyle}>
						<ul>
							<li>Order #1234</li>
							<li>Order #5678</li>
						</ul>
					</div>
				</div>
				<div key="d" style={cardStyle}>
					<div style={cardHeaderStyle}>
						<h2 style={cardTitleStyle}>Top Products</h2>
					</div>
					<div style={cardContentStyle}>
						<ol>
							<li>Product A</li>
							<li>Product B</li>
							<li>Product C</li>
						</ol>
					</div>
				</div>
				<div key="e" style={cardStyle}>
					<div style={cardHeaderStyle}>
						<h2 style={cardTitleStyle}>Quick Actions</h2>
					</div>
					<div style={cardContentStyle}>
						<button style={buttonStyle}>Add Product</button>
						<button
							style={{
								...buttonStyle,
								backgroundColor: "#6c757d",
								marginLeft: "8px",
							}}
						>
							Generate Report
						</button>
					</div>
				</div>
				{charts.map((chart) => (
					<div key={chart.id} style={cardStyle}>
						<div style={cardHeaderStyle}>
							<h2 style={cardTitleStyle}>{chart.title}</h2>
						</div>
						<div style={{ ...cardContentStyle, height: "250px" }}>
							{renderChart(chart)}
						</div>
					</div>
				))}
			</ResponsiveGridLayout>

			{isModalOpen && (
				<>
					<div style={overlayStyle} onClick={closeModal}></div>
					<div style={modalStyle}>
						<h2 style={{ ...cardTitleStyle, marginBottom: "16px" }}>
							Add New Chart
						</h2>
						<div style={{ marginBottom: "16px" }}>
							<label
								htmlFor="chartType"
								style={{ display: "block", marginBottom: "8px" }}
							>
								Chart Type:
							</label>
							<select
								id="chartType"
								value={newChartType}
								onChange={(e) => setNewChartType(e.target.value)}
								style={{ width: "100%", padding: "8px" }}
							>
								<option value="bar">Bar Chart</option>
								<option value="line">Line Chart</option>
								<option value="pie">Pie Chart</option>
							</select>
						</div>
						<div style={{ marginBottom: "16px" }}>
							<label
								htmlFor="chartData"
								style={{ display: "block", marginBottom: "8px" }}
							>
								Data Source:
							</label>
							<select
								id="chartData"
								value={newChartData}
								onChange={(e) => setNewChartData(e.target.value)}
								style={{ width: "100%", padding: "8px" }}
							>
								<option value="sales">Sales Data</option>
								<option value="customers">Customer Data</option>
								<option value="products">Product Data</option>
							</select>
						</div>
						<div>
							<button onClick={addNewChart} style={buttonStyle}>
								Add Chart
							</button>
							<button
								onClick={closeModal}
								style={{
									...buttonStyle,
									backgroundColor: "#6c757d",
									marginLeft: "8px",
								}}
							>
								Cancel
							</button>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
