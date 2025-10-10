import MonthlyOrdersCountGraph from '../../components/MonthlyOrdersCountGraph/MonthlyOrdersCountGraph'
import MonthlyOrdersGraph from '../../components/MonthlyOrdersGraph/MonthlyOrdersGraph'
import StatisticsCards from '../../components/StatisticsCards/StatisticsCards'
import TopSales from '../../components/TopSales/TopSales'

const Statistics = () => {
    return (
        <>
            <MonthlyOrdersGraph />
            <MonthlyOrdersCountGraph />
            <StatisticsCards />
            <TopSales />
        </>
    )
}

export default Statistics