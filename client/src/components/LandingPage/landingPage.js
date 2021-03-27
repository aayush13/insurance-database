import React, { useState } from 'react';
import {Input, Button, Table, Space} from 'antd';
import {AiOutlineSearch} from 'react-icons/ai'
import "antd/dist/antd.css";
import './styles.css';
// const { Space} = antd
const Search = Input;

const columns = [
    {
      title: 'Policy Id',
      dataIndex: 'Policy_id',
      key: 'Policy_id',
    },
    {
        title: 'Date of Purchase',
        dataIndex: 'Date of Purchase',
        key: 'Date of Purchase',
    },
    {
      title: 'Customer Id',
      dataIndex: 'Customer_id',
      key: 'Customer_id',
    },
];
const LandingPage = () => {
    const url = "http://localhost:5000/routes/getClientDetails/"
    const [searchResults, setSearchResults] = useState([]);
    
    let searchRecord = (value) => {
        console.log(document.getElementById('search').value);
        let key = document.getElementById('search').value
        fetch(url+key)
        .then(response => {
            return response.json();
        })
        .then(res => {
            console.log(res.data);
            setSearchResults(res.data);
        })

    }
    return (
        <div className="search-page">
            <div className="search-bar">
    
                <div><Search placeholder="input search text" id ="search" /></div>
                <div><Button type="primary" icon={<AiOutlineSearch />} onClick={searchRecord} /></div>
            </div>
            <div>{searchResults.length>0 ? (<Table scroll={{  y: 300 }} columns={columns} dataSource={searchResults} pagination={false}/>):(null)}</div>
        </div>
    )
}

export default LandingPage;