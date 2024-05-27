import React, { useEffect, useState } from 'react';
import Adminnav from '../../component/adminnav';
import axios from 'axios';
import Swal from 'sweetalert2';
import feather from 'feather-icons';
import { useNavigate } from 'react-router-dom';
import './Users.css';

function Centers() {
    const [centers, setCenters] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCenters();
    }, []);

    useEffect(() => {
        feather.replace();
    }, [centers]);

    const fetchCenters = () => {
        axios.get('http://localhost:8084/centers')
            .then((response) => {
                setCenters(response.data);
            })
            .catch((error) => {
                console.error('Error fetching centers:', error);
            });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure you want to delete this center?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#2C599D',
            cancelButtonColor: '#FB9B50',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8084/centers/${id}`)
                    .then((response) => {
                        Swal.fire(
                            'Deleted!',
                            'The center has been deleted.',
                            'success'
                        );
                        fetchCenters(); // Refresh the list of centers
                    })
                    .catch((error) => {
                        Swal.fire(
                            'Error!',
                            'An error occurred while deleting the center.',
                            'error'
                        );
                        console.error('Error deleting center:', error);
                    });
            }
        });
    };

    const handleViewDetails = (id) => {
        navigate(`/dashboardadmin/trainingcenterdetails/${id}`);
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
                                <th>City</th>
                                <th>Location</th>
                                <th>License</th>
                                <th>Business ID</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {centers.map((center) => (
                                <tr key={center.ID_center}>
                                    <td>{center.ID_center}</td>
                                    <td>{center.Center_fullname}</td>
                                    <td>{center.Center_email}</td>
                                    <td>{center.phone_number}</td>
                                    <td>{center.city}</td>
                                    <td>{center.location}</td>
                                    <td>{center.license}</td>
                                    <td>{center.business_id}</td>
                                    <td>
                                        <button onClick={() => handleViewDetails(center.ID_center)} className="btn" title="View Details">
                                            <i data-feather="arrow-right"></i>
                                        </button>
                                        <button
  onClick={() => handleDelete(center.ID_center)}
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

export default Centers;
