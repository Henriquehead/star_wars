let currentPageUrl = 'https://swapi.dev/api/people/';

window.onload = async () => {   // Ativa a função toda vez que a pg é carregada
    try {
        await loadCharacters(currentPageUrl);
    }catch (error) {
        console.log(error);
        alert("erro ao carregar partes")
    }
}

async function loadCharacters(url) {
    const mainContent = document.getElementById("main-content");
    mainContent.innerHTML = ""; //Limpar os resultados anteriores

    try {

        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.forEach((character) => {  //Criação dos cards
            const card = document.createElement("div");
            card.style.backgroundImage = `url ("https://starwars-visualguide.com/assets/img/characters/2.jpg")`;
            card.className = 'cards'
        })
        console.log(response)

    }catch(error) {
        alert("Erro ao carregar os cards");
        console.log(error)
    }
}