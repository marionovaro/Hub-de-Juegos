import "./Raya.css"

const templateRaya = () => `
<div id="rayacontainer">
    <h1 id="titulo3raya">Tres en raya</h1>
    <h3 id="resultadoraya"></h3>
    <div id="tablero">
        <button id="" class ="casillas3raya"></button>
        <button id="" class ="casillas3raya"></button>
        <button id="" class ="casillas3raya"></button>
        <button id="" class ="casillas3raya"></button>
        <button id="" class ="casillas3raya"></button>
        <button id="" class ="casillas3raya"></button>
        <button id="" class ="casillas3raya"></button>
        <button id="" class ="casillas3raya"></button>
        <button id="" class ="casillas3raya"></button>
    </div>
    <button id="reloadraya">Start Again</button>
    
</div>
`
let turno
let fichas
let fichasPuestas
let partidaAcabada

let textoVictoria

// ? _-------------------------------------------------------- EVENTO CLICK QUE PONE FICHA -------------------------
const ponerFicha = (event) => {
    let casillaPulsada = event.target
    if (!partidaAcabada && casillaPulsada.innerHTML == "") {
        casillaPulsada.innerHTML = fichas[turno];
        fichasPuestas += 1;

        let estadoPartida = estado();
        if (estadoPartida == 0){
            cambiarTurno()
            if (fichasPuestas < 9){
                decisivo(); // si no esta ocupada el PC pilla la del medio
                estadoPartida = estado();
                fichasPuestas += 1;
                cambiarTurno();
            }
        }
        textoVictoria = document.getElementById("resultadoraya")
        if (estadoPartida == 1) {
            textoVictoria.textContent = "Has ganado!";
            partidaAcabada = true;
        } else if (estadoPartida == -1) {
            textoVictoria.textContent = "Has perdido. Eres muy malo";
            partidaAcabada = true;
        }
    }
}

// ? -------------------------------------------------- CAMBIO TURNO ------------------------------------------
const cambiarTurno = () => {
    if (turno == 1){
        turno = 0
    } else {turno = 1}
}

// ? --------------------------------------------------- ESTADO PARTIDA (GANAR, PERDER...) --------------------------
const estado = () => {
    let lineaVictoria = 0 // en que línea se gana para marcarla
    let nEstado  = 0 // -1 si gana PC, 0 si nadie ha ganado, 1 si gano yo
    const sonIguales = (...botones) => {
        let valores = botones.map(boton => boton.textContent); // cogemos contenido de los botones examinados
        if (valores[0] !== "" && valores.every((valor, idx, valores) => valor === valores[0])) { // miramos que no se vacío y que los tres valores sean iguales
            if (turno == 1) {
                botones.forEach(boton => boton.style.backgroundColor = "Green")
            } else if (turno == 0) {
                botones.forEach(boton => boton.style.backgroundColor = "Red")
            }
            return true // devolvemos true pq son todos iguales
        } else {return false}
    }

    // COMPROBAR LAS LINEAS DE VICTORIA (HAY 8)
    if (sonIguales(eventListener()[0], eventListener()[1], eventListener()[2])) {
        lineaVictoria = 1
    } else if (sonIguales(eventListener()[3], eventListener()[4], eventListener()[5])) {
        lineaVictoria = 2
    } else if (sonIguales(eventListener()[6], eventListener()[7], eventListener()[8])) {
        lineaVictoria = 3
    } else if (sonIguales(eventListener()[0], eventListener()[3], eventListener()[6])) {
        lineaVictoria = 4
    } else if (sonIguales(eventListener()[1], eventListener()[4], eventListener()[7])) {
        lineaVictoria = 5
    } else if (sonIguales(eventListener()[2], eventListener()[5], eventListener()[8])) {
        lineaVictoria = 6
    } else if (sonIguales(eventListener()[0], eventListener()[4], eventListener()[8])) {
        lineaVictoria = 7
    } else if (sonIguales(eventListener()[2], eventListener()[4], eventListener()[6])) {
        lineaVictoria = 8
    }

    // comprobación de quien ha ganado
    if (lineaVictoria>0) {
        if (turno == 1) { // si está en mi turno, es que he ganado yo, por eso 
            nEstado = 1 // pongo en nEstado un 1
        }
        else{
            nEstado = -1
        }
    }
    return nEstado
}
// ? -------------------------------------------- IA DECIDE PONER EN MEDIO --------------------------------------
const decisivo = () => {
    const randomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    let valores = eventListener().map(casilla => casilla.textContent) //! esto a lo mejor rompe
    let pos // posicion vacía que ahora va a tomar la ia

    if (valores[4] == ""){ // si está libre el centro, lo tomamos pq es la mejor posicion
        pos = 4
    } else { // si no esta libre:
        let n = randomNumber(0, eventListener().length -1);
        while(valores[n] != ""){
            n = randomNumber(0, eventListener().length -1);
        }
        pos = n
    }
    eventListener()[pos].textContent = "👻";
    return pos;

}
// ? ---------------------------------------------------- RELOAD ----------------------------------------------------

const reload = () => {
    turno = 1;
    fichasPuestas = 0
    partidaAcabada = false
    eventListener().forEach(casilla => casilla.innerHTML = "")
    eventListener().forEach(casilla => casilla.style.backgroundColor = "White")
    document.getElementById("reloadraya").innerHTML = "Start Again"
}


// ? ------------------------------------------------- EVENTLISTENER ----------------------------------------------
const eventListener = () => {
    const casillas = Array.from(document.querySelectorAll("button"))
    casillas.forEach(casilla => casilla.addEventListener("click", ponerFicha)); // creo esuchador de eventos para cada casilla
    console.log(casillas)

    const botonreload = document.getElementById("reloadraya")
    botonreload.addEventListener("click", reload)

    return casillas
}

// ? -------------------------------------------------- PRINT PAGE -----------------------------------------------
export const print3enRaya = () => {
    document.querySelector("main").innerHTML = templateRaya()
    turno = 1;
    fichas = ["👻", "🐢"];
    fichasPuestas = 0;
    partidaAcabada = false;
    eventListener()
    console.log(eventListener()[4])
}