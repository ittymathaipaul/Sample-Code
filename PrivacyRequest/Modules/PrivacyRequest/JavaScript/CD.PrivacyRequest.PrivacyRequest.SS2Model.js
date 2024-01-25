// Model.js
// -----------------------
// @module Case
define("CD.PrivacyRequest.PrivacyRequest.SS2Model", ["Backbone", "Utils"], function (
    Backbone,
    Utils
) {
    "use strict";

    // @class Case.Fields.Model @extends Backbone.Model
    return Backbone.Model.extend({
        //@property {String} urlRoot
        urlRoot: Utils.getAbsoluteUrl(
            getExtensionAssetsPath(
                "Modules/PrivacyRequest/SuiteScript2/PrivacyRequest.Service.ss"
            ),
            true
        )
    });
});
