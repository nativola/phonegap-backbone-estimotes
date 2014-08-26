/**
 * Basic and start configuration for our project
 * @type {Object}
 */
window.App = {
    /**
     * Store all Backbone models instances
     * @type {Object}
     */
    Models: {},

    /**
     * Store all Backbone collection instances
     * @type {Object}
     */
    Collections: {},

    /**
     * Store all Backbone views
     * @type {Object}
     */
    Views: {},

    /**
     * Main config
     * @type {Object}
     */
    config: {

        /**
         * Document selector used on Backbone views as 'el' elment
         * @type {String}
         */
        el: document.getElementById('page'),

        /**
         * API URL
         * @type {String}
         */
        api: 'http://localhost:4000/',

        /**
         * Min value for start searching values to API or autocomplete fields
         * @type {Number}
         */
        minSearch: 3,
    },

    /**
     * Awesome utils
     * @type {Object}
     */
    utils: {

        /**
         * $('selector').empty() but with vanilla js and a lot faster
         */
        empty: function(id) {
            'use strict';
            var wrap = document.getElementById(id);
            while (wrap.firstChild) {
                wrap.removeChild(wrap.firstChild);
            }
        },

        getLanguaje: function(callback) {
            'use strict';
            var lang = '';
            var iso = '';
            var succes = function(locale) {
                lang = locale.value.split("-");
                iso = lang[0].toUpperCase();
                return callback(iso);
            };
            var error = function() {
                alert('Error');
            };
            return navigator.globalization.getLocaleName(succes, error);
        }
    }
};

/**
 * Start application
 */
$(document).ready(function() {
    'use strict';

    /**
     * Override remove function from View
     * @return {Object} view instance
     */
    Backbone.View.prototype.remove = function() {
        // this.$el.html('');
        this.stopListening();
        this.undelegateEvents();
        return this;
    };

    new App.Router();
    Backbone.history.start();
});
