// CD.PrivacyRequest.PrivacyRequest.js
// Load all your starter dependencies in backend for your extension here
// ----------------

define('CD.PrivacyRequest.PrivacyRequest'
	, [
		'CD.PrivacyRequest.PrivacyRequest.ServiceController', 'SC.Model', 'Utils', 'underscore'
	]
	, function (
		PrivacyRequestServiceController, SCModel, Utils, _
	) {
		'use strict';
		return SCModel.extend({

			CreateLead: function (data) {
				var CONTENT = '';
				if (!_.isEmpty(data.email)) {
					var customerSearch = nlapiSearchRecord("customer", null,
						[["email", "is", Utils.sanitizeString(data.email)]],
						[new nlobjSearchColumn("internalid").setSort(false),]
					);
				}
				var uniqueID = (Math.floor(Math.random() * Date.now()).toString(16)).toUpperCase();
				uniqueID = this.formatID(uniqueID);
				var todayDate = new Date()
					, todayYear = todayDate.getFullYear()
					, todayDay = todayDate.getDate()
					, todayMonth = todayDate.getMonth() + 1
					, dateToday = todayMonth + '/' + todayDay + '/' + todayYear;
				if (!!customerSearch) {
					if (customerSearch.length > 0) {
						try {
							var listid = customerSearch[0].getValue("internalid");
							var record = nlapiLoadRecord('customer', listid, { recordmode: 'dynamic' });
							var numberOfAddresses = record.getLineItemCount('addressbook');
							nlapiLogExecution('DEBUG', 'numberOfAddresses', numberOfAddresses);
							if (numberOfAddresses < 1) {
								nlapiLogExecution('DEBUG', 'Inside', numberOfAddresses);
								var address = record.createCurrentLineItemSubrecord('addressbook', 'addressbookaddress');
								// set subrecord fields
								address.setFieldValue('country', "US"); // Country must be set before setting the other address fields
								address.setFieldValue('addressee', data.firstname);
								address.setFieldValue('addrphone', data.phone);
								address.setFieldValue('addr1', data.addr1);
								address.setFieldValue('addr2', data.addr2);
								address.setFieldValue('city', data.city);
								address.setFieldValue('zip', data.zip);
								address.commit();
								nlapiLogExecution('DEBUG', 'AddresCommit', address);
								record.commitLineItem('addressbook');

							}
							if (data.cell) {
								var cell = Utils.sanitizeString(data.cell);
								record.setFieldValue('mobilephone', cell);
							}
							record.setFieldValue('custentity_req_unique_id', uniqueID);
							record.setFieldValue('custentity_vv_form_request_date', dateToday);
							//record.setFieldValue('custentity_vv_dontsellpersonalinfo', _.isEmpty(data.dontsell) ? 'F' : 'T'); #184763170
							record.setFieldValue('custentity_vv_removefromcatalog', _.isEmpty(data.removefromcatalog) ? 'F' : 'T');
							record.setFieldValue('custentity_vv_requestdeletion', _.isEmpty(data.requestdeletion) ? 'F' : 'T');
							record.setFieldValue('custentity_vv_requestdisc_collected', _.isEmpty(data.requestdeletion) ? 'F' : 'T');
							record.setFieldValue('custentity_vv_requestdisc_shared', _.isEmpty(data.requestdisclosureCollected) ? 'F' : 'T');
							record.setFieldValue('custentity_vv_requestdisc_sold', _.isEmpty(data.requestdisclosureShared) ? 'F' : 'T');
							var formdata = {
								firstName: _.isEmpty(data.firstname) ? '' : data.firstname,
								lastName: _.isEmpty(data.lastName) ? '' : data.firstname,
								phone: _.isEmpty(data.phone) ? '' : data.phone,
								mobilePhone: _.isEmpty(data.cell) ? '' : data.cell,
								email: _.isEmpty(data.email) ? '' : data.email,
								address: _.isEmpty(data.addr1) ? '' : data.addr1,
								address2: _.isEmpty(data.addr2) ? '' : data.addr2,
								city: _.isEmpty(data.city) ? '' : data.city,
								zip: _.isEmpty(data.zip) ? '' : data.zip,
							};
							nlapiLogExecution('DEBUG', 'formdata', JSON.stringify(formdata));
							record.setFieldValue('custentity_privacy_form_values', JSON.stringify(formdata));
							nlapiSubmitRecord(record, false, true);
							return {
								successMessage: 'Your request has been submitted',
								uniqueID: uniqueID
							};
						} catch (e) {
							// statements
							console.error('err@OldCustomer', e);
							return {
								status: 500,
								code: 'ERR_FORM',
								message: 'There was an error submitting the form, please try again later'
							};
						}
					}
				} else {
					try {
						var firstname, lastname, addr1, email, city, zip, cell;
						var customerRecord = nlapiCreateRecord('lead', { recordmode: 'dynamic' });
						customerRecord.setFieldValue('isperson', 'T');
						customerRecord.setFieldValue('entitystatus', 6); //LEAD-Unqualified
						nlapiLogExecution('DEBUG', 'CreatedNewLead', data.firstname);
						customerRecord.setFieldValue('custentity_vv_form_request_date', dateToday);
						customerRecord.setFieldValue('custentity_req_unique_id', uniqueID);
						if (data.firstname) {
							firstname = Utils.sanitizeString(data.firstname);
							customerRecord.setFieldValue('firstname', firstname);
						}
						if (data.lastname) {
							lastname = Utils.sanitizeString(data.lastname);
							customerRecord.setFieldValue('lastname', lastname);
						}
						if (data.addr1) {
							addr1 = Utils.sanitizeString(data.addr1);
							customerRecord.setFieldValue('addr1', addr1);
						}
						if (data.city) {
							city = Utils.sanitizeString(data.city);
							customerRecord.setFieldValue('city', city);
						}
						if (data.zip) {
							zip = Utils.sanitizeString(data.zip);
							customerRecord.setFieldValue('zip', zip);
						}
						if (data.email) {
							email = Utils.sanitizeString(data.email);
							customerRecord.setFieldValue('email', email);
						}
						if (data.phone) {
							phone = Utils.sanitizeString(data.phone);
							customerRecord.setFieldValue('phone', phone);
						}
						if (data.cell) {
							cell = Utils.sanitizeString(data.cell);
							customerRecord.setFieldValue('mobilephone', cell);
						}

						customerRecord.setFieldValue('subsidiary', 2);
						var address = customerRecord.createCurrentLineItemSubrecord('addressbook', 'addressbookaddress');
						// set subrecord fields
						address.setFieldValue('country', "US"); // Country must be set before setting the other address fields
						address.setFieldValue('addressee', data.firstname);
						address.setFieldValue('addrphone', data.phone);
						address.setFieldValue('addr1', data.addr1);
						address.setFieldValue('addr2', data.addr2);
						address.setFieldValue('city', data.city);
						// address.setFieldValue('state', data.state);
						address.setFieldValue('zip', data.zip);
						address.commit();
						customerRecord.commitLineItem('addressbook');

						// if (data.dontsell) {
						// 	customerRecord.setFieldValue('custentity_vv_dontsellpersonalinfo', "T");
						// } #184763170
						if (data.removefromcatalog) {
							customerRecord.setFieldValue('custentity_vv_removefromcatalog', "T");
						}
						if (data.requestdeletion) {
							customerRecord.setFieldValue('custentity_vv_requestdeletion', "T");
						}
						if (data.requestdisclosureCollected) {
							customerRecord.setFieldValue('custentity_vv_requestdisc_collected', "T");
						}
						if (data.requestdisclosureShared) {
							customerRecord.setFieldValue('custentity_vv_requestdisc_shared', "T");
						}
						if (data.requestdisclosureSold) {
							customerRecord.setFieldValue('custentity_vv_requestdisc_sold', "T");
						}
						var formdata = {
							firstName: _.isEmpty(data.firstname) ? '' : data.firstname,
							lastName: _.isEmpty(data.lastName) ? '' : data.firstname,
							phone: _.isEmpty(data.phone) ? '' : data.phone,
							mobilePhone: _.isEmpty(data.cell) ? '' : data.cell,
							email: _.isEmpty(data.email) ? '' : data.email,
							address: _.isEmpty(data.addr1) ? '' : data.addr1,
							address2: _.isEmpty(data.addr2) ? '' : data.addr2,
							city: _.isEmpty(data.city) ? '' : data.city,
							zip: _.isEmpty(data.zip) ? '' : data.zip,
						};
						nlapiLogExecution('DEBUG', 'formdata', JSON.stringify(formdata));
						customerRecord.setFieldValue('custentity_privacy_form_values', JSON.stringify(formdata));
						nlapiSubmitRecord(customerRecord, false, true);
						return {
							successMessage: 'Your request has been submitted.',
							uniqueID: uniqueID
						};
					} catch (e) {
						// statements
						console.error('err@NewCustomer', e);
						return {
							status: 500,
							code: 'ERR_FORM',
							message: 'There was an error submitting the form, please try again later'
						};
					}
				}
			},
			formatID: function (data) {
				var match = data.match(/^(\w{3})(\w{3})(\w{1,6})$/);
				if (match) {
					return match[1] + '-' + match[2] + '-' + match[3];
				}
				return null;
			}
		});
	});