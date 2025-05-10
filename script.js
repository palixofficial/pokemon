const OPTIONS = {
  api: "https://pokeapi.co/api/v2/pokemon/",
};

const components = {
  button: "search-button",
  input: "search-input",
  container: "pokemon-container",
};

document.getElementById(components.input).addEventListener("input", () => {
  document.getElementById(components.button).disabled = !document.getElementById(components.input).value;
});

document.getElementById(components.button).addEventListener("click", async () => {
  const data = await getPokemonByName(document.getElementById(components.input).value);
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
  document.getElementById(components.container).append(
    Object.assign(document.createElement("img"), {
      src: data.sprites.front_default,
      alt: data.name,
    })
  );
}

function clearContainer() {
  document.getElementById(components.container).innerHTML = "";
}
