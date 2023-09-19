import React from "react";
import { Route, Routes } from "react-router-dom";
import SharedLayout from "./pages/shared-layout/shared-layout";

import Root from './routes/root/root.route';

function App() {
    return (
        <Routes>
            <Route path='/' element={<SharedLayout />}>
                <Route index element={<Root />} />
            </Route>
        </Routes>
    );
}

export default App;
