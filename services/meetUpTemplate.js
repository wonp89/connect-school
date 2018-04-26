var moment = require('moment')

module.exports = (meetUp) => {
  return `
    <html>
      <body>
        <div style="text-align: center;">
          <h3>Thank you for joing!</h3>
          <p>This email is for confiramtion</p>
          <p>${meetUp.school}</p>
          <p>${meetUp.title}</p>
          <p>${meetUp.body}</p>
          <p>${meetUp.location}</p>
          <p>${moment(meetUp.date).format('MMMM Do YYYY, h:mm a')}</p>
        </div>
      </body>
    </html>
  `;
};