`const Container = document.querySelector(".Container");`
const PokemonCount = 151   
const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#dc96e6',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5'
}

const mainTypes = Object.keys(colors);

const fetchPokemons = async () => {
    for (let index = 1; index <= PokemonCount; index++) {
        await getPokemons(index)
        
    }
}


const getPokemons = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const resp = await fetch(url)
    const data = await resp.json()
    createPokemonCard(data)
}


const createPokemonCard = (poke) => {
    const card = document.createElement('div')
    card.classList.add("pokemon")

    const name = poke.name[0].toUpperCase() + poke.name.slice(1)
    const id = poke.id.toString().padStart(3, '0')

    const pokeTypes = poke.types.map(type => type.type.name)
    const type = mainTypes.find(type => pokeTypes.indexOf(type) > -1)
    const color = colors[type]

    card.style.backgroundColor = color

    const pokemonInnerHTML = `
    <div class="imgcontainer">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png" alt="${name}">
    </div>
    <div class="informacao">
        <span class="numero">#${id}</span>
        <h3 class="nome">${name}</h3>
        <small class="tipo">Tipo: <span>${type}</span></small>
    </div>
    `

    card.innerHTML = pokemonInnerHTML

    Container.appendChild(card)
}


fetchPokemons()