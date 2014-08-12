define(
// Dependencies
[ 'underscore', 'leaflet', 'mosaic-commons', 'mosaic-teleport' ],
// Module
function(_, L, Mosaic) {
    return Mosaic.Class.extend({

        initialize : function(options) {
            this.setOptions(options);
            this.container = this.options.container;
        },

        start : function() {
            var that = this;
            return Mosaic.P.then(function() {
                var el = $(that.container);
                return Mosaic.P.delay(400).then(function() {
                    el.html('Hello, world!');
                });
            });
        }

    });
});