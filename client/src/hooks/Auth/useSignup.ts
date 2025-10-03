import { useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { sendOTP, signup } from '../../services/AuthServices';

const useSignup = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: signup,
        onSuccess: (data : any) => {
            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data._id);
            Swal.fire({
                icon: "success",
                title: "Signup Successful",
                text: "Welcome to Bookiverse!",
                confirmButtonText: "OK",
            });
            sendOTP(data.email)
            navigate("/otp-verify", {state: {email: data.email}});
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