import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import useGetMonthlyProfit from "../../hooks/Statistics/useGetMonthlyProfit";
import Spinner from '../Spinner/Spinner';

const MonthlyOrdersGraph = () => {
  const { data, isLoading } = useGetMonthlyProfit();

  if (isLoading) return <Spinner />;
  if (!data) return <p>No data available</p>
  
  const chartData = data.map(item => ({
    name: `${item.month} ${item.year}`,
    totalProfit: item.totalProfit
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="2 2" />
        <XAxis dataKey="name" label={{ value: "Month", position: "insideBottomRight", offset: -5 }} />
        <YAxis label={{ value: "Profit ($)", angle: -90, position: "insideLeft", offset: 1 }} />
        <Tooltip formatter={(value) => `$${value}`} />
        <Line type="monotone" dataKey="totalProfit" stroke="#8884d8" activeDot={{ r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MonthlyOrdersGraph;
