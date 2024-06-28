import React from 'react';
// import { useSelector } from 'react-redux';

const Tesing = (props) => {

    // const authToken = useSelector(state => state.auth.token, (prevToken, nextToken) => prevToken === nextToken);
    // const [totalCount, setTotalCount] = useState(0);

    console.log("Testing is called");
    // console.log("Auth Token", authToken);
  
  return (
    <div>{props.totalCounts}</div>
  )
}

export default Tesing