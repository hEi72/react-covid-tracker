import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";
import db from "./firebase";

// circle style dict
// const casesCircleConfig = {
//     cases: {
//         hex: "#CC1034",
//         rgb: "rgb(204, 16, 52)",
//         multiplier: 800
//     },
//     recovered: {
//         hex: "#7DD71D",
//         rgb: "rgb(125, 215, 19)",
//         multiplier: 1200
//     },
//     deaths: {
//         hex: "#555",
//         rgb: "rgb(251, 68, 67)",
//         multiplier: 2000
//     }
// }

// sort function
export const sortData = (data) => {
    const sortedData = [...data];

    return sortedData.sort((a, b) => (b.cases - a.cases));
};

// format stat numbers
export const prettyPrintCases = (stat) => (
    stat ? `+${numeral(stat).format("0,0")}` : "+0"
);
export const prettyPrintTotal = (stat) => (
    stat ? numeral(stat).format("0,0") : "0"
);

// // display circles on map
// export const showDataOnMap = (docs, casesType) => {
//     console.log(docs);
//     return docs.map((doc) => {
//         const data = doc.data();
//         console.log(data);
//         return (
//         <Circle
//             center={[data.lat, data.lng]}
//             fillOpacity={0.4}
//             color={casesCircleConfig[casesType].hex}
//             fillColor={casesCircleConfig[casesType].hex}
//             radius={Math.sqrt(data[casesType]) * casesCircleConfig[casesType].multiplier}
//         >
//
//             <Popup>
//                 <div className="popup__container">
//                     {/*<div className="popup__flag" style={{ backgroundImage: `url(${data.flag})` }}></div>*/}
//                     <div className="popup__name">{data.name}</div>
//                     {/*<div className="popup__cases">Cases: {numeral(data.cases).format("0,0")}</div>*/}
//                     {/*<div className="popup__recovered">Recovered: {numeral(data.recovered).format("0,0")}</div>*/}
//                     {/*<div className="popup__deaths">Deaths: {numeral(data.deaths).format("0,0")}</div>*/}
//                 </div>
//             </Popup>
//         </Circle>)
//     })
// };

// Add a new document with a generated id.
// let i;
// let area_score = Math.floor(Math.random() * 100);
// let indi_score = Math.floor(Math.random() * 100);
// let lat = Math.random() * (114.1789322 - 114.0359383 + 1) + 114.0359383;
// let lng = Math.random() * (22.488083 - 22.2213117 + 1) + 22.2213117;
// for (i = 1; i < 1001; i++) {
//     db.collection("nodes").add({
//         _id: i,
//         area_score: area_score,
//         indi_score: indi_score,
//         lat: lat,
//         lng: lng,
//     })
//         .then((docRef) => {
//             console.log("Document written with ID: ", docRef.id);
//         })
//         .catch((error) => {
//             console.error("Error adding document: ", error);
//         });
// };