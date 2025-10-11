import { useState, lazy, Suspense } from "react";
import SideBar from "../../components/SideBar/SideBar";
import { handleLogout } from "../../utils/HandleLogout";
import { useNavigate } from "react-router";

const Authors = lazy(() => import("../Authors/Authors"));
const Users = lazy(() => import("../Users/Users"));
const AdminBooks = lazy(() => import("../AdminBooks/AdminBooks"));
const Orders = lazy(() => import("../Orders/Orders"));
const PromoCode = lazy(() => import("../PromoCode/PromoCode"));
const Statistics = lazy(() => import("../Statistics/Statistics"));

const Admin = () => {
    const [activeTab, setActiveTab] = useState<string>("Books");
    const navigate = useNavigate();

    const renderContent = () => {
        switch (activeTab) {
            case "Authors":
                return <Authors />;
            case "Books":
                return <AdminBooks />;
            case "Users":
                return <Users />;
            case "Orders":
                return <Orders />;
            case "Promo Codes":
                return <PromoCode />;
            case "Statistics":
                return <Statistics />;
            default:
                return <Statistics />;
        }
    };

    return (
        <div className="flex h-screen overflow-auto w-full">
            <SideBar setActiveTab={setActiveTab} />

            <div className="flex flex-col flex-1 p-8 text-[#E6D5C3]">
                <button
                    onClick={() => {
                        handleLogout();
                        navigate('/signin');
                    }}
                    className="bg-[#D4A373] hover:bg-[#E5B185] text-[#2B2118] font-semibold self-end p-2
                     rounded-xl cursor-pointer">
                    Logout
                </button>
                <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

                <div className="rounded-xl bg-[#2B2118]/15 backdrop-blur-md shadow-lg p-6 flex-1 overflow-auto 
                border border-[#6C584C]/90">
                    <Suspense fallback={<div className="text-center">Loading...</div>}>
                        {renderContent()}
                    </Suspense>
                </div>
            </div>
        </div>
    );
};

export default Admin;
