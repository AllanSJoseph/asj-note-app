import {Navigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import api from "../api"
import {REFRESH_TOKEN, ACCESS_TOKEN} from "../constants.ts";
import {useState, useEffect, type JSX} from "react";

function ProtectedRoute( {children} : {children: React.ReactNode}): JSX.Element {
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false));
    }, []);

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            const res = await api.post("/api/token/refresh/", {
                refresh: refreshToken
            });
            if (res.status === 200){
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
            }
        }catch (e) {
            console.error(e);
            setIsAuthorized(false);
        }
    }

    const auth = async () =>{
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthorized(false);
            return;
        }
        try{
            const decoded: { exp: number } = jwtDecode(token);
            const tokenExpiration = decoded.exp;
            const now = Date.now() / 1000;

            if (tokenExpiration < now) {
                await refreshToken();
            } else {
                setIsAuthorized(true);
            }
        } catch(err) {
            console.error("Token decode failed:",err);
            setIsAuthorized(false);
        }
    };

    if (isAuthorized === null) {
        return <div>Loading...</div>
    }

    return isAuthorized ?  (
        <>{children}</>
    ) : (
        <Navigate to="/login"></Navigate>
    );
}

export default ProtectedRoute;