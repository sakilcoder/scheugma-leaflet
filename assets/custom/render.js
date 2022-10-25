function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle({
        fillOpacity: 1,
        fillColor: '#daaf38'
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

}

function resetHighlight(e) {
    aoiLayer.resetStyle(e.target);
}



function onEachZip(feature, layer) {

    layer.setStyle({
        weight: .7,
        color: "#000",
        opacity: .9,
        fillColor: '#daaf38',
        fillOpacity: 0,
    });

    var popup = L.popup();
    let str_popup = '';
    str_popup += feature.properties.code;

    popup.setContent(str_popup);
    layer.bindPopup(popup, popupOptions);

    layer.on('mouseover', function (e) {
        var popup = e.target.getPopup();
        popup.setLatLng(e.latlng).openOn(map);
    });

    layer.on('mouseout', function (e) {
        e.target.closePopup();
    });

    // layer.bindTooltip(layer.feature.properties.code, {
    //     permanent: true,
    //     direction: "center",
    //     opacity: 1,
    //     className: 'label-tooltip'
    // });

}

let colors = [
    "#8fce00",
    "#69d9f0",
    "#a64d79", 
    "#ffa300", 
    "#06a198", 
    "#09e7da", 
    "#746cc0", 
    "#a7bd23", 
    "#535e11", 
    "#b919a8", 
    "#419527", 
    "#aa73fa", 
    "#22027b", 
    "#c03e41", 
    "#cbe8ce",
    "#a474dc",
    "#b00e18",
    "#a8f2e2",
    "#244c9c",
    "#93831d",
    "#77aaff",
    "#8fc9d9",
    "#ecf3fd",
    "#ff0000",
    "#391a21",
    "#e5d0b1",
    "#e5d0b1",
    "#e5d0b1",
    "#e5d0b1",
    "#e5d0b1",
    "#e5d0b1",
    "#e5d0b1",
    "#e5d0b1",
    "#e5d0b1",
    "#e5d0b1",
    "#e5d0b1",
    "#e5d0b1",
    "#e5d0b1",
    "#e5d0b1",
    "#e5d0b1",
    "#e5d0b1",
    "#e5d0b1",
    "#e5d0b1",
    "#e5d0b1",
];
