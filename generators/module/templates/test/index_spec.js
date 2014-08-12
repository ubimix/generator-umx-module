var expect = require('expect.js');
var <%=_.camelize(_.slugify(appname))%> = require('..');
describe('<%= _.slugify(appname) %>', function() {
    it('should say hello', function() {
        expect(!!<%=_.camelize(_.slugify(appname))%>.sayHello).to.be(true);
        expect(<%=_.camelize(_.slugify(appname))%>.sayHello()).to.eql('Hello, <%= _.slugify(appname) %>!');
    });
});