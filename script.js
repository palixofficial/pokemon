const OPTIONS = {
  api: "https://pokeapi.co/api/v2/pokemon/",
};

const components = {
  button: "search-button",
  input: "search-input",
  container: "pokemon-container",
};

document.getElementById(components.input).addEventListener("input", () => {
  const button = document.getElementById(components.button);
  button.disabled = !document.getElementById(components.input).value;
});

document.getElementById(components.button).addEventListener("click", async () => {
  const input = document.getElementById(components.input);
  const data = await getPokemonByName(input.value);
  if (data) {
    createPokemonImage(data);
  }
});

async function getPokemonByName(pokemon_name) {
  const response = await fetch(OPTIONS.api + pokemon_name);
  if (!response.ok) return alert("Nincs ilyen pokemon!");
  const data = await response.json();
  return data;
}

function createPokemonImage(data) {
  document.getElementById(components.container).innerHTML = "";
  const img = document.createElement("img");
  img.src = data.sprites.front_default;
  document.getElementById(components.container).append(img);
}
