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

const Details = () => {
    return (
      <Card style={{ width: '48rem' }}>
        <Card.Body>

        <Card.Title>
            Parking Spot - 3
        </Card.Title>
        <Card.Text>
                Posted By : Nidhi Kamewar
                <br/>
                Location : Sector-8 mansarovar
                <br/>
                Price : 100
                <br/>
                From : 2021-04-08T00:00:00.000Z
                <br/>
                To : 2021-04-09T00:00:00.000Z
                <br/>
                Slots : 10
        </Card.Text>
              <Button variant="primary">Confirm Booking and Pay now</Button>
        </Card.Body>
      </Card>
    );

}


 export default Details;
