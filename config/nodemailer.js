const nodemailer = require('nodemailer');

const {
  NODEMAILER_HOST, NODEMAILER_PORT, NODEMAILER_USER, NODEMAILER_PASS, NODEMAILER_SECURE
} = process.env;

const transporter = nodemailer.createTransport({
  host: NODEMAILER_HOST,
  port: NODEMAILER_PORT,
  secure: true,
  ssl: false,
  auth: {
    user: NODEMAILER_USER,
    pass: NODEMAILER_PASS,
  },
});

module.exports = transporter;
