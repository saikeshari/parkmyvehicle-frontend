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

const DashboardSeller = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false);
  const [Spots, setSpots] = useState([]);

useEffect(() => {
  loadSellerSpots();
}, [])
  
  const loadSellerSpots = async() => {
    let { data } = await sellerSpots(auth.token);
    setSpots(data);
    console.log(data);
  }
  const handleClick = async () => {
    setLoading(true);
    try {
      let res = await createConnectAccount(auth.token);
      console.log(res); // get login link
    } catch (err) {
      console.log(err);
      toast.error("Stripe connect failed, Try again.");
      setLoading(false);
    }
  };

  const connected = () => (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-10">
          <h2>Your Parking Spots</h2>
        </div>
        <div className="col-md-2">
          <Link to="/parkings/new" className="btn btn-primary">
            + Add New
          </Link>
        </div>
      </div>
      {Spots ? 
      Spots.map((Spot) => {
        return(
          <Card style={{ width: '18rem' }}>
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
            <Card.Body>
               {Spot.image && Spot.image.contentType ? (
              <img
                src={`${process.env.REACT_APP_API}/spot/image/${Spot._id}`}
                alt="default hotel image"
                className="card-image img img-fluid"
              />
            ) : (
              <img
                src="https://via.placeholder.com/900x500.png?text=MERN+Booking"
                alt="default hotel image"
                className="card-image img img-fluid"
              />
            )}
              <Card.Title>{Spot.title}</Card.Title>
              <Card.Text>
                {Spot.content}
                <br/>
                Posted By : {Spot.postedBy.name}
                <br/>
                Available slots : {Spot.slots}
              </Card.Text>
              <Button variant="primary">See More</Button>
            </Card.Body>
          </Card>
        )
      })
      :<></>}
      {console.log(Spots)}
      {/* <div className="row"><pre>{JSON.stringify(Spots,null,4)}</pre></div> */}
    </div>
  );

  const notConnected = () => (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 offset-md-3 text-center">
          <div className="p-5 pointer">
            <HomeOutlined className="h1" />
            <h4>Setup payouts to List Parking Spots</h4>
            <p className="lead">
              MERN partners with stripe to transfer earnings to your bank
              account
            </p>
            <button
              disabled={loading}
              onClick={handleClick}
              className="btn btn-primary mb-3"
            >
              {loading ? "Processing..." : "Setup Payouts"}
            </button>
            <p className="text-muted">
              <small>
                You'll be redirected to Stripe to complete the onboarding
                process.
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="container-fluid bg-secondary p-5">
        <ConnectNav />
      </div>

      <div className="container-fluid p-4">
        <DashboardNav />
      </div>

      {auth &&
      auth.user &&
      auth.user.stripe_seller &&
      auth.user.stripe_seller.charges_enabled
        ? connected()
        : connected()}

      {/* <pre>{JSON.stringify(auth, null, 4)}</pre> */}
    </>
  );
};

export default DashboardSeller;
