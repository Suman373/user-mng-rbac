import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';

const AddUser = () => {

    const navigate = useNavigate();
    // component states
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('User');
    const [status, setStatus] = useState('Active');

    // form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!name || !email){
            alert("Name and email is required");
            return;
        }
        console.log('User Data Submitted:', { name, email, role, status });
        navigate('/');
    };

    return (
        <div className="flex bg-gray-100">
            <Sidebar />
            <div className="flex-1 p-6">
                <h1 className="text-2xl font-semibold mb-4 text-blue-500">Add New User</h1>

                <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
                    <div className="flex flex-col">
                        <FormLabel text={"Name"} />
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 p-2 border rounded-md"
                             required
                        />
                    </div>
                    <div className="flex flex-col">
                        <FormLabel text={"Email"} />
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 p-2 border rounded-md"
                            required
                        />
                    </div>

                    {/* User Role */}
                    <div className="flex flex-col">
                        <FormLabel text={"Role"} />
                        <select
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="mt-1 p-2 border rounded-md"
                        >
                            <option value="User">User</option>
                            <option value="Admin">Admin</option>
                            <option value="Manager">Manager</option>
                        </select>
                    </div>

                    {/* User Status (Active/Inactive) */}
                    <div className="flex flex-col">
                        <FormLabel text={"Status"} />
                        <select
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="mt-1 p-2 border rounded-md"
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-md hover:opacity-70">
                            Add User
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const FormLabel = ({ text }) => {
    return (
        <label className="text-md font-medium text-gray-700">
            {text || "<Label>"}
        </label>
    )
}

export default AddUser;