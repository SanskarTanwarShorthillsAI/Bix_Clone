import React, {useState, useEffect} from 'react';
// import SkuDetails from '../Components/Events_details';
// import { useSelector } from 'react-redux';
// import { Skeleton, Space } from 'antd';
import "./index.css";
// import Tesing from '../Components/Tesing';
// import { Header } from 'antd/es/layout/layout';
import Dashboard from '../Components/Dashboard';
// import sample_payload from '../JsonData/payload 2.json';

export const DefaultDashboard = () => {
  // const [payload, setPayload] = useState(null);
  // const [loading, setLoading] = useState(false);
  // const authToken = useSelector(state => state.auth.token);
  // const [totalCount, setTotalCount] = useState(0);


  // useEffect(() => {
  //   const fetchTotalCount = async () => {
  //     try {
  //         const response = await fetch("https://cvent.shorthills.ai/api/event-count", {
  //         method: 'GET',
  //         headers: {
  //             'Content-Type': 'application/json',
  //             'Authorization': `Token b52a925fa981e14663081a4b548ff7ad34cd6f4a`
  //         },
  //         });
  //         if (response.ok) {
  //         const data = await response.json();
  //         setTotalCount(data.event_count);
  //         } else {
  //         console.error('Failed to fetch total count:', response.status, response.statusText);
  //         }
  //     } catch (error) {
  //         console.error('Error during total count API call:', error);
  //     } finally {
  //         console.log("Total Count", totalCount);
  //     }
  //     };

  //     fetchTotalCount();
  //   }, []);
    
    
  
  return (
    <div className={`App`}>
        <Dashboard />
    </div>
  )
}


export default DefaultDashboard;
