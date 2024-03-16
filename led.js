
function updateThingSpeak(value) {
  const writeApiKey = 'PD2PF82ZK1ZKM5G9';
  const url = `https://api.thingspeak.com/update?api_key=${writeApiKey}&field1=${value}`;

  fetch(url, { method: 'GET' })
    .then(response => response.text())
    .then(data => {
      console.log(`stan przycisku: ${value}`);
      console.log(`ThingSpeak update response: ${data}`);
      // Tutaj możesz dodać logikę potwierdzenia, np. zmianę stanu przycisku
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
