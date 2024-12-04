import { BrowserRouter as BRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./components/Dashboard/Dashboard"
import AddUser from "./pages/AddUser/AddUser";
import EditUser from "./pages/EditUser/EditUser";
import Roles from "./pages/Roles/Roles";
import Footer from "./components/Footer/Footer";

const App = () => {

    return (
        <>
            <BRouter>
                <Routes>
                    <Route path="/" element={<Dashboard />}></Route>
                    <Route path="/users/add" element={<AddUser />}></Route>
                    <Route path="/users/edit/:id" element={<EditUser />}></Route>
                    <Route path="/roles" element={<Roles />}></Route>
                </Routes>
                <Footer/>
            </BRouter>
        </>
    )
}

export default App;