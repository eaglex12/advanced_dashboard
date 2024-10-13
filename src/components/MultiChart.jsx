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

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export function SalesBarChart() {
	return (
		<ResponsiveContainer width="100%" height="100%">
			<BarChart data={data}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip />
				<Legend />
				<Bar dataKey="sales" fill="#8884d8" />
				<Bar dataKey="profit" fill="#82ca9d" />
			</BarChart>
		</ResponsiveContainer>
	);
}

export function CustomerLineChart() {
	return (
		<ResponsiveContainer width="100%" height="100%">
			<LineChart data={data}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip />
				<Legend />
				<Line
					type="monotone"
					dataKey="customers"
					stroke="#8884d8"
					activeDot={{ r: 8 }}
				/>
			</LineChart>
		</ResponsiveContainer>
	);
}

export function ProductPieChart() {
	return (
		<ResponsiveContainer width="100%" height="100%">
			<PieChart>
				<Pie
					data={pieData}
					cx="50%"
					cy="50%"
					outerRadius={60}
					fill="#8884d8"
					dataKey="value"
					label
				>
					{pieData.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
					))}
				</Pie>
				<Tooltip />
				<Legend />
			</PieChart>
		</ResponsiveContainer>
	);
}
