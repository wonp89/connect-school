var moment = require('moment');

module.exports = (event) => {
  return `
    <html>
      <body>
        <div style="text-align: center;">
          <h3>Thank you for joing the event!</h3>
          <h4>TITLE</h4>
          <p>${event.title}</p>
          <h4>SCHOOL</h4>
          <p>${event.school}</p>
          <h4>ABOUT THE EVENT</h4>
          <p>${event.body}</p>
          <h4>LOCATION</h4>
          <p>${event.location}</p>
          <h4>THE EVENT TIME</h4>
          <p>${moment(event.date).format('MMMM Do YYYY, h:mm a')}</p>
        </div>
      </body>
    </html>
  `;
};