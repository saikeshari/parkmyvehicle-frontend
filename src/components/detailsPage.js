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
import { sellerSpots } from '../actions/parking'
import {Card,Button} from 'react-bootstrap'

const Details = (props) => {
  const [parkingObj, setParkingObj] = useState(props.location.state.parkingObj);
  useEffect(() => {
    console.log(props.location.state.parkingObj)
  }, [])
    return (
      <Card style={{ width: '48rem' }}>
        <Card.Body>

        <Card.Title>
            {parkingObj.title}
        </Card.Title>
        <Card.Text>
                Posted By : Nidhi Kamewar
                <br/>
                Location : {parkingObj.location}
                <br/>
                Price : {parkingObj.price}
                <br/>
                From : {parkingObj.from}
                <br/>
                To : {parkingObj.to}
                <br/>
                Slots : {parkingObj.slots}
        </Card.Text>
              <Button variant="primary">Confirm Booking and Pay now</Button>
        </Card.Body>
      </Card>
    );

}


 export default Details;
