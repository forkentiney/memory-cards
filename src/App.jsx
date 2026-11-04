import { useState, useEffect } from 'react'
import './styles/App.css'
import closeButton from './assets/close-filled.svg';
import helpButton from './assets/help-outlined.svg';
import github from './assets/github.svg';

function Header() {
	return (
		<header className="flex-centered">
			<h1>Pokémon Memory Cards</h1>
		</header>
	);
};

function Scoreboard({ highscore, score, }) {
	return (
		<ul id="scoreboard" className="flex-centered">
			<li>High Score: {highscore}</li>
			<li>Score: {score}</li>
		</ul>
	);
};

function Card({ name, number, image, }) {
	return (
		<button className="card flex-centered column">
			<img src={image} alt={name} />
			<div className="card-info flex-centered">
				<p>No. {number}</p>
				<h3>{name}</h3>
			</div>
		</button>
	);
};


function Gameboard() {
	const [items, setItems] = useState([]);

	useEffect(() => {
		const fetchPokemon = async () => {
			const getRandomNumber = (min, max) => {
				min = Math.ceil(min);
				max = Math.floor(max);
				return Math.floor(Math.random() * (max - min)) + min;
			};
			for (let i = 0; i < 9; i++) {
				const pokemonNumber = getRandomNumber(1, 150);
				const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`);
				const newItem = await response.json();
				setItems([...items, newItem]);
			};
		};

		fetchPokemon();
	}, []);

	console.log(items);
	const cards = items.map(item => {
		<Card
			key={item.id}
			name={item.name}
			number={item.id}
			image={item.sprites.front_default}
		/>
	});

	return (
		<div id="gameboard" className="flex-centered">{cards}</div>
	);
};

function Manual({ toggleHelp, }) {
	return (
		<aside id="manual" className="flex-centered column popup">
			<button onClick={toggleHelp} className="close-button" ariaLabel="Close">
				<img src={closeButton} alt="" ariaHidden="true" />
			</button>
			<h2>How to Play</h2>
			<ul>
				<li>Cards are displayed in a random order.</li>
				<li>Each time you click, they are rearranged.</li>
				<li>Do not click the same card twice.</li>
				<li>Each unique card clicked earns you a point.</li>
				<li>Clicking a card you have already clicked resets your score.</li>
			</ul>
		</aside>
	);
};

function Footer() {
	return (
		<footer className="flex-centered">
			<div className="flex-centered column">
				<p>license</p>
				<a href="https://github.com/forkentiney/memory-cards/blob/main/LICENSE">GNU GPLv3</a>
			</div>
			<div className="flex-centered column">
				<p>site by Joshua Severud</p>
				<a href="https://github.com/forkentiney/memory-cards"><img className="icon" src={github} alt="" ariaHidden="true" /></a>
			</div>
			<div className="flex-centered column">
				<p>icons by <a href="https://github.com/weui/weui-icon">WeUI</a></p>
				<p>Pokémon data from <a href="https://pokeapi.co/">PokéAPI</a></p>
			</div>
		</footer>
	);
};

function Main() {
	const [help, setHelp] = useState(false);

	function toggleHelp() {
		if (help) {
			setHelp(false);
		} else {
			setHelp(true);
		};
	};

	return (
		<main className="flex-centered column">
			<Scoreboard />
			<button onClick={toggleHelp} id="open-manual" className="flex-centered"><img src={helpButton} alt="" ariaLabel="Help" /></button>
			<Gameboard />
			{help ? <Manual toggleHelp={toggleHelp}/> : null}
		</main>
	)
}

function App() {
  return (
		<>
			<Header />
			<Main />
			<Footer />
		</>
  );
};

export default App
