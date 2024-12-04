import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-gray-800 text-white p-4">
      <div className="text-xl font-semibold mb-8 p-2">
        <Link to="/" className='font-sans font-bold text-blue-300'>RBAC UI</Link>
      </div>
      <ul className="space-y-4">
        <li>
          <Link to="/" className="hover:bg-gray-700 p-2 rounded-md block">
            Users
          </Link>
        </li>
        <li>
          <Link to="/users/add" className="hover:bg-gray-700 p-2 rounded-md block">
            Create user
          </Link>
        </li>
        <li>
          <Link to="/roles" className="hover:bg-gray-700 p-2 rounded-md block">
            Roles
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;