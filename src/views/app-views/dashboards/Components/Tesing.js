import React from 'react';
// import { useSelector } from 'react-redux';

const Tesing = (props) => {

    // const authToken = useSelector(state => state.auth.token, (prevToken, nextToken) => prevToken === nextToken);
    // const [totalCount, setTotalCount] = useState(0);

    // useEffect(() => {
    //     fetchTotalCount();
    //   }, []);
    
    // const fetchTotalCount = async () => {
    // try {
    //     const response = await fetch("https://cvent.shorthills.ai/api/event-count", {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Token b52a925fa981e14663081a4b548ff7ad34cd6f4a`
    //     },
    //     });
    //     if (response.ok) {
    //     const data = await response.json();
    //     setTotalCount(data.event_count);
    //     } else {
    //     console.error('Failed to fetch total count:', response.status, response.statusText);
    //     }
    // } catch (error) {
    //     console.error('Error during total count API call:', error);
    // } finally {
    //     console.log("Total Count", totalCount);
    // }
    // };
    // fetchTotalCount();
    console.log("Testing is called");
    // console.log("Auth Token", authToken);
  return (
    <div>{props.totalCounts}</div>
  )
}

export default Tesing