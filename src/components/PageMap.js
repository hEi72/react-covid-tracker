import React, { useState, useEffect, useMemo, useCallback }  from 'react';
import { FormControl, Select, MenuItem } from "@material-ui/core";
import L, { MapContainer, TileLayer, useMap } from "react-leaflet";
import db from '../firebase';
// import Map from "./Map";

import Infobox from "./Infobox";

import "../stylesheets/Map.css";
import "leaflet/dist/leaflet.css";
const geofire = require('geofire-common');

// import { showDataOnMap } from "../util";

function PageMap({ casesType, setCasesType }) {
    const [districts, setDistricts] = useState([]);
    const [district, setDistrict] = useState("district");
    const [districtInfo, setDistrictInfo] = useState({});
    const [mapDistricts, setMapDistricts] = useState([]);
    const [hidden, setHidden] = useState(false);

    const mapDefaultLat = 22.3737889;
    const mapDefaultLong = 114.142338;
    const mapDefaultZoom = 11;
    let mapCenter = [ mapDefaultLat, mapDefaultLong ];
    let mapZoom = mapDefaultZoom;

    const mapRef = useMap();
    // effects that only run once when page loads
    useEffect(() => {

        // // Compute the GeoHash for a lat/lng point
        // const lat = 51.5074;
        // const lng = 0.1278;
        // const hash = geofire.geohashForLocation([lat, lng]);
        //
        // // Add the hash and the lat/lng to the document. We will use the hash
        // // for queries and the lat/lng for distance comparisons.
        // const londonRef = db.collection('cities').doc('LON');
        // londonRef.update({
        //     geohash: hash,
        //     lat: lat,
        //     lng: lng
        // }).then(() => {
        //     // ...
        // });
        var heat = mapRef.heatLayer([
            [50.5, 30.5, 0.2], // lat, lng, intensity[50.6, 30.4, 0.5]
        ], {radius: 25}).addTo(map);



        db.collection("districts").orderBy("name").get().then((snapshot) => {
            const docs = snapshot.docs;
            setMapDistricts(docs);

            const districts = docs.map((doc) => ({
                name: doc.data().name,
                value: doc.data().iso2,
            }));
            setDistricts(districts);
        });

        fetch("https://disease.sh/v3/covid-19/countries/hk")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setDistrictInfo(data);
            });
    }, []);

    useEffect(() => {
        if(!!casesType) {
            setHidden(true);
            setTimeout(()=> {
                setHidden(false);
            }, 100);
        }
    }, [casesType]);

    const onDistrictChange = async (e) => {
        const districtCode = e.target.value;
        if (districtCode === "district") {
            mapCenter = [mapDefaultLat, mapDefaultLong];
            mapZoom = mapDefaultZoom;
            map.setView(mapCenter, mapZoom);
        } else {
            db.collection("districts").where("iso2", "==", districtCode)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        // doc.data() is never undefined for query doc snapshots
                        const data = doc.data();

                        setDistrict(districtCode);
                        // setDistrictInfo(data);

                        mapCenter = [data.lat, data.lng];
                        mapZoom = data.zoom;
                        map.setView(mapCenter, mapZoom);
                    });
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
        };
    };

    //! Map
    const [map, setMap] = useState(null);

    const displayMap = useMemo(
    // const displayMap = useEffect(
        () => (
        <MapContainer center={mapCenter} zoom={mapZoom} scrollWheelZoom={false} whenCreated={setMap}>
            <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* Loop through all districts and draw circles on map */}
            {/*{!hidden && showDataOnMap(mapCountries, casesType)}*/}
        </MapContainer>
        ),
        [mapCenter, mapZoom, mapDistricts, casesType],
    );

    return (
        <div className="pageMap">
            {/* Left */}
            <div className="pageMap__left">
                {/* Infobox */}
                <div className="pageMap__stats">
                    <Infobox 
                        title = "Confirmed" 
                        value = "confirmed"
                        active = {casesType === "confirmed"}
                        cases = {districtInfo.todayCases}
                        total = {districtInfo.cases}
                        onClick = {(e) => setCasesType("confirmed")}
                    />
                    <Infobox  
                        title = "Recovered" 
                        value = "recovered"
                        active = {casesType === "recovered"} 
                        cases = {districtInfo.todayRecovered}
                        total = {districtInfo.recovered}
                        onClick = {(e) => setCasesType("recovered")} 
                    />
                    <Infobox 
                        title = "Deaths" 
                        value = "deaths"
                        active = {casesType === "deaths"} 
                        cases = {districtInfo.todayDeaths}
                        total = {districtInfo.deaths}
                        onClick = {(e) => setCasesType("deaths")} 
                    />
                </div>
            </div>

            {/* Right */}
            <div className="pageMap__right">
                <div className="pageMap__topBar">
                    {/* Individual & Area risk score */}
                    <div className="pageMap__topBar__riskScores">
                        <div>
                            <h3>Individual Risk Score</h3>
                            <h4>75</h4>
                        </div>
                        <div>
                            <h3>Area Risk Score</h3>
                            <h4>53</h4>
                        </div>
                    </div>
                    {/* Dropdown */}
                    <FormControl className="pageMap__dropdown">
                        <Select variant="outlined" value={district} onChange={onDistrictChange}>
                            <MenuItem value="district">District</MenuItem>
                            {
                            districts.map((country) => (
                                <MenuItem value={country.value}>{country.name}</MenuItem>
                            ))
                            }
                        </Select>
                    </FormControl>
                </div>

                {/* Map */}
                <div className="pageMap__map">
                    {displayMap}
                    {/* <Map
                        districts={mapCountries}
                        casesType={casesType}
                        center={mapCenter}
                        zoom={mapZoom}
                    /> */}
                </div>
            </div>
        </div>
    )
}

export default PageMap
