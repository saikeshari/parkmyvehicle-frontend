import axios from "axios";

export const createSpots = async (token, data) =>
  await axios.post(`${process.env.REACT_APP_API}/create-spot`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  export const allSpots = () =>
  axios.get(`${process.env.REACT_APP_API}/spots`);

export const sellerSpots = async (token) =>
  await axios.get(`${process.env.REACT_APP_API}/seller-spots`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  export const searchListings = async (query) =>
  await axios.post(`${process.env.REACT_APP_API}/search-listings`, query);
