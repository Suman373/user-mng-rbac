import axios from 'axios';
import { URL } from '../constants';

export const getUsers = async () => {
    try {
        const data = await axios.get(`${URL}/users`);
        if (data.status !== 200) {
            throw new Error("Failed to fetch users");
        }
        // console.log(data?.data?.message || "Fetched users");
        return data?.data?.result;
    } catch (error) {
        console.log(error);
    }
}

export const addUser = async (payload) => {
    try {
        const data = await axios.post(`${URL}/users`,{
            name:payload.name,
            email:payload.email,
            status:payload.status,
            role:payload.role
        });
        if (data.status !== 201) {
            throw new Error("Failed to create user");
        }
        // console.log(data?.data?.message || "Created user");
        return data?.data?.result;
    } catch (error) {
        console.log(error);
    }
}