import { useQuery } from '@tanstack/react-query'
import { getTotalProfit } from '../../services/StatisticsServices'

const useGetTotalProfit = () => {
    return useQuery<Number>({
        queryKey: ["TotalProfit"],
        queryFn: getTotalProfit
    })
}

export default useGetTotalProfit