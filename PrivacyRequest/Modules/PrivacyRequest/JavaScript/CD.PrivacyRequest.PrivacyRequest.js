define(
    'CD.PrivacyRequest.PrivacyRequest', [
    'CD.PrivacyRequest.PrivacyRequest.View', 'CD.PrivacyRequest.PrivacyRequest.Router'
],
    function (
        PrivacyRequestView, CDPrivacyRequestPrivacyRequestRouter
    ) {
        'use strict';

        return {
            mountToApp: function mountToApp(container) {
                return new CDPrivacyRequestPrivacyRequestRouter(container);

            }
        };
    });