import React, { useState, useEffect, useMemo, useCallback }  from 'react';
import { FormControl, Select, MenuItem } from "@material-ui/core";
import Infobox from "./Infobox";
import { MapContainer, TileLayer } from "react-leaflet";
// import Map from "./Map";
import "./Map.css";
import "leaflet/dist/leaflet.css";
import { showDataOnMap } from "./util";

function PageMap({ casesType, setCasesType }) {
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState("worldwide");
    const [countryInfo, setCountryInfo] = useState({});
    const [mapCountries, setMapCountries] = useState([]);

    const mapDefaultLat = 22.3737889;
    const mapDefaultLong = 114.142338;
    const mapDefaultZoom = 11;
    let mapCenter = [ mapDefaultLat, mapDefaultLong ];
    let mapZoom = mapDefaultZoom;

    useEffect(() => {
        fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
            setMapCountries(data);

            const countries = data.map((item) => ({
                name: item.country,
                value: item.countryInfo.iso2
            }));

            setCountries(countries);
        });

        fetch("https://disease.sh/v3/covid-19/all")
        .then((response) => response.json())
        .then((data) => {
            setCountryInfo(data);
        })
    }, []);

    const onCountryChange = async (e) => {
        const countryCode = e.target.value;
        const url = 
        countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

        await fetch(url)
        .then((response) => response.json())
        .then((data) => {
            setCountry(countryCode);
            console.log(data);
            setCountryInfo(data);

            if (countryCode === "worldwide") {
                mapCenter = [mapDefaultLat, mapDefaultLong];
                mapZoom = mapDefaultZoom;
            } else {
                mapCenter = [data.countryInfo.lat, data.countryInfo.long];
                mapZoom = 5;
            }
            map.setView(mapCenter, mapZoom);
        });
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
            {/* Loop through all countries and draw circles on map */}
            {showDataOnMap(mapCountries, casesType)}
        </MapContainer>
        ),
        [mapCenter, mapZoom, mapCountries, casesType],
    );

    return (
        <div className="pageMap">
            {/* Left */}
            <div className="pageMap__left">
                {/* Infobox */}
                <div className="pageMap__stats">
                    <Infobox 
                        title = "Confirmed" 
                        value = "cases"
                        active = {casesType === "cases"} 
                        cases = {countryInfo.todayCases} 
                        total = {countryInfo.cases} 
                        onClick = {(e) => setCasesType("cases")} 
                    />
                    <Infobox  
                        title = "Recovered" 
                        value = "recovered"
                        active = {casesType === "recovered"} 
                        cases = {countryInfo.todayRecovered} 
                        total = {countryInfo.recovered} 
                        onClick = {(e) => setCasesType("recovered")} 
                    />
                    <Infobox 
                        title = "Deaths" 
                        value = "deaths"
                        active = {casesType === "deaths"} 
                        cases = {countryInfo.todayDeaths} 
                        total = {countryInfo.deaths} 
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
                        <Select variant="outlined" value={country} onChange={onCountryChange}>
                            <MenuItem value="worldwide">Worldwide</MenuItem>
                            {
                            countries.map((country) => (
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
                        countries={mapCountries}
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
