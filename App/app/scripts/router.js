/**
 * Backbone Router
 */
'use strict';
App.Router = Backbone.Router.extend({

    initialize: function() {
        App.slider = new PageSlider($('body'));
        this.currentView = null;
    },

    routes: {

        /**
         * Static pages and Home
         */
        '': 'home',
        'settings': 'settings',

        /**
         * GET /rooms
         */
        'rooms': 'rooms',

        /**
         * GET /rooms/:id
         */
        'rooms/:id': 'showRoom',

        /**
         * GET /contents/:id
         */
        'contents/:id/:eventId': 'showContent',

        /**
         * This route must be at the end of this object
         */
        '*404': 'notFound'
    },

    /**
     * Remove events associated to a view
     * Un-delegate events associated to a view
     * @param  {Object} view A Backbone View instance
     */
    cleanView: function(view) {
        if (this.currentView) {
            this.currentView.remove();
        }
        this.currentView = view;
    },

    handleProgress: function(event) {
        var percentComplete = 0;
        if (event.lengthComputable) {
            percentComplete = event.loaded / event.total;
        }
        console.log('completed', percentComplete);
    },

    /**
     * Visit /
     */
    home: function() {
        var self = this;

        /**
         * GET /rooms
         */
        new App.Collections.Events({}).fetch({
            data: {
                currentTime: new Date().toISOString()
            },
            // xhr: function() {
            //     var xhr = $.ajaxSettings.xhr();
            //     xhr.onprogress = self.handleProgress;
            //     return xhr;
            // },

            success: function(collection) {

                /**
                 * Instantiate a new Home View
                 * use collection just fetched
                 */
                var view = new App.Views.Home({
                    collection: collection
                });

                /**
                 * Transition to home by slide[left/right]
                 */
                App.slider.slidePage(view.render().$el);

                /**
                 * Clean view
                 */
                self.cleanView(view);
            },

            error: function(error) {
                /**
                 * Do something with the error
                 */
                console.log(error);
            }
        });
    },

    /**
     * Visit /#settings
     */
    settings: function() {
        /**
         * Create a new instance of Settings View
         */
        var view = new App.Views.Settings();

        /**
         * Transition to settings
         */
        App.slider.slidePage(view.render().$el);

        /**
         * Clean view
         */
        this.cleanView(view);
    },

    /**
     * Visit /#rooms
     */
    rooms: function() {
        var self = this;

        /**
         * GET /rooms
         */
        new App.Collections.Rooms({}).fetch({
            data: {
                currentTime: new Date().toISOString()
            },
            success: function(collection) {
                /**
                 * Instantiate a new Rooms View
                 * using collection fetched
                 */
                var view = new App.Views.Rooms({
                    collection: collection
                });

                /**
                 * Slide View left/right
                 */
                App.slider.slidePage(view.render().$el);

                /**
                 * Clean View
                 */
                self.cleanView(view);
            },

            error: function(error) {
                /**
                 * Do something with the error
                 */
                console.log(error);
            }
        });
    },

    showRoom: function(id) {
        var self = this;
        var model = new App.Models.Room({
            id: id
        });

        /**
         * GET /rooms/:id
         */
        model.fetch({
            data: {
                currentTime: new Date().toISOString()
            },
            success: function() {
                var view = new App.Views.RoomsShow({
                    model: model
                });
                App.slider.slidePage(view.render().$el);
                self.cleanView(view);
            },

            error: function(error) {
                console.log(error);
            }
        });
    },

    showContent: function(id, eventId) {
        var self = this;
        var model = new App.Models.Content({
            id: id,
            eventId : eventId
        });

        /**
         * GET /contents/:id
         */
        model.fetch({
            success: function() {
                var view = new App.Views.ContentsShow({
                    model: model
                });
                App.slider.slidePage(view.render().$el);
                self.cleanView(view);
            },

            error: function(error) {
                console.log(error);
            }
        });
    }
});
