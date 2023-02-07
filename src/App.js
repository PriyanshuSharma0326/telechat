import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import styled from 'styled-components';
import HomePage from './pages/HomePage';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import { auth } from './lib/config/firebase';

function App() {
    const user = useSelector(selectUser);

    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            if(userAuth) {
                dispatch(login({
                    uid: userAuth.uid,
                    email: userAuth.email,
                }));
            }
            else {
                dispatch(logout());
            }
        });

        return unsubscribe;
    }, [dispatch]);

    return (
        <div className='app'>
            <Router>
                {!user ? 
                (<Routes>
                    <Route path='/' element={<LoginPage />} />
                    
                    <Route path='/register' element={<RegisterPage />} />
                </Routes>) : 
                (<AppBody>
                    <Routes>
                        <Route path='/' element={<HomePage />} />
                    </Routes>
                </AppBody>)}
            </Router>
        </div>
    );
}

export default App;

const AppBody = styled.div`
    background-color: #128C7E;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;
