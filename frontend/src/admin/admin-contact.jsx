import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../Component/sidebar";
import Topadmin from "../Component/Top-admin";
import { Table, Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap icons
import './css/user.css'; // Additional custom CSS if needed

export default function AdminMessages() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedMessages, setSelectedMessages] = useState([]); // Track selected messages

    // Fetch messages when the component mounts
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get('http://localhost:8082/api/messages', { withCredentials: true });
                setMessages(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching messages:', error);
                setLoading(false);
            }
        };

        fetchMessages();
    }, []);

    // Handle search query change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Filter messages based on search query
    const filteredMessages = messages.filter(message =>
        message.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        message.email_or_phone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        message.message?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Handle selection of checkboxes
    const handleSelectMessage = (messageId) => {
        if (selectedMessages.includes(messageId)) {
            setSelectedMessages(selectedMessages.filter(id => id !== messageId));
        } else {
            setSelectedMessages([...selectedMessages, messageId]);
        }
    };

    // Handle the "Select All" checkbox
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedMessages(filteredMessages.map(m => m.message_id)); // Select all filtered messages
        } else {
            setSelectedMessages([]); // Clear all selections
        }
    };

    // Remove selected messages
    const removeMessages = async () => {
        try {
            await Promise.all(
                selectedMessages.map(async (messageId) => {
                    await axios.delete(`http://localhost:8082/api/contact/${messageId}`, { withCredentials: true });
                })
            );
            // Update the front-end after deletion
            setMessages(messages.filter(message => !selectedMessages.includes(message.message_id)));
            setSelectedMessages([]); // Clear selected messages after deletion
        } catch (error) {
            console.error('Error deleting messages:', error);
        }
    };

    return (
        <div className="admin-page-container">
            <Topadmin />
            <div className="admin-user-main">
                <Sidebar />
                <div className="restof">
                    <h2>Messages</h2>

                    {/* Search bar and delete button */}
                    <div className="d-flex justify-content-between mb-3">
                        <InputGroup className="w-75">
                            <FormControl
                                placeholder="Search by Name, Email/Phone, or Message"
                                aria-label="Search"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </InputGroup>
                        <Button
                            className="remove-user custom-small-btn"
                            onClick={removeMessages}
                            disabled={selectedMessages.length === 0} // Disable button if no messages are selected
                        >
                            <i className="bi bi-trash"></i> Remove Selected
                        </Button>
                    </div>

                    {/* Messages Table */}
                    {loading ? (
                        <p>Loading messages...</p>
                    ) : (
                        <div className="table-responsive">
                            <Table striped bordered hover>
                                <thead className="table-dark">
                                    <tr>
                                        <th>
                                            <Form.Check
                                                type="checkbox"
                                                id="select-all"
                                                onChange={handleSelectAll}
                                                checked={selectedMessages.length === filteredMessages.length && filteredMessages.length > 0}
                                            />
                                        </th>
                                        <th>Name</th>
                                        <th>Email/Phone</th>
                                        <th>Message</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredMessages.map(message => (
                                        <tr key={message.message_id}>
                                            <td>
                                                <Form.Check
                                                    type="checkbox"
                                                    checked={selectedMessages.includes(message.message_id)}
                                                    onChange={() => handleSelectMessage(message.message_id)}
                                                />
                                            </td>
                                            <td>{message.name}</td>
                                            <td>{message.email_or_phone}</td>
                                            <td>{message.message}</td>
                                            <td>{new Date(message.created_at).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
