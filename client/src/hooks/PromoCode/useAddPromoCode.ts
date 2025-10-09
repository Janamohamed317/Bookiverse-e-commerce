import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addPromoCode } from '../../services/PromoCodeServices'
import axios from 'axios';
import Swal from 'sweetalert2';
import type { Error } from '../../types/Error';

const useAddPromoCode = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addPromoCode,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["codes"] }),
        onError: (error) => {
            if (axios.isAxiosError<Error>(error)) {
                Swal.fire({
                    icon: "error",
                    title: "There is an error",
                    text: error.response?.data.message,
                    confirmButtonText: "OK",
                });
            }
        },
    })
}

export default useAddPromoCode