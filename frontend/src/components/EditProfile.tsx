import React, {useState, useEffect} from "react";
import api from "../api";

function EditProfile() {
    const [currUser, setCurrUser] = useState<string>("");
    const [oldPassword, setOldPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confNewPassword, setConfNewPassword] = useState<string>("");
    const [loading, setLoading] = useState(false);

    function getCurrentUser(){
        api.get("/api/user/current/")
            .then((response) => response.data)
            .then((data) => {
                setCurrUser(data.username)
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        getCurrentUser();
    }, []);

    const editPassword = (event: React.FormEvent) => {
        setLoading(true);
        event.preventDefault();
        if (newPassword !== confNewPassword) {
            alert("Please confirm your new password correctly!");
            setLoading(false);
        } else{
            api.patch("api/user/changepwd/", {old_password: oldPassword, new_password: newPassword})
                .then((response) => {
                    if (response.status == 200){
                        alert("Changed Password Successfully!");
                        setOldPassword("");
                        setNewPassword("");
                        setConfNewPassword("");
                    }else if (response.status == 204){
                        alert("Please Fill the details below!");
                    }
                }).catch((err) => console.log(err))
                .finally(() => setLoading(false));
        }

    };


    return (
        <>
            <div className="space-y-6">
                <div className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2 dark:text-white">
                            Username
                        </label>
                        <div className="relative">
                            <input
                                id="username"
                                type="text"
                                value={currUser}
                                placeholder="Can't Fetch your username"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-stone-500 transition-colors duration-200 placeholder-gray-400 dark:text-white"
                                disabled
                            />
                        </div>
                    </div>

                    <div>
                        <br />
                        <hr className="my-4 text-gray-900 dark:text-gray-100" />
                        <br />
                        <h4 className="block text-center font-bold text-gray-700 mb-2 dark:text-white">Change Your Password</h4>
                        <br />
                    </div>

                    <div>
                        <label htmlFor="old_password" className="block text-sm font-medium text-gray-700 mb-2 dark:text-white">
                            Old Password
                        </label>
                        <div className="relative">
                            <input
                                id="old_password"
                                type="password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                placeholder="Enter your old password"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-stone-500 transition-colors duration-200 placeholder-gray-400 dark:text-white"
                                required
                            />
                        </div>
                    </div>


                    <div>
                        <label htmlFor="new_password" className="block text-sm font-medium text-gray-700 mb-2 dark:text-white">
                            New Password:
                        </label>
                        <div className="relative">
                            <input
                                id="new_password"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter your new password"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-stone-500 transition-colors duration-200 placeholder-gray-400 dark:text-white"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700 mb-2 dark:text-white">
                            Username
                        </label>
                        <div className="relative">
                            <input
                                id="confirm_password"
                                type="password"
                                value={confNewPassword}
                                onChange={(e) => setConfNewPassword(e.target.value)}
                                placeholder="Confirm your new password"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-stone-500 transition-colors duration-200 placeholder-gray-400 dark:text-white"
                                required
                            />
                        </div>
                    </div>

                </div>

                <button
                    type="submit"
                    disabled={loading}
                    onClick={editPassword}
                    className="w-full flex justify-center py-3 px-4 border font-bold border-transparent rounded-lg shadow-sm text-sm text-white dark:text-gray-800 bg-stone-600 dark:bg-white dark:hover:bg-gray-100 hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500 dark:focus:ring-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer"
                >
                    {loading ? (
                        <div className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white dark:text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                            </svg>
                            Please Wait...
                        </div>
                    ) : (
                        "Change Password"
                    )}
                </button>


            </div>
        </>
    )
}

export default EditProfile;