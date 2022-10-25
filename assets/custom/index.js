var map = L.map('map').setView([51.1657, 10.4515], 9);
// map.options.minZoom = 8;
// map.options.maxZoom = 11;

const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

let zip = L.geoJSON(zips, {
    // style: styleAoi,
    onEachFeature: onEachZip,
}).addTo(map);

let colors = ["#8fce00", "#69d9f0", "#a64d79", "#ffa300", "#06a198", "#09e7da", "#746cc0", "#a7bd23", "#535e11", "#b919a8", "#419527", "#aa73fa", "#22027b", "#c03e41", "#cbe8ce"];

let params = (new URL(document.location)).searchParams;
let entries = params.entries();
let obj = Object.fromEntries(entries);
var keys = Object.keys(obj);

var groupCenterLyr = { "type": "FeatureCollection" }
let groupCenters= [];

for (i = 0; i < keys.length; i++) {

    let fc = { "type": "FeatureCollection" }
    let features = [];

    let values = obj[keys[i]];
    var valArr = values.split(',');

    let fName = '';
    for (j = 0; j < valArr.length; j++) {
        if (j == 0) {
            fName = valArr[0];
            continue;
        }
        let zip = zips.features.filter(function (z) {
            return [valArr[j]].indexOf(z.properties.code) !== -1; // -1 means not present
        });
        if (zip.length > 0) {
            console.log(fName);
            zip[0].properties['name'] = fName;
            features.push(zip[0]);
        }

    }

    fc.features = features;
    let group = L.geoJSON(fc, {
        onEachFeature: function onEachZip(feature, layer) {

            layer.bindTooltip(layer.feature.properties.code, {
                permanent: true,
                direction: "center",
                opacity: 1,
                className: 'label-tooltip'
            });

        },
        style: {
            opacity: 0,
            fillColor: colors[i],
            fillOpacity: .9,
        },
        interactive:false,
    }).addTo(map);

    let latlng = group.getBounds().getCenter();
    // console.log(latlng.lng);
    let g_feature = {
        "type": "Feature",
        "properties": {
            "name": fName
        },
        "geometry": { "type": "Point", "coordinates": [latlng.lng, latlng.lat] }
    };

    groupCenters.push(g_feature);

}

groupCenterLyr.features = groupCenters;

console.log(groupCenterLyr);

let nameLayer = L.geoJSON(groupCenterLyr, {
    
        onEachFeature: function onEachZip(feature, layer) {

            layer.bindTooltip(layer.feature.properties.name, {
                permanent: true,
                direction: "center",
                opacity: 1,
                className: 'label-tooltip-group'
            });

        },
        // interactive:false,
}).addTo(map);

    map.fitBounds(nameLayer.getBounds());


// polygon.getBounds().getCenter();

// map.on('click', function(e){
//     console.log(e);
// });
