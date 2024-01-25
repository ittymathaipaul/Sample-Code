// @module CD.PrivacyRequest.PrivacyRequest
define('CD.PrivacyRequest.PrivacyRequest.View', [
    'cd_privacyrequest_privacyrequest.tpl'
    , 'CD.PrivacyRequest.PrivacyRequest.SS2Model'
    , 'Backbone'
    , 'CD.PrivacyRequest.PrivacyRequest.Model'
    , 'Backbone.FormView'
    , 'GlobalViews.Message.View'
    , 'GlobalViews.Confirmation.View'
    , 'SC.Configuration'
], function (
    cd_privacyrequest_privacyrequest_tpl
    , PrivacyRequestSS2Model
    , Backbone
    , PrivacyRequestModel
    , BackboneFormView
    , GlobalViewsMessageView
    , GlobalViewsConfirmationView
    , Configuration
) {
    'use strict';

    // @class CD.PrivacyRequest.PrivacyRequest.View @extends Backbone.View
    return Backbone.View.extend({
        title: "Privacy Request Form",

        template: cd_privacyrequest_privacyrequest_tpl

        ,
        initialize: function (options) {
            this.model = new PrivacyRequestModel();
            this.showform = true;
            var self = this;
            let newUrl = Configuration.get('PrivacyRequestPDF.suitelet') || '';
            if (newUrl) {
                self.pdfsuitelet = newUrl;
            }
            // self.on('afterViewRender', function afterViewRender() {
            // 	if (SC.ENVIRONMENT.jsEnvironment === 'browser') {
            // 		setTimeout(function setTimeOutFn() {
            // 			$(document).on('click', function (e) {
            // 				var parent = $(e.target).closest('li[id="row-reqdeletion"]');
            // 				if (parent.attr('id') === 'row-reqdeletion') {
            // 					if ($('.rdmistakedeletion').hasClass('hidden')) {
            // 						$('.rdmistakedeletion').removeClass('hidden');
            // 					}
            // 				}
            // 			});
            // 		}, 0);
            // 	}
            // });
            self.prescriptionProceed = false;
            self.autoShipProceed = false;
            self.prescriptionExist = false;
            self.autoShipExist = false;
            self.prescriptionExist = true;
            self.autoShipExist = true;
        }

        ,
        events: {
            'click .sendRequest': 'sendRequest',
            'submit form': 'SubmitForm'
        }

        ,
        bindings: {
            '[name="firstname"]': 'firstname',
            '[name="lastname"]': 'lastname',
            '[name="addr1"]': 'addr1',
            '[name="addr2"]': 'addr2',
            '[name="city"]': 'city',
            '[name="zip"]': 'zip',
            '[name="email"]': 'email',
            '[name="phone"]': 'phone',
            '[name="removefromcatalog"]': 'removefromcatalog',
            '[name="requestdeletion"]': 'requestdeletion',
            '[name="requestdisclosureCollected"]': 'requestdisclosureCollected',
            '[name="requestdisclosureShared"]': 'requestdisclosureShared',
            '[name="requestdisclosureSold"]': 'requestdisclosureSold'
        }

        ,
        childViews: {

        },
        SubmitForm: function (e) {
            var self = this;
            self.removefromcatalog = $('input[name="removefromcatalog"]').is(':checked') == true ? true : false;
            self.requestdeletion = $('input[name="requestdeletion"]').is(':checked') == true ? true : false;
            if (self.requestdeletion && !(self.prescriptionProceed && self.autoShipProceed)) {
                if (!self.prescriptionProceed || !self.autoShipProceed) {
                    if (self.prescriptionExist) {
                        var prescriptionView = new GlobalViewsConfirmationView({
                            body: 'If you have open prescriptions on file. Selecting Delete my Personal Information will cancel any open prescription orders. Do you want to continue with this request?',
                            callBack: function () {
                                self.prescriptionProceed = true;
                                if (self.autoShipExist) {
                                    var autoShipView = new GlobalViewsConfirmationView({
                                        body: 'If you have Auto-Ship orders on file. Selecting Delete my Personal Information will cancel any open Auto-Ship orders. Do you want to continue with this request?',
                                        callBack: function () {
                                            self.autoShipProceed = true;
                                        },
                                        cancelCallBack: function () {
                                            return false;
                                        },
                                        autohide: true
                                    });
                                    self.options.application.getLayout().showInModal(autoShipView);
                                }
                            },
                            cancelCallBack: function () {
                                return false;
                            },
                            autohide: true
                        });
                        self.options.application.getLayout().showInModal(prescriptionView);
                    }
                }
            }
            else if ((self.prescriptionProceed && self.autoShipProceed) || !self.requestdeletion) {
                var promise = BackboneFormView.saveForm.apply(this, arguments);
                self.requestdisclosureCollected = $('input[name="requestdisclosureCollected"]').is(':checked') == true ? true : false;
                self.requestdisclosureShared = $('input[name="requestdisclosureShared"]').is(':checked') == true ? true : false;
                self.requestdisclosureSold = $('input[name="requestdisclosureSold"]').is(':checked') == true ? true : false;
                self.requestdeletion = $('input[name="requestdeletion"]').is(':checked') == true ? true : false;
                e && e.preventDefault();
                return promise && promise.then(
                    function (success) {
                        jQuery("html, body").animate({ scrollTop: 0 }, "slow");
                        if (success.successMessage) {
                            let date = new Date();
                            let formattedDate = date.toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                            });
                            self.showform = false;
                            self.successMessage = !self.requestdisclosureCollected && !self.requestdisclosureShared && !self.requestdisclosureSold && !self.requestdeletion;
                            self.uniqueID = success.uniqueID;
                            let customerName = _.isEmpty(self.model.get("firstname")) ? "" : self.model.get("firstname");
                            customerName += _.isEmpty(self.model.get("lastname")) ? "" : " " + self.model.get("lastname");
                            let address = _.isEmpty(self.model.get("addr1")) ? "" : self.model.get("addr1");
                            address += _.isEmpty(self.model.get("addr2")) ? "" : _.isEmpty(self.model.get("addr1")) ? self.model.get("addr2") : ", " + self.model.get("addr2");
                            let contact = _.isEmpty(self.model.get("phone")) ? "" : self.model.get("phone");
                            contact += _.isEmpty(self.model.get("email")) ? "" : _.isEmpty(self.model.get("phone")) ? self.model.get("email") : ", " + self.model.get("email");
                            let address2 = _.isEmpty(self.model.get("city")) ? "" : self.model.get("city");
                            address2 += _.isEmpty(self.model.get("zip")) ? "" : _.isEmpty(self.model.get("city")) ? self.model.get("zip") : ", " + self.model.get("zip");
                            if (self.pdfsuitelet) {
                                if (self.requestdisclosureCollected) self.pdfsuitelet += "&requestdisclosureCollected=true";
                                if (self.requestdisclosureShared) self.pdfsuitelet += "&requestdisclosureShared=true";
                                if (self.requestdisclosureSold) self.pdfsuitelet += "&requestdisclosureSold=true";
                                if (self.uniqueID) self.pdfsuitelet += "&uniqueID=" + success.uniqueID;
                                if (customerName) self.pdfsuitelet += "&customerName=" + customerName;
                                if (address) self.pdfsuitelet += "&address=" + address;
                                if (contact) self.pdfsuitelet += "&contact=" + contact;
                                if (address2) self.pdfsuitelet += "&address2=" + address2;
                                if (formattedDate) self.pdfsuitelet += "&formattedDate=" + formattedDate;
                                if (self.removefromcatalog) self.pdfsuitelet += "&removefromcatalog=" + self.removefromcatalog;
                                if (self.requestdeletion) self.pdfsuitelet += "&requestdeletion=" + self.requestdeletion;
                                self.pdfsuitelet += "&off=" + true;
                                self.downloadUrl = self.pdfsuitelet;
                            }
                            self.render();
                        } else {
                            var message = "An error occured, please try again";
                            var global_view_message = new GlobalViewsMessageView({
                                message: message,
                                type: 'error',
                                closable: false
                            });
                            var msgContainerParent = jQuery('.warningmessage');
                            msgContainerParent.html(global_view_message.render().$el.html());
                        }
                    },
                    function (fail) {
                        var message = "An error occured, please try again";
                        var global_view_message = new GlobalViewsMessageView({
                            message: message,
                            type: 'error',
                            closable: false
                        });
                        var msgContainerParent = jQuery('.warningmessage');
                        msgContainerParent.html(global_view_message.render().$el.html());
                    }
                );
            }
        },


        //@method getContext @return CD.PrivacyRequest.PrivacyRequest.View.Context
        getContext: function getContext() {
            const date = new Date();
            const formattedDate = date.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            });
            let customerName = _.isEmpty(this.model.get("firstname")) ? "" : this.model.get("firstname");
            customerName += _.isEmpty(this.model.get("lastname")) ? "" : " " + this.model.get("lastname");
            let address = _.isEmpty(this.model.get("addr1")) ? "" : this.model.get("addr1");
            address += _.isEmpty(this.model.get("addr2")) ? "" : _.isEmpty(this.model.get("addr1")) ? this.model.get("addr2") : ", " + this.model.get("addr2");
            let contact = _.isEmpty(this.model.get("phone")) ? "" : this.model.get("phone");
            contact += _.isEmpty(this.model.get("email")) ? "" : _.isEmpty(this.model.get("phone")) ? this.model.get("email") : ", " + this.model.get("email");
            let address2 = _.isEmpty(this.model.get("city")) ? "" : this.model.get("city");
            address2 += _.isEmpty(this.model.get("zip")) ? "" : _.isEmpty(this.model.get("city")) ? this.model.get("zip") : ", " + this.model.get("zip");

            return {
                showform: this.showform,
                showRequestdisclosureCollected: this.requestdisclosureCollected,
                showRequestdisclosureShared: this.requestdisclosureShared,
                showRequestdisclosureSold: this.requestdisclosureSold,
                showSuccessScreen: this.successMessage,
                ReqDeletion: !this.requestdeletion,
                showuniqueID: this.uniqueID,
                downloadUrl: this.downloadUrl,
                removefromcatalog: this.removefromcatalog,
                formattedDate: formattedDate,
                customerName: customerName,
                address: address,
                address2: address2,
                contact: contact
            };
        }
    });
});