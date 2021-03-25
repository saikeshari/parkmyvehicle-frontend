/* This will let you use the .remove() function later on */
if (!("remove" in Element.prototype)) {
  Element.prototype.remove = function () {
    if (this.parentNode) {
      this.parentNode.removeChild(this);
    }
  };
}

mapboxgl.accessToken =
  "pk.eyJ1Ijoia2FydGlrdG9tYXIxIiwiYSI6ImNrbWRzZHVudDJvZGgyb3AxZXR6MDh3ZHIifQ.yeQTxEb-npif6WJdpr3FrA";

/**
 * Add the map to the page
 */
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/light-v10",
  center: [77.239624, 28.638396],
  zoom: 13,
  scrollZoom: false
});

var stores = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [77.2197924, 28.6313827]
      },
      properties: {
        phoneFormatted: "9878364839",
        phone: "9878364839",
        address: "CP New Delhi Main circle",
        city: "Delhi",
        country: "India",
        crossStreet: "Connaught Place",
        postalCode: "110091",
        state: "New Delhi"
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [77.2197924, 28.6413827]
      },
      properties: {
        phoneFormatted: "9878214839",
        phone: "9878323839",
        address: "Paharganj Road",
        city: "Delhi",
        country: "India",
        crossStreet: "Paharganj",
        postalCode: "110091",
        state: "New Delhi"
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [77.2145,28.6233]
      },
      properties: {
        phoneFormatted: "011 – 23742795",
        phone: "011 – 23742795",
        address: "Ashoka Road, Sansad Marg, Crossing, New Delhi, Delhi 110001",
        city: "New Delhi",
        country: "India",
        crossStreet: "Patel Chowk Metro Station",
        postalCode: "110011",
        state: "New Delhi"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [77.2194,28.6330]
      },
      properties: {
        phoneFormatted: "011 – 23742795",
        phone: "011 – 23742795",
        address: "Block F, Connaught Place, New Delhi, Delhi 110001",
        city: "New Delhi",
        country: "India",
        crossStreet: "Rajiv Chowk Metro Station",
        postalCode: "110011",
        state: "New Delhi"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [77.2410,28.6562]
      },
      properties: {
        phoneFormatted: "011 – 23984795",
        phone: "011 – 23948795",
        address: "Netaji Subhash Marg, Lal Qila, Chandni Chowk",
        city: "New Delhi",
        country: "India",
        crossStreet: "Lal Qila Parking",
        postalCode: "110006",
        state: "New Delhi"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [77.2432,28.6379]
      },
      properties: {
        phoneFormatted: "011 – 56984795",
        phone: "011 – 563948795",
        address: "Jawaharlal Nehru Marg, Feroze Shah Kotla, Raj Ghat",
        city: "New Delhi",
        country: "India",
        crossStreet: "Stadium Parking",
        postalCode: "110002",
        state: "New Delhi"
      }
    }
  ]
};

/**
 * Assign a unique id to each store. You'll use this `id`
 * later to associate each point on the map with a listing
 * in the sidebar.
 */
stores.features.forEach(function (store, i) {
  store.properties.id = i;
});

/**
 * Wait until the map loads to make changes to the map.
 */
map.on("load", function (e) {
  /**
   * This is where your '.addLayer()' used to be, instead
   * add only the source without styling a layer
   */
  map.addSource("places", {
    type: "geojson",
    data: stores
  });

  /**
   * Create a new MapboxGeocoder instance.
   */
  var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    marker: true,
    bbox: [68.1766451354, 7.96553477623, 97.4025614766, 35.4940095078]
  });

  /**
   * Add all the things to the page:
   * - The location listings on the side of the page
   * - The search box (MapboxGeocoder) onto the map
   * - The markers onto the map
   */
  buildLocationList(stores);
  map.addControl(geocoder, "top-left");
  map.addControl(new mapboxgl.NavigationControl(),"top-right");
  addMarkers();

  /**
   * Listen for when a geocoder result is returned. When one is returned:
   * - Calculate distances
   * - Sort stores by distance
   * - Rebuild the listings
   * - Adjust the map camera
   * - Open a popup for the closest store
   * - Highlight the listing for the closest store.
   */
  geocoder.on("result", function (ev) {
    /* Get the coordinate of the search result */
    var searchResult = ev.result.geometry;

    /**
     * Calculate distances:
     * For each store, use turf.disance to calculate the distance
     * in miles between the searchResult and the store. Assign the
     * calculated value to a property called `distance`.
     */
    var options = { units: "kilometers" };
    stores.features.forEach(function (store) {
      Object.defineProperty(store.properties, "distance", {
        value: turf.distance(searchResult, store.geometry, options),
        writable: true,
        enumerable: true,
        configurable: true
      });
    });

    /**
     * Sort stores by distance from closest to the `searchResult`
     * to furthest.
     */
    stores.features.sort(function (a, b) {
      if (a.properties.distance > b.properties.distance) {
        return 1;
      }
      if (a.properties.distance < b.properties.distance) {
        return -1;
      }
      return 0; // a must be equal to b
    });

    /**
     * Rebuild the listings:
     * Remove the existing listings and build the location
     * list again using the newly sorted stores.
     */
    var listings = document.getElementById("listings");
    while (listings.firstChild) {
      listings.removeChild(listings.firstChild);
    }
    buildLocationList(stores);

    /* Open a popup for the closest store. */
    createPopUp(stores.features[0]);

    /** Highlight the listing for the closest store. */
    var activeListing = document.getElementById(
      "listing-" + stores.features[0].properties.id
    );
    activeListing.classList.add("active");

    /**
     * Adjust the map camera:
     * Get a bbox that contains both the geocoder result and
     * the closest store. Fit the bounds to that bbox.
     */
    var bbox = getBbox(stores, 0, searchResult);
    map.fitBounds(bbox, {
      padding: 100
    });
  });
});

