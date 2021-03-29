import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import editActions from '../../actions/editActions';
import { Select, Spin} from 'antd';
import {FaSpinner} from 'react-icons/fa';
import {Bar } from 'react-chartjs-2';
import './styles.css';
const Option = Select;
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"]

const Charts = (props) => {
    useEffect(() =>{
        props.updatePageRef(3);
    }, []);
    const url = "http://localhost:5000/routes/policyChartData?area="
    const [chartData, setChartData] = useState(null); 
    const handleChange = (value) => {
        setChartData([]);
        fetch(url+value)
        .then(response => {
            return response.json();
        })
        .then(res =>{
            let policiesByMonth = new Array(12);
            policiesByMonth.fill(0);
            res.data.map(value => {
                let index = parseInt(value["_id"].replace('/',''));
                policiesByMonth[index-1] = value.numberofbookings;
            })
            //console.log(policiesByMonth);
            setChartData(policiesByMonth);
        })
    }

    return (
        <div className="chart-root">
            <div className="sub-title"><h2>Number of Policies per month</h2></div>
            <div>
                <span style={{fontSize:'4vh'}}>Region  </span>
                <Select style={{ width: '15%' }} onChange={handleChange} placeholder="Select a Region">
                    <Option value="North">NORTH</Option>
                    <Option value="South">SOUTH</Option>
                    <Option value="East">EAST</Option>
                    <Option value="West">WEST</Option>
                </Select>
            </div>
            {chartData === null ? (null):chartData.length>0 ?(<div><Bar
                    data={{
                    labels: MONTHS,
                    datasets: [
                        {
                        data: chartData,
                        label: "# of Policies",
                        borderColor: "#3333ff",
                        fill: true,
                        backgroundColor: "#5a8cd6"
                        },

                    ],
                    }}
                />
            </div>):(<span className="loading-icon"><FaSpinner /></span>)}
        </div>
    )
}

const mapStateToProps = (state) => ({
    editRecord : state.edit.editRecord,
    pageRef : state.edit.pageRef,
});

export default connect(mapStateToProps,editActions)(Charts);