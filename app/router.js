var Router = Ember.Router.extend({
  location: ENV.locationType
});

Router.map(function() {



    // demo routes
    this.route('zzzdemo/bootstrap');
    this.route('zzzdemo/fontawesome');
    this.route('zzzdemo/emberleaflet');
    this.route('zzzdemo/firebase');
    this.route('zzzdemo/droplet');

//    couldn't get to work yet
//    this.route('zzzdemo/t17emberupload');
});

export default Router;
