import { useMutation, useQueryClient } from "@tanstack/react-query"
import { cancelOrder } from "../../services/OrdersServices"
import axios from "axios";
import Swal from "sweetalert2";


const useCancelOrder = () => {
    const queryClient = useQueryClient();
    const userId = localStorage.getItem("userId")
    return useMutation({
        mutationFn: cancelOrder,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["PastOrders", userId] });
            queryClient.refetchQueries({ queryKey: ["PastOrders", userId] });
            Swal.fire("Cancelled!", "Your order has been cancelled.", "success");


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

export default useCancelOrder