import { useState, useEffect } from "react";
import queryString from "query-string";
import { Link } from "react-router-dom";
import { searchListings } from "../actions/parking";

const SearchResult = () => {
  // state
  const [searchLocation, setSearchLocation] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchSlots, setSearchSlots] = useState("");
  const [spots, setSpots] = useState([]);
  // when component mounts, get search params from url and use to send search query to backend
  useEffect(() => {
    const { date } = queryString.parse(window.location.search);
    // console.table({ location, date, bed });
    searchListings({ date}).then((res) => {
      console.log("SEARCH RESULTS ===>", res.data);
      setSpots(res.data);
    });
  }, [window.location.search]);

  return (
    <>
          <div className="col">
               <div className="row">{JSON.stringify(spots, null, 4)}</div>
      </div>
    </>
  );
};

export default SearchResult;
