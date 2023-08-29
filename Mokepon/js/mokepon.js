const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonSeleccionarMascota = document.getElementById('boton-seleccionar-mascota')
const botonReiniciar = document.getElementById('boton-reiniciar')
sectionReiniciar.style.display = 'none'

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')

const spanMascotaEnemigo = document.getElementById('mascota-enemigo')
const spanMascotaJugador = document.getElementById('mascota-jugador')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')
const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const contenedorAtaques = document.getElementById('contenedorAtaques')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let mokepones = []
let ataqueJugador =[]
let ataqueEnemigo = []
let opcionDeMokepones
let inputHipodoge
let inputCapipepo
let inputRatigueya
let mascotaJugador
let mascotaJugadorObjeto
let ataquesMokepon
let ataquesMokeponEnemigo
let botonFuego
let botonAgua
let botonTierra
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0 
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './assets/mokemap.png'
let alturaDelMapa
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 600

// Si la ventana es muy ancha, definir el ancho maximo de 600
if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 20
}

const alturaReferencia = 1800 // Altura de pantalla
const anchoReferencia = 2400 // ancho de pantalla
const aspectRatio = alturaReferencia / anchoReferencia
alturaDelMapa = anchoDelMapa * aspectRatio

mapa.width = anchoDelMapa
mapa.height = alturaDelMapa

class Mokepon {
    constructor(nombre, fotoAtacando, vida, fotoMokepon) {
        this.nombre = nombre
        this.foto = fotoAtacando
        this.vida = vida
        this.ataques = []
        this.ancho = 60
        this.alto = 60
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMokepon
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }

}

let hipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.png')

let capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepo.png')

let ratigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.png')

let hipodogeEnemigo = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.png')

let capipepoEnemigo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepo.png')

let ratigueyaEnemigo = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.png')

const ataqueAgua = { nombre: '💧', id: 'boton-agua' }
const ataqueFuego = { nombre: '🔥', id: 'boton-fuego' }
const ataqueTierra = { nombre: '🌱', id: 'boton-tierra' }

const ataquesHipodoge = [ataqueAgua, ataqueAgua, ataqueAgua, ataqueFuego, ataqueTierra]
const ataquesCapipepo = [ataqueTierra, ataqueTierra, ataqueTierra, ataqueAgua, ataqueFuego]
const ataquesRatigueya = [ataqueFuego, ataqueFuego, ataqueFuego, ataqueAgua, ataqueTierra]

hipodoge.ataques.push(...ataquesHipodoge)
hipodogeEnemigo.ataques.push(...ataquesHipodoge)

capipepo.ataques.push(...ataquesCapipepo)
capipepoEnemigo.ataques.push(...ataquesCapipepo)
    
ratigueya.ataques.push(...ataquesRatigueya)    
ratigueyaEnemigo.ataques.push(...ataquesRatigueya)

mokepones.push(hipodoge, capipepo, ratigueya)


