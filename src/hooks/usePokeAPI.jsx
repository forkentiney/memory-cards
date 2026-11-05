import { useState, useEffect, useCallback } from 'react';

const getRandomNumber = (min, max) => {
	return Math.floor(Math.random() * (max - min)) + min;
};

export function usePokeAPI(count = 9) {
	const [pokemon, setPokemon] = useState([]);

	const fetchRandomPokemon = useCallback(async () => {
		const ids = [];

		while (ids.length < count) {
			const id = getRandomNumber(1, 150);
			if (!ids.includes(id)) ids.push(id);
		};

		const fetchPokemon = ids.map(id =>
			fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
				.then((response) => {
					return response.json();
			})
		);

		const results = await Promise.all(fetchPokemon);

		const processedResults = results.map(result => ({
			number: result.id,
			name: result.name.charAt(0).toUpperCase() + result.name.slice(1),
			image: result.sprites.other['official-artwork']['versions']['generation-i']['red-and-blue'].front_default || result.sprites.front_default,
		}));
		
		setPokemon(processedResults);
	}, [count]);

	useEffect(() => {
		fetchRandomPokemon();
	}, [fetchRandomPokemon]);

	return { pokemon, fetchRandomPokemon };
};
