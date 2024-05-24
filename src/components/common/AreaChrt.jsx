import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area } from 'recharts';

const AreaChrt = ({ data, color }) => {
  const gradientId = `colorGradient${color.replace('#', '')}`; // Generate a unique ID based on the color

  return (
    <AreaChart
      width={600}
      height={300}
      data={data}
      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={color} stopOpacity={0.8} />
          <stop offset="95%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Area
        type="monotone"
        dataKey="amount"
        stroke={color}
        fillOpacity={1}
        fill={`url(#${gradientId})`}
      />
    </AreaChart>
  );
};

export default AreaChrt;
