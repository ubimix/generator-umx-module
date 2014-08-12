define([ '../../app/js/main', 'jquery', 'underscore' ], function(App, $, _) {

    describe('just checking', function() {
        it('works for app', function(done) {
            var el = $('<div></div>');
            var app = new App({
                container : el
            });
            app.start().then(function() {
                var text = el.text();
                text = text.replace(/^[\s]+|[\s]+$/gim, '');
                expect(text).to.eql('Hello, world!');
            }).then(done, done);
        });
    });

});