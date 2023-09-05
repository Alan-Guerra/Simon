const cuadrantes = [];
const patronJuego = [];
const patronJugador = [];


rojo = document.querySelector("#rojo");
rojo.audio = new Audio("bip5.mp3");
configuracionBoton(rojo);
cuadrantes.push(rojo);

verde = document.querySelector("#verde");
verde.audio = new Audio("bip6.mp3");
configuracionBoton(verde);
cuadrantes.push(verde);

azul = document.querySelector("#azul");
azul.audio = new Audio("bip7.mp3");
configuracionBoton(azul);
cuadrantes.push(azul);

amarillo = document.querySelector("#amarillo");
amarillo.audio = new Audio("bip8.mp3");
configuracionBoton(amarillo);
cuadrantes.push(amarillo);



const comienzo = document.querySelector("#comenzar");
comienzo.onclick = comenzarJuego;



function cuadranteRandom() {
    const random = Math.floor(Math.random() * cuadrantes.length);
    patronJuego.push(cuadrantes[random].id);
}



function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



function configuracionBoton(boton) {
    boton.onclick = async function () {
        boton.style.visibility = "hidden";
        boton.audio.play();
        await delay(500);
        boton.style.visibility = "visible";
        patronJugador.push(boton.id);
    };
}



async function reproducirPatron(patron) {
    for (const botonId of patron) {
        const boton = cuadrantes.find(boton => boton.id === botonId);
        if (boton) {
            await delay(300);
            boton.style.visibility = "hidden";
            await delay(100);
            boton.audio.play();
            await delay(300);
            boton.style.visibility = "visible";
            await delay(300);
        }
    }
}



function comenzar() {
    document.querySelector("#puntaje").textContent = 0;
    cuadranteRandom();
    reproducirPatron(patronJuego);
}



function continuar() {
    cuadranteRandom();
    reproducirPatron(patronJuego);
}



function sumarPunto() {
    var puntaje = document.querySelector("#puntaje");
    var puntos = parseInt(puntaje.textContent);
    puntos++;
    puntaje.textContent = puntos;
}



async function comenzarJuego() {
    patronJuego.length = 0;
    patronJugador.length = 0;
    var fail = false;

    comenzar();
    while (!fail) {
        await delay(100);

        for (var i = 0; i < patronJugador.length; i++) {
            if (patronJugador[i] !== patronJuego[i]) {
                fail = true;
                gameOver();
                break;
            }
        }

        if (!fail && patronJugador.length === patronJuego.length) {
            patronJugador.length = 0;
            sumarPunto();
            continuar();
        }

    }

    function gameOver() {
        console.log("perdiste");
        var restart = document.querySelector("#restart");
        restart.style.display = "block";
        restart.onclick = comenzarJuego;

        
    }
}