/**
 * Using the coordinates (lng, lat) for
 * (1) the search result and
 * (2) the closest store
 * construct a bbox that will contain both points
 */
function getBbox(sortedStores, storeIdentifier, searchResult) {
  var lats = [
    sortedStores.features[storeIdentifier].geometry.coordinates[1],
    searchResult.coordinates[1]
  ];
  var lons = [
    sortedStores.features[storeIdentifier].geometry.coordinates[0],
    searchResult.coordinates[0]
  ];
  var sortedLons = lons.sort(function (a, b) {
    if (a > b) {
      return 1;
    }
    if (a.distance < b.distance) {
      return -1;
    }
    return 0;
  });
  var sortedLats = lats.sort(function (a, b) {
    if (a > b) {
      return 1;
    }
    if (a.distance < b.distance) {
      return -1;
    }
    return 0;
  });
  return [
    [sortedLons[0], sortedLats[0]],
    [sortedLons[1], sortedLats[1]]
  ];
}

/**
 * Add a marker to the map for every store listing.
 **/
function addMarkers() {
  /* For each feature in the GeoJSON object above: */
  stores.features.forEach(function (marker) {
    /* Create a div element for the marker. */
    var el = document.createElement("div");
    /* Assign a unique `id` to the marker. */
    el.id = "marker-" + marker.properties.id;
    /* Assign the `marker` class to each marker for styling. */
    el.className = "marker";

    /**
     * Create a marker using the div element
     * defined above and add it to the map.
     **/
    new mapboxgl.Marker(el, { offset: [0, -23] })
      .setLngLat(marker.geometry.coordinates)
      .addTo(map);

    /**
     * Listen to the element and when it is clicked, do three things:
     * 1. Fly to the point
     * 2. Close all other popups and display popup for clicked store
     * 3. Highlight listing in sidebar (and remove highlight for all other listings)
     **/
    el.addEventListener("click", function (e) {
      flyToStore(marker);
      createPopUp(marker);
      var activeItem = document.getElementsByClassName("active");
      e.stopPropagation();
      if (activeItem[0]) {
        activeItem[0].classList.remove("active");
      }
      var listing = document.getElementById("listing-" + marker.properties.id);
      listing.classList.add("active");
    });
  });
}

/**
 * Add a listing for each store to the sidebar.
 **/
function buildLocationList(data) {
  data.features.forEach(function (store, i) {
    /**
     * Create a shortcut for `store.properties`,
     * which will be used several times below.
     **/
    var prop = store.properties;

    /* Add a new listing section to the sidebar. */
    var listings = document.getElementById("listings");
    var listing = listings.appendChild(document.createElement("div"));
    /* Assign a unique `id` to the listing. */
    listing.id = "listing-" + prop.id;
    /* Assign the `item` class to each listing for styling. */
    listing.className = "item";

    /* Add the link to the individual listing created above. */
    var link = listing.appendChild(document.createElement("a"));
    link.href = "#";
    link.className = "title";
    link.id = "link-" + prop.id;
    link.innerHTML = prop.address;

    /* Add details to the individual listing. */
    var details = listing.appendChild(document.createElement("div"));
    details.innerHTML = prop.city;
    if (prop.phone) {
      details.innerHTML += " &middot; " + prop.phoneFormatted;
    }
    if (prop.distance) {
      var roundedDistance = Math.round(prop.distance * 100) / 100;
      details.innerHTML +=
        "<p><strong>" + roundedDistance + " kilometers away</strong></p>";
    }

    /**
     * Listen to the element and when it is clicked, do four things:
     * 1. Update the `currentFeature` to the store associated with the clicked link
     * 2. Fly to the point
     * 3. Close all other popups and display popup for clicked store
     * 4. Highlight listing in sidebar (and remove highlight for all other listings)
     **/
    link.addEventListener("click", function (e) {
      for (var i = 0; i < data.features.length; i++) {
        if (this.id === "link-" + data.features[i].properties.id) {
          var clickedListing = data.features[i];
          flyToStore(clickedListing);
          createPopUp(clickedListing);
        }
      }
      var activeItem = document.getElementsByClassName("active");
      if (activeItem[0]) {
        activeItem[0].classList.remove("active");
      }
      this.parentNode.classList.add("active");
    });
  });
}

/**
 * Use Mapbox GL JS's `flyTo` to move the camera smoothly
 * a given center point.
 **/
function flyToStore(currentFeature) {
  map.flyTo({
    center: currentFeature.geometry.coordinates,
    zoom: 15
  });
}

/**
 * Create a Mapbox GL JS `Popup`.
 **/
function createPopUp(currentFeature) {
  var popUps = document.getElementsByClassName("mapboxgl-popup");
  if (popUps[0]) popUps[0].remove();

  var popup = new mapboxgl.Popup({ closeOnClick: false })
    .setLngLat(currentFeature.geometry.coordinates)
    .setHTML(
      "<h3>Parking Spot</h3>" +
        "<h4>" +
        currentFeature.properties.address +
        "</h4>"
    )
    .addTo(map);
}