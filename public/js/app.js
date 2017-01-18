(function () {
  const signs = document.getElementById('signs');
  const display = document.getElementById('horoscope');
  const API_URL = 'http://localhost:3000/api';

  signs.addEventListener('change', function (event) {
    let sign = event.target.value;
    fetchHoroscope(sign);
  });

  function fetchHoroscope (sign) {
    fetch(`${API_URL}/${sign}`)
      .then(res => res.text())
      .then(displayText)
      .catch(displayError);
  }

  function displayText (text) {
    document.querySelector('.message').classList.remove('hidden');
    display.textContent = text;

    return text;
  }

  function displayError (err) {
    displayText(`There was an error: ${err}`);
  }
})();
