import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Inertia } from '@inertiajs/inertia';
import AppLayout from '@/Layouts/AppLayout';
import ReactPaginate from 'react-paginate';
import { FaDollarSign, FaBolt, FaInfoCircle } from 'react-icons/fa';
import Title from '@/Layouts/Title'; // Import the Title component

const Packages = () => {
    const [services, setServices] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState(null);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 6;

    // Default images
    const defaultImages = [
        '/img/gambar1.jpeg',
        '/img/gambar10.jpeg',
        '/img/gambar3.jpeg',
        '/img/gambar11.jpeg',
        '/img/gambar9.jpeg',
        '/img/gambar6.jpeg',
    ];

    // Fetch services data from API
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/services');
                setServices(response.data);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };
        fetchServices();
    }, []);

    // Handle selecting a package
    const handleSelectPackage = (service) => {
        setSelectedPackage(service);
        Inertia.visit(`/customers?package=${service.service_name}`);
    };

    // Handle page change
    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    // Calculate current items based on pagination
    const offset = currentPage * itemsPerPage;
    const currentItems = services.slice(offset, offset + itemsPerPage);

    return (
        <AppLayout>
            <Title /> {/* Render the Title component here */}

            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 text-gray-900 py-8">
                <h1 className="text-5xl font-extrabold mb-12 text-center text-gray-800 shadow-lg p-6 rounded-xl">
                    Pilihan Paket Internet Maxnet
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-7xl px-8">
                    {currentItems.map((service, index) => {
                        const imageIndex = index % defaultImages.length;

                        return (
                            <div
                                key={`${service.id}-${index}`} // Ensure unique keys
                                className="relative group bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105"
                            >
                                {/* Animated background */}
                                <div className="absolute inset-0 z-0 opacity-25">
                                    <div className="animate-pulse h-full w-full bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-400 opacity-75"></div>
                                </div>

                                {/* Display service image or fallback to default image */}
                                <img
                                    src={service.image_url || defaultImages[imageIndex]}
                                    alt={service.service_name}
                                    className="h-64 w-full object-cover transition duration-500 group-hover:scale-110 relative z-10"
                                />

                                <div className="p-6 relative z-10">
                                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                        {service.service_name}
                                    </h3>

                                    {/* Display service speed */}
                                    <div className="flex items-center text-gray-600 mb-4">
                                        <FaBolt className="text-purple-600 mr-2" />
                                        <span className="text-md">
                                            Kecepatan: {service.service_speed} Mbps
                                        </span>
                                    </div>

                                    {/* Display service price */}
                                    <div className="flex items-center justify-center mb-6">
                                        <FaDollarSign className="text-purple-600 mr-2" />
                                        <p className="text-2xl font-bold text-purple-600 bg-gray-100 rounded-lg px-4 py-2">
                                            Rp {service.service_price}
                                        </p>
                                    </div>

                                    {/* Package selection button */}
                                    <button
                                        type="button"
                                        onClick={() => handleSelectPackage(service)}
                                        className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 text-lg font-semibold text-white hover:bg-blue-700 transition duration-300 transform hover:scale-105"
                                    >
                                        <FaInfoCircle className="inline-block mr-2" />
                                        Pilih Paket
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Pagination component */}
                <ReactPaginate
                    previousLabel={'← Sebelumnya'}
                    nextLabel={'Berikutnya →'}
                    pageCount={Math.ceil(services.length / itemsPerPage)}
                    onPageChange={handlePageChange}
                    containerClassName={'flex justify-center mt-12 space-x-4'}
                    activeClassName={'bg-purple-700 text-white font-bold shadow-lg'}
                    pageClassName={
                        'py-2 px-4 bg-white text-gray-900 rounded-lg shadow-md hover:bg-gray-100 transition duration-200'
                    }
                    previousLinkClassName={
                        'py-2 px-4 bg-white text-gray-900 rounded-lg shadow-md hover:bg-gray-100 transition duration-200'
                    }
                    nextLinkClassName={
                        'py-2 px-4 bg-white text-gray-900 rounded-lg shadow-md hover:bg-gray-100 transition duration-200'
                    }
                    disabledClassName={'opacity-50 cursor-not-allowed'}
                    pageLinkClassName={'w-full h-full flex justify-center items-center'}
                    breakLinkClassName={'py-2 px-4 bg-white text-gray-900 rounded-lg shadow-md'}
                />
            </div>
        </AppLayout>
    );
};

export default Packages;
