import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = ["#FFBB28", "#FF8042"];

const UsersChart = ({ total_admin, total_users }) => {
  const data = [
    { name: "Admin", value: total_admin },
    { name: "Users", value: total_users },
  ];

  return (
    <>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) =>
            `${name}: ${(percent * 100).toFixed(0)}%`
          }
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </>
  );
};

export default UsersChart;
