import React, { useState } from 'react';
import { Table, Button, notification, Input, Select, DatePicker } from 'antd';
import { DownloadOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';

const { Option } = Select;

const Customer = () => {
  // Sample data for demonstration
  const initialData = [
    { SCode: 'Bp_deepak305', Name: 'bp_deepak305', Hardware: '', Balance: '₹ 0', Area: 'Baprola', LastBillAmount: '₹ 4800', Expired: '11-Feb-2025', Status: 'Active' },
    { SCode: 'Bp_jitender320', Name: 'bp_jitender320', Hardware: '', Balance: '₹ 0', Area: 'Baprola', LastBillAmount: '₹ 4800', Expired: '13-Mar-2025', Status: 'Active' },
    { SCode: 'Bp_sandhya', Name: 'Sandhya tiwari', Hardware: '', Balance: '₹ 0', Area: 'Baprola', LastBillAmount: '₹ 500', Expired: '05-Feb-2023', Status: 'Inactive' },
    // Add more data as needed
  ];

  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [balanceFilter, setBalanceFilter] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);
  const [areaFilter, setAreaFilter] = useState(null);
  const [dateFilter, setDateFilter] = useState(null);

  const columns = [
    { title: 'S.CODE', dataIndex: 'SCode', key: 'SCode' },
    { title: 'NAME', dataIndex: 'Name', key: 'Name' },
    { title: 'HARDWARE', dataIndex: 'Hardware', key: 'Hardware' },
    { title: 'BALANCE', dataIndex: 'Balance', key: 'Balance' },
    { title: 'AREA', dataIndex: 'Area', key: 'Area' },
    { title: 'LAST BILL AMOUNT', dataIndex: 'LastBillAmount', key: 'LastBillAmount' },
    { title: 'EXPIRED', dataIndex: 'Expired', key: 'Expired' },
    { title: 'STATUS', dataIndex: 'Status', key: 'Status' },
    {
      title: 'ACTION',
      key: 'action',
      render: (_, record) => (
        <Button type="link" onClick={() => showDetail(record)}>
          Detail
        </Button>
      ),
    },
  ];

  const [api, contextHolder] = notification.useNotification();
  const openNotification = () => {
    api.open({
      message: 'Error',
      description: 'Sorry, no data found for the given date',
      duration: 3,
      icon: (
        <ExclamationCircleOutlined
          style={{
            color: 'orange',
          }}
        />
      ),
    });
  };

  const downloadCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Customers');
    XLSX.writeFile(workbook, 'customers.xlsx');
  };

  const showDetail = (record) => {
    // Implement detail view functionality
    console.log('Detail for:', record);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filteredData = initialData.filter(item => item.Name.toLowerCase().includes(value));
    setData(filteredData);
  };

  const handleFilterChange = () => {
    let filteredData = initialData;

    if (balanceFilter) {
      filteredData = filteredData.filter(item => item.Balance.includes(balanceFilter));
    }
    if (statusFilter) {
      filteredData = filteredData.filter(item => item.Status === statusFilter);
    }
    if (areaFilter) {
      filteredData = filteredData.filter(item => item.Area === areaFilter);
    }
    if (dateFilter) {
      filteredData = filteredData.filter(item => new Date(item.Expired) <= new Date(dateFilter));
    }

    setData(filteredData);
  };

  return (
    <div>
      {contextHolder}
      <div style={{ padding: '20px' }}>
        <h1>Customers</h1>
        <div style={{ marginBottom: '20px' }}>
          <Input
            placeholder="Search for..."
            value={searchTerm}
            onChange={handleSearch}
            style={{ marginBottom: '20px', width: '300px' }}
          />
          <Select placeholder="Select Balance" onChange={value => setBalanceFilter(value)} style={{ width: '200px', marginRight: '10px' }}>
            <Option value="₹ 0">₹ 0</Option>
            <Option value="₹ 4800">₹ 4800</Option>
          </Select>
          <Select placeholder="Select Status" onChange={value => setStatusFilter(value)} style={{ width: '200px', marginRight: '10px' }}>
            <Option value="Active">Active</Option>
            <Option value="Inactive">Inactive</Option>
          </Select>
          <Select placeholder="Select Area" onChange={value => setAreaFilter(value)} style={{ width: '200px', marginRight: '10px' }}>
            <Option value="Baprola">Baprola</Option>
            <Option value="CISF Camp">CISF Camp</Option>
          </Select>
          <DatePicker placeholder="Select Date For Renewal/Expired" onChange={(date, dateString) => setDateFilter(dateString)} style={{ marginRight: '10px' }} />
          <Button onClick={handleFilterChange}>Apply</Button>
          <Button onClick={() => setData(initialData)} style={{ marginLeft: '10px' }}>Reset</Button>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <Button type="primary" icon={<DownloadOutlined />} onClick={data.length > 0 ? downloadCSV : openNotification}>
            Download as Excel
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          rowKey="SCode"
        />
      </div>
    </div>
  );
};

export default Customer;
