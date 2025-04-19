// components/PokemonDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './PokemonDetail.css';

// Function to get animated Pokemon image URL from PokeAPI
function getAnimatedPokemonImageUrl(pokemonNumber) {
  // Mapping for custom Pokemon numbers to standard Pokedex numbers
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
  
  // Get standard Pokedex number
  const pokedexNumber = pokemonNumberMapping[pokemonNumber];
  if (!pokedexNumber) {
    return null; // Return null if mapping not found
  }
  
  // Format number for URL (without leading zero)
  const formattedNumber = parseInt(pokedexNumber, 10);
  
  // Use URL from PokeAPI for animated sprite
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${formattedNumber}.gif`;
}

// Alternative version using another source if PokeAPI is not available
function getAnimatedPokemonImageAlternate(pokemonNumber) {
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
  
  const pokedexNumber = pokemonNumberMapping[pokemonNumber];
  if (!pokedexNumber) {
    return null;
  }
  
  // Padding with 0 for 3-digit format
  const paddedNumber = pokedexNumber.padStart(3, '0');
  
  // Alternative animation URL (pkparaiso)
  return `https://www.pkparaiso.com/imagenes/xy/sprites/animados/${paddedNumber}.gif`;
}

// Function to get static image as fallback
function getStaticPokemonImage(pokemonNumber) {
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
  
  const pokedexNumber = pokemonNumberMapping[pokemonNumber];
  if (!pokedexNumber) {
    return null;
  }
  
  // Padding with 0 for 3-digit format
  const paddedNumber = pokedexNumber.padStart(3, '0');
  
  // Use Pokemon.com official image as fallback
  return `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedNumber}.png`;
}

// Pokemon data with stats and both animated and static images
const pokemonDataWithStats = [
  { id: 0, name: 'Pikachu', number: '1000', type: 'Electric', 
    animatedImage: getAnimatedPokemonImageUrl('1000'), 
    staticImage: getStaticPokemonImage('1000'), 
    health: 120, attack: 42, defense: 35 },
  { id: 1, name: 'Bulbasaur', number: '1001', type: 'Grass', 
    animatedImage: getAnimatedPokemonImageUrl('1001'), 
    staticImage: getStaticPokemonImage('1001'), 
    health: 144, attack: 32, defense: 50 },
  { id: 2, name: 'Ivysaur', number: '1002', type: 'Electric', 
    animatedImage: getAnimatedPokemonImageUrl('1002'), 
    staticImage: getStaticPokemonImage('1002'), 
    health: 155, attack: 43, defense: 58 },
  { id: 3, name: 'Venusaur', number: '1003', type: 'Grass', 
    animatedImage: getAnimatedPokemonImageUrl('1003'), 
    staticImage: getStaticPokemonImage('1003'), 
    health: 160, attack: 52, defense: 63 },
  { id: 4, name: 'Charmander', number: '1004', type: 'Fire', 
    animatedImage: getAnimatedPokemonImageUrl('1004'), 
    staticImage: getStaticPokemonImage('1004'), 
    health: 128, attack: 40, defense: 43 },
  { id: 5, name: 'Charmeleon', number: '1005', type: 'Fire', 
    animatedImage: getAnimatedPokemonImageUrl('1005'), 
    staticImage: getStaticPokemonImage('1005'), 
    health: 142, attack: 48, defense: 49 },
  { id: 6, name: 'Charizard', number: '1006', type: 'Fire', 
    animatedImage: getAnimatedPokemonImageUrl('1006'), 
    staticImage: getStaticPokemonImage('1006'), 
    health: 156, attack: 54, defense: 55 },
  { id: 7, name: 'Squirtle', number: '1007', type: 'Water', 
    animatedImage: getAnimatedPokemonImageUrl('1007'), 
    staticImage: getStaticPokemonImage('1007'), 
    health: 130, attack: 38, defense: 53 },
  { id: 8, name: 'Wartortle', number: '1008', type: 'Water', 
    animatedImage: getAnimatedPokemonImageUrl('1008'), 
    staticImage: getStaticPokemonImage('1008'), 
    health: 145, attack: 45, defense: 60 },
  { id: 9, name: 'Blastoise', number: '1009', type: 'Water', 
    animatedImage: getAnimatedPokemonImageUrl('1009'), 
    staticImage: getStaticPokemonImage('1009'), 
    health: 160, attack: 52, defense: 65 },
  { id: 10, name: 'Nidorina', number: '1010', type: 'Poison', 
    animatedImage: getAnimatedPokemonImageUrl('1010'), 
    staticImage: getStaticPokemonImage('1010'), 
    health: 120, attack: 38, defense: 47 },
  { id: 11, name: 'Clefairy', number: '1011', type: 'Fairy', 
    animatedImage: getAnimatedPokemonImageUrl('1011'), 
    staticImage: getStaticPokemonImage('1011'), 
    health: 125, attack: 30, defense: 40 },
  { id: 12, name: 'Vulpix', number: '1012', type: 'Fire', 
    animatedImage: getAnimatedPokemonImageUrl('1012'), 
    staticImage: getStaticPokemonImage('1012'), 
    health: 110, attack: 35, defense: 30 },
  { id: 13, name: 'Ninetales', number: '1013', type: 'Fire', 
    animatedImage: getAnimatedPokemonImageUrl('1013'), 
    staticImage: getStaticPokemonImage('1013'), 
    health: 150, attack: 48, defense: 55 },
  { id: 14, name: 'Jigglypuff', number: '1014', type: 'Fairy', 
    animatedImage: getAnimatedPokemonImageUrl('1014'), 
    staticImage: getStaticPokemonImage('1014'), 
    health: 160, attack: 25, defense: 30 },
  { id: 15, name: 'Wigglytuff', number: '1015', type: 'Fairy', 
    animatedImage: getAnimatedPokemonImageUrl('1015'), 
    staticImage: getStaticPokemonImage('1015'), 
    health: 170, attack: 30, defense: 35 },
  { id: 16, name: 'Oddish', number: '1016', type: 'Grass', 
    animatedImage: getAnimatedPokemonImageUrl('1016'), 
    staticImage: getStaticPokemonImage('1016'), 
    health: 115, attack: 28, defense: 34 },
  { id: 17, name: 'Persian', number: '1017', type: 'Normal', 
    animatedImage: getAnimatedPokemonImageUrl('1017'), 
    staticImage: getStaticPokemonImage('1017'), 
    health: 135, attack: 45, defense: 40 },
  { id: 18, name: 'Psyduck', number: '1018', type: 'Water', 
    animatedImage: getAnimatedPokemonImageUrl('1018'), 
    staticImage: getStaticPokemonImage('1018'), 
    health: 125, attack: 33, defense: 35 },
  { id: 19, name: 'Growlithe', number: '1019', type: 'Fire', 
    animatedImage: getAnimatedPokemonImageUrl('1019'), 
    staticImage: getStaticPokemonImage('1019'), 
    health: 130, attack: 42, defense: 38 },
  { id: 20, name: 'Arcanine', number: '1020', type: 'Fire', 
    animatedImage: getAnimatedPokemonImageUrl('1020'), 
    staticImage: getStaticPokemonImage('1020'), 
    health: 160, attack: 55, defense: 52 },
  { id: 21, name: 'Ponyta', number: '1021', type: 'Fire', 
    animatedImage: getAnimatedPokemonImageUrl('1021'), 
    staticImage: getStaticPokemonImage('1021'), 
    health: 125, attack: 41, defense: 36 },
];

