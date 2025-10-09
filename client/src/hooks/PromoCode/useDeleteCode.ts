import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteCode } from '../../services/PromoCodeServices'

const useDeleteCode = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteCode,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["codes"] }),

    })
}


export default useDeleteCode