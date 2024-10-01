// src/components/Chart.jsx
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Custom Tooltip component
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-4">
        <h4 className="text-lg font-semibold text-teal-600">{payload[0].name}</h4>
        <p className="text-sm text-gray-700">{`Total: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const Chart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis dataKey="name" stroke="#555" />
        <YAxis stroke="#555" />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ paddingTop: 10 }} />
        <Bar dataKey="total" fill="#38b2ac" radius={[10, 10, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;
