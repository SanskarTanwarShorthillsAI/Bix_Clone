import React from 'react';
import { Card } from 'antd';
import { DollarOutlined, SyncOutlined, CloudOutlined, ExclamationOutlined, RedoOutlined, TeamOutlined, UserOutlined, UserDeleteOutlined, UserAddOutlined, AlertOutlined, MessageOutlined } from '@ant-design/icons';
import Header from './Header';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import data from '../JsonData/DashboardJSON.json';

// Mapping keys to their corresponding labels, icons, and colors
const dashboardMapping = {
    monthly_total_collection: { label: 'Monthly Total Collection', icon: <DollarOutlined />, color: '#f7942c' },
    today_collection: { label: 'Today Collection', icon: <DollarOutlined />, color: '#f7942c' },
    total_pending_amount: { label: 'Total Pending Amount', icon: <DollarOutlined />, color: '#f7942c' },
    monthly_online_collection: { label: 'Monthly Online Collection', icon: <DollarOutlined />, color: '#f7942c' },
    today_renewals: { label: 'Today Renewals', icon: <SyncOutlined />, color: '#062434' },
    upcoming_renewals: { label: 'Upcoming Renewals', icon: <CloudOutlined />, color: '#062434' },
    expired_renewals: { label: 'Expired Renewals', icon: <ExclamationOutlined />, color: '#062434' },
    recharged: { label: 'Recharged', icon: <RedoOutlined />, color: '#062434' },
    total_customers: { label: 'Total Customers', icon: <TeamOutlined />, color: '#009688' },
    active_customers: { label: 'Total Active Customers', icon: <UserOutlined />, color: '#009688' },
    inactive_customers: { label: 'Total Inactive Customers', icon: <UserDeleteOutlined />, color: '#009688' },
    current_month_new_customers: { label: 'This Month New Customers', icon: <UserAddOutlined />, color: '#009688' },
    total_pending_complaints: { label: 'Total Pending Complaints', icon: <AlertOutlined />, color: '#73afd3' },
    today_followup_customers: { label: 'Today Followup Customers', icon: <MessageOutlined />, color: '#73afd3' }
};

const ActionMapping = {
    add_customer: { label: 'Add Customer', icon: <UserAddOutlined />, color: '#f7942c' },
    add_product: { label: 'Add Product', icon: <DollarOutlined />, color: '#062434' },
    profile_details: { label: 'Profile Details', icon: <DollarOutlined />, color: '#009688' },
}



const Dashboard = () => {
    const navigate = useNavigate(); // Use useNavigate hook
    const dashboardData = data.dashboard_data;

    const handleClick = (key) => {
        // Navigate to '/customer' or any other desired route
        navigate('/customer');
        console.log(key);
      };

    return (
        <div>
            <Header title="Dashboard" />

            <div className="Dashboard-card-wrapper">
                {Object.entries(dashboardData).map(([key, value], index) => (
                    <Card
                        className="custom-card"
                        style={{
                            borderLeft: `5px solid ${dashboardMapping[key].color}`,
                            //   boxShadow: `3px 0 8px 0 ${dashboardMapping[key].color}`
                        }}
                        title={
                            <div className="custom-card-title" style={{ color: "#869db5" }}>
                                <span>{dashboardMapping[key].label}</span>
                            </div>
                        }
                        bordered={false}
                        key={index}
                        onClick={() => handleClick(key)}
                    >
                        <div className="custom-card-value" style={{ color: "#103e6e" }}>{value}</div>
                        <div className="custom-card-icon">{React.cloneElement(dashboardMapping[key].icon, { style: { color: dashboardMapping[key].color } })}</div>
                    </Card>
                ))}
            </div>

            <Card
                className="custom-card action-card"
                title="Actions"


            >

                <div className='Dashboard-card-wrapper'>
                    {
                        Object.entries(ActionMapping).map(([key, value], index) => (
                            <Card
                                className="custom-card"
                                style={{
                                    borderLeft: `5px solid ${ActionMapping[key].color}`,
                                }}
                                title={
                                    <div className="custom-card-title" style={{ color: "#869db5" }}>
                                        <span>{ActionMapping[key].label}</span>
                                    </div>
                                }
                                // bordered={false}
                                key={index}
                            >
                                <div className="custom-card-icon">{React.cloneElement(ActionMapping[key].icon, { style: { color: ActionMapping[key].color } })}</div>
                            </Card>
                        ))
                    }
                </div>

            </Card>


        </div>
    );
};

export default Dashboard;
