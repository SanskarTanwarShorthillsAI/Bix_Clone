import React, { useState } from 'react';
import { Table, Button, notification, Input, Modal, Form, Upload } from 'antd';
import { DownloadOutlined, ExclamationCircleOutlined, PlusOutlined, UploadOutlined, SearchOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import { set } from 'lodash';
const{Search}=Input;

const Product = () => {
  // Sample data for demonstration
  const initialData = [
    { Id: '10157555', Name: '100M_12M_12000', Rate: '12000 + 0%', Status: 'Active' },
    { Id: '11577555', Name: '100M_12M_4800', Rate: '4800 + 0%', Status: 'Active' },
    { Id: '11575545', Name: '100M_12M_5000', Rate: '5000 + 0%', Status: 'Active' },
    { Id: '15775545', Name: '100M_3M_1200', Rate: '1200 + 0%', Status: 'Active' },
    { Id: '15275545', Name: '100M_6M_2500', Rate: '2500 + 0%', Status: 'Inactive' },
    // Add more data as needed
  ];

  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isImportModalVisible, setIsImportModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const columns = [
    { title: 'S.No', dataIndex: 'Id', key: 'Id' },
    { title: 'Name', dataIndex: 'Name', key: 'Name' },
    {
      title: 'Rate',
      dataIndex: 'Rate',
      key: 'Rate',
      render: text => <div style={{ backgroundColor: 'black', color: 'white' }}>{text}</div>,
    },
    {
      title: 'Status',
      dataIndex: 'Status',
      key: 'Status',
      render: text => <div style={{ color: text === 'Active' ? 'green' : 'red' }}>{text}</div>,
    },
    {
      title: 'Action',
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
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');
    XLSX.writeFile(workbook, 'products.xlsx');
  };

  const showDetail = (record) => {
    // Implement detail view functionality
    console.log('Detail for:', record);
  };

  const handleSearch = (values) => {
    const value = values.toLowerCase();
    const filteredData = initialData.filter(item => item.Name.toLowerCase().includes(value));
    setData(filteredData);
  };

  const handleAddNewProduct = () => {
    setIsAddModalVisible(true);
  };

  const handleImportProducts = () => {
    setIsImportModalVisible(true);
  };

  const handleAddSubmit = (values) => {
    setLoading(true);
    setTimeout(() => {
      setData([...data, values]);
      setIsAddModalVisible(false);
      setLoading(false);
    }, 1000); // Simulate a delay for loading effect
  };

  const handleImportSubmit = (file) => {
    setUploading(true);
    setTimeout(() => {
        const reader = new FileReader();
        reader.onload = (e) => {
        const binaryStr = e.target.result;
        const workbook = XLSX.read(binaryStr, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const importedData = XLSX.utils.sheet_to_json(worksheet);
        setData([...data, ...importedData]);
        };
        reader.readAsArrayBuffer(file);
        setUploading(false);
        setIsImportModalVisible(false);
    }, 1000); // Simulate a delay for loading effect
  };
//   const onSearch = (value, _e, info) => console.log(info?.source, value);
  return (
    <div>
      {contextHolder}
      <div style={{ padding: '20px' }}>
        <h1>Products</h1>
        <div style={{ marginBottom: '20px' }}>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAddNewProduct} style={{ marginRight: '10px' }}>
            Add New Product
          </Button>
          <Button type="primary" icon={<UploadOutlined />} onClick={handleImportProducts}>
            Import Products
          </Button>
        </div>
        {/* <Input
          placeholder="Search for..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginBottom: '20px', width: '300px' }}
          addonAfter={<Button icon={<SearchOutlined />} onClick={handleSearch} />}
        /> */}
            <Search
                placeholder="input search text"
                allowClear
                onSearch={handleSearch}
                style={{
                    width: "80vw",
                    marginBottom: '20px'
                }}
            />
        <div style={{ marginBottom: '20px' }}>
          <Button type="primary" icon={<DownloadOutlined />} onClick={data.length > 0 ? downloadCSV : openNotification}>
            Download as Excel
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          rowKey="Id"
        />
      </div>
      <Modal
        title="Add New Product"
        open={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        footer={null}
      >
        <Form onFinish={handleAddSubmit}>
          <Form.Item name="Id" label="S.No" rules={[{ required: true, message: 'Please input S.No!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="Name" label="Name" rules={[{ required: true, message: 'Please input Name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="Rate" label="Rate" rules={[{ required: true, message: 'Please input Rate!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="Status" label="Status" rules={[{ required: true, message: 'Please input Status!' }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit " loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Import Products"
        open={isImportModalVisible}
        onCancel={() => setIsImportModalVisible(false)}
        footer={null}
      >
        <Upload beforeUpload={handleImportSubmit} showUploadList={false}>
          <Button icon={<UploadOutlined />} loading={uploading}
          >Click to Upload</Button>
        </Upload>
      </Modal>
    </div>
  );
};

export default Product;
