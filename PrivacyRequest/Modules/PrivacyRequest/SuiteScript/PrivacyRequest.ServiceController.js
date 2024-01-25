define("CD.PrivacyRequest.PrivacyRequest.ServiceController", ["ServiceController", "CD.PrivacyRequest.PrivacyRequest"], function (
    ServiceController, CDPrivacyRequestPrivacyRequest
) {
    "use strict";

    return ServiceController.extend({
        name: "CD.PrivacyRequest.PrivacyRequest.ServiceController",

        // The values in this object are the validation needed for the current service.
        options: {
            common: {}
        },

        get: function get() {
            return JSON.stringify({
                message: "Hello World I'm an Extension using a Service!"
            });
        },

        post: function post() {
            this.sendContent(CDPrivacyRequestPrivacyRequest.CreateLead(this.data), { 'status': 201 });
            // not implemented
        },

        put: function put() {
            // not implemented
        },

        delete: function () {
            // not implemented
        }
    });
});
