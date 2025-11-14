import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../Component/sidebar";
import Topadmin from "../Component/Top-admin";
import { Table, Form, Button, InputGroup, FormControl, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './css/user.css';

export default function AdminUser() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [editUserData, setEditUserData] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    // Fetch users when the component mounts
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8082/api/users', { withCredentials: true });
                setUsers(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching users:', error);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // Handle search query change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Filter users based on search query
    const filteredUsers = users.filter(user =>
        user.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.Email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Handle selection of checkboxes
    const handleSelect = (userId) => {
        if (selectedUsers.includes(userId)) {
            setSelectedUsers(selectedUsers.filter(id => id !== userId));
        } else {
            setSelectedUsers([...selectedUsers, userId]);
        }
    };

    // Remove selected users
    const removeUsers = async () => {
        try {
            await Promise.all(
                selectedUsers.map(async (userId) => {
                    await axios.delete(`http://localhost:8082/api/users/${userId}`, { withCredentials: true });
                })
            );
            setUsers(users.filter(user => !selectedUsers.includes(user.Login_Id)));
            setSelectedUsers([]); // Clear selected users
        } catch (error) {
            console.error('Error removing users:', error);
        }
    };

    // Open edit user modal
    const openEditModal = (user) => {
        setEditUserData(user);
        setShowEditModal(true);
    };

    // Close edit modal
    const handleClose = () => {
        setShowEditModal(false);
        setEditUserData(null);
    };

    // Handle user edit submission
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const updatedUser = {
            ...editUserData
        };
        
        try {
            await axios.put(`http://localhost:8082/api/users/${updatedUser.Login_Id}`, updatedUser, { withCredentials: true });
            setUsers(users.map(user => (user.Login_Id === updatedUser.Login_Id ? updatedUser : user)));
            handleClose();
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <div className="admin-page-container">
            <Topadmin />
            <div className="admin-user-main">
                <Sidebar />
                <div className="restof">
                    <h2>Users</h2>

                    {/* Search and Filter */}
                    <div className="d-flex justify-content-between mb-3">
                        <InputGroup className="w-75">
                            <FormControl
                                placeholder="Search by Name or Email"
                                aria-label="Search"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </InputGroup>
                        <Button
                            className="remove-user custom-small-btn"
                            onClick={removeUsers}
                            disabled={selectedUsers.length === 0} // Disable button if no users are selected
                        >
                            <i className="bi bi-trash"></i> Remove 
                        </Button>
                        <Button
                            className="edit-user custom-small-btn"
                            onClick={() => {
                                if (selectedUsers.length === 1) {
                                    const userToEdit = users.find(user => user.Login_Id === selectedUsers[0]);
                                    openEditModal(userToEdit);
                                }
                            }}
                            disabled={selectedUsers.length !== 1} // Enable only if exactly one user is selected
                        >
                            <i className="bi bi-pencil"></i> Edit 
                        </Button>
                    </div>

                    {loading ? (
                        <p>Loading users...</p>
                    ) : (
                        <div className="table-responsive">
                            <Table striped bordered hover>
                                <thead className="table-dark">
                                    <tr>
                                        <th>
                                            <Form.Check
                                                type="checkbox"
                                                id="select-all"
                                                onChange={(e) =>
                                                    setSelectedUsers(
                                                        e.target.checked ? users.map(u => u.Login_Id) : []
                                                    )
                                                }
                                                checked={selectedUsers.length === users.length}
                                            />
                                        </th>
                                        <th>Name</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.map(user => (
                                        <tr key={user.Login_Id}>
                                            <td>
                                                <Form.Check
                                                    type="checkbox"
                                                    checked={selectedUsers.includes(user.Login_Id)}
                                                    onChange={() => handleSelect(user.Login_Id)}
                                                />
                                            </td>
                                            <td>{user.Name}</td>
                                            <td>{user.Email}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    )}
                </div>
            </div>

            {/* Edit User Modal */}
            <Modal show={showEditModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {editUserData && (
                        <form onSubmit={handleEditSubmit}>
                            <div className="form-group">
                                <label>Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={editUserData.Name}
                                    onChange={(e) => setEditUserData({ ...editUserData, Name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={editUserData.Email}
                                    onChange={(e) => setEditUserData({ ...editUserData, Email: e.target.value })}
                                    required
                                />
                            </div>
                            <Button type="submit" variant="primary">Save Changes</Button>
                        </form>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
}
