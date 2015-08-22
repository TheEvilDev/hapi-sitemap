var Handlebars = require('handlebars');
var fs = require('fs');

var getPaths = function(server, baseUri, filter) {
    var routeTable = server.table();
    var results = [];

    for(var i = 0; i < routeTable.length; i++){
        var route = routeTable[i];

        for(var j = 0; j<route.table.length; j++) {
            var table = route.table[j];

            var sitemapSettings = table.settings.plugins.sitemap || { exclude: false };
            if(!sitemapSettings.exclude) {
                results.push(baseUri + table.path);
            }
        }
    }

    return results;
};

module.exports.register = function (server, options, next) {
    var endpoint = options.endpoint || '/sitemap.xml';
    var baseUri = options.baseUri || '';
    var filter = options.filter || function() { return true; };

    server.route({
        method: 'GET',
        path: endpoint,
        handler: function(request, reply) {
            var paths = getPaths(server, baseUri, filter);
            var source = fs.readFileSync(__dirname + '/sitemap.xml.hbs','utf8');

            var template = Handlebars.compile(source);
            reply(template({paths: paths}))
                .type('application/xml');
        },
        config: {
            description: 'Provides a list of routes to be indexed by search engines',
            plugins: {
                sitemap: {
                    exclude: true
                }
            }
        }
    });

    next();
};

module.exports.register.attributes = {
    pkg: require('./package.json')
};
