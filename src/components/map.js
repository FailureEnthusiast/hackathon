import React from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { formatRelative } from "date-fns";
import { MDBContainer, MDBRow, MDBCol,MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import { Link } from "react-router-dom"

//import mapStyles from "./mapStyles";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};

const center = {
  lat: 36.7783,
  lng: -119.4179,
}

// const options = {
//   styles: mapStyles,
// }

function Map() {
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [markers, setMarkers] =React.useState([]);

  //to see info on pin
  const [selected, setSelected ] = React.useState(null);

  const onMapClick = React.useCallback((e) => {
    setMarkers((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      },
    ]);
  }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, [])

  if (loadError) return "error loading maps";
  if (!isLoaded) return "Loading Maps";
return (
  <div>
      <div className="Map-logo">
    <h1>TrackYourTruck {" "} <MDBIcon icon="truck-moving" /></h1>
    <Link to="/">
    <MDBBtn style={{ backgroundColor: '#808080'}}
    >Home Page
    </MDBBtn>
    </Link>
    </div>
    <GoogleMap mapContainerStyle={mapContainerStyle} 
    zoom={8} 
    center={center} 
    //options={options}
    onClick={onMapClick}
    onLoad={onMapLoad}
    >
      {markers.map((marker) => (
        <Marker
        key={marker.time.toISOString()}
        position={{ lat: marker.lat, lng: marker.lng }}
        onClick={() => {
          setSelected(marker)
        }}
        />
      ))}

{selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h2>
                Recomended Stop
              </h2>
              <p> Drivers Name stopped here {formatRelative(selected.time, new Date())}</p>
            </div>
          </InfoWindow>
        ) : null}
    </GoogleMap>
  </div>
);
};

export default Map;


