import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';

const LineChrt = ({data,  color}) => {
  return (
        <LineChart
          width={600}
          height={300}
          data={data}
          margin={{
            top: 10,
            bottom: 8,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="amount" stroke={color} activeDot={{ r: 8 }} />
        </LineChart>
  )
}

export default LineChrt
