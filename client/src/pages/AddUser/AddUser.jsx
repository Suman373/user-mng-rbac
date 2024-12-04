import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import { RoleApi, UserApi } from '../../api';

const AddUser = () => {

    const navigate = useNavigate();
    // component states
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [status, setStatus] = useState('');
    const [roles, setRoles] = useState([]);

    const fetchRoles = async()=>{
        try {
            const data = await RoleApi.getRoles();
            setRoles(data);
        } catch (error) {
            console.log(error);
        }
    }

    // form submission
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            if(!name || !email || !status || !role){
                alert("Fill all required details");
                return;
            }
            // console.log(name,email,status,role);
            const data = await UserApi.addUser({name,email,status,role});
            navigate('/');
            
        } catch (error) {
            console.log(error);
            alert("Failed to add user");
        }
    };

    useEffect(()=>{
        fetchRoles();
    },[]);


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
                            required
                        >
                            <option value="" disabled >Select a role</option>
                            {
                                roles?.map((item,index)=> <option value={item._id} key={index}>{item?.name}</option>)
                            }
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
                            required
                        >
                            <option value=""disabled>Select status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
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
            {text || "<Label>"} <span className='text-red-500'>*</span>
        </label>
    )
}

export default AddUser;