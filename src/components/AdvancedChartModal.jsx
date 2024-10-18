import React, { useState } from "react";

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
	width: "80%",
	maxWidth: "500px",
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

const inputStyle = {
	width: "100%",
	padding: "8px",
	marginBottom: "10px",
	border: "1px solid #ccc",
	borderRadius: "4px",
};

const selectStyle = {
	...inputStyle,
	appearance: "none",
	backgroundImage:
		"url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')",
	backgroundRepeat: "no-repeat",
	backgroundPosition: "right .7em top 50%",
	backgroundSize: ".65em auto",
};

export default function AdvancedChartModal({ onAddChart }) {
	const [isOpen, setIsOpen] = useState(false);
	const [chartType, setChartType] = useState("bar");
	const [xAxis, setXAxis] = useState("");
	const [yAxis, setYAxis] = useState("");
	const [data, setData] = useState([{ x: "", y: "" }]);

	const handleOpen = () => setIsOpen(true);
	const handleClose = () => setIsOpen(false);

	const handleAddDataPoint = () => {
		setData([...data, { x: "", y: "" }]);
	};

	const handleDataChange = (index, field, value) => {
		const newData = [...data];
		newData[index][field] = value;
		setData(newData);
	};

	const handleSubmit = () => {
		const chartData = {
			type: chartType,
			xAxis,
			yAxis,
			data: data.filter((point) => point.x && point.y),
		};
		onAddChart(chartData);
		handleClose();
	};

	return (
		<>
			<button onClick={handleOpen} style={buttonStyle}>
				Add New Chart
			</button>
			{isOpen && (
				<>
					<div style={overlayStyle} onClick={handleClose}></div>
					<div style={modalStyle}>
						<h2 style={{ marginBottom: "20px" }}>Create New Chart</h2>
						<div>
							<label htmlFor="chartType">Chart Type:</label>
							<select
								id="chartType"
								value={chartType}
								onChange={(e) => setChartType(e.target.value)}
								style={selectStyle}
							>
								<option value="bar">Bar Chart</option>
								<option value="line">Line Chart</option>
								<option value="pie">Pie Chart</option>
							</select>
						</div>
						<div>
							<label htmlFor="xAxis">X-Axis Label:</label>
							<input
								id="xAxis"
								type="text"
								value={xAxis}
								onChange={(e) => setXAxis(e.target.value)}
								style={inputStyle}
							/>
						</div>
						<div>
							<label htmlFor="yAxis">Y-Axis Label:</label>
							<input
								id="yAxis"
								type="text"
								value={yAxis}
								onChange={(e) => setYAxis(e.target.value)}
								style={inputStyle}
							/>
						</div>
						<div>
							<h3>Data Points:</h3>
							{data.map((point, index) => (
								<div
									key={index}
									style={{ display: "flex", gap: "10px", marginBottom: "10px" }}
								>
									<input
										type="text"
										placeholder="X value"
										value={point.x}
										onChange={(e) =>
											handleDataChange(index, "x", e.target.value)
										}
										style={{ ...inputStyle, flex: 1, marginBottom: 0 }}
									/>
									<input
										type="text"
										placeholder="Y value"
										value={point.y}
										onChange={(e) =>
											handleDataChange(index, "y", e.target.value)
										}
										style={{ ...inputStyle, flex: 1, marginBottom: 0 }}
									/>
								</div>
							))}
							<button
								onClick={handleAddDataPoint}
								style={{ ...buttonStyle, marginRight: "10px" }}
							>
								Add Data Point
							</button>
						</div>
						<div style={{ marginTop: "20px" }}>
							<button onClick={handleSubmit} style={buttonStyle}>
								Create Chart
							</button>
							<button
								onClick={handleClose}
								style={{
									...buttonStyle,
									backgroundColor: "#6c757d",
									marginLeft: "10px",
								}}
							>
								Cancel
							</button>
						</div>
					</div>
				</>
			)}
		</>
	);
}
