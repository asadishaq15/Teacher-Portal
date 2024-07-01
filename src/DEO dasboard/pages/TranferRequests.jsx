import React, { useEffect, useState } from 'react';
import { Header } from '../components';
import { useStateContext } from '../../contexts/ContextProvider';
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Navbar, Footer, Sidebar, ThemeSettings } from "../components";
import { getTransferRequests, acceptTransferRequest, rejectTransferRequest } from '../../components/api';

const TransferRequests = () => {
    const {
        setCurrentColor,
        setCurrentMode,
        currentMode,
        activeMenu,
        currentColor,
        themeSettings,
        setThemeSettings,
    } = useStateContext();

    useEffect(() => {
        const currentThemeColor = localStorage.getItem("colorMode");
        const currentThemeMode = localStorage.getItem("themeMode");
        if (currentThemeColor && currentThemeMode) {
            setCurrentColor(currentThemeColor);
            setCurrentMode(currentThemeMode);
        }
    }, []);

    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchTransferRequests = async () => {
            try {
                const requestData = await getTransferRequests();
                setRequests(requestData);
            } catch (error) {
                console.error('Error fetching transfer requests:', error);
            }
        };

        fetchTransferRequests();
    }, []);

    const handleAccept = async (requestId) => {
        try {
            await acceptTransferRequest(requestId);
            setRequests(requests.filter(request => request.id !== requestId));
        } catch (error) {
            console.error('Error accepting transfer request:', error);
        }
    };

    const handleReject = async (requestId) => {
        try {
            await rejectTransferRequest(requestId);
            setRequests(requests.filter(request => request.id !== requestId));
        } catch (error) {
            console.error('Error rejecting transfer request:', error);
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
                            <Header category="Page" title="Transfer Requests"/>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white dark:bg-secondary-dark-bg">
                                    <thead>
                                        <tr>
                                            <th className="py-2">Teacher Name</th>
                                            <th className="py-2">Current School</th>
                                            <th className="py-2">Requested School</th>
                                            <th className="py-2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {requests.map((request) => (
                                            <tr key={request.id}>
                                                <td className="py-2">{request.teacherName}</td>
                                                <td className="py-2">{request.currentSchool}</td>
                                                <td className="py-2">{request.requestedSchool}</td>
                                                <td className="py-2">
                                                    <button
                                                        className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                                                        onClick={() => handleAccept(request.id)}
                                                    >
                                                        Accept
                                                    </button>
                                                    <button
                                                        className="bg-red-500 text-white px-4 py-2 rounded"
                                                        onClick={() => handleReject(request.id)}
                                                    >
                                                        Reject
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default TransferRequests;