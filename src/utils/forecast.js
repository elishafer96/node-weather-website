const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=95fc432542103c5311d774faaf19d1ca&query=${encodeURIComponent(
    latitude
  )},${encodeURIComponent(longitude)}&units=f`;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to weather service!");
    } else if (body.error) {
      callback("Unable to find location.");
    } else {
      const { current } = body;
      callback(
        undefined,
        "It is currently " +
          current.weather_descriptions[0].toLowerCase() +
          " and " +
          current.temperature +
          " degrees out.\nIt feels like " +
          current.feelslike +
          " degrees. The humidity is " +
          current.humidity +
          "%."
      );
    }
  });
};

module.exports = forecast;
