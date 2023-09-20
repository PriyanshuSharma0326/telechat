import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style/index.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import { StyleContextProvider } from './context/style-context';
import { UserContextProvider } from './context/user-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <StyleContextProvider>
                <UserContextProvider>
                    <App />
                </UserContextProvider>
            </StyleContextProvider>
        </Router>
    </React.StrictMode>
);
