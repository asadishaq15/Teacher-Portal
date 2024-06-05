import React, { useEffect, useState,useRef } from 'react';
import axios from 'axios';

import { Header } from '../components';
import { useStateContext } from '../../contexts/ContextProvider';
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Navbar, Footer, Sidebar, ThemeSettings } from "../components";

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

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  const [transferRequests, setTransferRequests] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSchool, setNewSchool] = useState('');

  const fetchTransferRequests = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/all-requests');
      setTransferRequests(response.data.transferRequests);
    } catch (error) {
      console.error('Failed to fetch transfer requests', error);
    }
  };

  useEffect(() => {
    fetchTransferRequests();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewSchool('');
  };

  const handleNewSchoolChange = (event) => {
    setNewSchool(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('New School:', newSchool);
    closeModal();
  };

  const modalRef = useRef(null);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
          <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
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
            ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
            : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
        }
        >
          <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
            <Navbar />
          </div>
          <div>
            {themeSettings && <ThemeSettings />}
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
              <div className="flex justify-between items-center">
                <Header category="Page" title="Transfer Requests" />
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={openModal}
                >
                  New Request
                </button>
              </div>
            </div>

            <div className="table-padding">
              <h2 className="mb-12 text-3xl">Fill the Transfer Request Details</h2>
              <table className="border border-collapse w-full">
                <thead>
                  <tr>
                    <th className="border p-2">Date Requested</th>
                    <th className="border p-2">Old School Name</th>
                    <th className="border p-2">New School Name</th>
                    <th className="border p-2">Messages</th>
                    <th className="border p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transferRequests.map((request) => (
                    <tr key={request._id}>
                      <td className="border p-2">{request.DateRequested}</td>
                      <td className="border p-2">{request.OldSchoolName}</td>
                      <td className="border p-2">{request.NewSchoolName}</td>
                      <td className="border p-2">{request.Messages}</td>
                      <td className="border p-2">{request.Status}</td>
                      <td className="border p-2">
                        {/* Your accept and reject buttons */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Footer />
        </div>
      </div>

      {/* Render the overlay component conditionally */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            ref={modalRef}
            className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto z-50"
          >
            <h2 className="text-2xl font-bold mb-4">Transfer Request</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="teacherName" className="block font-bold mb-2">
                  Teacher Name
                </label>
                <input
                  type="text"
                  id="teacherName"
                  value="John Doe"
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  disabled
                />
              </div>
              <div className="mb-4">
                <label htmlFor="currentDate" className="block font-bold mb-2">
                  Current Date
                </label>
                <input
                  type="text"
                  id="currentDate"
                  value={new Date().toLocaleDateString()}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  disabled
                />
              </div>
              <div className="mb-4">
                <label htmlFor="oldSchool" className="block font-bold mb-2">
                  Old School
                </label>
                <input
                  type="text"
                  id="oldSchool"
                  value="ABC School"
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  disabled
                />
              </div>
              <div className="mb-4">
                <label htmlFor="newSchool" className="block font-bold mb-2">
                  New School
                </label>
                <select
                  id="newSchool"
                  value={newSchool}
                  onChange={handleNewSchoolChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                >
                  <option value="">Select a new school</option>
                  <option value="schoolA">School A</option>
                  <option value="schoolB">School B</option>
                  <option value="schoolC">School C</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 mr-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
          <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
        </div>
      )}
    </div>
  );
};

            
            export default RequestTransfer;