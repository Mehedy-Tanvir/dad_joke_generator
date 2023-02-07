const btn = document.querySelector('#btn');
const apiKey = '1t+2/H1Rid7xyoDXVED2vg==BCR3AdOTbFEunQgD';
const apiUrl = 'https://api.api-ninjas.com/v1/dadjokes?limit=1';
const jokeEl = document.querySelector('#joke');
let timeoutId;

let characterIndex = 0;
let jokeText;
const options = {
    method: 'GET',
    headers: { 'X-Api-Key': apiKey },

}

btn.addEventListener('click', getJoke);
async function getJoke() {
    try {
        jokeEl.innerText = 'Loading...';
        btn.disabled = true;
        btn.innerText = 'Wait'
        const response = await fetch(apiUrl, options);
        const data = await response.json();
        jokeText = data[0].joke;

        clearTimeout(timeoutId);
        characterIndex = 0;
        updateJoke();
    } catch (error) {
        btn.disabled = false;
        btn.innerText = 'Tell me a joke'
        jokeEl.innerText = 'An error happened! Try again later.';
    }

}
function updateJoke() {
    characterIndex++;
    jokeEl.innerText = `${jokeText.slice(0, characterIndex)}`;

    if (characterIndex < jokeText.length) {
        timeoutId = setTimeout(updateJoke, 200);
    } else {
        btn.disabled = false;
        btn.innerText = 'Tell me a joke'
    }
}
