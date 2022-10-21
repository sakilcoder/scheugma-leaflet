var map = L.map('map').setView([51.1657, 10.4515], 10);
// map.options.minZoom = 8;
// map.options.maxZoom = 11;

const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

zip0 = L.geoJSON(zips0, {
    // style: styleAoi,
    onEachFeature: onEachZip,
}).addTo(map);
zip1 = L.geoJSON(zips1, {
    // style: styleAoi,
    onEachFeature: onEachZip,
}).addTo(map);
zip2 = L.geoJSON(zips2, {
    // style: styleAoi,
    onEachFeature: onEachZip,
}).addTo(map);
zip3 = L.geoJSON(zips3, {
    // style: styleAoi,
    onEachFeature: onEachZip,
}).addTo(map);
zip4 = L.geoJSON(zips4, {
    // style: styleAoi,
    onEachFeature: onEachZip,
});
zip5 = L.geoJSON(zips5, {
    // style: styleAoi,
    onEachFeature: onEachZip,
});
zip6 = L.geoJSON(zips6, {
    // style: styleAoi,
    onEachFeature: onEachZip,
});
zip7 = L.geoJSON(zips7, {
    // style: styleAoi,
    onEachFeature: onEachZip,
});
zip8 = L.geoJSON(zips8, {
    // style: styleAoi,
    onEachFeature: onEachZip,
});
zip9 = L.geoJSON(zips9, {
    // style: styleAoi,
    onEachFeature: onEachZip,
}).addTo(map);;

zip4.addTo(map);
zip5.addTo(map);
zip6.addTo(map);
zip7.addTo(map);
zip8.addTo(map);
zip9.addTo(map);

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

console.log(params);

map.on("moveend", function () {
    console.log(map.getBounds());
});