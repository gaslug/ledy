
function updateThingSpeak(value) {
  const writeApiKey = 'PD2PF82ZK1ZKM5G9';
  const url = `https://api.thingspeak.com/update?api_key=${writeApiKey}&field1=${value}`;

  fetch(url, { method: 'GET' })
    .then(response => response.text())
    .then(data => {
      console.log(`ThingSpeak update response: ${value}`);
      // Tutaj możesz dodać logikę potwierdzenia, np. zmianę stanu przycisku
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
