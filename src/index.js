import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style/index.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import { StyleContextProvider } from './context/style-context';
import { UserContextProvider } from './context/user-context';
import { ChatContextProvider } from './context/chat-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <StyleContextProvider>
                <UserContextProvider>
                    <ChatContextProvider>
                        <App />
                    </ChatContextProvider>
                </UserContextProvider>
            </StyleContextProvider>
        </Router>
    </React.StrictMode>
);
