const fetch = require('node-fetch');

const getAccessToken = async () => {
  try {
    const response = await fetch('https://accounts.zoho.com/oauth/v2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        refresh_token: '1000.e826eccd10c7787520c8f3a378b3a397.40f11d9c8adb5e4d75103d18365cdb8d',
        client_id: '1000.3I2M974ITBZZ2BYER52PIA4JL0RSNO',
        client_secret: '88b2e12b4e43b2dbb0926705ae5fcc45968d8762f0',
        grant_type: 'refresh_token',
      }),
    });

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Failed to fetch access token', error);
    return null;
  }
};


module.exports = {
  async beforeCreate(event) {
    const {
      data
    } = event.params;
    
      const captchaToken = data.captchaToken;
    if (!captchaToken) throw new Error('Captcha token missing.');

    try {
      const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=6LfqBCwsAAAAAEMSxRnAJ8vG0bBLSh5o1EcU7MPT&response=${captchaToken}`;
      const res = await fetch(verifyURL, {
        method: 'POST'
      });
      const verification = await res.json();

      if (!verification.success) {

      }

    } catch (err) {


    }

  },

  async afterCreate(event) {
    const {
      result
    } = event;

    try {

       const {
      formdata
    } = event.params;

    console.log('formdata', formdata);

      const accessToken = await getAccessToken();

      if (!accessToken) {
        throw new Error('Failed to get access token');
      }

      function capitalize(str) {
        if (!str || typeof str !== 'string') return '';
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
      }

      const response = await fetch('https://www.zohoapis.com/crm/v2/Leads', {
        method: 'POST',
        headers: {
          'Authorization': `Zoho-oauthtoken ${accessToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          data: [{
            First_Name: result.FirstName,
            Last_Name: result.LastName,
            Email: result.Email,
            Company: result.Company,
            Service1:[result.Service],
            Mobile: result.Phone,
            Description: result.Message,
            Lead_Source: capitalize(result.lead_source),
            Referrer: result.referrer,
            Lead_Origin: 'UAE',
            Lead_Type:"Oddo Service",
            utm_source: result.utm_source,
            utm_medium: result.utm_medium,
            utm_campaign: result.utm_campaign,
            utm_term: result.utm_term,
            utm_content: result.utm_content,
            gclid: result.gclid,
            referrer_url: result.referrer,
            Lead_Medium: result.lead_source,
          }, ],
        }),
      });

      const data = await response.json();

      console.log('After Create Hook Triggered:data', data);

      if (!response.ok) {
        console.error('Error creating lead in Zoho:', data);
      }
    } catch (error) {
      console.error('Error during afterCreate lifecycle hook:', error);
    }

    console.log('After Create Hook Triggered:', result);
  },
};
