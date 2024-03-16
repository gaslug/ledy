let canClick = true; // Zmienna kontrolująca, czy można wysłać żądanie
let countdownTimer = document.getElementById('countdownTimer'); // Pobranie elementu licznika poza funkcję

function updateThingSpeak(value) {
  if (!canClick) {
    console.log("Proszę poczekać 15 sekund przed kolejnym kliknięciem.");
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
      countdownTimer.innerHTML = "Błąd połączenia, spróbuj ponownie później."; // Informacja o błędzie
    })
    .finally(() => {
      // Zawsze zwalnia blokadę po próbie aktualizacji, nawet jeśli wystąpi błąd
      canClick = true; 
      countdownTimer.innerHTML = ""; // Usuń komunikat licznika/błędu
    });
}

function countdown(seconds) {
  countdownTimer.innerHTML = `Poczekaj ${seconds} sekund(y) przed kolejnym kliknięciem.`;

  let intervalId = setInterval(() => {
    seconds--;
    countdownTimer.innerHTML = `Poczekaj ${seconds} sekund(y) przed kolejnym kliknięciem.`;
    if (seconds <= 0) {
      clearInterval(intervalId);
      countdownTimer.innerHTML = ""; // Usuń tekst licznika po zakończeniu odliczania
    }
  }, 1000); // Odliczaj co 1 sekundę
}
