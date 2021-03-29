import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import {Button} from 'antd';
import editActions from '../../actions/editActions'
import {connect} from 'react-redux';
import {schema} from '../../constants/formSchema';
import './styles.css';
import 'react-toastify/dist/ReactToastify.css';

const EditPage = (props) => {
    const [recordKeys, setRecordKeys] = useState([]);
    useEffect(() =>{
        let keys = Object.keys(props.editRecord);
        props.updatePageRef(2);
        setRecordKeys(keys)
        //console.log(props);
    }, []);

    //validate premium value
    let validatePremium = (evt) => {
        //console.log(evt.target.value);
        if(parseInt(evt.target.value) > 1000000) {
            evt.target.value = 1000000;
        }
    }

    //create dynamic form
    let getForm = () =>{
        let form = recordKeys.map((entry,index) => {
            if(entry === '_id'){
                return (
                null)
            } else if(entry ==="Date of Purchase"){
                return (
                    <div key={index} style={{width:'50%', padding:'1%', display:'flex'}}>
                        <label style={{width:'28%',textAlign:'right',paddingRight:'2%'}}>{schema[entry]}</label>
                        <input id={entry} value={props.editRecord[entry]} name={entry} disabled></input>
                    </div>
                )
            } else if(entry ==="Premium"){
                return (
                    <div key={index} style={{width:'50%', padding:'1%', display:'flex'}}>
                        <label style={{width:'28%',textAlign:'right',paddingRight:'2%'}}>{schema[entry]}</label>
                        <input type='number' max='1000000' id={entry} defaultValue={props.editRecord[entry]} name={entry} onChange={validatePremium}></input>
                    </div>
                )
            } else {
                return (
                    <div key={index} style={{width:'50%', padding:'1%', display:'flex'}}>
                        <label style={{width:'28%',textAlign:'right',paddingRight:'2%'}}>{schema[entry]}</label>
                        <input id={entry} defaultValue={props.editRecord[entry]} name={entry}/>
                    </div>
                ) 
            }
        })
        return form;
    }

    // edit client details
    let updateData = () => {
        const url = "http://localhost:5000/routes/updateData"
        let updatedValues = recordKeys.map((entry,index)=> {
            if(entry === '_id' || entry === 'Date of Purchase'){
                return [entry, props.editRecord[entry]];
            } else {
                return [entry,document.getElementById(entry).value];
            }
        })
        let updatedDocument = JSON.stringify(Object.fromEntries(updatedValues))
        fetch(url,{
            method: 'POST',
            body: (updatedDocument),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then((response) => {
            return response.json();
        }).then((res)=> {
            if(res.status===200)
                toast.success("Update Successfull!");
            else 
                toast.error("Error in updating data");
        })
    }
    return (
        <div>
            <ToastContainer 
                position='top-center'
                autoClose={5000}
                closeOnClick={true}
            />
            <div><h1>Edit Customer Data</h1></div>
            <div class="form">{getForm()}</div>
            <div className="updateButton"><Button style={{marginRight:'20%'}} type="primary" shape="round" size='large' onClick={()=> updateData()} >Update</Button></div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
    editRecord : state.edit.editRecord,
    pageRef : state.edit.pageRef,
}}
export default connect(mapStateToProps,editActions)(EditPage);

