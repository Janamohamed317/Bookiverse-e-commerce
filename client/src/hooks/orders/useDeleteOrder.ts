import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteOrder } from "../../services/OrdersServices"
import axios from "axios";
import Swal from "sweetalert2";
import type { Error } from "../../types/Error";


const useDeleteOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteOrder,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
            queryClient.refetchQueries({ queryKey: ["orders"] });
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

export default useDeleteOrder