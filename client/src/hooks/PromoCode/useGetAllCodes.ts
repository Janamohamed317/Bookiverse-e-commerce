import { useQuery } from '@tanstack/react-query'
import { getAllCodes } from '../../services/PromoCodeServices'
import type { PromoCode } from '../../types/PromoCode'

const useGetAllCodes = () => {
    return useQuery<PromoCode[]>({
        queryKey: ["codes"],
        queryFn: getAllCodes,
        refetchOnWindowFocus: false,
    })
}

export default useGetAllCodes