import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import AppLayout from '@/Layouts/AppLayout';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Title from '@/Layouts/Title';

export default function Contact({ success }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post('/messages', formData, {
            onSuccess: () => {
                setFormData({ name: '', email: '', phone: '', message: '' });
                toast.success('Enquiry berhasil!', {
                    style: {
                        background: 'linear-gradient(45deg, #56ab2f, #a8e063)',
                        color: '#fff',
                        padding: '15px',
                        borderRadius: '10px',
                        boxShadow: '0 0 15px rgba(0, 0, 0, 0.3)',
                    },
                });
            },
            onError: () => {
                toast.error('Pesan Gagal terkirim!', {
                    style: {
                        background: 'linear-gradient(45deg, #ff416c, #ff4b2b)',
                        color: '#fff',
                        padding: '15px',
                        borderRadius: '10px',
                        boxShadow: '0 0 15px rgba(0, 0, 0, 0.3)',
                    },
                });
            },
        });
    };

    useEffect(() => {
        if (success) {
            toast.success('Pesan Berhasil terkirim!', {
                style: {
                    background: 'linear-gradient(45deg, #56ab2f, #a8e063)',
                    color: '#fff',
                    padding: '15px',
                    borderRadius: '10px',
                    boxShadow: '0 0 15px rgba(0, 0, 0, 0.3)',
                },
            });
        }
    }, [success]);

    return (
        <AppLayout>
            <Title/>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar
                newestOnTop
                closeOnClick
                transition={Slide}
                draggable
                pauseOnHover
                style={{ zIndex: 9999 }}
            />
            <section className="flex items-center justify-center bg-gray-100 py-12">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden lg:flex w-full max-w-6xl" style={{ height: 'calc(100vh - 5rem)' }}>
                    {/* Image Section */}
                    <div className="lg:w-1/2 relative">
                        <img src="/img/Contact.jpeg" alt="Contact Us" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black opacity-40"></div>
                        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6 z-10">
                            <h2 className="text-4xl font-bold">Get in Touch</h2>
                            <p className="mt-4 text-lg">
                                Kami selalu siap sedia untuk kenyamanan dan kepuasan dalam melayani anda dalam menjelajah internet. Silahkan hubungi kami jika ada kendala
                            </p>
                            <a href="tel:+62-271-340-6262" className="mt-4 text-2xl font-bold text-pink-400 hover:underline">
                                +62-271-340-6262
                            </a>
                            <address className="mt-2 text-gray-200 not-italic">
                                Ruko Puri Indrasta No.1, Jl. Mangesti Raya, Gentan, Solo
                            </address>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="lg:w-1/2 p-8 bg-white flex flex-col justify-center">
                        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Contact Us</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700" htmlFor="name">Name</label>
                                <input
                                    className="mt-1 w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring focus:ring-blue-200 transition duration-200"
                                    placeholder="Name"
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
                                    <input
                                        className="mt-1 w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring focus:ring-blue-200 transition duration-200"
                                        placeholder="Email address"
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700" htmlFor="phone">Phone</label>
                                    <input
                                        className="mt-1 w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring focus:ring-blue-200 transition duration-200"
                                        placeholder="Phone Number"
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700" htmlFor="message">Message</label>
                                <textarea
                                    className="mt-1 w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring focus:ring-blue-200 transition duration-200"
                                    placeholder="Message"
                                    rows="6"
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-5 py-3 font-medium text-white hover:bg-blue-700 transition duration-200"
                                >
                                    Kirim Pesan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
