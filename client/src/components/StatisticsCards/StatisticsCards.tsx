import useGetOrdersCount from "../../hooks/Statistics/useGetOrdersCount";
import useGetTotalProfit from "../../hooks/Statistics/useGetTotalProfit";
import useGetUsersCount from "../../hooks/Statistics/useGetUsersCount";
import Spinner from "../Spinner/Spinner";

const StatisticsCards = () => {
    const { data: profit, isLoading: profitLoading } = useGetTotalProfit();
    const { data: orders, isLoading: ordersLoading } = useGetOrdersCount();
    const { data: users, isLoading: usersLoading } = useGetUsersCount();


    if (profitLoading || usersLoading || ordersLoading) {
        return <Spinner />;
    }

    if (!profit || !users || !orders) {
        return <p>Error fetching data</p>;
    }

    const stats = [
        { title: "Total Profit", value: `${profit} $`, color: "text-green-600" },
        { title: "# Orders", value: orders, color: "text-blue-600" },
        { title: "# Users", value: users, color: "text-purple-600" },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5">
            {stats.map((stat) => (
                <div
                    key={stat.title}
                    className=" bg-white/9 backdrop-blur rounded-2xl shadow p-5 flex flex-col items-center
                     justify-center hover:shadow-lg transition-shadow"
                >
                    <h3 className="text-lg font-semibold text-white">{stat.title}</h3>
                    <p className={`text-2xl font-bold mt-2 ${stat.color}`}>{String(stat.value)}</p>


                </div>
            ))}
        </div>
    );
};

export default StatisticsCards;
