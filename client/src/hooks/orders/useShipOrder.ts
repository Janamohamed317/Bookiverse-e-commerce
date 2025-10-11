import { useMutation, useQueryClient } from '@tanstack/react-query'
import { shipOrder } from '../../services/OrdersServices'
import Swal from 'sweetalert2';
import axios from 'axios';
import type { Error } from '../../types/Error';

const useShipOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: shipOrder,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
            queryClient.invalidateQueries({ queryKey: ["pastOrders"] });

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

export default useShipOrder