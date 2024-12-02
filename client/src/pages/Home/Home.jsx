import React, { useEffect, useState } from 'react';
import './App.css';
import userImg from './assets/elon.png';
import { FaChevronDown, FaSearch } from "react-icons/fa";
import axios from "axios";
import StudentCard from '../../components/StudentCard/StudentCard';
import RiseLoader from 'react-spinners/RiseLoader';
import Footer from '../../components/Footer/Footer';

const Home = () => {

  const [searchText, setSearchText] = useState("");
  const [selected, setSelected] = useState("All");
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const blockStudent = (firstName) => {
    // filter out students who wasn't blocked
    setStudents(students => students.filter(item => item.firstName !== firstName ? firstName : null));
  }

  const filterActive = () => {
    // mimic filtering of active students by keeping even index
    setStudents(students => students.filter((item, index) => index % 2 === 0 ? item : null));
  }

  const filterInactive = () => {
    // mimic inactive by keeping odd index
    setStudents(students => students.filter((item, index) => index % 2 !== 0 ? item : null));
  }

  // filter students according to the matching string in search field
  const filteredStudents = students.filter((item) => item?.firstName?.toLowerCase().includes(searchText.toLowerCase()));

  const fetchRandomStudents = async () => {
    try {
      setIsLoading(true);
      const data = await axios.get(import.meta.env.VITE_API_ENDPOINT);
      console.log(data);
      if (data.data) {
        setStudents(data?.data?.users?.slice(0, 8));
      }
      setTimeout(() => setIsLoading(false), 2000); // mimic loading time
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchRandomStudents();
  }, []);
  return (
    <>
      <div className='dashboard-container'>
        <header>
          <div className="search-field">
            <FaSearch />
            <input
              className='search-student'
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder='Search student' />
          </div>
          <div className="user-icon">
            <img src={userImg} alt="user-profile" />
            <p>Suman Roy <span style={{ cursor: 'pointer' }}><FaChevronDown /></span></p>
          </div>
        </header>
        <section>
          <div className="student-cards-wrapper">
            <div className="student-cards-container">
              <h1>Students</h1>
              <div className="container-options">
                <a id={selected === "All" ? "selected" : ""}
                  onClick={() => {
                    fetchRandomStudents();
                    setSelected("All");
                  }}
                  href="#">All</a>
                <a id={selected === "Active" ? "selected" : ""}
                  onClick={() => {
                    setSelected("Active");
                    filterActive();
                  }}
                  href="#">Active</a>
                <a id={selected === "Inactive" ? "selected" : ""}
                  onClick={() => {
                    setSelected("Inactive");
                    filterInactive();
                  }}
                  href="#">Inactive</a>
              </div>
            </div>
            <div className="card-flexbox">
              {isLoading ? <div style={{ marginTop: '10rem' }}><RiseLoader color='var(--brand)' /></div>
                :
                filteredStudents?.length > 0 && !isLoading ?
                  filteredStudents?.map((student, index) =>
                    <StudentCard
                      student={student}
                      blockStudent={blockStudent}
                      index={index} />
                  )
                  :
                  <p>No students available</p>
              }
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default Home;