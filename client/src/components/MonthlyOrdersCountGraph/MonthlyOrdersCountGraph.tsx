import useGetMonthlyOrdersCount from "../../hooks/Statistics/useGetMonthlyOrdersCount";
import { XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip, LineChart, Line } from 'recharts';
import Spinner from "../Spinner/Spinner";

const MonthlyOrdersCountGraph = () => {
    const { data, isLoading } = useGetMonthlyOrdersCount();

    if (isLoading) return <Spinner />;
    if (!data) return <p>No data available</p>;

    const chartData = data.map(item => ({
        name: `${item.month} ${item.year}`,
        totalOrders: item.totalOrders
    }));

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="2 2" />
                <XAxis
                    dataKey="name"
                    label={{ value: "Month", position: "insideBottomRight", offset: -5 }}
                />
                <YAxis
                    label={{ value: "Total Orders", angle: -90, position: "insideLeft", offset: 10 }}
                />
                <Tooltip />
                <Line
                    type="monotone"
                    dataKey="totalOrders"
                    stroke="#8884d8"
                    activeDot={{ r: 4 }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default MonthlyOrdersCountGraph;
