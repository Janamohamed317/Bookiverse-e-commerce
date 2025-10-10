import { getMonthlyProfit } from '../../services/StatisticsServices'
import { useQuery } from '@tanstack/react-query'
import type { MonthlyProfit } from '../../types/Statistics'

const useGetMonthlyProfit = () => {
    return useQuery<MonthlyProfit[]>({
        queryKey: ["MonthlyProfit"],
        queryFn: getMonthlyProfit
    })
}

export default useGetMonthlyProfit