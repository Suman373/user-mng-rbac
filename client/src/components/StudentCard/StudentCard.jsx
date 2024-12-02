import React from 'react';
import './StudentCard.css';
import {FaCircleDot } from 'react-icons/fa6';

const StudentCard = ({ student,blockStudent,index }) => {
    return (
        <div className='student-card' key={index}>
            <div className="header">
                <span className='activity-status-icon' id={index %2===0 ? "active": "inactive"}><FaCircleDot/></span>
                <img src={student?.image} alt="user-pfp" />
                <div>
                    <p><b>{student?.firstName} {student?.lastName}</b></p>
                    <p style={{ fontSize: "0.8rem",color:'gray' }}>Registered Student</p>
                </div>
            </div>
            <div className="body">
                <p><b>Email</b> : {student?.email}</p>
                <p><b>Gender</b> : {student?.gender?.toUpperCase().slice(0,1)}</p>
                <p><b>Blood group</b> : {student?.bloodGroup}</p>
                <p><b>City</b> : {student?.city}</p>
            </div>
            <div className="footer">
                <button onClick={()=>blockStudent(student?.firstName)}>Block</button>
                <button>Details</button>
            </div>
        </div>
    )
}

export default StudentCard;