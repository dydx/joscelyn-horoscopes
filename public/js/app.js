(function () {
  /**
   * getting the dropdown list on line 20 of index.html
   */
  const signs = document.getElementById('signs');

  /**
   * getting the message box on line 39 of index.html
   */
  const display = document.getElementById('horoscope');

  /**
   * Keeping the URL to our API out of the logic
   */
  const API_URL = 'http://localhost:3000/api';

  /**
   * Here we are adding an event listener to the dropdown list
   * so that we may use the provided value to query the API
   */
  signs.addEventListener('change', function (event) { // the event is 'change'
    let sign = event.target.value;                    // we are getting the users value
    fetchHoroscope(sign);                             // we are fetching the horoscope from the API
  });

  /**
   * function used to query the API for data. Does use a little ES6 notation.
   *
   * Biggest take-away from this is that it is using the Fetch API:
   * > https://developers.google.com/web/updates/2015/03/introduction-to-fetch
   */
  function fetchHoroscope (sign) {
    fetch(`${API_URL}/${sign}`)
      .then(res => res.text())
      .then(displayText)
      .catch(displayError);
  }

  /**
   * Here we are removing the hidden class from the message box
   * and then filling it with the API response's text
   *
   */
  function displayText (text) {
    document.querySelector('.message').classList.remove('hidden');
    display.textContent = text;

    return text;
  }

  /**
   * In case something goes wrong, we can tell the user
   */
  function displayError (err) {
    displayText(`There was an error: ${err}`);
  }
})();
