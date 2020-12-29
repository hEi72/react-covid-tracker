import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

// circle style dict
const casesCircleConfig = {
    cases: {
        hex: "#CC1034", 
        rgb: "rgb(204, 16, 52)", 
        multiplier: 800
    }, 
    recovered: {
        hex: "#7DD71D", 
        rgb: "rgb(125, 215, 19)", 
        multiplier: 1200
    }, 
    deaths: {
        hex: "#555", 
        rgb: "rgb(251, 68, 67)", 
        multiplier: 2000
    }
}

// sort function
export const sortData = (data) => {
    const sortedData = [...data];

    return sortedData.sort((a, b) => (b.cases - a.cases));
};

// format stat numbers
export const prettyPrintCases = (stat) => (
    stat ? `+${numeral(stat).format("0.0a")}` : "+0"
);
export const prettyPrintTotal = (stat) => (
    stat ? numeral(stat).format("0.0a") : "0"
);

// display circles on map
export const showDataOnMap = (data, casesType) => {
    return data.map((item) => (
        <Circle 
            center={[item.countryInfo.lat, item.countryInfo.long]}
            fillOpacity={0.4}
            color={casesCircleConfig[casesType].hex}
            fillColor={casesCircleConfig[casesType].hex}
            radius={Math.sqrt(item[casesType]) * casesCircleConfig[casesType].multiplier}
        >
            
            <Popup>
                <div className="popup__container">
                    <div className="popup__flag" style={{ backgroundImage: `url(${item.countryInfo.flag})` }}></div>
                    <div className="popup__name">{item.country}</div>
                    <div className="popup__cases">Cases: {numeral(item.cases).format("0,0")}</div>
                    <div className="popup__recovered">Recovered: {numeral(item.recovered).format("0,0")}</div>
                    <div className="popup__deaths">Deaths: {numeral(item.deaths).format("0,0")}</div>
                </div>
            </Popup>
        </Circle>
    ))
};