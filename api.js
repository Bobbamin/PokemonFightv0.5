const api = useApi();

const getPokemon = async (id) => {
    try {
        const { data } = await api.get(`pokemon/${id}`);
        return data;
    } catch (error) {
        console.error("Une erreur s'est produite : ", error);
    }
}

const getRandomPokemon = async () => {
    const randomId = Math.floor(Math.random() * 1010) + 1;
    return await getPokemon(randomId);
}

const getPokemonsForBattle = async () => {
    try {
        const pokemon1 = await getRandomPokemon();
        const pokemon2 = await getRandomPokemon();
        return { pokemon1, pokemon2 };
    } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des Pokémon : ", error);
    }
}
