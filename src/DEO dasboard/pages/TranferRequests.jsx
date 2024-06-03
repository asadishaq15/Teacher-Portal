import React, {useEffect, useState} from 'react';
import axios from 'axios';

import { Header } from '../components';
import { useStateContext } from '../../contexts/ContextProvider';
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Navbar, Footer, Sidebar, ThemeSettings } from "../components";

const TranferRequests = () => {

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

  const [transferRequests, setTransferRequests] = useState([]);

  const fetchTransferRequests = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/all-requests');
      setTransferRequests(response.data.transferRequests);
    } catch (error) {
      console.error('Failed to fetch transfer requests', error);
    }
  };
  useEffect(() => {
    // Fetch transfer requests when component mounts
    fetchTransferRequests();
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
              <Header category="Page" title="Transfer Requests" />
            </div>
              
            <div>
            <h2 className='mb-12 text-3xl'>Transfer Requests</h2>
            <table className="border border-collapse w-full">
  <thead>
    <tr>
      <th className="border p-2">Full Name</th>
      <th className="border p-2">School Name</th>
      <th className="border p-2">Experience</th>
      <th className="border p-2">City</th>
      <th className="border p-2">CNIC</th>
      <th className="border p-2">Email</th>
      <th className="border p-2">Message</th>
      <th className="border p-2">Status</th>
      <th className="border p-2">Actions</th>
    </tr>
  </thead>
  <tbody>
    {transferRequests.map(request => (
      <tr key={request._id}>
        <td className="border p-2">{request.fullName}</td>
        <td className="border p-2">{request.schoolName}</td>
        <td className="border p-2">{request.experience}</td>
        <td className="border p-2">{request.city}</td>
        <td className="border p-2">{request.cnic}</td>
        <td className="border p-2">{request.email}</td>
        <td className="border p-2">{request.message}</td>
        <td className="border p-2">{request.status}</td>
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
    </div>
    
  );
};

export default TranferRequests;



