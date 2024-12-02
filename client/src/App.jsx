import { BrowserRouter as BRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./components/Dashboard/Dashboard"
import AddUser from "./pages/AddUser/AddUser";
import EditUser from "./pages/EditUser/EditUser";
import { useState } from "react";
import Roles from "./pages/Roles/Roles";

const App = () => {
    console.log('Updated App.jsx');
    const [users, setUsers] = useState([
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Inactive' },
        { id: 3, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Active' },
    ]);

    const onUserUpdate = (updatedUser) => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === updatedUser.id ? { ...user, ...updatedUser } : user
          )
        );
        console.log("After update",users);
      };

    return (
        <>
            <BRouter>
                <Routes>
                    <Route path="/" element={<Dashboard users={users} setUsers={setUsers}/>}></Route>
                    <Route path="/users/add" element={<AddUser />}></Route>
                    <Route path="/users/edit/:id" element={<EditUser users={users} onUserUpdate={onUserUpdate} />}></Route>
                    <Route path="/roles" element={<Roles/>}></Route>
                </Routes>
            </BRouter>
        </>
    )
}

export default App;