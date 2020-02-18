function extraerUrlPokemons() {

    fetch('https://pokeapi.co/api/v2/pokemon?limit=1000')
        .then(res => {
            return res.json();
        }).then(respuesta => {
            respuesta.results.forEach(pokemon => {
                urlPokemons.push(pokemon.url);
            });
        }).then(() => {
            extraerPokemons();
        });
}

function extraerPokemons() {

    for (let i = 0; i < urlPokemons.length; i++) {

        fetch(urlPokemons[i])
            .then(res => {
                return res.json();
            }).then(poke => {
                let pokemon = {
                    name: poke.forms[0].name,
                    types: poke.types,
                    moves: [poke.moves[0], poke.moves[1], poke.moves[2], poke.moves[3]],
                }
                pokemons.push(pokemon);
            })
    }
    setTimeout(pintarPokemons, 5000)
}

function pintarPokemons() {

    console.log(pokemons.length);
    
    for (let i = 0; i < pokemons.length; i++) {
        
    }
}

function init() {

    extraerUrlPokemons();
}

let pokemons = [];
let urlPokemons = [];
window.onload = init;