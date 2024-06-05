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

            card.onclick = () => {
                const modal = document.getElementById("modal");
                modal.style.visibility = "visible";

                const modalContent = document.getElementById("modal-content");
                modalContent.innerHTML = "";

                const characterImage = document.createElement("div");
                characterImage.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')`;
                characterImage.className = "character-image";

                const name = document.createElement('span');
                name.className = "character-details";
                name.innerText = `Nome: ${character.name}`;

                const characterHeight = document.createElement('span');
                characterHeight.className = "character-details";
                characterHeight.innerText = `Altura: ${convertHeight(character.height)}`;

                const mass = document.createElement('span');
                mass.className = "character-details";
                mass.innerText = `Peso: ${convertMass(character.mass)}`;

                const eyeColor = document.createElement('span');
                eyeColor.className = "character-details";
                eyeColor.innerText = `Cor dos olhos: ${convertEyeColor(character.eye_color)}`;

                const birthYear = document.createElement('span');
                birthYear.className = "character-details";
                birthYear.innerText = `Nascimento: ${convertBirthYear(character.birth_year)}`;

                modalContent.appendChild(characterImage);
                modalContent.appendChild(name);
                modalContent.appendChild(characterHeight);
                modalContent.appendChild(mass);
                modalContent.appendChild(eyeColor);
                modalContent.appendChild(birthYear);
            }
            const mainContent = document.getElementById('main-content');
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

function hideModal () {
    const modal = document.getElementById('modal');
    modal.style.visibility = "hidden"; 
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

function convertEyeColor(eyeColor) {
    const cores = {
        blue: "azul",
        brown: "castanho",
        green: "verde",
        yellow: "amarelo",
        black: "preto",
        pink: "rosa",
        red: "vermelho",
        orange: "laranja",
        hazel: "avela",
        unknow: "desconhecida"
    };
    return cores[eyeColor.toLowerCase()] || eyeColor;
}

function convertHeight(height) {
    if(height === "unknown") {
        return "desconhecida";
    }

    return (height / 100).toFixed(2)
}

function convertMass(mass) {
    if(mass === "unknown") {
        return "desconhecido";
    }
    return`${mass}Kg`
}

function convertBirthYear(birthYear) {
    if(birthYear === "unknown") {
        return "desconhecido";
    }
    return birthYear
}

