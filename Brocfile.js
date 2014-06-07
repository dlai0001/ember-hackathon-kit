/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var mergeTrees = require('broccoli-merge-trees');
var pickFiles = require('broccoli-static-compiler');


var app = new EmberApp({
  name: require('./package.json').name,

  minifyCSS: {
    enabled: true,
    options: {}
  },

  getEnvJSON: require('./config/environment'),
});





// Use this to add additional libraries to the generated output files.
app.import('vendor/ember-data/ember-data.js');

// If the library that you are including contains AMD or ES6 modules that
// you would like to import into your application please specify an
// object with the list of modules as keys along with the exports of each
// module as its value.
app.import('vendor/ic-ajax/dist/named-amd/main.js', {
  'ic-ajax': [
    'default',
    'defineFixture',
    'lookupFixture',
    'raw',
    'request',
  ]
});

//Bootstrap
app.import('vendor/bootstrap/dist/js/bootstrap.js');
app.import('vendor/bootstrap/dist/css/bootstrap.css');
var bootstrapExtraAssets = pickFiles('vendor/bootstrap/dist/fonts',{
    srcDir: '/',
    files: ['**/*'],
    destDir: '/fonts'
});

//FontAwesome
app.import('vendor/fontawesome/css/font-awesome.css');
var bootstrapExtraAssets = pickFiles('vendor/fontawesome/fonts',{
    srcDir: '/',
    files: ['**/*'],
    destDir: '/fonts'
});

//Ember Leaflet
app.import('vendor/leaflet-dist/leaflet-src.js');
app.import('vendor/leaflet-dist/leaflet.css');
var leafletExtraAssets = pickFiles('vendor/leaflet-dist/images', {
   srcDir: '/',
    files: ['**/*'],
    destDir: '/images'
});


// Firebase
app.import('vendor/firebase/firebase-debug.js');
app.import('vendor/emberfire/dist/emberfire.js');


module.exports = mergeTrees([
    app.toTree(),
    bootstrapExtraAssets,
    leafletExtraAssets
]);
