import { useMutation, useQueryClient } from '@tanstack/react-query'
import { confirmOrder } from '../../services/OrdersServices'
import Swal from 'sweetalert2'
import axios from 'axios';
import type { Error } from '../../types/Error';

const useConfirmOrder = () => {
    const queryClient = useQueryClient();
    const userId = localStorage.getItem("userId")

    return useMutation({
        mutationFn: confirmOrder,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["PastOrders", userId] })
            queryClient.refetchQueries({ queryKey: ["PastOrders", userId] })
            Swal.fire({
                icon: "success",
                title: "Order Confirmed",
                text: "Thanks For Ordering From Our Store",
                confirmButtonText: "Ok"
            })
        },
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

export default useConfirmOrder