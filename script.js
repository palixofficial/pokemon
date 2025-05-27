// Házi feladat:
// https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0
// A fenti végpontot átalakítva képesek legyünk lekérni 0-9999-ig
// pokémonokat. Minden lekért pokemon képét jelenítsük meg!
// A megejelenítés egy 5x5-ös gridben végezd el!
// Használj css-t a grid kialakításához

const OPTIONS = {
  api: "https://pokeapi.co/api/v2/pokemon/",
};

const components = {
  button: "search-button",
  input: "search-input",
  container: "pokemon-container",
};

document.getElementById(components.input).addEventListener("input", () => {
  document.getElementById(components.button).disabled =
    !document.getElementById(components.input).value;
});

document
  .getElementById(components.button)
  .addEventListener("click", async () => {
    const data = await getPokemonByName(
      document.getElementById(components.input).value
    );
    console.log(data);
    if (data) {
      clearContainer();
      createPokemonImage(data);
    }
  });

async function getPokemonByName(pokemon_name) {
  try {
    return await (await fetch(OPTIONS.api + pokemon_name)).json();
  } catch (error) {
    console.log("Hiba történt: " + error);
  }
}

function createPokemonImage(data) {
  document.getElementById(pokemon.container).append(
    Object.assign(document.createElement("img"), {
      src: data.sprites.front_default,
      alt: data.name,
    })
  );
}

function clearContainer() {
  document.getElementById(pokemon.container).innerHTML = "";
}

const pokemon = {
  input: "pokemon-count",
  button: "get-pokemons",
  container: "pokemons",
};

document.getElementById(pokemon.input).addEventListener("input", () => {
  const value = parseInt(document.getElementById(pokemon.input).value);
  document.getElementById(pokemon.button).disabled =
    !value || value < 0 || value > 50;
});

document.getElementById(pokemon.button).addEventListener("click", async () => {
  const pokemons = await getPokemons(
    parseInt(document.getElementById(pokemon.input).value)
  );
  clearContainer();
  pokemons.results.forEach(async (element) => {
    const poke = (await fetch(element.url)).json();
    if (poke.state == "pending") {
      console.log("A pokemon lekérése folyamatban van...");
    }
    createPokemonImage(await poke);
  });
});

async function getPokemons(count) {
  try {
    return (await fetch(`${OPTIONS.api}?limit=${count}&offset=0`)).json();
  } catch (error) {
    console.log("Hiba a pokemonok lekérdezésekor: " + error);
  }
}

async function getPokemonById(id) {
  try {
    return (await fetch(`${OPTIONS.api}${id}`)).json();
  } catch (error) {
    console.log("Hiba a pokemon lekérdezésekor: " + error);
  }
}
