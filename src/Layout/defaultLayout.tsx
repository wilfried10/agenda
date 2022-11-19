import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';
import ErrorBoundary from '../components/ErrorBoundary';
import Home from '../pages/home';
import NotFound from '../pages/NotFound';
import NavBar from './Navbar';


function DefaultLayout() {

    return (
        <>
            <div className="flex bg-gray-100 min-h-[100vh]  w-screen">
                <NavBar />
                <ErrorBoundary>
                    <div className="p-10 pl-[21%] w-full">
                        <Routes>
                            <Route path='/' element={<Home />}>
                            </Route>
                            <Route path='/*' element={<NotFound />}>
                            </Route>
                        </Routes>
                    </div>
                </ErrorBoundary>
            </div>

        </>
    )
}

export default DefaultLayout