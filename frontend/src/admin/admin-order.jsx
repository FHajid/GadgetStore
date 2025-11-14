import React, { useState, useEffect } from "react"; 
import axios from "axios";
import Sidebar from "../Component/sidebar";
import Topadmin from "../Component/Top-admin";
import { Table, Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Make sure Bootstrap icons are included
import './css/order.css'; // Additional custom CSS if needed

export default function AdminOrder() {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingOrderStatus, setUpdatingOrderStatus] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedPayments, setSelectedPayments] = useState([]);

    // Fetch payments when the component mounts
    useEffect(() => {
        fetchPayments();
    }, []);

    // Fetch payments data
    const fetchPayments = async () => {
        try {
            const response = await axios.get('http://localhost:8082/api/payments', { withCredentials: true });
            setPayments(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching payments:', error);
            setLoading(false);
        }
    };

    // Handle order status change
    const handleStatusChange = async (paymentId, newStatus) => {
        console.log('Attempting to update status for paymentId:', paymentId, 'to newStatus:', newStatus);
        setUpdatingOrderStatus(true);
        try {
            // Make the PUT request to update the status
            await axios.put(`http://localhost:8082/api/payments/${paymentId}/status`, { status: newStatus });
            console.log('Status update successful');
            
            // Update the payment status locally without fetching again
            setPayments(prevPayments =>
                prevPayments.map(payment =>
                    payment.Payment_Id === paymentId
                        ? { ...payment, orderStatus: newStatus }
                        : payment
                )
            );
        } catch (error) {
            console.error('Error updating order status:', error);
        } finally {
            setUpdatingOrderStatus(false);
        }
    };

    // Handle selection of checkboxes
    const handleSelect = (paymentId) => {
        setSelectedPayments(prevSelectedPayments =>
            prevSelectedPayments.includes(paymentId)
                ? prevSelectedPayments.filter(id => id !== paymentId)
                : [...prevSelectedPayments, paymentId]
        );
    };

    // Handle search query change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Filter payments based on search query
    const filteredPayments = payments.filter(payment =>
        payment.Transaksi_Id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.CardHolderName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Helper function to format the date to show only date, month, and year
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB'); // Format to DD/MM/YYYY
    };

    // Helper function to apply class based on order status
    const getOrderStatusClass = (status) => {
        switch (status?.toLowerCase()) {
            case 'packing':
                return 'bg-secondary text-white';
            case 'delivered':
                return 'bg-warning text-dark';
            case 'done':
                return 'bg-success text-white';
            default:
                return 'bg-secondary text-white'; // Default to 'Packing' style if undefined
        }
    };

    // Clear search input
    const clearSearch = () => {
        setSearchQuery(''); // Clear the input field
    };

    // Remove selected payments
    const removeSelectedPayments = async () => {
        try {
            await Promise.all(
                selectedPayments.map(async (paymentId) => {
                    await axios.delete(`http://localhost:8082/api/payments/${paymentId}`, { withCredentials: true });
                })
            );
            setSelectedPayments([]); // Clear the selected payments
            fetchPayments(); // Refresh payments list after deletion
        } catch (error) {
            console.error('Error removing selected payments:', error);
        }
    };

    return (
        <div className="admin-page-container">
            <Topadmin />
            <div className="admin-order-main">
                <Sidebar />
                <div className="restof">
                    <h2>Orders</h2>

                    {/* Search and Filter */}
                    <div className="d-flex justify-content-between mb-3">
                        <InputGroup className="w-75"> {/* Adjust the width of the search box */}
                            <FormControl
                                placeholder="Search by Transaction ID, Address, or Cardholder Name"
                                aria-label="Search"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </InputGroup>
                        <div className="d-flex">
                            <Button variant="outline-secondary" className="clear-search-btn" onClick={clearSearch}>
                                <i className="bi bi-x-circle"></i> {/* Bootstrap icon */}
                            </Button>
                            <Button 
                                variant="danger" 
                                className="remove-order ms-2" 
                                onClick={removeSelectedPayments}
                                disabled={selectedPayments.length === 0}
                            >
                                <i className="bi bi-trash"></i> Remove 
                            </Button>
                        </div>
                    </div>

                    {loading ? (
                        <p>Loading payments...</p>
                    ) : (
                        <div className="table-responsive" style={{ maxHeight: '450px', overflowY: 'auto' }}>
                            <Table striped bordered hover className="payments-table">
                                <thead className="table-dark">
                                    <tr>
                                        <th>
                                            <Form.Check // Add a "select all" checkbox
                                                type="checkbox"
                                                id="select-all"
                                                onChange={(e) =>
                                                    setSelectedPayments(
                                                        e.target.checked ? payments.map(p => p.Payment_Id) : []
                                                    )
                                                }
                                                checked={selectedPayments.length === payments.length}
                                            />
                                        </th>
                                        <th>Transaction ID</th>
                                        <th>Price</th>
                                        <th>Payment Status</th>
                                        <th>Order Status</th>
                                        <th>Expiry Date</th>
                                        <th>Address</th>
                                        <th>Phone Number</th>
                                        <th>Cardholder Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredPayments.map(payment => (
                                        <tr key={payment.Payment_Id}>
                                            <td>
                                                <Form.Check
                                                    type="checkbox"
                                                    checked={selectedPayments.includes(payment.Payment_Id)}
                                                    onChange={() => handleSelect(payment.Payment_Id)}
                                                />
                                            </td>
                                            <td>{payment.Transaksi_Id}</td>
                                            <td>Rp {payment.Price}</td>
                                            <td className="payment-status bg-success text-white">
                                                Paid
                                            </td>
                                            <td>
                                                <div className={getOrderStatusClass(payment.orderStatus || 'Packing')}>
                                                    {payment.orderStatus || 'Packing'}
                                                </div>
                                                <Form.Select
                                                    className="mt-1"
                                                    value={payment.orderStatus || 'Packing'}
                                                    onChange={(e) =>
                                                        handleStatusChange(
                                                            payment.Payment_Id,
                                                            e.target.value
                                                        )
                                                    }
                                                    disabled={updatingOrderStatus}
                                                >
                                                    <option value="Packing">Packing</option>
                                                    <option value="Delivered">Delivered</option>
                                                    <option value="Done">Done</option>
                                                </Form.Select>
                                            </td>
                                            <td>{formatDate(payment.expiryDate)}</td>
                                            <td>{payment.address}</td>
                                            <td>{payment.phoneNumber}</td>
                                            <td>{payment.CardHolderName}</td>
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
