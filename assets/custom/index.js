var map = L.map('map').setView([51.1657, 10.4515], 9);
// map.options.minZoom = 8;
// map.options.maxZoom = 11;

const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);
var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 17,
    attribution: 'Esri Base Map'
});

var basemapCarto = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '',
    maxZoom: 20,
    noWrap: true
});

var baseLayers = {
    'OSM': osm,
    'Satellite': Esri_WorldImagery,
    'Carto': basemapCarto,
};
var layerControl = L.control.layers(baseLayers).addTo(map);

let zip = L.geoJSON(zips, {
    // style: styleAoi,
    onEachFeature: onEachZip,
}).addTo(map);


let params = (new URL(document.location)).searchParams;
let entries = params.entries();
let obj = Object.fromEntries(entries);
var keys = Object.keys(obj);

var groupCenterLyr = { "type": "FeatureCollection" }
let groupCenters = [];

let group_lg = L.featureGroup();

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
            fillOpacity: .6,
        },
        interactive: false,
    }).addTo(group_lg);

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

group_lg.addTo(map)

groupCenterLyr.features = groupCenters;

let GoogleIcon = function (html) {
    return L.divIcon({
        html: html,
        iconSize: [16, 16],
        className: 'my-google-icon'
    });
}

var icon = GoogleIcon('<span class="g-icon"><i class="material-icons g-icon-i" style="font-size:2px; color: #4CACBC">place</i></span>');

let nameLayer = L.geoJSON(groupCenterLyr, {

    onEachFeature: function onEachZip(feature, layer) {

        layer.bindTooltip(layer.feature.properties.name, {
            permanent: true,
            direction: "center",
            opacity: 1,
            className: 'label-tooltip-group'
        });
        layer.setIcon(icon)

    }, interactive: false,
}).addTo(map);

// L.FeatureGroup.getBounds();
map.fitBounds(group_lg.getBounds());
map.options.minZoom = 6;
// map.options.maxZoom = 11;


// polygon.getBounds().getCenter();

// map.on('click', function(e){
//     console.log(e);
// });
