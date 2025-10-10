import { useQuery } from '@tanstack/react-query'
import { getUsersCount } from '../../services/StatisticsServices'

const useGetUsersCount = () => {
    return useQuery<Number>({
        queryKey: ["UsersCount"],
        queryFn: getUsersCount,
        staleTime: 0,
    })
}

export default useGetUsersCount