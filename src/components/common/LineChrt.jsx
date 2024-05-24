import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import MainCard from './MainCard';

const LineChrt = ({data, dataKey, label, color}) => {
  return (
    <MainCard>
        <h2 className='text-xl font-semibold mb-6'>{label}</h2>
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
          <Line type="monotone" dataKey={dataKey} stroke={color} activeDot={{ r: 8 }} />
        </LineChart>
        </MainCard>
  )
}

export default LineChrt
