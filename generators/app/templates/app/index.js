require([ './require.config' ], function() {

    require([ 'jquery', './js/main.js' ], function($, App) {
        var app = new App({
            container : $('body')
        });
        app.start();
    });
});
