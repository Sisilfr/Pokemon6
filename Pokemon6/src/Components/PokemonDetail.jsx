// components/PokemonDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './PokemonDetail.css';

// Sample Pokemon data (in a real app, this would be fetched from an API)
const pokemonData = [
    { id: 0, name: 'Pikachu', number: '1000', type: 'Electric', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png', health: 120, attack: 42, defense: 35 },
    { id: 1, name: 'Bulbasaur', number: '1001', type: 'Grass', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png', health: 144, attack: 32, defense: 50 },
    { id: 2, name: 'Ivysaur', number: '1002', type: 'Electric', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/002.png', health: 155, attack: 43, defense: 58 },
    { id: 3, name: 'Venusaur', number: '1003', type: 'Grass', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/003.png', health: 160, attack: 52, defense: 63 },
    { id: 4, name: 'Charmander', number: '1004', type: 'Fire', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png', health: 128, attack: 40, defense: 43 },
    { id: 5, name: 'Charmeleon', number: '1005', type: 'Fire', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/005.png', health: 142, attack: 48, defense: 49 },
    { id: 6, name: 'Charizard', number: '1006', type: 'Fire', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png', health: 156, attack: 54, defense: 55 },
    { id: 7, name: 'Squirtle', number: '1007', type: 'Water', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png', health: 130, attack: 38, defense: 53 },
    { id: 8, name: 'Wartortle', number: '1008', type: 'Water', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/008.png', health: 145, attack: 45, defense: 60 },
    { id: 9, name: 'Blastoise', number: '1009', type: 'Water', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/009.png', health: 160, attack: 52, defense: 65 },
    { id: 10, name: 'Nidorina', number: '1010', type: 'Poison', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/030.png', health: 120, attack: 38, defense: 47 },
    { id: 11, name: 'Clefairy', number: '1011', type: 'Fairy', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/035.png', health: 125, attack: 30, defense: 40 },
    { id: 12, name: 'Vulpix', number: '1012', type: 'Fire', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/037.png', health: 110, attack: 35, defense: 30 },
    { id: 13, name: 'Ninetales', number: '1013', type: 'Fire', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/038.png', health: 150, attack: 48, defense: 55 },
    { id: 14, name: 'Jigglypuff', number: '1014', type: 'Fairy', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/039.png', health: 160, attack: 25, defense: 30 },
    { id: 15, name: 'Wigglytuff', number: '1015', type: 'Fairy', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/040.png', health: 170, attack: 30, defense: 35 },
    { id: 16, name: 'Oddish', number: '1016', type: 'Grass', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/043.png', health: 115, attack: 28, defense: 34 },
    { id: 17, name: 'Persian', number: '1017', type: 'Normal', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/053.png', health: 135, attack: 45, defense: 40 },
    { id: 18, name: 'Psyduck', number: '1018', type: 'Water', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/054.png', health: 125, attack: 33, defense: 35 },
    { id: 19, name: 'Growlithe', number: '1019', type: 'Fire', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/058.png', health: 130, attack: 42, defense: 38 },
    { id: 20, name: 'Arcanine', number: '1020', type: 'Fire', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/059.png', health: 160, attack: 55, defense: 52 },
    { id: 21, name: 'Ponyta', number: '1021', type: 'Fire', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/077.png', health: 125, attack: 41, defense: 36 },
  ];
  

function PokemonDetail() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  
  useEffect(() => {
    // Check if we have this Pokemon in sessionStorage
    const storedPokemon = sessionStorage.getItem(`pokemon_${id}`);
    
    if (storedPokemon) {
      setPokemon(JSON.parse(storedPokemon));
    } else {
      // In a real app, this would be an API call
      const foundPokemon = pokemonData.find(p => p.id === parseInt(id));
      setPokemon(foundPokemon);
      
      // Store in sessionStorage
      if (foundPokemon) {
        sessionStorage.setItem(`pokemon_${id}`, JSON.stringify(foundPokemon));
      }
    }
  }, [id]);

  if (!pokemon) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="pokemon-detail-container">
      <div className="detail-header">
        <div className="path">OnePokemon/Dark</div>
      </div>
      
      <div className="pokemon-detail-card">
        <div className="pokemon-number">#{pokemon.number}</div>
        
        <div className="pokemon-image-container">
          <img src={pokemon.image} alt={pokemon.name} className="pokemon-detail-image" />
        </div>
        
        <div className="pokemon-name-detail">
          <h2>{pokemon.name}</h2>
          <img src={pokemon.image} alt={pokemon.name} className="pokemon-thumbnail" />
        </div>
        
        <div className="pokemon-stats">
          <div className="stat">
            <div className="stat-name">Health</div>
            <div className="stat-value">{pokemon.health} from 1000</div>
            <div className="stat-bar">
              <div 
                className="stat-fill" 
                style={{ width: `${(pokemon.health / 1000) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="stat">
            <div className="stat-name">Attack</div>
            <div className="stat-value">{pokemon.attack}</div>
          </div>
          
          <div className="stat">
            <div className="stat-name">Defense</div>
            <div className="stat-value">{pokemon.defense}</div>
          </div>
        </div>
      </div>
      
      <Link to="/" className="back-button">Back to List</Link>
    </div>
  );
}

export default PokemonDetail;