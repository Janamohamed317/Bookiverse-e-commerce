import useDeleteCode from "../../hooks/PromoCode/useDeleteCode";
import useGetAllCodes from "../../hooks/PromoCode/useGetAllCodes";
import Spinner from "../Spinner/Spinner";

const GetPromoCodes = () => {
    const { data, isLoading } = useGetAllCodes();
    const deleteCode = useDeleteCode()

    if (isLoading) return <Spinner size={50} color="#D4A373" />;

    return (
        <div className="flex justify-center items-center p-4">
            <div className="w-full">
                <h2 className="text-center text-[#f5f5dc] text-xl font-bold mb-4">
                    All Promo Codes
                </h2>

                <div className="w-full bg-[#2B2118]/50 backdrop-blur-md text-[#F5EDE0] rounded-xl overflow-hidden">
                    <table className="min-w-full border-collapse text-[#f5f5dc]">
                        <thead className="bg-[#3D2C22]/70 text-[#E6D5C3]">
                            <tr>
                                <th className="px-4 py-2 text-left rounded-tl-lg">
                                    Code
                                </th>
                                <th className="px-4 py-2 text-left">
                                    Amount (%)
                                </th>
                                <th className=" px-4 py-2 text-left">
                                    Start Date
                                </th>
                                <th className=" px-4 py-2 text-left">
                                    End Date
                                </th>
                                <th className=" px-4 py-2 text-center rounded-tr-lg">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {data && data.length > 0 ? (
                                data.map((promo) => (
                                    <tr
                                        key={promo.code}
                                        className="border-b border-[#6C584C]/30 hover:bg-[#3D2C22]/40 transition"

                                    >
                                        <td className="border border-[#6C584C]/30 px-4 py-2">
                                            {promo.code}
                                        </td>
                                        <td className="border border-[#6C584C]/30 px-4 py-2">
                                            {promo.amount}%
                                        </td>
                                        <td className="border border-[#6C584C]/30 px-4 py-2">
                                            {new Date(promo.startDate).toLocaleDateString("en-CA")}
                                        </td>
                                        <td className="border border-[#6C584C]/30 px-4 py-2">
                                            {new Date(promo.endDate).toLocaleDateString("en-CA")}
                                        </td>
                                        <td className="border border-[#6C584C]/30 px-4 py-2 text-center">
                                            <button
                                                onClick={() => deleteCode.mutate(promo._id)}
                                                className="px-3 py-1 bg-[#7B2D26] hover:bg-[#5C1F19] text-[#f5f5dc] rounded-lg cursor-pointer"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="text-center py-4 text-[#f5f5dc]/80 italic"
                                    >
                                        No promo codes found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default GetPromoCodes;
