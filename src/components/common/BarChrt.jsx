import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Legend, Bar} from 'recharts';

const BarChrt = ({data,  color}) => {
  return (
    <BarChart width={600} height={300} data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="amount" fill={color} />
  </BarChart>
  )
}

export default BarChrt