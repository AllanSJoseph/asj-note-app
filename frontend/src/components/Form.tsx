import React, {useState} from 'react'
import api from '../api'
import {Link, useNavigate} from 'react-router-dom'
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../constants.ts";
import type {AxiosResponse} from "axios";

interface FormProps {
    route: string;
    method: string;
}


function Form({route, method} : FormProps) {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const form_title: string = method === "login" ? "Login" : "Register"

    const handleSubmit = async (e: React.FormEvent) => {
        setLoading(true);
        e.preventDefault();

        try{
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const res: AxiosResponse<AuthResponse> = await api.post(route, {username, password});
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/");
            } else {
                navigate("/login");
            }
        }catch(e){
            alert(e)
        }finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10">


                        {/* Header */}
                        <div className="text-center mb-8">

                            <div className="mx-auto h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                                <svg className="h-6 w-6 text-grey-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{form_title}</h1>

                            {method === "login" ?
                                <p className="text-gray-600">Welcome back! Please log in to your account.</p>
                                :
                                <p className="text-gray-600">Welcome back! Please register your account.</p>
                            }

                        </div>

                        {/* Form */}
                        <div className="space-y-6">
                            <div className="space-y-4">
                                {/* Username Input */}
                                <div>
                                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                                        Username
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="username"
                                            type="text"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            placeholder="Enter your username"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-stone-500 transition-colors duration-200 placeholder-gray-400"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Password Input */}
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="password"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Enter your password"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-stone-500 transition-colors duration-200 placeholder-gray-400"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>


                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                onClick={handleSubmit}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-stone-600 hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer"
                            >
                                {loading ? (
                                    <div className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Please Wait...
                                    </div>
                                ) : (
                                    form_title
                                )}
                            </button>
                        </div>

                        {/* Footer */}
                        <div className="mt-8 text-center">
                            {method === "login" ?
                                <p className="text-sm text-gray-600">
                                    Don't have an account?{' '}
                                    <Link to="/register" className="font-bold text-gray-700 hover:underline">Register here</Link>
                                </p> 
                                :
                                <p className="text-sm text-gray-600">
                                    Already have an account?{' '}
                                    <Link to="/login" className="font-bold text-gray-700 hover:underline">Log In here</Link>
                                </p>
                            }
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    );
}

export default Form;