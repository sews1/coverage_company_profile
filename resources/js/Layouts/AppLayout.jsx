import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { FaHome, FaServicestack, FaPhoneAlt, FaSignInAlt, FaCommentAlt, FaMapMarkerAlt, FaTwitter, FaFacebookF, FaLinkedinIn, FaInstagram, FaYoutube, FaWhatsapp } from 'react-icons/fa';

export default function AppLayout({ children }) {
    const { url } = usePage();
    const [isOpen, setIsOpen] = useState(false);

    const isActive = (route) => url === route;

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Top Contact Section */}
            <div className="bg-white text-black px-5 hidden lg:block shadow-md">
            <div className="container mx-auto flex justify-between items-center py-2">
                    <div className="flex items-center space-x-6">
                        <small className="flex items-center text-sm hover:text-indigo-600 transition-colors duration-300">
                            <FaPhoneAlt className="mr-2 text-indigo-600" />
                            <a href="tel:+622713406262" className="no-underline">+62-271-340-6262</a>
                        </small>
                        <small className="flex items-center text-sm hover:text-indigo-600 transition-colors duration-300">
                            <FaCommentAlt className="mr-2 text-indigo-600" />
                            <a href="mailto:info@maxnetplus.id" className="no-underline">info@maxnetplus.id</a>
                        </small>
                    </div>
                    <div className="flex space-x-4">
                        {[FaTwitter, FaFacebookF, FaLinkedinIn, FaInstagram, FaYoutube].map((Icon, index) => (
                            <a key={index} className="text-gray-600 hover:text-indigo-600 transition-colors duration-300" href="#" target="_blank" rel="noreferrer">
                                <Icon className="w-6 h-6 transition-transform transform hover:scale-110" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
          {/* Navbar */}
            <nav className="bg-white shadow-lg sticky top-0 z-50">
                <div className="container mx-auto px-6 py-2 flex justify-between items-center"> {/* Changed py-4 to py-2 */}
                    {/* Logo */}
                    <div>
                        <img 
                            src="/img/maxnet.png" 
                            alt="Maxnet Logo" 
                            className="h-13 max-w-xs mx-auto md:mx-0 shadow-md"
                            style={{ filter: 'brightness(1.1) contrast(1.2)' }}
                        />
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-purple-600 focus:outline-none"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
                            </svg>
                        </button>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {['/', '/locations', '/contact'].map((route, index) => (
                            <Link 
                                key={index}
                                href={route}
                                className={`shrink-0 rounded-lg p-2 text-lg font-medium transition-colors duration-300 ${isActive(route) ? 'bg-purple-600 bg-opacity-20 text-purple-600' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'}`}
                                aria-current={isActive(route) ? 'page' : undefined}
                                style={{ textDecoration: 'none' }} // Remove underline
                            >
                                {route === '/' && <FaHome className="inline mr-2 text-xl" />}
                                {route === '/locations' && <FaServicestack className="inline mr-2 text-xl" />}
                                {route === '/contact' && <FaPhoneAlt className="inline mr-2 text-xl" />}
                                {route === '/' ? 'Home' : route === '/locations' ? 'Layanan' : 'Hubungi Kami'}
                            </Link>
                        ))}
                        <Link 
                            href="/login" 
                            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded transition-colors duration-300 hover:bg-purple-700 shadow-lg hover:shadow-xl text-lg flex items-center"
                            style={{ textDecoration: 'none' }} // Remove underline
                        >
                            <FaSignInAlt className="inline mr-2 text-xl" /> Login
                        </Link>
                    </div>

                    {/* Dropdown Menu Mobile */}
                    <div className={`md:hidden w-full absolute left-0 top-16 bg-white shadow-md z-50 ${isOpen ? 'block' : 'hidden'}`}>
                        {['/', '/locations', '/contact', '/login'].map((route, index) => (
                            <Link 
                                key={index}
                                href={route}
                                className={`block px-4 py-3 text-lg text-gray-800 border-b border-gray-200 transition-colors duration-300 hover:bg-purple-100 ${isActive(route) ? 'bg-purple-100' : ''}`}
                                style={{ textDecoration: 'none' }} // Remove underline
                            >
                                {route === '/' && <FaHome className="inline mr-2 text-xl" />}
                                {route === '/locations' && <FaServicestack className="inline mr-2 text-xl" />}
                                {route === '/contact' && <FaPhoneAlt className="inline mr-2 text-xl" />}
                                {route === '/login' && <FaSignInAlt className="inline mr-2 text-xl" />}
                                {route === '/' ? 'Home' : route === '/locations' ? 'Layanan' : route === '/contact' ? 'Kontak' : 'Login'}
                            </Link>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-grow">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-white lg:grid lg:grid-cols-5">
                <div className="relative block h-96 lg:col-span-2 lg:h-full">
                    <iframe
                        title="Kabel Telekom - PT. Lingkar Kabel Telekomunikasi"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.2803077526454!2d110.765559!3d-7.5801076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a15ecaee94319%3A0x59e2a27e5aebb1bf!2sKabel%20Telekom%20-%20PT.%20LINGKAR%20KABEL%20TELEKOMUNIKASI!5e0!3m2!1sen!2sid!4v1696338538232!5m2!1sen!2sid"
                        className="absolute inset-0 h-full w-full border-0"
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>
                </div>

                <div className="px-4 py-16 sm:px-6 lg:col-span-3 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                        <div>
                            <p>
                                <span className="text-xs uppercase tracking-wide text-gray-500"> Call us </span>
                                <a href="tel:+622713406262" className="block text-2xl font-medium text-gray-900 hover:opacity-75 sm:text-3xl" style={{ textDecoration: 'none' }}>
                                    +62-271-340-6262
                                </a>
                            </p>

                            <ul className="mt-8 space-y-1 text-sm text-gray-700">
                                <li>Monday to Friday: 08.00 - 17.00 WIB</li>
                                <li>Saturday: 08.00 - 14.00 WIB</li>
                            </ul>

                            <ul className="mt-8 flex gap-6">
                                <li>
                                    <a href="#" rel="noreferrer" target="_blank" style={{ textDecoration: 'none', color: 'gray' }}>
                                        <span className="sr-only">Facebook</span>
                                        <FaFacebookF className="w-5 h-5" />
                                    </a>
                                </li>
                                <li>
                                    <a href="#" rel="noreferrer" target="_blank" style={{ textDecoration: 'none', color: 'gray' }}>
                                        <span className="sr-only">Instagram</span>
                                        <FaInstagram className="w-5 h-5" />
                                    </a>
                                </li>
                                <li>
                                    <a href="#" rel="noreferrer" target="_blank" style={{ textDecoration: 'none', color: 'gray' }}>
                                        <span className="sr-only">Whatsapp</span>
                                        <FaWhatsapp className="w-5 h-5" />
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="lg:col-span-1">
                            <img src="/img/maxnet.png" alt="Maxnet Logo" className="h-28 shadow-md" />
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
