import React from "react";
import {
	BarChart,
	Bar,
	LineChart,
	Line,
	PieChart,
	Pie,
	Cell,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

const CustomTooltip = ({ active, payload, label }) => {
	if (active && payload && payload.length) {
		return (
			<div className="bg-white p-4 rounded shadow-lg border border-gray-200">
				<p className="text-gray-700">{`${label}`}</p>
				{payload.map((entry, index) => (
					<p key={`item-${index}`} style={{ color: entry.color }}>
						{`${entry.name}: ${entry.value}`}
					</p>
				))}
			</div>
		);
	}
	return null;
};

export function SalesBarChart({ xAxisLabel, yAxisLabel, data }) {
	return (
		<ResponsiveContainer width="100%" height={300}>
			<BarChart
				data={data}
				margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis
					dataKey="x"
					label={{ value: xAxisLabel, position: "insideBottom", offset: -5 }}
				/>
				<YAxis
					label={{ value: yAxisLabel, angle: -90, position: "insideLeft" }}
				/>
				<Tooltip content={<CustomTooltip />} />
				<Legend />
				<Bar dataKey="y" fill={COLORS[1]} />
			</BarChart>
		</ResponsiveContainer>
	);
}

export function CustomerLineChart({ xAxisLabel, yAxisLabel, data }) {
	return (
		<ResponsiveContainer width="100%" height={300}>
			<LineChart
				data={data}
				margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis
					dataKey="x"
					label={{ value: xAxisLabel, position: "insideBottom", offset: -5 }}
				/>
				<YAxis
					label={{ value: yAxisLabel, angle: -90, position: "insideLeft" }}
				/>
				<Tooltip content={<CustomTooltip />} />
				<Legend />
				<Line
					type="monotone"
					dataKey="y"
					stroke={COLORS[2]}
					activeDot={{ r: 8 }}
				/>
			</LineChart>
		</ResponsiveContainer>
	);
}

// New MultiLineChart component
export function MultiLineChart({ xAxisLabel, yAxisLabel, data }) {
	return (
		<ResponsiveContainer width="100%" height={300}>
			<LineChart
				data={data}
				margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis
					dataKey="x" // Assuming you have 'x' as the key for x-axis
					label={{ value: xAxisLabel, position: "insideBottom", offset: -5 }}
				/>
				<YAxis
					label={{ value: yAxisLabel, angle: -90, position: "insideLeft" }}
				/>
				<Tooltip content={<CustomTooltip />} />
				<Legend />
				{data.map((entry, index) => (
					<Line
						key={`line-${index}`}
						type="monotone"
						dataKey={`y${index}`} // Adjust if your y-values are stored differently
						stroke={COLORS[index % COLORS.length]}
						activeDot={{ r: 8 }}
					/>
				))}
			</LineChart>
		</ResponsiveContainer>
	);
}

export function ProductPieChart({ data }) {
	console.log("🚀 ~ ProductPieChart ~ data:", data);

	const formattedData = data.map((entry) => ({
		x: entry.x,
		y: Number(entry.y),
	}));
	return (
		<ResponsiveContainer width="100%" height={300}>
			<PieChart>
				<Pie
					data={formattedData}
					cx="50%"
					cy="50%"
					outerRadius={80}
					fill="#8884d8"
					dataKey="y"
					label={({ x, percent }) => `${x} ${(percent * 100).toFixed(0)}%`}
				>
					{formattedData &&
						formattedData.map((entry, index) => (
							<Cell
								key={`cell-${index}`}
								fill={COLORS[index % COLORS.length]}
							/>
						))}
				</Pie>
				<Tooltip content={<CustomTooltip />} />
				<Legend />
			</PieChart>
		</ResponsiveContainer>
	);
}

export function ChartWrapper({ children, title }) {
	return (
		<div className="bg-white rounded-lg shadow p-4">
			<h3 className="text-lg font-semibold mb-4 text-gray-800">{title}</h3>
			{children}
		</div>
	);
}
