import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { FaSave } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
import { Link } from 'react-router-dom';

const Roles = () => {

    // roles and their respective permissions
    const [roles, setRoles] = useState([
        { id: 1, name: 'Admin', permissions: { read: true, write: true, delete: true } },
        { id: 2, name: 'Manager', permissions: { read: true, write: true, delete: false } },
        { id: 3, name: 'User', permissions: { read: true, write: false, delete: false } },
    ]);

    const handlePermissionChange = (roleId, permission, value) => {
        setRoles(prevRoles =>
            prevRoles.map(role =>
                role.id === roleId
                    ? {
                        ...role,
                        permissions: { ...role.permissions, [permission]: value }
                    }
                    : role
            )
        );
    };

    return (
        <div className="flex bg-gray-100">
            <Sidebar />
            <div className="w-full min-h-screen p-6 flex-1 bg-gray-100">
                <h1 className="text-2xl font-semibold mb-4 text-blue-500">Roles</h1>
                <div className="w-full flex justify-end items-center mb-4">
                    <Link
                        to=""
                        className="bg-orange-600 text-white px-4 py-2 flex items-center gap-1  rounded-md hover:opacity-70">
                        <MdSecurity /> Create new role
                    </Link>
                </div>
                <table className="min-w-full table-auto border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Read</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Write</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Delete</th>
                            <th className="border border-gray-300 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roles.map((role) => (
                            <tr key={role.id}>
                                <td className="border border-gray-300 px-4 py-2">{role.name}</td>
                                {/* read */}
                                <td className="border border-gray-300 px-4 py-2">
                                    <input
                                        type="checkbox"
                                        checked={role.permissions.read}
                                        onChange={(e) => handlePermissionChange(role.id, 'read', e.target.checked)}
                                        className="form-checkbox"
                                    />
                                </td>
                                {/* write */}
                                <td className="border border-gray-300 px-4 py-2">
                                    <input
                                        type="checkbox"
                                        checked={role.permissions.write}
                                        onChange={(e) => handlePermissionChange(role.id, 'write', e.target.checked)}
                                        className="form-checkbox"
                                    />
                                </td>
                                {/* delete */}
                                <td className="border border-gray-300 px-4 py-2">
                                    <input
                                        type="checkbox"
                                        checked={role.permissions.delete}
                                        onChange={(e) => handlePermissionChange(role.id, 'delete', e.target.checked)}
                                        className="form-checkbox"
                                    />
                                </td>

                                {/* Actions */}
                                <td className="border border-gray-300 px-4 py-2">
                                    <div className='flex items-center justify-start gap-2'>
                                        <button
                                            onClick={() => handleEdit(user.id)}
                                            className="text-green-500 bg-green-200 px-2 py-1 rounded-md">
                                            <FaSave />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <ul className="w-full bg-yellow-100 text-red-950 p-4 my-6 rounded-md">
                    <li>1. Permissions Overview:</li>
                    <ul className="ml-6 list-disc">
                        <li><strong>Read</strong>: View information and data within the platform.</li>
                        <li><strong>Write</strong>: Modify or create new data, but without higher-level administrative control.</li>
                        <li><strong>Delete</strong>: Remove data or users, typically reserved for high-level roles like Admin.</li>
                    </ul>

                    <li>2. For roles with the <strong>Write</strong> and <strong>Delete</strong> permissions, caution is advised when making changes to users or data.</li>
                </ul>
            </div>
        </div>
    );
};

export default Roles;