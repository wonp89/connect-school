var moment = require('moment')

module.exports = (event) => {
  return `
    <html>
      <body>
        <div style="text-align: center;">
          <h3>Thank you for joing!</h3>
          <p>This email is for confiramtion</p>
          <p>${event.school}</p>
          <p>${event.title}</p>
          <p>${event.body}</p>
          <p>${event.location}</p>
          <p>${moment(event.date).format('MMMM Do YYYY, h:mm a')}</p>
        </div>
      </body>
    </html>
  `;
};