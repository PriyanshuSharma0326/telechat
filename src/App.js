import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import { AuthContext } from './context/AuthContext';

function App() {
    const { currentUser } = useContext(AuthContext);

    const ProtectedRoute = ({ children }) => {
        if (!currentUser) {
          return <Navigate to="/login" />;
        }
    
        return children;
    };

    return (
        <div className='app'>
            <Router>
                <Routes>
                    <Route path='/'>
                        <Route index element={
                            <ProtectedRoute>
                                <HomePage />
                            </ProtectedRoute>
                        } />

                        <Route path='login' element={<LoginPage />} />

                        <Route path='register' element={<RegisterPage />} />
                    </Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
