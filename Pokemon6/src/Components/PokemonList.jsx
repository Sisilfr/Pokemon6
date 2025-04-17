// components/PokemonList.jsx
import React, { useState, useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import './PokemonList.css';

// Sample Pokemon data (in a real app, this would be fetched from an API)
const pokemonData = [
  { id: 0, name: 'Pikachu', number: '1000', type: 'Electric', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png' },
  { id: 1, name: 'Bulbasaur', number: '1001', type: 'Grass', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png' },
  { id: 2, name: 'Ivysaur', number: '1002', type: 'Electric', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/002.png' },
  { id: 3, name: 'Venusaur', number: '1003', type: 'Grass', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/003.png' },
  { id: 4, name: 'Charmander', number: '1004', type: 'Fire', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png' },
  { id: 5, name: 'Charmeleon', number: '1005', type: 'Fire', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/005.png' },
  { id: 6, name: 'Charizard', number: '1006', type: 'Fire', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png' },
  { id: 7, name: 'Squirtle', number: '1007', type: 'Water', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png' },
  { id: 8, name: 'Wartortle', number: '1008', type: 'Water', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/008.png' },
  { id: 9, name: 'Blastoise', number: '1009', type: 'Water', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/009.png' },
  { id: 10, name: 'Nidorina', number: '1010', type: 'Poison', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/030.png' },
  { id: 11, name: 'Clefairy', number: '1011', type: 'Fairy', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/035.png' },
  { id: 12, name: 'Vulpix', number: '1012', type: 'Fire', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/037.png' },
  { id: 13, name: 'Ninetales', number: '1013', type: 'Fire', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/038.png' },
  { id: 14, name: 'Jigglypuff', number: '1014', type: 'Fairy', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/039.png' },
  { id: 15, name: 'Wigglytuff', number: '1015', type: 'Fairy', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/040.png' },
  { id: 16, name: 'Oddish', number: '1016', type: 'Grass', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/043.png' },
  { id: 17, name: 'Persian', number: '1017', type: 'Normal', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/053.png' },
  { id: 18, name: 'Psyduck', number: '1018', type: 'Water', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/054.png' },
  { id: 19, name: 'Growlithe', number: '1019', type: 'Fire', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/058.png' },
  { id: 20, name: 'Arcanine', number: '1020', type: 'Fire', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/059.png' },
  { id: 21, name: 'Ponyta', number: '1021', type: 'Fire', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/077.png' },
];

// Reducer function for managing pokemon list state
const pokemonReducer = (state, action) => {
  switch (action.type) {
    case 'FILTER_TYPE':
      return { 
        ...state, 
        filterType: action.payload, 
        filteredPokemon: state.allPokemon.filter(p => !action.payload || p.type === action.payload) 
      };
    case 'SET_VIEW_MODE':
      return { ...state, viewMode: action.payload };
    case 'INIT_DATA':
      return { 
        ...state, 
        allPokemon: action.payload, 
        filteredPokemon: action.payload 
      };
    default:
      return state;
  }
};

function PokemonList() {
  // Using reducer for complex state management
  const [state, dispatch] = useReducer(pokemonReducer, {
    allPokemon: [],
    filteredPokemon: [],
    filterType: '',
    viewMode: 'grid' // 'grid' or 'single'
  });

  // Load initial data
  useEffect(() => {
    // In a real app, this would be an API call
    dispatch({ type: 'INIT_DATA', payload: pokemonData });
    
    // Check localStorage for saved settings
    const savedView = localStorage.getItem('viewMode');
    if (savedView) {
      dispatch({ type: 'SET_VIEW_MODE', payload: savedView });
    }
    
    const savedFilter = localStorage.getItem('filterType');
    if (savedFilter) {
      dispatch({ type: 'FILTER_TYPE', payload: savedFilter });
    }
  }, []);

  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem('viewMode', state.viewMode);
    localStorage.setItem('filterType', state.filterType || '');
  }, [state.viewMode, state.filterType]);

  const handleFilterChange = (type) => {
    dispatch({ type: 'FILTER_TYPE', payload: type });
  };

  return (
    <div className="pokemon-list-container">
      <div className="header">
        <div className="path">Home/Light/Dark/Grid</div>
        <div className="logo">
          <img src="/pokeball.png" alt="Pokemon" className="pokemon-icon" />
          <h1>Pokémon</h1>
        </div>
        <div className="search-filters">
          <div className="filter-dropdown">
            <select 
              value={state.filterType} 
              onChange={(e) => handleFilterChange(e.target.value)}
            >
              <option value="">Sort by</option>
              <option value="Grass">Grass</option>
              <option value="Fire">Fire</option>
              <option value="Water">Water</option>
              <option value="Electric">Electric</option>
              <option value="Fairy">Fairy</option>
              <option value="Poisom">Poison</option>
              <option value="Normal">Normal</option>
            </select>
          </div>
          <div className="view-buttons">
            <button 
              className={state.viewMode === 'single' ? 'active' : ''}
              onClick={() => dispatch({ type: 'SET_VIEW_MODE', payload: 'single' })}
            >
              ☰
            </button>
            <button 
              className={state.viewMode === 'grid' ? 'active' : ''}
              onClick={() => dispatch({ type: 'SET_VIEW_MODE', payload: 'grid' })}
            >
              ⊞
            </button>
          </div>
        </div>
      </div>

      <div className={`pokemon-grid ${state.viewMode}`}>
        {state.filteredPokemon.map((pokemon) => (
          <Link to={`/pokemon/${pokemon.id}`} key={pokemon.id} className="pokemon-card">
            <div className="pokemon-type">{pokemon.type}</div>
            <div className="pokemon-number">#{pokemon.number}</div>
            <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" />
            {state.viewMode === 'grid' && (
              <div className="pokemon-name">
                {pokemon.name}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PokemonList;