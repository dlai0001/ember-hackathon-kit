
var ZzzdemoEmberleafletView = Ember.View.extend({
    map: null,

    didInsertElement: function() {
        console.log("ember leaflet init");

        var map = L.map('map').setView([51.505, -0.09], 13);
        this.set('map', map);

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar'}).addTo(map);
    }
});

export default ZzzdemoEmberleafletView;
