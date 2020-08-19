const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const fetch = require('node-fetch');
const path = require('path');
const { response } = require('express');
const port = process.env.PORT || 2000;
const apiKey = '726728b2ca9dcbc4c8c52078c3cce0cd-us17';
const baseUrl = 'https://us17.api.mailchimp.com/3.0';
const id = '7fa67ee28d';

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/register', (req, res) => {
  const { firstName, lastName, email } = req.body;

  const data = {
    "email_address": email,
    "status": 'subscribed',
    merge_fields: {
      FNAME: firstName,
      LNAME: lastName
    }
  }

  const postBody = JSON.stringify(data)

  const options = {
    url: `${baseUrl}/lists/${id}/members`,
    method: 'POST',
    headers: {
      Authorization: `auth ${apiKey}`,
    },
    body: postBody
  }

  request(options, (err, response) => {
    if (err) {
      res.send(err)
    } else {
      res.send('Successfully signed up!')
    }
  })
})

app.listen(port, () => console.log('Running at port 2000'))