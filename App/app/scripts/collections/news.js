(function() {
    'use strict';

    App.Collections.News = Backbone.Collection.extend({

        model: App.Models.News,

        url: App.config.api + 'news'

    });

})();
