import React, { useState} from 'react';
import { Table} from 'antd';
import Header from './Header';
import "./Events_details.css";

// Custom sorting function to handle null values and strings
const sortColumn = (a, b, sortOrder) => {
  if (sortOrder === 'ascend') {
    if (a === null && b === null) return -1;
    if (a === null) return -1;
    if (b === null) return 1;
    // Handle string comparison for Event_Name
    if (typeof a === 'string' && typeof b === 'string') {
      return a.localeCompare(b);
    }
    return a - b;
  } else {
    if (a === null && b === null) return 1;
    if (a === null) return 1;
    if (b === null) return -1;
    // Handle string comparison for Event_Name
    if (typeof a === 'string' && typeof b === 'string') {
      return b.localeCompare(a);
    }
    return b - a;
  }
};

const SkuDetails = (props) => {
  
  const [selectedSkus, setSelectedSkus] = useState([]);
  const Table_Data = props.payload != null ? props.payload.dashboard_data ? props.payload.dashboard_data: [] : [];
  // const Sorted_columns = props.payload != null ? props.payload.dashboard_data.sort_metrics : [];
  const Sorted_columns = ['Event_Name'];



  // Define the columns dynamically based on the keys of the first data row
  const dynamicColumns = Table_Data && Table_Data.length > 0 ? Object.keys(Table_Data[0]).map((key) => ({
    title: key,
    dataIndex: key,
    width: key === 'Amazon Title'? 120 : 30,
    align: key === 'Amazon Title'? '' : "center",
    sorter: Sorted_columns ? (Sorted_columns.includes(key) ? ((a, b) => sortColumn(a[key], b[key])) : null) : null,
    render: (text) => {
      // If the column is "Event/Registration Link"
      if (key === 'Event/Registration Link') {
        // If the link exists
        if (text) {
          return <a href={text} target="_blank" rel="noopener noreferrer">Click me</a>;
        }
        // If the link does not exist
        return '';
      }
      // Render other columns as text
      return text;
    }
  })) : [];

  // Filter the table data based on selected SKUs
  const filteredTableData = selectedSkus && selectedSkus.length > 0 ?
    Table_Data.filter(item => selectedSkus.includes(item.SKU)) :
    Table_Data;

  console.log("Filtered values",filteredTableData);


  return (
    <div>
      <div className='SKU-Details'>
        <Header title="Events Details" />
      </div>
        {
          Table_Data.length  ? 
          (
            <div className='sku-details'>
              <Table
                rowClassName={()=>"rowClassName"}
                className="category-review-table"
                columns={dynamicColumns}
                dataSource={filteredTableData}
                size="middle"
                // pagination={false}
                
                // bordered
                scroll={{ x: 2030, y: 700 }} 
                />
            </div>
          ) :
          (<div>
              Sorry, no data found for the given date.
          </div>) 
          
          }
          
    </div>
  );
};

export default SkuDetails;
