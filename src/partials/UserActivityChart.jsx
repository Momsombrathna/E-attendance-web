import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const UserActivityChart = ({ userActive, userNonactive }) => {
  const data = [
    { name: "Verified", value: userActive },
    { name: "Not-verified", value: userNonactive },
  ];

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx={200}
        cy={200}
        labelLine={false}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
      >
        {data.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={index === 0 ? "#6EC531" : "#00C49F"}
          />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
};

export default UserActivityChart;
