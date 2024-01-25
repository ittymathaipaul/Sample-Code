<section class="myaccountprivacyreq-info-card container">
  <h2>Privacy Request Form</h2>
  <div><small class="warningmessage"></small></div>
  {{#unless showuniqueID}}
  <p class="myaccountprivacyreq-subtitle">Please complete this form and make your privacy choices below. Name and
    address are required along with email address and/or phone number.</p>
  {{/unless}}
  <!-- FORM -->
  {{#if showuniqueID}}
  <div class="rdcontentsbutton rdcontents">
    <div class="notif">
      <p>Your request has been received.{{#unless ReqDeletion}} You have requested account deletion, please contact us
        via phone if this was
        a mistake.{{/unless}} View information below or <a href="{{downloadUrl}}" target="_blank"
          rel="noopener">download PDF</a>.</p>
    </div>
    <div><a href="/privacy_request" data-touchpoint="home"><button>Go Back</button></a>
    </div>
  </div>
  <div>
    {{formattedDate}} <br>
    {{customerName}} <br>
    {{address}} <br>
    {{address2}} <br>
    {{contact}}
  </div>
  <br>
  <div class="privacy-uniqueid">
    <h5>CONFIRMATION: </h5> <span>{{showuniqueID}}</span>
    {{#if showuniqueID}}
    {{/if}}
  </div>
  <div>
    <br>
    <ul class="confirmation-list">
      {{#if removefromcatalog}}
      <li>REMOVE ME FROM CATALOG AND OTHER POSTAL MAILINGS</li>
      {{/if}}
      {{#unless ReqDeletion}}
      <li>REQUEST DELETION OF MY PERSONAL INFORMATION</li>
      {{/unless}}
      {{#if showRequestdisclosureCollected}}
      <li>REQUEST DISCLOSURE OF MY PERSONAL INFORMATION COLLECTED</li>
      {{/if}}
      {{#if showRequestdisclosureShared}}
      <li>REQUEST DISCLOSURE OF MY PERSONAL INFORMATION SHARED</li>
      {{/if}}
      {{#if showRequestdisclosureSold}}
      <li>REQUEST DISCLOSURE OF MY PERSONAL INFORMATION SOLD</li>
      {{/if}}
    </ul>
    <br>
    <p>
      Retain the confirmation for your records.
      <br> <br>
      Upon verification of your identity through your account or other information, Valley Vet will delete your personal
      information unless it is exempt from this deletion request under applicable law. Valley Vet will maintain a record
      of your deletion request to ensure any deleted information remains deleted.
    </p>
  </div>
  {{/if}}
  <div class="showInitForm {{#if showInitForm}}hidden{{/if}}">
    <!-- Success -->
    {{#if showform}}
    <form role="form" class="privacy-form" action="POST" novalidate>
      <ul>
        <li>
          <label>
            <input type="checkbox" name="removefromcatalog" />
            <p>Remove Me from Catalog and other Postal Mailings</p>
          </label>
        </li>
        <li id="row-reqdeletion">
          <label>
            <input type="checkbox" name="requestdeletion" />
            <p>
              Request deletion of my Personal Information
              <span class="warning">Warning: Your account will no longer be accessible when process
                completes.<br />Selecting Delete my Personal Information will cancel any open orders-including open
                prescriptions (and the prescription information) and open Auto-ship orders.</span>
            </p>
          </label>
        </li>
        <li class="rdchecker">
          <label>
            <input type="checkbox" name="requestdisclosureCollected" />
            <p>Request disclosure of my Personal Information Collected</p>
          </label>
        </li>
        <li class="rdchecker">
          <label>
            <input type="checkbox" name="requestdisclosureShared" />
            <p>Request disclosure of my Personal Information Shared</p>
          </label>
        </li>
        <li class="rdchecker">
          <label>
            <input type="checkbox" name="requestdisclosureSold" />
            <p>Request disclosure of my Personal Information Sold</p>
          </label>
        </li>
      </ul>
      <div class="privacy-address-content">
        <div class="address-form-two-column">
          <div class="address-form-controls-group" data-validation="control-group" data-input="firstname">
            <label class="address-form-label" for="firstname">
              {{translate 'First Name <small class="address-form-required">*</small>'}}
            </label>
            <div class="address-form-controls" data-validation="control">
              <input type="text" name="firstname" id="firstname" class="address-form-input" />
            </div>
          </div>

          <div class="address-form-controls-group" data-validation="control-group" data-input="lastname">
            <label class="address-form-label" for="lastname">
              {{translate 'Last Name <small class="address-form-required">*</small>'}}
            </label>
            <div class="address-form-controls" data-validation="control">
              <input type="text" name="lastname" id="lastname" class="address-form-input" />
            </div>
          </div>
        </div>


        <div class="address-form-two-column">
          <div class="address-form-controls-group" data-validation="control-group" data-input="addr1">
            <label class="address-edit-fields-group-label" for="addr1">
              {{translate 'Address Line'}} <span class="address-edit-fields-input-required">*</span>
            </label>
            <div class="address-edit-fields-group-form-controls" data-validation="control">
              <input type="text" class="address-edit-fields-group-input" id="addr1" name="addr1"
                value="{{addressLine1}}" placeholder="Example: 1234 Main Street">
            </div>
          </div>

          <div class="address-form-controls-group" data-validation="control-group" data-input="addr2">
            <label for="addr2" class="address-edit-fields-addr2-optional-label">
              {{translate 'APT, STE, ETC'}}
            </label>
            <div>
              <input type="text" class="address-edit-fields-group-input" id="addr2" name="addr2"
                value="{{addressLine2}}" placeholder="Example: Apt. 3 or Suite #1516">
            </div>
          </div>
        </div>


        <div class="address-form-two-column">
          <div class="address-form-controls-group" data-validation="control-group" data-input="city">
            <label class="address-edit-fields-group-label" for="city">
              {{translate 'City'}} <span class="address-edit-fields-input-required">*</span>
            </label>
            <div class="address-edit-fields-group-form-controls" data-validation="control">
              <input type="text" class="address-edit-fields-group-input" id="city" name="city" value="{{city}}">
            </div>
          </div>

          <div class="address-form-controls-group" data-validation="control-group" data-input="zip">
            <label class="address-edit-fields-group-label" for="zip">
              {{translate 'Zip Code'}} <span class="address-edit-fields-input-required">*</span>
            </label>
            <div class="address-edit-fields-group-form-controls" data-validation="control">
              <input type="text" class="address-edit-fields-group-input-zip" id="zip" name="zip" value="{{zip}}"
                data-type="zip" placeholder="Example: 94117">
            </div>
          </div>
        </div>

        <div class="address-form-two-column">
          <div class="address-edit-fields-group" data-input="phone" data-validation="control-group">
            <label class="address-edit-fields-group-label" for="phone">
              {{translate 'Phone'}}
            </label>
            <div class="address-edit-fields-group-form-controls" data-validation="control">
              <input type="tel" class="address-edit-fields-group-input" id="phone" name="phone" value="{{phone}}"
                data-action="inputphone" placeholder="Example: 555-123-1234">
            </div>
          </div>
          <div class="address-edit-fields-group" data-input="cell" data-validation="control-group">
            <label class="address-edit-fields-group-label" for="cell">
              {{translate 'Cell Number'}}
            </label>
            <div class="address-edit-fields-group-form-controls" data-validation="control">
              <input type="tel" class="address-edit-fields-group-input" id="cell" name="cell" value="{{cell}}"
                data-action="inputcell">
            </div>
            <small class="warning">Warning: If you wish to opt out and delete your mobile phone number from SMS/text
              message subscriptions, you must provide your phone number to complete the process.</small>
          </div>
        </div>


        <div class="address-form-two-column">
          <div class="address-form-controls-group" data-validation="control-group" data-input="email">
            <label class="address-form-label" for="email">
              {{translate 'Email Address'}}
              {{!-- <small class="address-form-required">*</small> --}}
            </label>
            <div class="address-form-controls" data-validation="control">
              <input type="text" name="email" id="email" class="address-form-input" />
            </div>
          </div>

          <div class="address-form-controls-group" data-validation="control-group" data-input="email-confirm">
            <label class="address-form-label" for="email-confirm">
              {{translate 'Re-Enter Email Address'}}
              {{!-- <small class="address-form-required">*</small> --}}
            </label>
            <div class="address-form-controls" data-validation="control">
              <input type="text" name="email-confirm" id="email-confirm" class="address-form-input" />
            </div>
          </div>
        </div>

      </div>
      <div class="captcha-container">
        <div id="PrivacyCaptcha"></div>
        <div><small class="recaptcha-message"></small></div>
      </div>
      <button type="submit" class="sendRequest">Send Request</button>
    </form>
    {{/if}}
  </div>

  <!-- Request Disclosure - Sold -->
  <div class="rdcontents rdsold {{#unless showRequestdisclosureSold}}hidden{{/unless}}">
    <h3>Your Personal Information We Have Sold</h3>
    <p>We do not sell consumers' personal information and in the past 12 months have not sold consumers' personal
      information.</p>
  </div>

  <!-- Request Disclosure - Collected -->
  <div class="rdcontents rdcollected {{#unless showRequestdisclosureCollected}}hidden{{/unless}}">
    <h3>Categories and Sources of Personal Information We Have Collected About You</h3>
    <ul>
      <li>Purchases and Other Financial Transactions. When you make a purchase or engage in any other financial
        transaction, you will be asked to provide information necessary to facilitate the transaction, such as your
        name, credit card or debit card number, associated security code, telephone number, billing address, email
        address, and shipping address.</li>
      <li>Program Registration. In connection with your registration or other interaction online with one of our
        programs, you may be asked to provide certain personal information, such as your name, email address, mailing
        address, and date of birth or age-as well as information about your pet-and to create a user name and password.
      </li>
      <li>Sign-Up for Emails, Newsletters, or Other Correspondence. If you sign up on the Site to receive email
        communications, newsletters, or other correspondence from us, you may be asked to provide us with your name,
        email address, and mailing address, along with other information related to your subscription or correspondence.
      </li>
      <li>Contests, Sweepstakes, and Other Promotions. We may collect information about you when you participate in a
        promotion that we sponsor, such as a contest or sweepstakes (which we may sponsor alone, or co-sponsor with one
        or more third parties). To participate in one of our promotions, you may be asked to provide your name, email
        address, mailing address, and other contact information. For some promotions, we may request other information
        about you as well. Your participation will be subject to the official rules of the promotion, as well as this
        privacy policy, and the privacy policy of any co-sponsor.</li>
      <li>Interactive Forums. You and other users may be allowed to post comments and other content on certain portions
        of the Site, such as on a discussion board, blog, or other interactive forum. We may collect any information
        that you or another user posts about you on the Site-including personal information about you-and it may be
        available to all users who have access to the Site. Please keep this in mind when considering what information
        to post to the Site.</li>
      <li>Social Networking Activities. The Site may include the ability for you and other users to link to one or more
        social networking platforms (such as Facebook or Twitter). We may receive information about you when you choose
        to post or otherwise share information about us on any of these social networking platforms. Any information
        that you or others post to a social networking platform will be accessible by any users of the platform, subject
        to its terms of service and privacy policy.</li>
      <li>Social Sign-In. The Site may incorporate functionality enabling you to sign-on using your login information
        from a social networking platform, in lieu of creating a new login account specifically for the Site. If we
        incorporate such functionality and you use it to sign into the Site, we may collect information about you from
        the social networking platform, such as your list of friends, "likes," and interests, as well as your contact
        information.</li>
      <li>Usage Data. When you use or access the Site, we may collect certain usage data generated by your activities on
        the Site, including your search terms, page views, purchasing history, credit card chargeback data, pages
        viewed, number of bytes transferred, hyperlinks clicked, and other actions you take on the Site. The Site may
        also track the URL that you visit before you come to the Site, the URL that you go to next, and your Internet
        Protocol (IP) address or mobile device identifier.</li>
      <li>Location and Device Data. We collect information about your location, such as the approximate location of your
        computer, phone, or other device (geolocation)from which you access the Site, as well as your IP address, and
        related data. We may associate information we collect from your different devices, which helps us provide
        consistent services and experiences across your devices. Some examples of the device information we collect are
        attributes such as the operating system, hardware version, device settings, file and software names and types,
        battery and signal strength, and device identifiers; device locations, including geographic locations through
        GPS, Bluetooth, or WiFi signals; and connection information such as the name of your mobile operator or ISP,
        browser type, language and time zone, mobile phone number, and IP address.</li>
      <li>Online Information-Gathering Tools. We use cookies, mobile advertising identifiers, web beacons, and other
        online information-gathering tools in connection with the Site-including Google advertising cookies and
        identifiers to enable the collection of Google Analytics data for web traffic on the Site. These tools are
        intended to make using the Site easier in various ways, such as saving your preferences for you. We may also use
        cookies to deliver content tailored to your interests. If your browser is set to reject cookies, or if your
        browser notifies you that you are about to receive a cookie and you reject it, then your use of the Site may not
        be as efficient as if the cookies were enabled. For example, if you have chosen to enable Google to associate
        your web and app browsing history with your Google account, and to use information from your Google account to
        personalize ads, Google will use data from you while signed-in to your Google account (personal information),
        together with Google Analytics advertising cookies and identifiers to tailor ads to your indicated preferences,
        across your devices. We do not share information that personally identifies you (information such as your name
        or email address that can by itself be used to contact or identify you) with advertising measurement or
        analytics partners unless you give us permission. We may provide these partners with information about the reach
        and effectiveness of their advertising without providing information that personally identifies you, or if we
        have aggregated the information so that it does not personally identify you. You may opt-out of Google Analytics
        by following Google's opt-out instructions.</li>
      <li>Third-Party Integrated Services. We may incorporate third-party ads and other third-party content on the Site,
        and integrate other third-party offerings into the Site, enabling certain such third parties to collect
        information about you or your online activities across other websites and, over time, through your use of the
        Site. For example, Google uses cookies to serve the Google Reviews badge on the Site, and to serve ads based on
        your prior visits to the Site. You may opt-out of Google's use of cookies to serve ads based on your prior
        visits to the Site by visiting the Google advertising opt-out page. Except as otherwise described in this
        privacy policy, any information collected through such integrated technologies is collected directly by these
        third parties for use by such third parties and other authorized parties, subject to the privacy policies of
        those other parties.</li>
      <li>Online Inquiries and Correspondence. When you submit an inquiry or otherwise correspond through the Site, you
        may be asked to provide your name, email address, and other personal information to us.</li>
      <li>Voice Recordings. We collect voice recordings of calls made to the Valley Vet Pharmacy for quality control and
        regulatory purposes.</li>
      <li>Live Chat. When you communicate with us online through the Live Chat interface, we collect these
        communications for customer service, processing personal information requests, compliance records, and training
        purposes.</li>
      <li>Valley Vet Supply may collect your email address via cookies and pixels on the Website through the use of
        trusted service providers. These service providers may combine your email information with other information
        they have access to such as mailing address so that Valley Vet Supply may serve relevant marketing offers to you
        via direct mail.</li>
    </ul>
  </div>

  <!-- Request Disclosure - Shared -->
  <div class="rdcontents rdshared {{#unless showRequestdisclosureShared}}hidden{{/unless}}">
    <h3>Your Personal Information We Have Disclosed To Service Providers For a Business Purpose</h3>
    <p>In the last 12 months, we have disclosed personal information about you to our service providers for business
      purposes, including to maintain and service accounts, provide customer service, process and fulfill orders and
      transactions, verify customer information, authorize and process payment transactions, provide financing, provide
      advertising and marketing services, provide analytic services, detect and prevent fraud and security threats,
      provide order tracking services, calculate and remit sales taxes, expedite product rebate calculation and payment
      services, facilitate reporting and information-sharing regarding adverse drug events and disease control, process
      and deliver sweepstakes prizes and customer appreciation gifts, facilitate Live Chat communications for online
      customer service, send printed catalogs and product-related information, and facilitate product and site reviews.
      The categories of information disclosed to our service providers include (1) identifiers, such as name, address,
      phone number, unique personal identifier, internet protocol address, email address, account number; (2) internet
      or other electronic network activity information, such as browsing history, search history, page views, and
      information regarding consumer interaction with our Site; (3) commercial information such as products purchased,
      order history, products considered, product and site reviews, and other product histories and tendencies; and (4)
      geolocation data.</p>
  </div>


</section>


<!--
  Available helpers:
  {{ getExtensionAssetsPath "img/image.jpg"}} - reference assets in your extension
  
  {{ getExtensionAssetsPathWithDefault context_var "img/image.jpg"}} - use context_var value i.e. configuration variable. If it does not exist, fallback to an asset from the extension assets folder
  
  {{ getThemeAssetsPath context_var "img/image.jpg"}} - reference assets in the active theme
  
  {{ getThemeAssetsPathWithDefault context_var "img/theme-image.jpg"}} - use context_var value i.e. configuration variable. If it does not exist, fallback to an asset from the theme assets folder
-->