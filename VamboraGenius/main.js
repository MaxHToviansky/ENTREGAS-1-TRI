const divPontuacao = document.querySelector("div.pontuacao")
const divContadora = document.querySelector("div.contadora")
const divMain = document.querySelector("main")
const endscreen = document.getElementById("endscreen")
const endtext = document.getElementById("endtext")
const divs = Array.from(divMain.querySelectorAll("div"))

var runningturn = false
var gameover = false
let sequencia = []
let animatingColors = false
let currentColorPosition = 0

window.onload = inicio();

divMain.addEventListener("click", ev => {
    if (gameover){
        console.log("O jogo está reiniciando.")
        return
    }
    if(runningturn){
        console.log("passando turno para maquina.")
        return
    }

    if (animatingColors) {
        console.log("espere a animação terminar")
        return
    }

    const idxClickedElement = divs.indexOf(ev.target)

    if (idxClickedElement !== sequencia[currentColorPosition]) {
        alert("Perdeu!")
        endtext.style.zIndex = "5"
        endscreen.style.zIndex = "4"
        endscreen.style.opacity = "100%"
        gameover = true
        divPontuacao.innerHTML = "0"
        restart()
        return
    }

    currentColorPosition++
    ev.target.classList.add("animate")

    if (currentColorPosition >= sequencia.length) {
        currentColorPosition = 0
        runningturn = true
        setTimeout(() => turno(), 800)
    }
})


divs.forEach(div => {
    div.addEventListener("animationend", () => {
        div.classList.remove("animate")
    })
})

function playAnimationColors() {
    sequencia.forEach((current, index) => {
        setTimeout(() => {
            divs[current].classList.add("animate");
            animatingColors = index < sequencia.length - 1
        }, 1000 * index);
    })
}

function inicio() {
    let cnt = 3
    gameover = false 
    sequencia = []
    sequencia.length = 0
    currentColorPosition = 0
    let idx = setInterval(() => {
        divContadora.innerHTML = (cnt--)
        if (cnt < 0) {
            turno()
            clearInterval(idx)
        }
    }, 1000)

}

function turno() {
    divPontuacao.innerHTML = sequencia.length
    const rnd = Math.round(Math.random() * 3)
    sequencia.push(rnd)
    runningturn = false
    playAnimationColors()
}

function restart(){
    endscreen.addEventListener("click", event => {
        endtext.style.zIndex = "2"
        endscreen.style.zIndex = "1"
        endscreen.style.opacity = "0%"
        setTimeout(inicio(), 1000);
    })
}


