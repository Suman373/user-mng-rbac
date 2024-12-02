import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa6";

const Dashboard = ({users, setUsers}) => {

    const navigate = useNavigate();

    const handleDelete = (id) => {
        setUsers(users.filter(user => user.id !== id));
    };

    const handleEdit = (id) =>{
        navigate(`/users/edit/${id}`);
    }

    return (
        <>
            <div className="flex bg-gray-100">
                <Sidebar />
                {/* user dashboard with table */}
                <div className="w-full min-h-screen p-6 flex-1 bg-gray-100">
                    <h1 className="text-2xl font-semibold mb-4 text-blue-500">Admin Dashboard</h1>

                    <div className="w-full flex justify-end items-center mb-4">
                        <Link
                            to="/users/add"
                            className="bg-green-600 text-white px-4 py-2 flex items-center gap-1  rounded-md hover:opacity-70"
                        >
                           <FaUserPlus/> Add User 
                        </Link>
                    </div>

                    <table className="min-w-full table-auto border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Role</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                                <th className="border border-gray-300 px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                                    <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                                    <td className="border border-gray-300 px-4 py-2">{user.role}</td>
                                    <td className="border border-gray-300 px-4 py-2">{user.status}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <div className='flex items-center justify-start gap-2'>
                                            <button
                                                onClick={() => handleDelete(user.id)}
                                                className="text-red-500 bg-red-200 px-2 py-1 rounded-md"
                                            >
                                                <MdDelete />
                                            </button>
                                            <button
                                                onClick={() => handleEdit(user.id)}
                                                className="text-amber-500 bg-amber-200 px-2 py-1 rounded-md"
                                            >
                                                <MdModeEditOutline />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>

    );
};

export default Dashboard;
