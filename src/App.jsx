import { useState } from 'react'
import { usePokeAPI } from './hooks/usePokeAPI.jsx';
import { useLocalValue } from './hooks/useLocalValue.jsx';
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

function Cards({ evaluateClick }) {
	const { pokemon, fetchRandomPokemon } = usePokeAPI(9);
	
	const handleCardClick = event => {
		evaluateClick(event.target.dataset.id, event.target.dataset.name);
		fetchRandomPokemon();
	};

	return (
		<>
		{pokemon.map((mon) => (
			<button key={mon.number} data-id={mon.number} data-name={mon.name} onClick={handleCardClick} className="card flex-centered column">
				<img data-id={mon.number} data-name={mon.name} src={mon.image} alt={mon.name} />
				<div data-id={mon.number} data-name={mon.name} className="card-info flex-centered">
					<p data-id={mon.number} data-name={mon.name}>No. {mon.number}</p>
					<h3 data-id={mon.number} data-name={mon.name}>{mon.name}</h3>
				</div>
			</button>
		))}
		</>
	);
};

function Gameboard({ score, setScore, highscore, setHighscore }) {
	const [clickedCards, setClickedCards] = useState([]);
	const [lost, setLost] = useState(null);
	
	const evaluateClick = (card, name) => {
		if (!clickedCards.includes(card)) {
			setClickedCards([...clickedCards, card]);
			setScore(score + 1);
		} else {
			setScore(0);
			setClickedCards([]);
			setLost(name);
		};

		if (highscore <= score) {
			setHighscore(score + 1);
		};
	};

	function toggleLose() {
		if (lost) setLost(null);
	};

	return (
		<div id="gameboard" className="flex-centered">
			<Cards
				evaluateClick={evaluateClick}
			/>
			{lost ? <Loser name={lost} toggleLose={toggleLose} /> : null}
		</div>
	);
};

function Manual({ toggleHelp }) {
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

function Loser({ toggleLose, name }) {
	return (
		<aside id="loser-dialogue" className="flex-centered column popup">
			<button onClick={toggleLose} className="close-button" aria-label="Close">
				<img src={closeButton} alt="" aria-hidden="true" />
			</button>
			<h2>Game Over!</h2>
			<p>You lost by clicking {name} twice.</p>
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
	const [highscore, setHighscore] = useLocalValue(0, 'highscore');

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
