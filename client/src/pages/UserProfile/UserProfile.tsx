import { lazy, Suspense } from "react";
import Spinner from "../../components/Spinner/Spinner";

const UserInfo = lazy(() => import("../../components/UserInfo/UserInfo"));
const PastOrders = lazy(() => import("../../components/PastOrders/PastOrders"));
const Footer = lazy(() => import("../../components/Footer/Footer"));
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";

const UserProfile = () => {
    const navigate = useNavigate()

    return (
        <div id="profile" className="min-h-screen h-auto flex flex-col">
            <FontAwesomeIcon icon={faArrowLeft} onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-[#E6D5C3] hover:text-[#D4A373] ml-4 mt-4 " />
            <Suspense fallback={<Spinner />}>
                <UserInfo />
            </Suspense>
            <hr className="m-5 border-t border-white" />
            <Suspense fallback={<Spinner />}>
                <PastOrders />
            </Suspense>
            <div className="mt-auto w-full">
                <Footer />
            </div>
        </div>
    )
}

export default UserProfile