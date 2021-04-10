//Child component - Display the data
import React from 'react';
import Header from '../components/Header.js';

import { useState ,useEffect } from "react";
import DashboardNav from "../components/DashboardNav";
import ConnectNav from "../components/ConnectNav";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { HomeOutlined } from "@ant-design/icons";
import { createConnectAccount } from "../actions/stripe";
import { toast } from "react-toastify";
import queryString from "query-string";
import { sellerSpots } from '../actions/parking'
import { Card, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const Details = (props) => {
   const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;

  const history = useHistory(); 
  const [parkingObj, setParkingObj] = useState(props.location.state.parkingObj);
  const [date, setDate] = useState("");
  useEffect(() => {
    const { date } = queryString.parse(window.location.search);
    // useState(date);
    const dates = date.split(",");
    setDate(dates);
    console.log("PArking obj=====", parkingObj);
    console.log(props.location.state.parkingObj)
  }, []);
  const handleSubmit = () => {
      // toast.success("Booked Successfully");
      setTimeout(() => {
        history.push(`/payment`,{
          parkingObj:parkingObj,
          date:date
        });
      }, 1000);
    
    
    // axios.post(`${process.env.REACT_APP_API}/details`, parkingObj, {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // });
  }
    return (
      <Card style={{border:'none',marginTop:'4rem' }}>
        <Card.Body>

        <Card.Title style={{fontSize:'3rem'}}>
            {parkingObj.title}
        </Card.Title>
        <Card.Text style={{fontSize:'1.5rem'}}>
                Location : {parkingObj.location}
                <br/>
                {parkingObj.content}
                <br/>
                Price : {parkingObj.price}
                <br/>
                From : {date[0]}
                <br/>
                To : {date[1]}
                <br/>
                Slots : {parkingObj.slots}
        </Card.Text>
          <Button variant="primary" onClick={handleSubmit}>
            Confirm Booking and Pay now</Button>
        </Card.Body>
      </Card>
    );

}


 export default Details;
