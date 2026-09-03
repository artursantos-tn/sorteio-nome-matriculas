let buttonGetNames = document.getElementById("buttonGetNames");
let inputNames = document.getElementById("inputNames");

let sectionSelectNames = document.getElementById("selectNames")

let arrayListNames = [];

buttonGetNames.addEventListener('click', () => {

    let rawText = inputNames.value;

    arrayListNames = rawText.split('\n')
                            .map(name => name.trim())
                            .filter(name => name !== "");

    alert(`${arrayListNames.length} nomes carregados com sucesso!`);

    sectionSelectNames.classList.add("closed")
    
});

let buttonDrawName = document.getElementById("drawName");
let inputViewName = document.getElementById("viewName");

let drawnNames = [];

buttonDrawName.addEventListener('click', () => {
    if (!arrayListNames || arrayListNames.length === 0) {
        alert("A lista de nomes está vazia! Carregue os nomes primeiro.");
        return;
    }

    if (drawnNames.length === arrayListNames.length) {
        alert("Todos os nomes já foram sorteados!");
        return;
    }

    let randomIndex;
    let currentName;

    do {
        randomIndex = Math.floor(Math.random() * arrayListNames.length);
        currentName = arrayListNames[randomIndex];
    } while (drawnNames.includes(currentName));

    drawnNames.push(currentName);

    inputViewName.value = currentName;
    
    console.log("Nome sorteado:", currentName);
    console.log("Nomes já sorteados:", drawnNames);
});
