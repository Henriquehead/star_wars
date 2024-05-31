let currentPageUrl = 'https://swapi.dev/api/people/';

window.onload = () => {
    try {
        loadCharacters(currentPageUrl);
    }catch (error) {
        console.log(error);
    }
}