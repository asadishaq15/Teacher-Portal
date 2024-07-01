import React, { useState } from 'react';
import { Header } from '../components';
import { useStateContext } from '../../contexts/ContextProvider';
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Navbar, Footer, Sidebar, ThemeSettings } from "../components";
import { submitTransferRequest } from '../../components/api';

const RequestTransfer = () => {
    const {
        setCurrentColor,
        setCurrentMode,
        currentMode,
        activeMenu,
        currentColor,
        themeSettings,
        setThemeSettings,
    } = useStateContext();

    const [formData, setFormData] = useState({
        teacherId: '',
        currentSchool: '',
        requestedSchool: '',
        reason: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await submitTransferRequest(formData);
            alert('Transfer request submitted successfully');
        } catch (error) {
            console.error('Error submitting transfer request:', error);
        }
    };

    return (
        <div className={currentMode === "Dark" ? "dark" : ""}>
            <div className="flex relative dark:bg-main-dark-bg">
                <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
                    <TooltipComponent content="Settings" position="Top">
                        <button
                            type="button"
                            onClick={() => setThemeSettings(true)}
                            style={{ background: currentColor, borderRadius: "50%" }}
                            className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                        >
                            <FiSettings />
                        </button>
                    </TooltipComponent>
                </div>
                {activeMenu ? (
                    <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
                        <Sidebar />
                    </div>
                ) : (
                    <div className="w-0 dark:bg-secondary-dark-bg">
                        <Sidebar />
                    </div>
                )}
                <div
                    className={
                        activeMenu
                            ? "dark:bg-main-dark-bg bg-main-bg min-h-screen md:ml-72 w-full"
                            : "bg-main-bg dark:bg-main-dark-bg w-full min-h-screen flex-2"
                    }
                >
                    <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
                        <Navbar />
                    </div>
                    <div>
                        {themeSettings && <ThemeSettings />}
                        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
                            <Header category="Page" title="Request Transfer" />
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="teacherId" className="block text-sm font-medium text-gray-700">
                                        Teacher ID
                                    </label><input
                                        type="text"
                                        name="teacherId"
                                        id="teacherId"
                                        value={formData.teacherId}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="currentSchool" className="block text-sm font-medium text-gray-700">
                                        Current School
                                    </label>
                                    <input
                                        type="text"
                                        name="currentSchool"
                                        id="currentSchool"
                                        value={formData.currentSchool}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="requestedSchool" className="block text-sm font-medium text-gray-700">
                                        Requested School
                                    </label>
                                    <input
                                        type="text"
                                        name="requestedSchool"
                                        id="requestedSchool"
                                        value={formData.requestedSchool}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
                                        Reason
                                    </label>
                                    <textarea
                                        name="reason"
                                        id="reason"
                                        value={formData.reason}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Submit Transfer Request
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default RequestTransfer;