function PokemonDetail() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [useAnimated, setUseAnimated] = useState(true);
  const [imageError, setImageError] = useState(false);
  
  useEffect(() => {
    // Convert id to number for comparison
    const numericId = parseInt(id, 10);
    
    // Find Pokemon in our data with matching id
    const foundPokemon = pokemonDataWithStats.find(p => p.id === numericId);
    
    // Set the Pokemon data to state
    if (foundPokemon) {
      setPokemon(foundPokemon);
    }
  }, [id]);

  // Handle image loading error
  const handleImageError = () => {
    setImageError(true);
    setUseAnimated(false);
  };

  if (!pokemon) {
    return <div className="loading">Loading...</div>;
  }

  // Determine which image to use based on state
  const imageUrl = imageError || !useAnimated ? pokemon.staticImage : pokemon.animatedImage;

  return (
    <div className="pokemon-detail-container">
      <div className="detail-header">
        <div className="path">OnePokemon/Dark</div>
      </div>
      
      <div className="pokemon-detail-card">
        <div className="pokemon-number">#{pokemon.number}</div>
        
        <div className="pokemon-image-container">
          <img 
            src={imageUrl} 
            alt={pokemon.name} 
            className="pokemon-detail-image" 
            onError={handleImageError}
          />
        </div>
        
        <div className="pokemon-name-detail">
          <h2>{pokemon.name}</h2>
          <img 
            src={imageUrl} 
            alt={pokemon.name} 
            className="pokemon-thumbnail" 
            onError={handleImageError}
          />
        </div>
        
        <div className="pokemon-stats">
          <div className="stat">
            <div className="stat-name">Health</div>
            <div className="stat-value">from {pokemon.number}</div>
            <div className="stat-bar">
              <div 
                className="stat-fill health-fill" 
                style={{ width: `${(pokemon.health / 200) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="stat">
            <div className="stat-name">Attack</div>
            <div className="stat-value">{pokemon.attack}</div>
            <div className="stat-bar">
              <div 
                className="stat-fill attack-fill" 
                style={{ width: `${(pokemon.attack / 100) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="stat">
            <div className="stat-name">Defense</div>
            <div className="stat-value">{pokemon.defense}</div>
            <div className="stat-bar">
              <div 
                className="stat-fill defense-fill" 
                style={{ width: `${(pokemon.defense / 100) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      <Link to="/" className="back-button">Back to List</Link>
    </div>
  );
}

export default PokemonDetail;