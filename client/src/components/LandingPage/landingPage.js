import React, { useState, useEffect } from 'react';
import {Input, Button, Table, Space} from 'antd';
import {Link} from 'react-router-dom';
import editActions from '../../actions/editActions'
import {AiOutlineSearch} from 'react-icons/ai';
import {BiEditAlt} from 'react-icons/bi';
import {FaSpinner} from 'react-icons/fa';
import {connect} from 'react-redux';
import "antd/dist/antd.css";
import './styles.css';
const Search = Input;

const LandingPage = (props) => {
    // table header mapping
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
        {
            title: 'Customer Gender',
            dataIndex: 'Customer_Gender',
            key: 'Customer_Gender',
        },
        {
            title: 'Vehicle Segment',
            dataIndex: 'VEHICLE_SEGMENT',
            key: 'VEHICLE_SEGMENT',
        },
        {
            title: 'Fuel',
            dataIndex: 'Fuel',
            key: 'Fuel',
        },
        {
            title: 'Premium',
            dataIndex: 'Premium',
            key: 'Premium',
        },
        {
            title: 'Body Injury Liability',
            dataIndex: 'bodily injury liability',
            key: 'bodily injury liability',
        },
        {
            title: 'Personal Injury Protection',
            dataIndex: ' personal injury protection',
            key: 'personal injury protection',
        },
        {
            title: 'Property Damage Liability',
            dataIndex: ' property damage liability',
            key: ' property damage liability',
        },
        {
            title: 'Collision Protection',
            dataIndex: ' collision',
            key: ' collision',
        },
        {
            title: 'Customer Region',
            dataIndex: 'Customer_Region',
            key: 'Customer_Region',
        },
        {
            title: 'Customer Income',
            dataIndex: 'Customer_Income group',
            key: 'Customer_Income',
        },
        {
            title: 'Marital Status',
            dataIndex: 'Customer_Marital_status',
            key: 'Customer_Marital_status',
        },
        {
            title: '    ',
            key: 'Edit',
            render: (text, record, index) => navToEdit (record)
        }    
        
    ];

    const [searchResults, setSearchResults] = useState([]);
    useEffect(() =>{
        props.updatePageRef(1);
    }, []);

    // edit button functionality
    let navToEdit = (data) => {
        return (
            <Link to="/editData"><span onClick={(e)=>{
                console.log(data);
                props.setRecord(data);
            }} style={{color: "blue", fontSize: '3vh',cursor: 'pointer'}}><BiEditAlt /></span></Link>
        )
    }
    let searchRecord = (value) => {
        setSearchResults(null)
        const url = "http://localhost:5000/routes/getClientDetails/"
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
            <div>{searchResults === null? (<span className="loading-table"><FaSpinner /></span>): searchResults.length >0 ? (<Table scroll={{  y: 300 }} columns={columns} dataSource={searchResults} pagination={false}/>):(null)}</div>
        </div>
    )
}
const mapStateToProps = (state) => ({
    editRecord : state.edit.editRecord,
    pageRef : state.edit.pageRef,
});

export default connect(mapStateToProps,editActions)(LandingPage);