import { useState, useEffect, } from 'react';

export default function usePokeAPI(id) {
	const [item, setItem] = useState(null);

	useEffect(() => {
		const fetchPokemon = async () => {
			const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
			const newItem = await response.json();
			setItem(newItem);
		};

		fetchPokemon();
	}, [id]);

	return item;
};
