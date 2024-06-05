let currentPageUrl = 'https://swapi.dev/api/people/'

window.onload = async () => {
    try {
        await loadCharacters(currentPageUrl)
    }catch(error) {
        console.log(error);
        alert("Error ao carregar cards");
    }

               //Mapeia os botoes e coloca em variaveis
    const nextButton = document.getElementById("next-button");
    const backButton = document.getElementById("back-button");

        //Monitora os eventos nos botoes
    nextButton.addEventListener('click', loadNextPage);
    backButton.addEventListener('click', loadPreviousPage);

}

async function loadCharacters(url) {
    const mainContent  = document.getElementById('main-content');
    mainContent.innerHTML = ''; //Limpa os resultados anteriores

    try {

        const response = await fetch(url); //Armazena o resultado da requisição
        const responseJson = await response.json();

        responseJson.results.forEach((character) => {  //Reconstroi a div "cards" no html
            const card = document.createElement('div');
            card.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')`//Cria um background
            card.className ='cards'; //Cria uma classe

            const characterNameBg = document.createElement('div');//Reconstroi a div "character-name-bg" no html
            characterNameBg.className = 'character-name-bg'; //Cria uma classe

            const characterName = document.createElement('span') //Reconstroi o span "character-name" no html
            characterName.className= 'character-name' //Cria uma classe
            characterName.innerText = `${character.name}`;  // Troca o nome do personagem de forma dinamica

            //Colocando os elementos nos lugares de acordo com a herança no dom
            characterNameBg.appendChild(characterName);
            card.appendChild(characterNameBg);
   
            mainContent.appendChild(card);
            
        });

              //Mapeia os botoes e coloca em variaveis
        const nextButton = document.getElementById("next-button");
        const backButton = document.getElementById("back-button");

        //Verificaçao dos botoes quando existir ou não paginas anteriores e proximas
        nextButton.disabled = !responseJson.next; 
        backButton.disabled = !responseJson.previous;

        backButton.style.visibility = responseJson.previous ? "visible" : "hidden";
        nextButton.style.visibility = responseJson.next ? "visible" : "hidden";
       

        currentPageUrl = url;  //Troca de valor da variavel
     

    }catch(error) {
        console.log('falha');
        alert("Erro ao carregar os personagens");      
    }
}

async function loadNextPage() {
    if(!currentPageUrl) return; //Previne algum erro se a pg não for carregada

    try {
        const response = await fetch(currentPageUrl);
        const responseJson = await response.json();

        await loadCharacters(responseJson.next)

    }catch(error) {
        console.log(error);
        alert("Falha ao carregar a proxima página")
    }
}

async function loadPreviousPage() {
    if(!currentPageUrl) return; //Previne algum erro se a pg não for carregada

    try {
        const response = await fetch(currentPageUrl);
        const responseJson = await response.json();

        await loadCharacters(responseJson.previous)

    }catch(error) {
        console.log(error);
        alert("Falha ao carregar página anterior")
    }
}