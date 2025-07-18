
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login.tsx"
import Home from "./pages/Home.tsx"
import Register from "./pages/Register.tsx"
import NotFound from "./pages/NotFound.tsx"
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import TestingGround from "./pages/TestingGround.tsx";

function Logout() {
    localStorage.clear()
    return <Navigate to="/login" />
}

function RegisterAndLogout() {
    localStorage.clear()
    return <Register />
}

function App() {

  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                    }
                />

                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/register" element={<RegisterAndLogout />} />
                <Route path="/testing" element={<TestingGround />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
