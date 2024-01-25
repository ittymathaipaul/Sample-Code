// Model.js
// -----------------------
// @module Case
define("CD.PrivacyRequest.PrivacyRequest.Model", ["Backbone", "Utils", "underscore"], function (
    Backbone,
    Utils,
    _
) {
    "use strict";

    // @class Case.Fields.Model @extends Backbone.Model
    return Backbone.Model.extend({


        //@property {String} urlRoot
        urlRoot: Utils.getAbsoluteUrl(
            getExtensionAssetsPath(
                "services/PrivacyRequest.Service.ss"
            )
        ),
        validation: {
            addr1: {
                required: true,
                msg: _('Address is required').translate()
            },
            firstname: {
                required: true,
                msg: _('First Name is required').translate()
            },
            lastname: {
                required: true,
                msg: _('Last Name is required').translate()
            },
            'email-confirm': {
                equalTo: 'email',
                msg: _('Email Address are not matched').translate()
            },
            zip: {
                required: true,
                msg: _('Zip is required').translate()
            },
            city: {
                required: true,
                msg: _('City is required').translate()
            },
            phone: {
                required: false,
                fn: Utils.validatePhone,
                msg: _('Phone Number is invalid').translate(),
            },

        },

    });
});
