import React from 'react';
import Avatar from 'react-avatar';


const UserProfile = () => {
  return (
    <div className="bg-white dark:bg-secondary-dark-bg rounded-lg p-6 shadow-md">
      <div className="flex items-center mb-4">
      <Avatar name="Akhter" size="50" round={true} />
        <div>
          <h2 className="text-xl font-bold ml-4">Nalsoom Akhter</h2>
          <p className="text-gray-600 dark:text-gray-300 ml-4">PST (Arts)</p>
        </div>
      </div>

      <h3 className="text-lg bg-slate-400 font-bold mb-4 text-black-600 dark:text-indigo-400 inline-block rounded-md p-1">
      Personal Information
      </h3>    

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">CNIC</p>
          <p className="font-semibold">37405-2</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">DOB</p>
          <p className="font-semibold">01-Jan-68</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Contact</p>
          <p className="font-semibold">0342-</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
          <p className="font-semibold">a425@gmail.com</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Marital Status</p>
          <p className="font-semibold">Married</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Address</p>
          <p className="font-semibold">HOUS, RWP</p>
        </div>
      </div>

           <h3 className="text-lg bg-slate-400 font-bold mb-4 text-black-600 dark:text-indigo-400 inline-block rounded-md p-1">
Professional Information</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Employee ID</p>
          <p className="font-semibold">30415613</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Service Type/Grade</p>
          <p className="font-semibold">Regular / 14</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Current School</p>
          <p className="font-semibold">GHS MC CENTRAL MODEL MILLAT COLONY</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Posted As</p>
          <p className="font-semibold">PST</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Date of Joining Service</p>
          <p className="font-semibold">14-Feb-90</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Date of Joining Current School</p>
          <p className="font-semibold">14-Feb-90</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Initial Appointment</p>
          <p className="font-semibold">PST / 9 / Arts</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;