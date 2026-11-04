import { useState, useEffect, } from 'react';

const usePokeAPI = () => {
	const [name, setName] = useState(null);
	const [number, setNumber] = useState(null);
	const [image, setImage] = useState(null);

	const getRandomNumber = (min, max) => {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min;
	};

	const id = getRandomNumber(1, 150);

	useEffect(() => {
		fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
				.then((response) => {
					if (response.status >= 400) {
						throw new Error("server error");
					}
					return response.json();
				})
				.then((response) => {
					setName(response.name)
					setNumber(response.id)
					setImage(response.sprites.front_default)
				});
	}, []);

	return { name, number, image };
};

export { usePokeAPI };
