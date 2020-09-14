/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-shadow */
const express = require('express');
const jwt = require('jsonwebtoken');

const PORT = process.env.PORT || 3002;
const bodyParser = require('body-parser');

const app = express();
const bcrypt = require('bcryptjs');
const verifyTokenMiddleWare = require('./src/server/middleware');
const mysqlConnection = require('./src/server/mySqlConnection');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', express.static('build'));

app.post('/enter', (req, res) => {
  const { mail, password } = req.body;

  console.log(mail, password, 789);

  mysqlConnection.query(`SELECT * from users WHERE mail='${mail}';`, async (err, user) => {
    if (err) {
      console.log(err);
    } else {
      if (user.length === 0) {
        return res.json({ isUserInTheBase: false });
      }

      const isCorrectPassword = await bcrypt.compare(password, user[0].password);

      if (isCorrectPassword) {
        mysqlConnection.query(`SELECT * from cart WHERE userId='${mail}';`, async (err, data) => {
          console.log(data);
        });
        jwt.sign({ user: user[0] }, 'secretkey', (err, token) => {
          return res.json({
            token,
            userName: user[0].userName,
          });
        });
      } else {
        return res.json({
          isUserInTheBase: false,
        });
      }
    }
  });
});

app.post('/logout', verifyTokenMiddleWare, async (req, res) => {
  res.sendStatus(200);
  jwt.verify(req.token, 'secretkey', (err, data) => {
    req.token = '';
    console.log(data);
  });
});

app.get('/', (req, res) => {
  res.sendFile('/Users/lili4ka/Desktop/projects/bud/build/index.html');
});

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);

  mysqlConnection.query(`SELECT * from users WHERE mail='${email}';`, (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      console.log(rows, req.body, 'jnj');
      if (!rows.length) {
        mysqlConnection.query(`INSERT INTO users (userName, mail, password) VALUES ('${name}', '${email}', '${hashPassword}')`,
          (err) => {
            if (err) {
              console.log(err);
            } else {
              return res.json({ isRegistrationDone: true, userName: name });
            }
          });
      } else {
        return res.json({ isRegistrationDone: false });
      }
    }
  });
});

app.listen(PORT, () => console.log('server is working now', PORT));
