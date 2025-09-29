import { useNavigate } from "react-router";
import useGetUserOrders from "../../hooks/orders/useGetUserOrders";
import useConfirmOrder from "../../hooks/orders/useConfirmOrder";
import useCancelOrder from "../../hooks/orders/useCancelOrder";
import Spinner from "../Spinner/Spinner";
import Swal from "sweetalert2";

const PastOrders = () => {
    const navigate = useNavigate();
    const { data, isLoading } = useGetUserOrders();
    const confirmOrder = useConfirmOrder();
    const cancelOrder = useCancelOrder();

    if (isLoading) {
        return <Spinner size={50} color="#E6D5C3" />;
    }
    if (data?.length === 0) {
        return <p className="text-center text-gray-400">No Orders Yet</p>;
    }

    const handleCancel = (orderId: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, cancel it!",
        }).then((result) => {
            if (result.isConfirmed) {
                cancelOrder.mutate(orderId, {
                    onSuccess: () => {
                        Swal.fire("Cancelled!", "Your order has been cancelled.", "success");
                    },
                    onError: () => {
                        Swal.fire("Error!", "Something went wrong, please try again.", "error");
                    },
                });
            }
        });
    };

    if(confirmOrder.isPending)
    {
        return <Spinner size={50} color="#D4A373" />;
    }

    return (
        <div className="text-[#E6D5C3] p-4 md:p-6">
            <h1 className="font-bold text-xl md:text-2xl mb-6 text-center md:text-left">
                Past Orders
            </h1>

            <div className="overflow-x-auto">
                <table className="table-auto w-full min-w-[600px] bg-[#2B2118]/60 backdrop-blur-md rounded-xl shadow-lg">
                    <thead className="bg-[#3D2C22]/70 text-[#F5EDE0] text-sm md:text-base">
                        <tr>
                            <th className="text-left px-3 md:px-5 py-2 md:py-3">Order Number</th>
                            <th className="text-left px-3 md:px-5 py-2 md:py-3">Date</th>
                            <th className="text-left px-3 md:px-5 py-2 md:py-3">Total</th>
                            <th className="text-left px-3 md:px-5 py-2 md:py-3">Status</th>
                            <th className="text-left px-3 md:px-5 py-2 md:py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((order) => (
                            <tr
                                key={order._id}
                                className="border-b border-[#6C584C]/30 hover:bg-[#3D2C22]/40 transition text-sm md:text-base"
                            >
                                <td className="px-3 md:px-5 py-2 md:py-3">{order.orderNumber}</td>
                                <td className="px-3 md:px-5 py-2 md:py-3">12-5-2025</td>
                                <td className="px-3 md:px-5 py-2 md:py-3">{order.subTotal} $</td>
                                <td className="px-3 md:px-5 py-2 md:py-3">{order.status}</td>
                                <td className="px-3 md:px-5 py-2 md:py-3 space-x-2">
                                    <button
                                        className="cursor-pointer px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl bg-[#3A5A78]
                                         hover:bg-[#4F7191] text-white font-medium transition text-sm md:text-base"
                                        onClick={() => navigate(`/user/orders/${order._id}`)}
                                    >
                                        View
                                    </button>

                                    <button
                                        disabled={order.status === "Confirmed"}
                                        className="cursor-pointer px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl bg-[#D4A373] 
                                        hover:bg-[#E5B185] text-[#2B2118] font-semibold  text-sm 
                                         disabled:opacity-60"
                                        onClick={() => confirmOrder.mutate(order._id)}
                                    >
                                        Confirm
                                    </button>
                                    <button disabled={order.status === "Confirmed"}
                                        className="cursor-pointer px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl bg-[#7B2D26]
                                     hover:bg-[#5C1F19] text-[#f5f5dc] font-semibold text-sm 
                                     disabled:opacity-60"
                                        onClick={() => handleCancel(order._id)} >
                                        Cancel
                                    </button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default PastOrders;
