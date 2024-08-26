const form = document.querySelector('form');
const resultDiv = document.querySelector('.result');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    getWordInfo(form.elements[0].value)
})
const getWordInfo = async (input) => {
    try {
        if (input) {
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${input}`);
            const data = await response.json();
            console.log(response.status)
            console.log(data)
            let definitions = data[0].meanings[0].definitions[0]
            resultDiv.innerHTML = `        
            <h2><strong>Word: </strong> ${data[0].word}</h2>
    
            <p class = "partOfSpeech"> ${data[0].meanings[0].partOfSpeech}</p>
    
            <p><strong>Meaning: </strong> ${definitions.definition === undefined ? "Not Found" : definitions.definition}</p>
    
            <p><strong>Example: </strong> ${definitions.example === undefined ? "Not Found" : definitions.example}</p>
            <p><strong>Antonyms: </strong></p>
            `;

            if (definitions.antonyms.length > 0) {
                for (let i = 0; i < definitions.antonyms.length; i++) {
                    resultDiv.innerHTML += `<li>${definitions.antonyms[i]}</li>`
                }
            } else {
                resultDiv.innerHTML += '<span>Not Found</span>'
            };

            resultDiv.innerHTML +=`<p><strong>Synonyms: </strong></p>`;
            if (definitions.synonyms.length > 0) {
                for (let i = 0; i < definitions.synonyms.length; i++) {
                    resultDiv.innerHTML += `<li>${definitions.synonyms[i]}</li>`
                }
            } else {
                resultDiv.innerHTML += '<span>Not Found</span>'
            };


            resultDiv.innerHTML += `<div><a href="${data[0].sourceUrls}" target="_blank">Read More</a></div>`;
        }else{
            resultDiv.innerHTML =`<p>Please Enter Word</p>`
        }
    } catch (error) {
        resultDiv.innerHTML = `<p>Sorry, the word could not be found</p>`
    }
    form.elements[0].value = '';
}