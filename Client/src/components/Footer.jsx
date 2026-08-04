import React from 'react';
import { Link } from "react-router-dom";
import { navLinks } from "../data/navLinks";

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="site-footer__inner page-home">
                <div className="site-footer__brand">
                    <a href="https://prebuiltui.com?utm_source=saasly">
                        <img className="h-9 md:h-9.5 w-auto shrink-0" src="/assets/logo.svg" alt="Logo" width={140} height={40} fetchPriority="high" />
                    </a>
                    <p className="mt-6">
                        Launch your SaaS product in record time with our all-in-one platform designed for speed, flexibility and growth. Whether you`&apos;re a solo founder or a fast-moving team, we provide everything you need.
                    </p>
                </div>
                <div className="site-footer__columns">
                    <div>
                        <h2 className="font-semibold mb-5 text-gray-800">Company</h2>
                        <ul className="space-y-2">
                            {navLinks.map((link, index) => (
                                <li key={index}>
                                    <Link to={link.href} className="hover:text-indigo-600">{link.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h2 className="font-semibold mb-5 text-gray-800">Get in touch</h2>
                        <div className="space-y-2">
                            <p>+1-212-456-7890</p>
                            <p>contact@example.com</p>
                        </div>
                    </div>
                </div>
            </div>
            <p className="site-footer__copyright page-home">
                Copyright 2024 © <a href="https://prebuiltui.com?utm_source=saasly">PrebuiltUI</a>. All Right Reserved.
            </p>
        </footer>
    );
};