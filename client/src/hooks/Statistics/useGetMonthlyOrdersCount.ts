import { getMonthlyOrdersCount } from '../../services/StatisticsServices'
import { useQuery } from '@tanstack/react-query'
import type { MonthlyOrdersCount } from '../../types/Statistics'

const useGetMonthlyOrdersCount = () => {
    return useQuery<MonthlyOrdersCount[]>({
        queryKey: ["MonthlyOrdersCount"],
        queryFn: getMonthlyOrdersCount
    })
}

export default useGetMonthlyOrdersCount