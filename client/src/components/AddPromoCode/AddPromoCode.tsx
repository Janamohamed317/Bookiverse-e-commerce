import { useState } from "react";
import type { NewPromoCode, PromoCode } from "../../types/PromoCode";
import useAddPromoCode from "../../hooks/PromoCode/useAddPromoCode";

const AddPromoCode = () => {
    const [promoCode, setPromoCode] = useState<NewPromoCode>({
        amount: 0,
        startDate: new Date(),
        endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        code: "",
    });

    const addPromoCode = useAddPromoCode();
    const formatDate = (date: Date) => date.toISOString().split("T")[0];

    return (
        <div className="flex justify-center items-center p-4 ">
            <div className="flex flex-wrap md:flex-row flex-col items-center gap-5 w-full  bg-[#2B2118]/50 backdrop-blur-md border
     border-white/10 p-4 rounded-lg shadow-md">
                <p className="w-full text-center font-bold text-[#f5f5dc] text-lg mb-2">
                    Add New Promo Code
                </p>

                <div className="flex flex-col text-[#f5f5dc] ">
                    <label htmlFor="start-date">Start Date:</label>
                    <input
                        type="date"
                        id="start-date"
                        className="bg-[#f5f5dc] text-[#3e2723] p-2 rounded"
                        value={formatDate(promoCode.startDate)}
                        onChange={(e) =>
                            setPromoCode({
                                ...promoCode,
                                startDate: new Date(e.target.value),
                            })
                        }
                    />
                </div>

                <div className="flex flex-col text-[#f5f5dc]">
                    <label htmlFor="end-date">End Date:</label>
                    <input
                        type="date"
                        id="end-date"
                        className="bg-[#f5f5dc] text-[#3e2723] p-2 rounded"
                        value={formatDate(promoCode.endDate)}
                        onChange={(e) =>
                            setPromoCode({
                                ...promoCode,
                                endDate: new Date(e.target.value),
                            })
                        }
                    />
                </div>

                <div className="flex flex-col text-[#f5f5dc]">
                    <label htmlFor="amount">Amount in %:</label>
                    <input
                        type="number"
                        id="amount"
                        className="bg-[#f5f5dc] text-[#3e2723] p-2 rounded"
                        placeholder="Enter discount"
                        value={promoCode.amount}
                        onChange={(e) =>
                            setPromoCode({
                                ...promoCode,
                                amount: Number(e.target.value),
                            })
                        }
                    />
                </div>

                <div className="flex flex-col text-[#f5f5dc]">
                    <label htmlFor="code">Code:</label>
                    <input
                        type="text"
                        id="code"
                        className="bg-[#f5f5dc] text-[#3e2723] p-2 rounded focus:ring-2 focus:ring-[#a47148] outline-none"
                        placeholder="Optional code"
                        value={promoCode.code}
                        onChange={(e) =>
                            setPromoCode({ ...promoCode, code: e.target.value })
                        }
                    />
                </div>

                <div className="flex flex-col self-end">
                    <button
                        onClick={() => addPromoCode.mutate(promoCode)}
                        className="bg-[#D4A373] hover:bg-[#E5B185] 
                        text-[#2B2118] p-2 rounded-lg font-semibold cursor-pointer transition"
                    >
                        Add Promo Code
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddPromoCode;
