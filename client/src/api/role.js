import axios from 'axios';
import { URL } from '../constants';

export const getRoles = async () => {
    try {
        const data = await axios.get(`${URL}/roles`);
        if (data.status !== 200) {
            throw new Error("Failed to fetch roles");
        }
        console.log(data?.data?.message || "Fetched roles");
        return data?.data?.result;
    } catch (error) {
        console.log(error);
    }
}
