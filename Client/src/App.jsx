import React from 'react';
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn"; 
import SignUp from "./pages/SignUp"; 
import Marketplace from "./pages/Marketplace"; 
import Checkout from "./pages/Checkout"; // Integrated Checkout page import
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
    return (
        <AuthProvider>
            <div className="app-shell">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/marketplace" element={<Marketplace />} />
                    {/* Secure checkout page routing track */}
                    <Route path="/checkout" element={<Checkout />} />
                </Routes>
                <Footer />
            </div>
        </AuthProvider>
    );
}