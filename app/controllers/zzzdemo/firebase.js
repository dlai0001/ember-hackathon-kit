var ZzzdemoFirebaseController = Ember.ArrayController.extend({
    name: "demo test",


    actions: {
        addNew: function() {
            var newZzztestpoint = this.store.createRecord('zzzdemopoint', {
                name: this.get('name')
            });

            newZzztestpoint.save();
        }
    }
});

export default ZzzdemoFirebaseController;
