import { lazy, Suspense } from "react";
import Spinner from "../../components/Spinner/Spinner";

const UserInfo = lazy(() => import("../../components/UserInfo/UserInfo"));
const PastOrders = lazy(() => import("../../components/PastOrders/PastOrders"));
const Footer = lazy(() => import("../../components/Footer/Footer"));


const UserProfile = () => {

    return (
        <div id="profile" className="min-h-screen h-auto flex flex-col">
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