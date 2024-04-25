import { useEffect } from "react";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { deleteOfflineReadApi, retrieveOfflineReadApi } from "../api/endPointsApi";
import { useAuth } from "../security/authContext";

export default function Request() {
    const [hasRequest, setHasRequest] = useState(false);
    const [requests, setRequests] = useState([{}]);
    const authContext = useAuth();
    const navigate = useNavigate();
    useEffect(()=>{
        authContext.refresh()
        retrieveOfflineReadApi()
            .then((response)=>{
                setHasRequest(response.data.length > 0)
                setRequests(response.data)
            })
            .catch((error)=>navigate('/error'))
    },[authContext,navigate])
    function handleAccept(user_id,book_id) {
        navigate(`/accept-borrow/${user_id}/${book_id}`)
    }
    function handleCancel(user_id,book_id,title) {
        deleteOfflineReadApi(user_id,book_id,title)
            .then((response)=>window.location.href = '/requests')
            .catch((error)=>navigate('/error'))
    }
    return (
        <div className="container mt-4">
            <h2>Requests for borrow</h2>
            <hr />
            <table className="table">
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th>Contact Info</th>
                        <th>Book Title</th>
                        <th>Borrow From</th>
                    </tr>
                </thead>
                <tbody>
                    {hasRequest &&
                        requests.map(
                            (request, key) => (
                                <tr key={key}>
                                    <td>{request.name}</td>
                                    <td>{request.email}</td>
                                    <td>{request.title}</td>
                                    <td>{request.start_date}</td>
                                    <button className="btn btn-success px-3 mx-2 mb-2" onClick={() => handleCancel(request.user_id,request.book_id,request.title)}>Cancel</button>
                                    <button className="btn btn-warning mb-2" onClick={() => handleAccept(request.user_id,request.book_id)}>Accept</button>
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}