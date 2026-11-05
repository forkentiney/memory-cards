import { useState, useEffect } from 'react'
import { usePokeAPI } from './hooks/usePokeAPI.jsx';
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

function Scoreboard({ score, highscore }) {
	return (
		<ul id="scoreboard" className="flex-centered">
			<li>High Score: {highscore}</li>
			<li>Score: {score}</li>
		</ul>
	);
};

function Cards({ setScore, setHighscore }) {
	const { pokemon, fetchRandomPokemon } = usePokeAPI(9);

	function handleClick() {

	};

	return (
		<>
		{pokemon.map((mon) => (
			<button key={mon.number} onClick={handleClick} className="card flex-centered column">
				<img src={mon.image} alt={mon.name} />
				<div className="card-info flex-centered">
					<p>No. {mon.number}</p>
					<h3>{mon.name}</h3>
				</div>
			</button>
		))}
		</>
	);
};

function Gameboard() {
	return (
		<div id="gameboard" className="flex-centered"><Cards /></div>
	);
};

function Manual({ toggleHelp, }) {
	return (
		<aside id="manual" className="flex-centered column popup">
			<button onClick={toggleHelp} className="close-button" aria-label="Close">
				<img src={closeButton} alt="" aria-hidden="true" />
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
				<a href="https://github.com/forkentiney/memory-cards"><img className="icon" src={github} alt="" aria-hidden="true" /></a>
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
	const [score, setScore] = useState(0);
	const [highscore, setHighscore] = useState(0);

	function toggleHelp() {
		if (help) {
			setHelp(false);
		} else {
			setHelp(true);
		};
	};

	return (
		<main className="flex-centered column">
			<Scoreboard
				score={score}
				highscore={highscore}
			/>
			<button onClick={toggleHelp} id="open-manual" className="flex-centered"><img src={helpButton} alt="" aria-label="Help" /></button>
			<Gameboard 
				setScore={setScore} 
				setHighscore={setHighscore}
				score={score}
				highscore={highscore}
			/>
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
