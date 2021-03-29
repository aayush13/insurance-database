import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {IoLogoBuffer} from 'react-icons/io'
import {FaUserAlt} from 'react-icons/fa';
import {BiHome} from 'react-icons/bi';
import {BsBarChart} from 'react-icons/bs';
import './styles.css';
import { OmitProps } from 'antd/lib/transfer/ListBody';

const Header = (props) => {
    return (
        <div className="header-root">
            <div className="logo" title="Company Name"><Link to="/"><i><IoLogoBuffer/></i></Link></div>
            <div className="header-title"><h1></h1></div>
            <div className="user" title="User">
            {props.pageRef != 1 ? (<div style={{padding: '0% 2%'}}><Link to='/'><BiHome /></Link></div>):null}
            {props.pageRef != 3 ? (<div style={{padding: '0% 2%'}}><Link to='/charts'><BsBarChart /></Link></div>):null}
            <div style={{padding: '0% 2%'}}><FaUserAlt /></div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
    editRecord : state.edit.editRecord,
    pageRef : state.edit.pageRef,
}}
export default connect(mapStateToProps,null)(Header);