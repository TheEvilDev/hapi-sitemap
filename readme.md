## Installation

Simply install with npm and go!

    npm install hapi-sitemap

### Usage
Simply register the plugin with your hapi server, and configure the optional overrides.

### Example
```javascript
    var server = new Hapi.Server();

    server.connection({
      port: 3001
    });

    server.register({
        register: require('hapi-sitemap'),
        options: {
            endpoint: '/sitemap', // Default: /sitemap.xml
            baseUri: 'http://localhost:12345' // Default: ''
        }
      },
      function(err) {
        if (err) {
          console.error('Failed to load plugin: ', err);
        }
      });

    server.start();
```

By default, it will include every route in your application.

You can configure a route to be excluded from the site map in the route config

```javascript
server.route({
    method: 'POST',
    path: '/test',
    handler: function(request, reply) {
        reply('Hello World!');
    },
    config: {
        plugins: {
            sitemap: {
                exclude: true
            }
        }
    }
});
```
