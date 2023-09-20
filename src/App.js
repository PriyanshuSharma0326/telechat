import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./routes/home/home.route";

import LoginPage from "./pages/login-page/login-page";
import RegisterPage from "./pages/register-page/register-page";
import { UserContext } from "./context/user-context";

function App() {
    const { currentUser } = useContext(UserContext);

    const ProtectedRoute = ({ children }) => {
        if (!currentUser) {
          return <Navigate to="/login" />;
        }
    
        return children;
    };

    return (
        <Routes>
            <Route path='/'>
                <Route index element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                } 
            />
            </Route>

            <Route path='login' element={<LoginPage />} />

            <Route path='register' element={<RegisterPage />} />
        </Routes>
    );
}

export default App;
