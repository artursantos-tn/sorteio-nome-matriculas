let buttonGetNames = document.getElementById("buttonGetNames");
let inputNames = document.getElementById("inputNames");

let sectionSelectNames = document.getElementById("selectNames")

let pSorteados = document.getElementById("sorteados")
let sectionQuantSorteados = document.getElementById("sectionQuantSorteados")

let fontAwesomeFa_X = document.getElementById("fa-x")

let arrayListNames = [];

buttonGetNames.addEventListener('click', () => {

    let rawText = inputNames.value;

    arrayListNames = rawText.split('\n').map(name => name.trim()).filter(name => name !== "");

    sectionQuantSorteados.classList.remove("closed")
    sectionQuantSorteados.classList.add("open")
    pSorteados.innerText = `${arrayListNames.length} nomes carregados com sucesso!`

    sectionSelectNames.classList.add("closed")

    arrayListNames.forEach(name => {
        console.log(name)
    });
    
});

fontAwesomeFa_X.addEventListener('click', ()=> {

    sectionQuantSorteados.classList.remove("open")
    sectionQuantSorteados.classList.add("closed")

})

let buttonDrawName = document.getElementById("drawName");
let inputViewName = document.getElementById("viewName");
let inputPrize = document.getElementById("inputPrize");
let presenceButtons = document.getElementById("presenceButtons");
let btnPresente = document.getElementById("btnPresente");
let btnAusente = document.getElementById("btnAusente");

let checkboxPrize = document.getElementById("checkboxPrize")
let divInput = document.getElementById("divInput")

window.drawnNames = [];
let currentDrawnName = "";

checkboxPrize.addEventListener('change', ()=> {

    if (checkboxPrize.checked) {
        divInput.style.display = "none"
    } else if (!checkboxPrize.checked) {
        divInput.style.display = "flex"
    }

})

buttonDrawName.addEventListener('click', () => {

    if (drawnNames.length === arrayListNames.length) {
        alert("Todos já foram sorteados.");
        return;
    }

    if (!arrayListNames || arrayListNames.length === 0) {
        alert("A lista de nomes está vazia! Carregue os nomes primeiro.");
        return;
    }

    if (drawnNames.filter(item => item.status === "GANHOU").length >= arrayListNames.length) {
        alert("Todos os prêmios já foram distribuídos ou os nomes esgotaram!");
        return;
    }

    let prizeText = inputPrize.value.trim();

    if (prizeText === "" && !checkboxPrize.checked) {
        alert("Por favor, digite o nome do prêmio atual antes de sortear!");
        inputPrize.focus();
        return;
    }

    let randomIndex;

    do {
        randomIndex = Math.floor(Math.random() * arrayListNames.length);
        currentDrawnName = arrayListNames[randomIndex];
    } while (drawnNames.some(item => item.name === currentDrawnName));

    buttonDrawName.disabled = true;
    inputViewName.classList.add("animando");

    let tempoTotal = 1000;
    let intervaloTroca = 90;
    let tempoDecorrido = 0;

    const animacao = setInterval(() => {
        const nomesDisponiveisParaSorteio = arrayListNames.filter(name => 
            !drawnNames.some(item => item.name === name)
        );

        if (nomesDisponiveisParaSorteio.length === 0) {
            clearInterval(animacao);
            alert("Todos os nomes já foram chamados!");
            resetSorteioUI();
            return;
        }

        const nomeAleatorio = nomesDisponiveisParaSorteio[Math.floor(Math.random() * nomesDisponiveisParaSorteio.length)];
        
        inputViewName.value = nomeAleatorio;
        tempoDecorrido += intervaloTroca;

        if (tempoDecorrido >= tempoTotal) {
            clearInterval(animacao);
            inputViewName.value = currentDrawnName;
            inputViewName.classList.remove("animando");
            
        
            presenceButtons.style.display = "flex";
            buttonDrawName.style.display = "none";
        }
    }, intervaloTroca);
});

btnPresente.addEventListener('click', () => {
    
    let prizeText = inputPrize.value.trim();

    let resultObject = {
        name: currentDrawnName,
        prize: prizeText,
        status: "GANHOU"
    };

    drawnNames.push(resultObject);
    console.log("Registrado:", resultObject);

    resetSorteioUI();

    inputPrize.value = ""
});

btnAusente.addEventListener('click', () => {
    let prizeText = inputPrize.value.trim();

    let resultObject = {
        name: currentDrawnName,
        prize: prizeText,
        status: "PERDEU"
    };

    drawnNames.push(resultObject);
    console.log("Registrado:", resultObject);

    resetSorteioUI();
});

function resetSorteioUI() {
    inputViewName.value = "";
    presenceButtons.style.display = "none";
    buttonDrawName.style.display = "block";
    buttonDrawName.disabled = false;
    currentDrawnName = "";
}
