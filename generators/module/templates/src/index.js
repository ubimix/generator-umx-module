// <%= _.slugify(appname) %>
module.exports = {
    sayHello : function() {
        return 'Hello, <%= _.slugify(appname) %>!';
    }
};
