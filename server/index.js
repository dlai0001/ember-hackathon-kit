// To use it create some files under `routes/`
// e.g. `server/routes/ember-hamsters.js`
//
// module.exports = function(app) {
//   app.get('/ember-hamsters', function(req, res) {
//     res.send('hello');
//   });
// };

var express    = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var globSync   = require('glob').sync;
var routes     = globSync('./routes/*.js', { cwd: __dirname }).map(require);
var fileSystem = require('fs');

var promisedIo      = require('promised-io/promise');
var Deferred        = promisedIo.Deferred;

module.exports = function(emberCLIMiddleware) {
  var app = express();
  var server = require('http').createServer(app);

  app.use(express.static(__dirname + '/..'));

  // Configuration.
  app.use(bodyParser());
  app.use(methodOverride());




  app.all('*', function(request, response, next) {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-File-Type, X-File-Name, X-File-Size');
    response.header('Access-Control-Allow-Methods', 'POST');
    next();
  });

  // Responsible for the call to OPTIONS.
  app.options('/upload', function(request, response) {
    response.send(200);
  });


  // Responsible for handling the file upload.
  app.post('/upload', function(request, response) {

        var files       = request.files.file,
            promises    = [];

        /**
         * @method uploadFile
         * @param file {Object}
         * @return {Object}
         */
        var uploadFile = function uploadFile(file) {

            var deferred = new Deferred();

            fileSystem.readFile(file.path, function (error, data) {
                var filePath = __dirname + '/uploaded-files/' + file.name;
                fileSystem.writeFile(filePath, data, function() {});
                deferred.resolve(file.name);
            });

            return deferred.promise;

        };

        if (!Array.isArray(files)) {

            // We're dealing with only one file.
            var promise = uploadFile(files);
            promises.push(promise);

        } else {

            // We're dealing with many files.
            files.forEach(function(file) {
                var promise = uploadFile(file);
                promises.push(promise);
            });

        }

        promisedIo.all(promises).then(function(files) {
            response.send({ files: files, success: true });
            response.end();
        });

    });

  routes.forEach(function(route) { route(app); });
  app.use(emberCLIMiddleware);

  return app;
};
