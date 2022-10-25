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
        fillOpacity: .5,
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
