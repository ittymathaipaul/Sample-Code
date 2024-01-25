define(
    'CD.PrivacyRequest.PrivacyRequest.Router', [
    'CD.PrivacyRequest.PrivacyRequest.View'
],
    function (
        PrivacyRequestView
    ) {
        'use strict';

        return Backbone.Router.extend({

            routes: {
                'privacy_request': 'privacy_request'
            }

            ,
            initialize: function (application) {
                this.application = application;
            },
            privacy_request: function (id) {
                var application = this.application;
                var view = new PrivacyRequestView({ application: application });
                view.showContent();
            }

        });
    });