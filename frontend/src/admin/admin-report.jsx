import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/report.css'; // Custom CSS
import Topadmin from '../Component/Top-admin';
import Sidebar from '../Component/sidebar';
import { Table, Button } from 'react-bootstrap'; // Import Bootstrap components
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap styles
import { saveAs } from 'file-saver'; // Import file-saver for downloading files

export default function AdminReport() {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch payment data when the component mounts
    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await axios.get('http://localhost:8082/api/payments', { withCredentials: true });
                setReports(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching reports:', error);
                setLoading(false);
            }
        };

        fetchReports();
    }, []);

    // Download CSV file
    const downloadReport = () => {
        const csvContent = [
            ['Transaction Id', 'Price', 'Date', 'Address', 'Phone Number', 'Card Holder Name'],
            ...reports.map(report => [
                report.Transaksi_Id,
                report.Price,
                new Date(report.expiryDate).toLocaleDateString('en-GB'), // Format date as DD/MM/YYYY
                report.address,
                report.phoneNumber,
                report.CardHolderName
            ])
        ]
            .map(e => e.join(','))
            .join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'report.csv');
    };

    return (
        <div>
            <Topadmin />
            <div className="main-admin-report">
                <Sidebar className="report"/>
                <div className="restofreport">
                    <h2>Payment Reports</h2>

                    {/* Download Button */}
                    <Button variant="primary" onClick={downloadReport} className="mb-3">
                        <i className="bi bi-download"></i> Download Report
                    </Button>

                    {/* Report Table */}
                    {loading ? (
                        <p>Loading reports...</p>
                    ) : (
                        <div className="table-responsive">
                            <Table striped bordered hover>
                                <thead className="table-dark">
                                    <tr>
                                        <th>Transaction Id</th>
                                        <th>Price</th>
                                        <th>Date</th>
                                        <th>Address</th>
                                        <th>Phone Number</th>
                                        <th>Card Holder Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reports.map(report => (
                                        <tr key={report.Transaksi_Id}>
                                            <td>{report.Transaksi_Id}</td>
                                            <td>Rp {report.Price}</td>
                                            <td>{new Date(report.expiryDate).toLocaleDateString('en-GB')}</td> {/* Display only date */}
                                            <td>{report.address}</td>
                                            <td>{report.phoneNumber}</td>
                                            <td>{report.CardHolderName}</td>
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
