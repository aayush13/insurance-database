import React from 'react';
import {Link} from 'react-router-dom';
import {IoLogoBuffer} from 'react-icons/io'
import {FaUserAlt} from 'react-icons/fa';
import {BsBarChart} from 'react-icons/bs';
import './styles.css';

const Header = () => {
    return (
        <div className="header-root">
            <div className="logo" title="Company Name"><i><IoLogoBuffer/></i></div>
            <div className="header-title"><h1></h1></div>
            <div className="user" title="User">
            <div style={{padding: '0% 2%'}}><Link to='/charts'><BsBarChart /></Link></div>
            <div style={{padding: '0% 2%'}}><FaUserAlt /></div>
            </div>
        </div>
    )
}

export default Header