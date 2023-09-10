document.addEventListener('DOMContentLoaded', function () {
    const searchButton = document.getElementById('searchButton');
    const cardNameInput = document.getElementById('cardName');
    const cardInfoDiv = document.getElementById('cardInfo');

    searchButton.addEventListener('click', function () {
        const cardName = cardNameInput.value.trim();
        if (cardName === '') {
            alert('Por favor, ingresa el nombre de una carta.');
            return;
        }

        fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${cardName}`)
            .then(response => response.json())
            .then(data => {
                if (data.data.length === 0) {
                    cardInfoDiv.innerHTML = '<p>No se encontró la carta.</p>';
                } else {
                    const card = data.data[0];
                    const cardInfo = `
                        <h2>${card.name}</h2>
                        <p><strong>Tipo:</strong> ${card.type}</p>
                        <img src="${card.card_images[0].image_url}" alt="${card.name}" width="200">
                    `;
                    cardInfoDiv.innerHTML = cardInfo;
                }
            })
            .catch(error => {
                console.error('Error:', error);
                cardInfoDiv.innerHTML = '<p>Ocurrió un error al buscar la carta.</p>';
            });
    });
});