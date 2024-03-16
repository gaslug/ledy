let canClick = true; // Zmienna kontrolująca, czy można wysłać żądanie
let countdownTimer = document.getElementById('countdownTimer'); // Pobranie elementu licznika poza funkcję
let intervalId = null; // Zmienna do przechowywania ID interwału

function updateThingSpeak(value) {
  if (!canClick) {
    console.log("Proszę poczekać 15 sekund przed kolejnym kliknięciem.");
    return; // Zakończ funkcję, jeśli kliknięcie jest zablokowane
  }

  canClick = false; // Blokuj kolejne kliknięcia
  countdown(15); // Rozpocznij odliczanie do 15 sekund

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
      countdownTimer.innerHTML = "Błąd połączenia, spróbuj ponownie później."; // Informacja o błędzie
    });
}

function countdown(seconds) {
  // Czyścić istniejący licznik przed rozpoczęciem nowego
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }

  countdownTimer.innerHTML = `Poczekaj ${seconds} sekund(y) przed kolejnym kliknięciem.`;
  intervalId = setInterval(() => {
    seconds--;
    countdownTimer.innerHTML = `Poczekaj ${seconds} sekund(y) przed kolejnym kliknięciem.`;
    if (seconds <= 0) {
      clearInterval(intervalId);
      countdownTimer.innerHTML = ""; // Usuń tekst licznika po zakończeniu odliczania
      canClick = true; // Odblokuj kliknięcie po zakończeniu odliczania
    }
  }, 1000); // Odliczaj co 1 sekundę
}
