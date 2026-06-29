import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import toast from "react-hot-toast";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const VerifyEmail = () => {

    const { token } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [verified, setVerified] = useState(false);

    useEffect(() => {

        verifyEmail();

    }, []);

    const verifyEmail = async () => {

        try {

            const response =
                await api.get(
                    `/api/auth/verify-email/${token}`
                );

            toast.success(response.data.message);

            setVerified(true);

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Verification failed."

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-[#faf6f0]">

            <div className="bg-white shadow-xl rounded-3xl p-10 max-w-lg w-full text-center">

                {

                    loading ?

                        <>

                            <div className="animate-spin h-12 w-12 border-4 border-pink-500 border-t-transparent rounded-full mx-auto mb-6"></div>

                            <h2 className="text-2xl font-bold">

                                Verifying Email...

                            </h2>

                        </>

                        :

                        verified ?

                            <>

                                <FaCheckCircle

                                    className="mx-auto text-green-500 text-6xl mb-5"

                                />

                                <h2 className="text-3xl font-bold">

                                    Email Verified 🎉

                                </h2>

                                <p className="text-gray-500 mt-4">

                                    Your account has been verified successfully.

                                </p>

                                <button

                                    onClick={() => navigate("/login")}

                                    className="btn btn-primary mt-8"

                                >

                                    Login Now

                                </button>

                            </>

                            :

                            <>

                                <FaTimesCircle

                                    className="mx-auto text-red-500 text-6xl mb-5"

                                />

                                <h2 className="text-3xl font-bold">

                                    Verification Failed

                                </h2>

                                <p className="text-gray-500 mt-4">

                                    Your verification link is invalid or has expired.

                                </p>

                            </>

                }

            </div>

        </div>

    );

};

export default VerifyEmail;