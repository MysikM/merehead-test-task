import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Users from "../pages/Users/Users";
import UserConfig from "../pages/UserConfig/UserConfig";
import NotFound from "../pages/NotFound/NotFound";
import Header from "../components/Header/Header";

const Navigation = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Navigate to='/users' />} />
                <Route path="/users" element={<Users />} />
                <Route path="/merehead-test-task" element={<Navigate to='/users' />} />
                <Route path='/user-config' element={<UserConfig />} />
                <Route path='/user-config/:id' element={<UserConfig />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Navigation;