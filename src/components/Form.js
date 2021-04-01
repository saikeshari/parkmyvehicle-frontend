import React from 'react';
import './Form.css'
import axios from 'axios';

class Form extends React.Component
{
    constructor(props)
    {
        super(props)
        {
            this.state = {
                Phone: null,
                Address: "",
                City: "",
                Pincode: "",
                Latitude: null,
                Longitude: null,
                TwoWheelerPrice: null,
                FourWheelerPrice: null,
                TwoWheelerSlots: null,
                FourWheelerSlots:null
            }
            this.validateForm = this.validateForm.bind(this);
            this.ChangeInput = this.ChangeInput.bind(this);
        }
    }
    validateForm()
    {
        console.log("hello");
        //FOrm data
        var phone = this.state.Phone,
            address = this.state.Address,
            city = this.state.City,
            pincode = this.state.Pincode,
            latitude = this.state.Latitude,
            longitude = this.state.Longitude,
            twowheelerprice = this.state.TwoWheelerPrice,
            fourwheelerprice = this.state.FourWheelerPrice,
            twowheelerslots = this.state.TwoWheelerSlots,
            fourwheelerslots = this.state.FourWheelerSlots;
        
        var formdata = {
            phone       :phone,
            address       : address,
            city          :city ,     
            pincode      :pincode,
            latitude      :latitude,
            longitude      :longitude,
            twowheelerprice :twowheelerprice ,     
            fourwheelerprice  : fourwheelerprice  ,    
            twowheelerslots  : twowheelerslots,      
            fourwheelerslots : fourwheelerslots   
        }

        //POSt data
        axios.post('http://localhost:9000/form', formdata)
        .then(function (response) {
        console.log(response);
        })
        .catch(function (error) {
        console.log(error);
        });
    }
    ChangeInput(event)
    {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value });
    }
    render() {
        return (
            <div className="container register">
                <div className="row">
                    <div className="col-md-3 register-left">
                        <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
                        <h3>Welcome</h3>
                        <p>ParkMyVehicle</p>
                        <h2>Fill Your Parking Details</h2>
                    </div>
                    <div className="col-md-9 register-right">
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div className="row register-form">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="text" className="form-control" name="Address" placeholder="Complete Address *" value={this.state.Address}
                                                onChange={(e) => { this.ChangeInput(e) }} />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control" name="City" placeholder="City *" value={this.state.City}
                                                onChange={(e) => { this.ChangeInput(e) }} />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control" name="Pincode" placeholder="Pincode *"
                                                value={this.state.Pincode}
                                                onChange={(e) => { this.ChangeInput(e) }} />
                                        </div>
                                         <div className="form-group">
                                            <input type="text" className="form-control" name="Latitude" placeholder="Latitude Coordinate *" value={this.state.Latitude}
                                                onChange={(e) => { this.ChangeInput(e) }}/>
                                        </div>
                                         <div className="form-group">
                                            <input type="text" className="form-control" name="Longitude" placeholder="Longitude Coordinate *" value={this.state.Longitude}
                                                onChange={(e) => { this.ChangeInput(e) }} />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control" name="Phone" placeholder="Phone No *"
                                                value={this.state.Phone}
                                                onChange={(e) => { this.ChangeInput(e) }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="text" className="form-control" name="TwoWheelerSlots" placeholder="No Of TwoWheelerSlots *" value={this.state.TwoWheelerSlots}
                                                onChange={(e) => { this.ChangeInput(e) }} />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control" name="FourWheelerSlots" placeholder="No Of FourWheelerSlots *" value={this.state.FourWheelerSlots}
                                                onChange={(e) => { this.ChangeInput(e) }} />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control" name="FourWheelerPrice" placeholder="Price Of Four Wheeler Parking" value={this.state.FourWheelerPrice}
                                                onChange={(e) => { this.ChangeInput(e) }} />
                                        </div>
                                       <div className="form-group">
                                            <input type="text" className="form-control" name="TwoWheelerPrice" placeholder="Price Of Two Wheeler Parking" value={this.state.TwoWheelerPrice}
                                                onChange={(e) => { this.ChangeInput(e) }} />
                                        </div>
                                        <input type="submit" className="btnRegister" value="Submit"
                                            onClick={this.validateForm} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
};
export default Form;