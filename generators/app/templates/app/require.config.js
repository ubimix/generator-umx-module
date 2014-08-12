require.config({
    config : {
        // For cross-domain calls the server should return results
        // with the 'Access-Control-Allow-Origin=*' HTTP header field.
        // See also:
        // * http://rockycode.com/blog/cross-domain-requirejs-text/
        text : {
            useXhr : function(url, protocol, hostname, port) {
                // allow cross-domain requests
                // remote server allows CORS
                return true;
            }
        }
    },
    packages : [ {
        name : 'when',
        location : 'libs/when',
        main : 'when'
    }, {
        name : 'superagent',
        location : 'libs/superagent',
        main : 'superagent'
    }, {
        name : 'react',
        location : 'libs/react',
        main : 'react'
    } ],
    paths : {
        'eventemitter2' : 'libs/eventemitter2/lib/eventemitter2',
        'jquery' : 'libs/jquery/dist/jquery',
        'leaflet' : 'libs/leaflet/dist/leaflet-src',
        'leaflet.markercluster' : //
        'libs/leaflet.markercluster/dist/leaflet.markercluster-src',
        'mosaic-commons' : 'libs/mosaic-commons/dist/mosaic-commons',
        'mosaic-teleport' : 'libs/mosaic-teleport/dist/mosaic-teleport',
        'text' : 'libs/text/text',
        'underscore' : 'libs/underscore/underscore-min'
    },
    shim : {
        'underscore' : {
            exports : '_'
        },
        'leaflet.markercluster' : {
            deps : [ 'leaflet' ]
        }
    }
});

define('events', [ 'eventemitter2' ], function(EventEmitter) {
    return {
        EventEmitter : EventEmitter
    }
});
