import { useState, useEffect, } from 'react';

export default function usePokeAPI() {
	const [item, setItem] = useState(null);

	const getRandomNumber = (min, max) => {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min;
	};

	const pokemonNum = getRandomNumber(1, 150);

	useEffect(() => {
		const fetchPokemon = async () => {
			const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNum}`)
			const newItem = await response.json();
			setitem(newItem);
		};

		fetchPokemon();
	}, []);

	return item;
};
