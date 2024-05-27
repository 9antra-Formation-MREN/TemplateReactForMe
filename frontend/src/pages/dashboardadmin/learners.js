import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Adminnav from '../../component/adminnav';
import axios from 'axios';
import feather from 'feather-icons';
import Swal from 'sweetalert2';
import './Users.css';

function Learners() {
    const [learners, setLearners] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchLearners();
    }, []);

    useEffect(() => {
        feather.replace();
    }, [learners]);

    const fetchLearners = () => {
        axios.get('http://localhost:8084/learners')
            .then((response) => {
                setLearners(response.data);
            })
            .catch((error) => {
                console.error('Error fetching learners:', error);
            });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure you want to delete this learner?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#2C599D',
            cancelButtonColor: '#FB9B50',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8084/learners/${id}`)
                    .then((response) => {
                        Swal.fire(
                            'Deleted!',
                            'The learner has been deleted.',
                            'success'
                        );
                        fetchLearners(); 
                    })
                    .catch((error) => {
                        Swal.fire(
                            'Error!',
                            'An error occurred while deleting the learner.',
                            'error'
                        );
                        console.error('Error deleting learner:', error);
                    });
            }
        });
    };

    const handleViewPreferences = (id) => {
        navigate(`/dashboardadmin/prefrences/${id}`);
    };

    return (
        <div>
            <Adminnav />
            <div className="main-content">
            <br></br>
            <br></br>
            <br></br>
            
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Full Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Country</th>
                                <th>City</th>
                                <th>Occupation</th>
                                <th>Education Level</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {learners.map((learner) => (
                                <tr key={learner.ID_learner}>
                                    <td>{learner.ID_learner}</td>
                                    <td>{learner.learner_fullname}</td>
                                    <td>{learner.learner_email}</td>
                                    <td>{learner.learner_phone}</td>
                                    <td>{learner.learner_country}</td>
                                    <td>{learner.learner_city}</td>
                                    <td>{learner.occupation}</td>
                                    <td>{learner.education_level}</td>
                                    <td>
                                    <button onClick={() => handleViewPreferences(learner.ID_learner)} className="btn " title="See Preferences">
                                            <i data-feather="arrow-right"></i>
                                        </button>
                                        <button
  onClick={() => handleDelete(learner.ID_learner)}
  className="btn btn-danger"
  style={{ backgroundColor: '#FB9B50', borderColor: '#FB9B50' }} // Orange background and border color
>
  <i data-feather="trash-2"></i>
</button>

                                        
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Learners;
