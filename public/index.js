function pantallaCarga() {

    let divCarga = document.createElement('div');
    divCarga.id = 'divCarga';
    divCarga.innerHTML = `
    <img src="https://i.pinimg.com/originals/e3/8a/b6/e38ab643c0f5b9b6250c2b9a8e53bfff.gif">
    <p>Cargando Pokemons</p>`;
    document.querySelector('body').appendChild(divCarga);
}

async function extraerUrlPokemons() {

    return fetch('https://pokeapi.co/api/v2/pokemon?limit=1000')
        .then(res => {
            return res.json();
        }).then(respuesta => {
            return urlPokemons = respuesta.results;
        })
}

async function extraerPokemons() {

    for (let i = 0; i < urlPokemons.length; i++) {

        const resp = await fetch(urlPokemons[i].url);
        const json = await resp.json();

        console.log(json);
        

        if (json.sprites.front_default != null) {
            
            pokemons.push({ 
                id: '#' + json.id,
                name: json.forms[0].name,
                types: json.types,
                moves: [json.moves[0], json.moves[1], json.moves[2], json.moves[3]],
                movesDesc: [],
                img: json.sprites.front_default
            });
        }
    }
}

async function pintarPokemons(array) {

    container.innerHTML = '';
    
    for (let i = 0; i < array.length; i++) {

        let tipos = document.createElement('div');
        tipos.className = 'containerTipos';

        array[i].types.forEach(el => {
            tipos.innerHTML += `
            <img src="https://veekun.com/dex/media/types/en/${el.type.name}.png">
            `;
        });

        let divPokemon = document.createElement('div');
        divPokemon.className = 'divPokemon';
        divPokemon.id = array[i].id;
        divPokemon.innerHTML = `
        <span class="name">${array[i].id} ${array[i].name}</span>
        <img src=${array[i].img} alt=${array[i].name}>`;
        divPokemon.appendChild(tipos);

        divPokemon.addEventListener('click', (ev) => {
            ev.preventDefault();
            mostrarPokedex(array[i]);
        });

        container.appendChild(divPokemon);
    }
}

function mostrarPokedex(pokemon) {
    
    document.querySelector('body').style.overflow = 'hidden';
    
    let divPokedex = document.getElementById('divPokedex');
    divPokedex.onclick = retirarPokedex;

    let pokedex = document.getElementById('pokedex');
    pokedex.onclick = (e) => {
        e.stopPropagation();
    }

    pokedex.innerHTML = `
    <img src="${pokemon.img}">
    <div class="types"></div>
    <div class="attacks">
        <div class="attack one">${pokemon.moves[0].move.name}</div>
        <div class="attack two">${pokemon.moves[1].move.name}</div>
        <div class="attack three">${pokemon.moves[2].move.name}</div>
        <div class="attack four">${pokemon.moves[3].move.name}</div>
    </div>
    <p>${pokemon.name}`;
    
    let types = document.createElement('div');
    types.id = 'types';

    pokemon.types.forEach(e => {
        
        types.innerHTML += `
        <img src="https://veekun.com/dex/media/types/en/${e.type.name}.png">`;
    });

    divPokedex.setAttribute('style', 'top: ' + window.pageYOffset + 'px');
    divPokedex.style.visibility = 'visible';
    console.log(divPokedex.getAttribute('style'));

    pokedex.appendChild(types);

}

function retirarPokedex() {

    document.getElementById('divPokedex').style.visibility = 'hidden';
    document.querySelector('body').style.overflow = 'visible';
}

function quitarPantallaCarga() {

    let divCarga = document.getElementById('divCarga');
    divCarga.style.display = 'none';
    console.log(divCarga);
}

function eventos() {

    let buscador = document.getElementById('buscador');
    let botonBuscar = document.getElementById('buscar');

    console.log(pokemons[0]);
    

    botonBuscar.onclick = () => {

        let nombrePokemon = buscador.value.toLowerCase();
        console.log(nombrePokemon);
        let pokemonsBuscar = pokemons.filter(pokes => {
            if (nombrePokemon == '') {
                return pokes;
            } else if (pokes.name.includes(nombrePokemon)) {
                return pokes;
            }
        });
        pintarPokemons(pokemonsBuscar);
    }
}

async function init() {

    container = document.querySelector('#containerPokemons');

    pantallaCarga();

    await extraerUrlPokemons();
    await extraerPokemons();
    await pintarPokemons(pokemons);

    quitarPantallaCarga();

    eventos();
}

let container;
let urlPokemons;
let pokemons = [];
window.onload = init;