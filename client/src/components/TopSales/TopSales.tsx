import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import useGetTopSalesBook from "../../hooks/Statistics/useGetTopSalesBook";
import type { TopSales } from "../../types/Statistics";

const COLORS = ["#4F46E5", "#22C55E", "#F59E0B", "#EC4899", "#3B82F6"];

const TopSalesChart = () => {
    const { data } = useGetTopSalesBook();

    const chartData =
        data?.map((item: TopSales) => ({
            name: item.title,
            value: item.soldCount,
        })) || [];

    if (chartData.length === 0) {
        return <div className="text-center text-gray-500">Loading top sales...</div>;
    }

    return (
        <div className="w-full h-100 bg-white/9 backdrop-blur shadow-md rounded-2xl p-4 pb-15 mt-5">
            <h2 className="text-xl font-semibold mb-4 text-center">Top Selling Books</h2>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        label={({ name, value }) => `${name}: ${value}`}
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TopSalesChart;
