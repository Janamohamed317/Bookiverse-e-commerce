import { useState } from "react";
import useMakeOrder from "../../hooks/orders/useMakeOrder";
import Cart from "../Cart/Cart";
import type { CheckOut } from "../../types/Order";
import Spinner from "../../components/Spinner/Spinner";
import Swal from "sweetalert2";
import { useCartStore } from "../../store/cartStore";
import useCheckPromoCode from "../../hooks/PromoCode/useCheckPromoCode";

const Checkout = () => {
    const [shippingInfo, setShippingInfo] = useState<CheckOut>({
        address: "",
        phone: "",
        notes: "None",
    });

    const { mutation, promoCodeRes } = useCheckPromoCode()

    const [promoCode, setPromoCode] = useState("")

    const { cartItems, clearCart } = useCartStore();

    const makeOrder = useMakeOrder(cartItems, shippingInfo, clearCart, promoCode);

    const validatePhone = (phone: string) => {
        const regex = /^[0-9]{11}$/;
        return regex.test(phone);
    };

    const handlePlaceOrder = () => {
        if (!validatePhone(shippingInfo.phone)) {
            Swal.fire({
                icon: "error",
                title: "Invalid Phone Number",
                text: "Phone number must be exactly 11 digits.",
                confirmButtonColor: "#D4A373",
            });
            return;
        }

        makeOrder.mutate();
    };

    if (makeOrder.isPending) {
        return <Spinner size={50} color="#D4A373" />;
    }

    return (
        <div className="flex flex-col md:flex-row justify-between md:justify-center gap-6 p-5  text-[#F5EDE0]">
            <div className="md:w-2/3 h-[50vh]">
                <Cart checkout={"yes"} amount={promoCodeRes?.amount || 0} />
            </div>

            <div className="md:w-1/3 bg-[#2B2118]/30 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-[#6C584C]/50 flex flex-col gap-4">
                <h2 className="font-bold text-2xl text-[#E6D5C3] mb-4">Shipping Info</h2>

                <label htmlFor="address" className="text-[#F5EDE0]">Address</label>
                <input
                    type="text"
                    id="address"
                    placeholder="Enter Your Address"
                    value={shippingInfo.address}
                    onChange={(e) =>
                        setShippingInfo({ ...shippingInfo, address: e.target.value })
                    }
                    className="bg-[#F5EDE0] text-[#2B2118] p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                />

                <label htmlFor="phone" className="text-[#F5EDE0]">Phone</label>
                <input
                    type="text"
                    id="phone"
                    placeholder="Enter Your Phone Number"
                    value={shippingInfo.phone}
                    onChange={(e) =>
                        setShippingInfo({ ...shippingInfo, phone: e.target.value })
                    }
                    className="bg-[#F5EDE0] text-[#2B2118] p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                />

                <label htmlFor="notes" className="text-[#F5EDE0]">Additional Note</label>
                <input
                    type="text"
                    id="notes"
                    placeholder="Enter Your Notes"
                    value={shippingInfo.notes}
                    onChange={(e) =>
                        setShippingInfo({ ...shippingInfo, notes: e.target.value })
                    }
                    className="bg-[#F5EDE0] text-[#2B2118] p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                />
                <label htmlFor="promo" className="text-[#F5EDE0] font-semibold">
                    Promo Code
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-3 bg-[#3D2C22]/40 p-3 rounded-xl border border-[#6C584C]/50">
                    <input
                        type="text"
                        id="promo"
                        placeholder="Enter Promo Code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="flex-1 bg-[#F5EDE0] text-[#2B2118] p-3 rounded-xl focus:ring-2 focus:ring-[#D4A373]
                         placeholder:text-[#7B6D60]"
                    />
                    <button
                        onClick={() => mutation.mutate(promoCode)}
                        className="px-5 py-3 bg-[#D4A373] hover:bg-[#E5B185] text-[#2B2118] font-semibold rounded-xl cursor-pointer"
                    >
                        Apply
                    </button>
                </div>

                {promoCodeRes.message && (
                    <span
                        className="mt-2 text-sm"
                    >
                        {promoCodeRes.message}
                    </span>
                )}

                <button
                    disabled={makeOrder.isPending}
                    onClick={handlePlaceOrder}
                    className="mt-4 bg-[#D4A373] text-[#2B2118] font-semibold p-3 rounded-xl hover:bg-[#E5B185] cursor-pointer"
                >
                    Place Order
                </button>
            </div>
        </div>
    );
};

export default Checkout;
