const Intercom = require('intercom-client');
require('dotenv').config();

const intercomToken = process.env.INTERCOM_ACCESS_TOKEN;

if (!intercomToken) {
  throw new Error('Intercom access token is missing. Please set INTERCOM_ACCESS_TOKEN in your .env file.');
}

const client = new Intercom.Client({ token: intercomToken });


exports.createIntercomRequest = async (req, res) => {
  const { userId, category, comments } = req.body;

  if (!userId || !category || !comments) {
    return res.status(400).send({ error: 'userId, category, and comments are required fields.' });
  }

  try {
    console.log('Sending request to Intercom...');
    await client.messages.create({
      message_type: 'inapp',
      body: `Category: ${category}\nComments: ${comments}`,
      from: {
        type: 'user',
        id: userId
      }
    });
    console.log('Request sent successfully.');
    res.status(200).send({ message: 'Request sent to Intercom' });
  } catch (error) {
    console.error('Error sending request to Intercom:', error.message);
    res.status(500).send({ error: 'Error sending request to Intercom' });
  }
};

const createExportJob = async (startDate, endDate) => {
  const startTimestamp = Math.floor(new Date(startDate).getTime() / 1000);
  const endTimestamp = Math.floor(new Date(endDate).getTime() / 1000);

  const fetch = await import('node-fetch').then(mod => mod.default);

  try {
    const response = await fetch('https://api.intercom.io/export/content/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Intercom-Version': '2.9',
        Authorization: `Bearer ${intercomToken}`
      },
      body: JSON.stringify({
        created_at_after: startTimestamp,
        created_at_before: endTimestamp
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error creating export job: ${error.message}`);
  }
};


exports.createExportJobRequest = async (req, res) => {
  const { startDate, endDate } = req.body;

  if (!startDate || !endDate) {
    return res.status(400).send({ error: 'startDate and endDate are required fields.' });
  }

  try {
    const jobData = await createExportJob(startDate, endDate);
    res.status(200).send(jobData);
  } catch (error) {
    console.error('Error creating export job:', error.message);
    res.status(500).send({ error: error.message });
  }
};
