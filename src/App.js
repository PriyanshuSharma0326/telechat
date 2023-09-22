import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./routes/home/home.route";

import LoginPage from "./pages/login-page/login-page";
import RegisterPage from "./pages/register-page/register-page";
import { UserContext } from "./context/user-context";

function App() {
    const { currentUser } = useContext(UserContext);

    const ProtectedRouteNoLogin = ({ children }) => {
        if (!currentUser) {
            return <Navigate to="/login" />;
        }

        return children;
    };

    const ProtectedRouteOnLogin = ({ children }) => {
        if (currentUser) {
            return <Navigate to="/" />;
        }

        return children;
    };

    return (
        <Routes>
            <Route path='/' 
                element={
                    <ProtectedRouteNoLogin>
                        <Home />
                    </ProtectedRouteNoLogin>
                }
            />

            <Route path='login' 
                element={
                    <ProtectedRouteOnLogin>
                        <LoginPage />
                    </ProtectedRouteOnLogin>
                } 
            />

            <Route path='register' 
                element={
                    <ProtectedRouteOnLogin>
                        <RegisterPage />
                    </ProtectedRouteOnLogin>
                } 
            />
        </Routes>
    );
}

export default App;
