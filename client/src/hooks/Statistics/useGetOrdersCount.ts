import { useQuery } from '@tanstack/react-query'
import { getOrdersCount } from '../../services/StatisticsServices'

const useGetOrdersCount = () => {
    return useQuery<Number>({
        queryKey: ["OrdersCount"],
        queryFn: getOrdersCount
    })
}

export default useGetOrdersCount