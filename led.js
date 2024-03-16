
let canClick = true; // Zmienna kontrolująca, czy można wysłać żądanie

function updateThingSpeak(value) {
  if (!canClick) {
    console.log("Proszę poczekać 6 sekund przed kolejnym kliknięciem.");
    return; // Zakończ funkcję, jeśli kliknięcie jest zablokowane
  }

  canClick = false; // Blokuj kolejne kliknięcia
  countdown(15); // Rozpocznij odliczanie

  const writeApiKey = 'PD2PF82ZK1ZKM5G9';
  const url = `https://api.thingspeak.com/update?api_key=${writeApiKey}&field1=${value}`;

  fetch(url, { method: 'GET' })
    .then(response => response.text())
    .then(data => {
      console.log(`stan przycisku: ${value}`);
      console.log(`ThingSpeak update response: ${data}`);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function countdown(seconds) {
  const countdownTimer = document.getElementById('countdownTimer');
  countdownTimer.innerHTML = `Poczekaj ${seconds} sekund(y) przed kolejnym kliknięciem.`;

  let intervalId = setInterval(() => {
    seconds--;
    countdownTimer.innerHTML = `Poczekaj ${seconds} sekund(y) przed kolejnym kliknięciem.`;
    if (seconds <= 0) {
      clearInterval(intervalId);
      countdownTimer.innerHTML = ""; // Usuń tekst licznika po zakończeniu odliczania
      canClick = true;
    }
  }, 1000); // Odliczaj co 1 sekundę
}