function iniciarJuego() { 
    sectionSeleccionarAtaque.style.display = 'none' //esconder elemento
    sectionVerMapa.style.display = 'none' // elemento escondido

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
            <input type="radio" name="mascota" id=${mokepon.nombre} />
            <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
                <p>${mokepon.nombre}</p>
                <img src=${mokepon.foto} alt=${mokepon.nombre}>
            </label>
            `
        contenedorTarjetas.innerHTML += opcionDeMokepones  
    })
    
    inputHipodoge = document.getElementById('Hipodoge')
    inputCapipepo = document.getElementById('Capipepo')
    inputRatigueya = document.getElementById('Ratigueya')

    botonSeleccionarMascota.addEventListener('click', seleccionarMascotaJugador)      
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function esconderElemento(elemento) {
    elemento.style.display = 'none'
}

function seleccionarMascotaJugador() {
    if (inputHipodoge.checked) {
        mascotaJugador = inputHipodoge.id
    } else if (inputCapipepo.checked) {
        mascotaJugador = inputCapipepo.id
    } else if (inputRatigueya.checked) {
        mascotaJugador = inputRatigueya.id
    } else {
        alert('Selecciona una mascota')
    }

    if (mascotaJugador !== undefined) {
        // const ataques = extraerAtaques(mascotaJugador) // [at1, at2, at3, at4, at5]
        spanMascotaJugador.textContent = mascotaJugador // "Hipodoge"
        
        esconderElemento(sectionSeleccionarMascota)
        // mostrarAtaques(ataques)
        mostrarAtaques(extraerAtaques(mascotaJugador)) // extraerAtaques = [at1, at2, at3, at4, at5]
        sectionVerMapa.style.display = 'flex' // se inicia el mapa
        iniciarMapa()
    }
}

// Hasta aqui vamo

function extraerAtaques(mascotaJugador) {
    let ataques
    // for (let i = 0; i < mokepones.length; i++) {
    //     if (mascotaJugador === mokepones[i].nombre) {
    //         ataques = mokepones[i].ataques
    //     }
        
    // }

    mokepones.forEach((mokepon) => {
      if (mokepon.nombre === mascotaJugador) {
        ataques = mokepon.ataques //si el nombre del mokepon es igual a la      mascota seleccionada por el jugador, agregar el mokepon a la variable ataques
      } 
    })
    return ataques
    // mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesMokepon = `
        <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>` // en la variable ataquesMokepon para almacenar el fragmento de HTML correspondiente al botón ataque que incluye el id, la clase y el nombre del ataque.
        contenedorAtaques.innerHTML += ataquesMokepon //se agrega ese fragmento de html que mostrara los botones de ataque
    })

     botonFuego = document.getElementById('boton-fuego')
     botonAgua = document.getElementById('boton-agua')
     botonTierra = document.getElementById('boton-tierra')
     botones = document.querySelectorAll('.BAtaque')
}

// Poner e.target.texcontent en una funcion para utilizarlo en las condiciones 
// crear una funcion para encapsular la ejecucion del ataque

function obtenerTipoAtaque(emoji) {
    if (emoji === '🔥') {
        return 'FUEGO'
    } else if (emoji === '💧') {
        return 'AGUA'
    } else {
        return 'TIERRA'
    }
}
 
function registrarAtaque() {
    botones.forEach((boton) => { 
        boton.addEventListener('click', (e) => { 
           const emoji = e.target.textContent;
           const tipoAtaque = obtenerTipoAtaque(emoji);
           
           ataqueJugador.push(tipoAtaque);
           boton.style.background = 'white'
           boton.disabled = true
           ataqueAleatorioEnemigo();
        });
      })
}


//             if (e.target.textContent === '🔥') { 
//                 ataqueJugador.push('FUEGO')
//                 boton.style.background = 'white'
//                 boton.disabled = true   
//             } else if (e.target.textContent === '💧') {
//                 ataqueJugador.push('AGUA')
//                 boton.style.background = 'white' 
//                 boton.disabled = true  
//             } else {
//                 ataqueJugador.push('TIERRA')
//                 boton.style.background = 'white'
//                 boton.disabled = true  
//             } // // Si el emoji es '🔥' , '💧' o 🌱 se agrega al arreglo 'ataqueJugador'. Cambia el color a blanco y se inhabilita
//             ataqueAleatorioEnemigo()
//         })
//     })
// }

function seleccionarMascotaEnemigo() {
    let mascotaAleatoria = aleatorio(0, mokepones.length -1) 
    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre 
    ataquesMokeponEnemigo = mokepones[mascotaAleatoria].ataques 
    registrarAtaque()
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length -1) 
    
    if (ataqueAleatorio == 0 || ataqueAleatorio ==1) {
        ataqueEnemigo.push('FUEGO')
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push('AGUA')
    } else {
        ataqueEnemigo.push('TIERRA')
    } // Luego, basándose en el número aleatorio, se decide qué tipo de ataque realizará el enemigo (FUEGO, AGUA o TIERRA).
    iniciarPelea()
}

function iniciarPelea() {
    if (ataqueJugador.length === 5) {
        combate()
    }
} // La funcion iniciarPelea verifica si el arreglo ataqueJugador tiene un tamaño de 5, lo que significa que el jugador ha seleccionado 5 ataques y se llama a la función combate() para comenzar el combate. -- 
// Se cambia el nombre a la función indexAmbosOponente por asignarTurno y se deja un solo índice. Se crean las variables jugador y enemigo para almacenar los valores de los ataques. Se cambia la funcion crearMensaje por mostrarAtaque con jugador y enemigo como argumentos para mostrar los ataques. Se condensan las condiciones usando operadores logicos.

function asignarTurno(index) { 
    indexAtaqueJugador = ataqueJugador[index];
    indexAtaqueEnemigo = ataqueEnemigo[index];
} // esta funcion asigna los valores de los ataques del jugador y el enemigo en las respectivas variables

function combate() { // funcion principal en el combate
    for (let index = 0; index < ataqueJugador.length; index++) { // se utiliza un bucle para iterar por los ataques del jugador y el enemigo
        asignarTurno(index); // se llama a la funcion para asignar los valores de los ataques en las variables 
        const jugador = ataqueJugador[index]; 
        const enemigo = ataqueEnemigo[index]; // se crean las variables jugador y enemigo para almacenar los valores de los ataques
        
        mostrarAtaque(jugador, enemigo); // se llama a esta funcion (antes crearMensaje) para mostrar el ataque
        
        if (jugador === enemigo) {
           
        } else if (
            jugador === 'FUEGO' && enemigo === 'TIERRA' ||
            jugador === 'AGUA' && enemigo === 'FUEGO' ||
            jugador === 'TIERRA' && enemigo === 'AGUA') {
            victoriasJugador++;
            spanVidasJugador.innerHTML = victoriasJugador;
        } else {
            victoriasEnemigo++;
            spanVidasEnemigo.innerHTML = victoriasEnemigo;
        }
    }  // condiciones del combate
    revisarVidas();
}

function mostrarAtaque(jugador, enemigo) { // muestra el ataque al usuario, creando elementos P para mostrarlos y agregarlos a la seccion de Mensajes
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p') 

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo 

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function revisarVidas() {
    if (victoriasJugador === victoriasEnemigo) {
        crearMensajeFinal("Esto fue un empate!!!");
    } else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal("FELICITACIONES! Ganaste :)");
    } else {
        crearMensajeFinal('Lo siento, perdiste :(');
    }
} // verifica las vidas y crea los mensajes correspondientes segun el resultado

function crearMensajeFinal(resultadoFinal) {
    sectionMensajes.innerHTML = resultadoFinal;
    sectionReiniciar.style.display = 'block';
}



// function indexAmbosOponente(index, index) {
//     indexAtaqueJugador = ataqueJugador[index]
//     indexAtaqueEnemigo = ataqueEnemigo[index]
// }

// function combate() {
    
//     for (let index = 0; index < ataqueJugador.length; index++) { 
//         if(ataqueJugador[index] === ataqueEnemigo[index]) {
//             indexAmbosOponente(index, index)
//             crearMensaje("EMPATE")
//         } else if (ataqueJugador[index] === 'FUEGO' && ataqueEnemigo[index] === 'TIERRA') {
//             indexAmbosOponente(index, index)
//             crearMensaje("GANASTE")
//             victoriasJugador++
//             spanVidasJugador.innerHTML = victoriasJugador
//         } else if (ataqueJugador[index] ==='AGUA' && ataqueEnemigo[index] === 'FUEGO') {
//             indexAmbosOponente(index, index)
//             crearMensaje("GANASTE")
//             victoriasJugador++
//             spanVidasJugador.innerHTML = victoriasJugador
//         } else if (ataqueJugador[index] === 'TIERRA' && ataqueEnemigo[index] === 'AGUA') {
//             indexAmbosOponente(index, index)
//             crearMensaje("GANASTE")
//             victoriasJugador++
//             spanVidasJugador.innerHTML = victoriasJugador
//         } else {
//             indexAmbosOponente(index, index)
//             crearMensaje("PERDISTE") 
//             victoriasEnemigo++
//             spanVidasEnemigo.innerHTML = victoriasEnemigo
//         }
//     } 
//     revisarVidas() }

// function revisarVidas() {
//     if (victoriasJugador === victoriasEnemigo) {
//         crearMensajeFinal("Esto fue un empate!!!")
//     } else if (victoriasJugador > victoriasEnemigo) {
//         crearMensajeFinal("FELICITACIONES! Ganaste :)")
//     } else {
//         crearMensajeFinal('Lo siento, perdiste :(')
//     }
// } 

// function crearMensaje(resultado) {
//     let nuevoAtaqueDelJugador = document.createElement('p')
//     let nuevoAtaqueDelEnemigo = document.createElement('p') 

//     sectionMensajes.innerHTML = resultado
//     nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
//     nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo /

//     ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
//     ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
// }

// function crearMensajeFinal(resultadoFinal) {
//     sectionMensajes.innerHTML = resultadoFinal 
//     sectionReiniciar.style.display = 'block' 
// }

function reiniciarJuego() {
    location.reload()
} // se recarga el juego

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}


function pintarCanvas() {
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY // Actualiza las coordenadas x e y de la mascota del jugador sumando las velocidades horizontales y verticales (velocidadX y velocidadY) respectivamente.
    lienzo.clearRect(0, 0, mapa.width, mapa.height) //  Borra el contenido del lienzo (canvas) dentro de un área rectangular que cubre todo el mapa.
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height // Dibuja la imagen de fondo del mapa en el lienzo
    )
    
    mascotaJugadorObjeto.pintarMokepon() // dibuja el mokepon del jugador
    hipodogeEnemigo.pintarMokepon()
    capipepoEnemigo.pintarMokepon()
    ratigueyaEnemigo.pintarMokepon() // dibuja las mokepones del enemigo
    if (mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidadY !== 0) {
        revisarColision(hipodogeEnemigo)
        revisarColision(capipepoEnemigo)
        revisarColision(ratigueyaEnemigo)
    } // si la velocidad en x y y del jugador no es ingual a cero se verifica colision
}

function moverDerecha() {
    mascotaJugadorObjeto.velocidadX = 5
}

function moverIzquierda() {
    mascotaJugadorObjeto.velocidadX = -5
}

function moverAbajo() {
    mascotaJugadorObjeto.velocidadY = 5
}

function moverArriba() {
    mascotaJugadorObjeto.velocidadY = -5
}

function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(event) {
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break
        case 'ArrowDown':
            moverAbajo()
            break
        case 'ArrowLeft':
            moverIzquierda()
            break
        case 'ArrowRight':
            moverDerecha()
            break
        default:
            break
    }
}

function iniciarMapa() {
    mascotaJugadorObjeto = obtenerObjetoMascota()
    intervalo = setInterval(pintarCanvas, 50)
    
    window.addEventListener('keydown', sePresionoUnaTecla)

    window.addEventListener('keyup', detenerMovimiento)
}

function obtenerObjetoMascota(){
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            return mokepones[i]
        }
        
    }
}

function revisarColision(enemigo){
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = mascotaJugadorObjeto.x // coordenadas y dimensiones del enemigo y la mascota del jugador, así como sus límites superior, inferior, izquierdo y derecho.

    if (
        abajoMascota < arribaEnemigo || 
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) { // comprobacion de colision
        return // si no hay colision, la funcion retorna sin ninguna accion
    }
    detenerMovimiento() 
    clearInterval(intervalo)
    sectionSeleccionarAtaque.style.display = 'flex'
    esconderElemento (sectionVerMapa)// esconder elemento
    seleccionarMascotaEnemigo(enemigo)
    
} 

window.addEventListener('load', iniciarJuego)