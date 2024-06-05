import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const UserProfile = () => {
  return (
    <div className="bg-white dark:bg-secondary-dark-bg rounded-lg p-6 shadow-md">
      <div className="flex items-center mb-4">
        <div className="rounded-full bg-gray-200 dark:bg-gray-600 p-3 mr-4">
          <FontAwesomeIcon icon={faUser} className="text-gray-600 dark:text-gray-300 text-xl" />
        </div>
        <div>
          <h2 className="text-xl font-bold">John Doe</h2>
          <p className="text-gray-600 dark:text-gray-300">District Education Officer</p>
        </div>
      </div>

      <h3 className="text-lg bg-slate-400 font-bold mb-4 text-black-600 dark:text-indigo-400 inline-block rounded-md p-1">
      Personal Information
      </h3> 
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Employee ID</p>
          <p className="font-semibold">DEO-123456</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Contact</p>
          <p className="font-semibold">+92 321 1234567</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
          <p className="font-semibold">john.doe@education.gov.pk</p>
        </div>
      </div>

      <h3 className="text-lg bg-slate-400 font-bold mb-4 text-black-600 dark:text-indigo-400 inline-block rounded-md p-1">
        Office Information</h3>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Office Address</p>
          <p className="font-semibold">District Education Office, Main Road, City, Province</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;