import './css/top.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

export default function Topadmin() {
    const navigate = useNavigate(); // Initialize the useNavigate hook

    const handleMessagesClick = () => {
        navigate('/admin-Messages'); // Navigate to the "/messages" route
    };

    return (
        <div className="top">
            <div className="admin-header">
                
                
                {/* Message icon */}
                <i
                    className="bi bi-envelope"
                    style={{ fontSize: '24px', color: 'white', cursor: 'pointer' }}
                    onClick={handleMessagesClick} // Click handler for navigating to the messages page
                    title="Messages" // Tooltip text
                />

                <i className="bi bi-person-circle" style={{ fontSize: '24px', color: 'white' }} />
                <span style={{ color: 'white', fontSize: '24px', marginRight: '20px' }}>Admin</span>
            </div>
        </div>
    );
}
