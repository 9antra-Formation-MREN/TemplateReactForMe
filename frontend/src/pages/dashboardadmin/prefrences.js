import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Adminnav from '../../component/adminnav';
import axios from 'axios';
import './Users.css';

function Preferences() {
    const { id } = useParams();
    const [preferences, setPreferences] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8084/preferences/${id}`)
            .then((response) => {
                setPreferences(response.data);
            })
            .catch((error) => {
                console.error('Error fetching preferences:', error);
            });
    }, [id]);

    return (
        <div>
            <Adminnav />
            <div className="main-content">
             <br></br>
             <br></br>
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Learning Method</th>
                                <th>Level</th>
                                <th>Language</th>
                                <th>Certification</th>
                                <th>Course Type</th>
                                <th>Course Category</th>
                                <th>Course Duration</th>
                                <th>Budget</th>
                            </tr>
                        </thead>
                        <tbody>
                            {preferences.map((pref) => (
                                <tr key={pref.id_pref}>
                                    <td>{pref.learning_method}</td>
                                    <td>{pref.level}</td>
                                    <td>{pref.language}</td>
                                    <td>{pref.certification}</td>
                                    <td>{pref.course_type}</td>
                                    <td>{pref.course_category}</td>
                                    <td>{pref.course_duration}</td>
                                    <td>{pref.budget}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Preferences;
