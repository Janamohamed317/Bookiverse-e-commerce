import { useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { sendOTP, signup } from '../../services/AuthServices';
import { sendWelcomeEmail } from '../../services/PromoCodeServices';

const useSignup = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: signup,
        onSuccess: async (data: any) => {
            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data._id);
            navigate("/otp-verify", { state: { email: data.email } });
            await sendOTP(data.email)
            await sendWelcomeEmail(data.email)
        },
        onError: (error: unknown) => {
            if (axios.isAxiosError<Error>(error)) {
                Swal.fire({
                    icon: "warning",
                    title: "Signup Failed",
                    text: error.response?.data.message || "Something went wrong",
                    confirmButtonText: "OK",
                });
            }
        },
    });
}

export default useSignup