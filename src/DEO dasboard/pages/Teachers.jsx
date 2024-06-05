import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Header } from '../components';
import { useStateContext } from '../../contexts/ContextProvider';
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Navbar, Footer, Sidebar, ThemeSettings } from "../components";

const Teachers = () => {

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
  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
    
        // Include the Bearer token in the Authorization header
        const response = await axios.get('http://localhost:8000/api/teacher/teacher-profile');
    
        // Update the state with the fetched teacher data
        setTeachers(response.data);
      } catch (error) {
        console.error('Error fetching teacher profiles:', error);
      }
    };

    fetchTeachers();
  }, []);

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.cnic.includes(searchTerm)
  );

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

            
              <div className="mb-4 mt-6 max-w-[400px] mx-auto">
              <label htmlFor="" className='text-md font-bold text-[#555] mt-4 mb-4'>Search Teacher</label>
            <input
              type="text"
              placeholder="Search by name or CNIC"
              className="p-2 border rounded-md w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
              <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
              <Header category="Page" title="Teachers" />
            </div>
            
              
            {/*  show teacher profile in tailwind table*/ }
            <div className="table-padding">
            <table className="min-w-full divide-y divide-gray-200 mt-4">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  School Name
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  City
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cnic
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Experience
                </th>
                {/* Add other table headers as needed */}
              </tr>
            </thead>
            {/* Table body */}
<tbody>
{searchTerm === ''
  ? teachers.map((teacher) => (
      <tr key={teacher._id}>
        <td className="px-6 py-4 whitespace-nowrap">{teacher.name}</td>
        <td className="px-6 py-4 whitespace-nowrap">{teacher.schoolName}</td>
        <td className="px-6 py-4 whitespace-nowrap">{teacher.city}</td>
        <td className="px-6 py-4 whitespace-nowrap">{teacher.email}</td>
        <td className="px-6 py-4 whitespace-nowrap">{teacher.cnic}</td>
        <td className="px-6 py-4 whitespace-nowrap">{teacher.experience}</td>
        {/* Add other table cells as needed */}
      </tr>
    ))
  : filteredTeachers.map((teacher) => (
      <tr key={teacher._id}>
        <td className="px-6 py-4 whitespace-nowrap">{teacher.name}</td>
        <td className="px-6 py-4 whitespace-nowrap">{teacher.schoolName}</td>
        <td className="px-6 py-4 whitespace-nowrap">{teacher.city}</td>
        <td className="px-6 py-4 whitespace-nowrap">{teacher.email}</td>
        <td className="px-6 py-4 whitespace-nowrap">{teacher.cnic}</td>
        <td className="px-6 py-4 whitespace-nowrap">{teacher.experience}</td>
        {/* Add other table cells as needed */}
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

export default Teachers;



