var ZzzdemoFirebaseRoute = Ember.Route.extend({
    model: function() {
        return this.store.findAll('zzzdemopoint');
    }
});

export default ZzzdemoFirebaseRoute;
