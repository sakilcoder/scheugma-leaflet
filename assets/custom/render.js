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

    // layer.bindTooltip(layer.feature.properties.code, {
    //     permanent: true,
    //     direction: "center",
    //     opacity: 1,
    //     className: 'label-tooltip'
    // });

}
