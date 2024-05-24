import { useState } from "react";
import MainCard from "./MainCard";
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import LineChrt from "./LineChrt";
import BarChrt from "./BarChrt";
import AreaChrt from "./AreaChrt";

const ChartCard = ({data,label})=>{
  const [chartType, setChartType] = useState('bar');

  const handleChange = (event) => {
    setChartType(event.target.value);
  };  

  return (
    <MainCard>
        <div className='flex flex-row justify-between'>
          <h2 className='text-xl font-semibold mb-6'>{label}</h2>
          <FormControl sx={{  minWidth: 140, mb:1 }}> 
            <InputLabel id="demo-simple-select-label">Chart Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={chartType}
              onChange={handleChange}
              label={label}
            >
              <MenuItem value="line">Line Chart</MenuItem>
              <MenuItem value="bar">Bar Chart</MenuItem>
              <MenuItem value="area">Area Chart</MenuItem>
            </Select>
          </FormControl>
        </div>
        {chartType === 'line' && <LineChrt data={data} color={label==='Purchases'? '#EF4444': '#6366F1'}/>}
        {chartType === 'bar' && <BarChrt data={data} color={label==='Purchases'? '#EF4444': '#6366F1'}/>}
        {chartType === 'area' && <AreaChrt data={data} color={label==='Purchases'? '#EF4444': '#6366F1'}/>}
    </MainCard>
  );
}

export default ChartCard;
