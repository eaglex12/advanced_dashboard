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

const data = [
	{ name: "Jan", sales: 4000, profit: 2400, customers: 2400 },
	{ name: "Feb", sales: 3000, profit: 1398, customers: 2210 },
	{ name: "Mar", sales: 2000, profit: 9800, customers: 2290 },
	{ name: "Apr", sales: 2780, profit: 3908, customers: 2000 },
	{ name: "May", sales: 1890, profit: 4800, customers: 2181 },
	{ name: "Jun", sales: 2390, profit: 3800, customers: 2500 },
];

const pieData = [
	{ name: "Product A", value: 400 },
	{ name: "Product B", value: 300 },
	{ name: "Product C", value: 300 },
	{ name: "Product D", value: 200 },
];

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

export function SalesBarChart({ xAxisLabel, yAxisLabel }) {
	return (
		<ResponsiveContainer width="100%" height={300}>
			<BarChart
				data={data}
				margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis
					dataKey="name"
					label={{ value: xAxisLabel, position: "insideBottom", offset: -5 }}
				/>
				<YAxis
					label={{ value: yAxisLabel, angle: -90, position: "insideLeft" }}
				/>
				<Tooltip content={<CustomTooltip />} />
				<Legend />
				<Bar dataKey="sales" fill={COLORS[0]} />
				<Bar dataKey="profit" fill={COLORS[1]} />
			</BarChart>
		</ResponsiveContainer>
	);
}

export function CustomerLineChart({ xAxisLabel, yAxisLabel }) {
	return (
		<ResponsiveContainer width="100%" height={300}>
			<LineChart
				data={data}
				margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis
					dataKey="name"
					label={{ value: xAxisLabel, position: "insideBottom", offset: -5 }}
				/>
				<YAxis
					label={{ value: yAxisLabel, angle: -90, position: "insideLeft" }}
				/>
				<Tooltip content={<CustomTooltip />} />
				<Legend />
				<Line
					type="monotone"
					dataKey="customers"
					stroke={COLORS[2]}
					activeDot={{ r: 8 }}
				/>
			</LineChart>
		</ResponsiveContainer>
	);
}

export function ProductPieChart() {
	return (
		<ResponsiveContainer width="100%" height={300}>
			<PieChart>
				<Pie
					data={pieData}
					cx="50%"
					cy="50%"
					outerRadius={80}
					fill="#8884d8"
					dataKey="value"
					label={({ name, percent }) =>
						`${name} ${(percent * 100).toFixed(0)}%`
					}
				>
					{pieData.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
