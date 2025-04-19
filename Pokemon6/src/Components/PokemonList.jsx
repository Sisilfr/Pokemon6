// components/PokemonList.jsx
import React, { useState, useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import './PokemonList.css';


/**
 * Kode untuk mengubah gambar Pokémon statis menjadi animasi
 * Menggunakan sumber yang lebih reliable dari PokéAPI
 */

// Function untuk mendapatkan URL animasi GIF Pokémon dari API publik
function getAnimatedPokemonImageUrl(pokemonNumber) {
  // Mapping nomor Pokémon internal ke nomor Pokédex standar
  const pokemonNumberMapping = {
    '1000': '025', // Pikachu
    '1001': '001', // Bulbasaur
    '1002': '002', // Ivysaur
    '1003': '003', // Venusaur
    '1004': '004', // Charmander
    '1005': '005', // Charmeleon
    '1006': '006', // Charizard
    '1007': '007', // Squirtle
    '1008': '008', // Wartortle
    '1009': '009', // Blastoise
    '1010': '030', // Nidorina
    '1011': '035', // Clefairy
    '1012': '037', // Vulpix
    '1013': '038', // Ninetales
    '1014': '039', // Jigglypuff
    '1015': '040', // Wigglytuff
    '1016': '043', // Oddish
    '1017': '053', // Persian
    '1018': '054', // Psyduck
    '1019': '058', // Growlithe
    '1020': '059', // Arcanine
    '1021': '077'  // Ponyta
  };
  
  // Mendapatkan nomor Pokédex standar
  const pokedexNumber = pokemonNumberMapping[pokemonNumber];
  if (!pokedexNumber) {
    return null; // Return null jika mapping tidak ditemukan
  }
  
  // Format nomor untuk URL (tanpa leading zero)
  const formattedNumber = parseInt(pokedexNumber, 10);
  
  // Gunakan URL dari PokéAPI untuk sprite animasi
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${formattedNumber}.gif`;
}

// Versi alternatif menggunakan sumber lain jika PokeAPI tidak tersedia
function getAnimatedPokemonImageAlternate(pokemonNumber) {
  const pokemonNumberMapping = {
    '1000': '025', // Pikachu
    '1001': '001', // Bulbasaur
    // ... mapping lainnya sama seperti di atas
  };
  
  const pokedexNumber = pokemonNumberMapping[pokemonNumber];
  if (!pokedexNumber) {
    return null;
  }
  
  // Padding dengan 0 untuk format 3 digit
  const paddedNumber = pokedexNumber.padStart(3, '0');
  
  // URL animasi dari sumber alternatif (pkparaiso)
  return `https://www.pkparaiso.com/imagenes/xy/sprites/animados/${paddedNumber}.gif`;
}

// Update array pokemonData pertama dengan gambar animasi dari PokeAPI
const pokemonData = [
  { id: 0, name: 'Pikachu', number: '1000', type: 'Electric', image: getAnimatedPokemonImageUrl('1000') },
  { id: 1, name: 'Bulbasaur', number: '1001', type: 'Grass', image: getAnimatedPokemonImageUrl('1001') },
  { id: 2, name: 'Ivysaur', number: '1002', type: 'Grass', image: getAnimatedPokemonImageUrl('1002') },
  { id: 3, name: 'Venusaur', number: '1003', type: 'Grass', image: getAnimatedPokemonImageUrl('1003') },
  { id: 4, name: 'Charmander', number: '1004', type: 'Fire', image: getAnimatedPokemonImageUrl('1004') },
  { id: 5, name: 'Charmeleon', number: '1005', type: 'Fire', image: getAnimatedPokemonImageUrl('1005') },
  { id: 6, name: 'Charizard', number: '1006', type: 'Fire', image: getAnimatedPokemonImageUrl('1006') },
  { id: 7, name: 'Squirtle', number: '1007', type: 'Water', image: getAnimatedPokemonImageUrl('1007') },
  { id: 8, name: 'Wartortle', number: '1008', type: 'Water', image: getAnimatedPokemonImageUrl('1008') },
  { id: 9, name: 'Blastoise', number: '1009', type: 'Water', image: getAnimatedPokemonImageUrl('1009') },
  { id: 10, name: 'Nidorina', number: '1010', type: 'Poison', image: getAnimatedPokemonImageUrl('1010') },
  { id: 11, name: 'Clefairy', number: '1011', type: 'Fairy', image: getAnimatedPokemonImageUrl('1011') },
  { id: 12, name: 'Vulpix', number: '1012', type: 'Fire', image: getAnimatedPokemonImageUrl('1012') },
  { id: 13, name: 'Ninetales', number: '1013', type: 'Fire', image: getAnimatedPokemonImageUrl('1013') },
  { id: 14, name: 'Jigglypuff', number: '1014', type: 'Fairy', image: getAnimatedPokemonImageUrl('1014') },
  { id: 15, name: 'Wigglypuff', number: '1015', type: 'Fairy', image: getAnimatedPokemonImageUrl('1015') },
  { id: 16, name: 'Oddish', number: '1016', type: 'Grass', image: getAnimatedPokemonImageUrl('1016') },
  { id: 17, name: 'Persian', number: '1017', type: 'Normal', image: getAnimatedPokemonImageUrl('1017') },
  { id: 18, name: 'Psyduck', number: '1018', type: 'Water', image: getAnimatedPokemonImageUrl('1018') },
  { id: 19, name: 'Growlithe', number: '1019', type: 'Fire', image: getAnimatedPokemonImageUrl('1019') },
  { id: 20, name: 'Arcanine', number: '1020', type: 'Fire', image: getAnimatedPokemonImageUrl('1020') },
  { id: 21, name: 'Ponyta', number: '1021', type: 'Fire', image: getAnimatedPokemonImageUrl('1021') },
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