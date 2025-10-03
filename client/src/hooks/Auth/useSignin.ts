import { useMutation } from "@tanstack/react-query";
import { handleNavigate } from "../../utils/HandleNavigation";
import { useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import { sendOTP, signin } from "../../services/AuthServices";

const useSignin = (email: string) => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: signin,
        onSuccess: (data: any) => {
            const token = data.token;
            localStorage.setItem("token", token);
            localStorage.setItem("userId", data._id);

            const path = handleNavigate(token);
            navigate(path);
        },
        onError: (error: unknown) => {
            if (axios.isAxiosError<Error>(error)) {
                if (error.response?.status == 400) {
                    navigate("/otp-verify", { state: { email: email } });
                    sendOTP(email)
                }
                Swal.fire({
                    icon: "error",
                    title: "Error Logging in",
                    text: error.response?.data.message || "Something went wrong",
                    confirmButtonText: "OK",
                });
            }
        },
    });
}

export default useSignin