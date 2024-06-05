let currentPageUrl = 'https://swapi.dev/api/people/';

window.onload = async () => {   // Ativa a função toda vez que a pg é carregada
    try {
        await loadCharacters(currentPageUrl);
    }catch (error) {
        console.log(error);
        alert("erro ao carregar partes")
    }

    
    //Função dos botões 
    const nextButon = document.getElementById('next-button');
    const backButon = document.getElementById('back-button');


    //Monitorar eventos
    nextButon.addEventListener('click', loadNextPage);
    backButon.addEventListener('click', loadPreviousPage);
}

async function loadCharacters(url) {
    const mainContent = document.getElementById("main-content");  //Mapeia a div principal na var 
    mainContent.innerHTML = ""; //Limpa os resultados anteriores

    try {

        const response = await fetch(url);  //Requisição feita à url = "currentPageHtml"
        const responseJson = await response.json(); // Transforma os objetos da requisição em arquivo "Json"

        responseJson.results.forEach((character) => {  //Itera com a chave "results" de cada personagem
            const card = document.createElement("div"); //Constrói a div dos cards na variável "cards"
            card.style.backgroundImage =
            `url("https://starwars-visualguide.com/assets/img/characters/${character.url.replace( /\D/g, "")}.jpg")`; 
            //Expressão regurar usando método replace removento todos os caracteres e deixando só o id vazio
            //REVISAO

            card.className = 'cards' //Cria o nome da classe na div criada na variável "card"

            const characterNameBg = document.createElement("div"); // Cria a div que contem o nome dos personagens
            characterNameBg.className = "character-name-bg"; // Dá o nome da classe à div

            const characterName = document.createElement("span"); //Cria um span na div
            characterName.className = "character-name"; //Cria uma classe
            characterName.innerText = `${character.name}`; //Pega o nome de cada personagem

            characterNameBg.appendChild(characterName); //Anexa um "filho" na div "characterNameBg"
            card.appendChild(characterNameBg); //Coloca a div "charcterNameBg" dentro da div card"

            mainContent.appendChild(card); //Coloca a div "card" dentro da div "mainContent"
            
        })

        
    //Função dos botões 
    const nextButon = document.getElementById('next-button');
    const backButon = document.getElementById('back-button');

    //Verificações
    nextButon.disabled = !responseJson.next
    backButon.disabled = !responseJson.previous
        
    //Visibilidade dos botões 
    backButon.style.visibility = responseJson.previous?"visible":"hidden";

    currentPageUrl = url  //Atualiza a página atual


    }catch(error) {
        alert("Erro ao carregar os cards");
        console.log(error)
    }
}

async function loadNextPage () { 
    if(!currentPageUrl) return; // Finalizar execução caso a api não apresentar resultado
    
  }try {   //Requisição
        const response = await fetch(currentPageUrl);
        const responseJson = await response.json(); //Tranforma em arquivo json

        await loadCharacters(responseJson.next);
    

    }catch(error) {
        alert("Erro ao carregar a proxima página");
    }
    

    async function loadPreviousPage () { 
        if(!currentPageUrl) return; // Finalizar execução caso a api não apresentar resultado
        
        try {   //Requisição
            const response = await fetch(currentPageUrl);
            const responseJson = await response.json(); //Tranforma em arquivo json
    
            await loadCharacters(responseJson.previous);
    
    
        }catch(error) {
            alert("Erro ao carregar a página anterior");
        }

}