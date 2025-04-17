import React from "react";
import "./PokemonCard.css";

function PokemonCard({ id, name, type, image, onClick, isTwoGrid }) {
  return (
    <div
      className={`pokemon-card ${isTwoGrid ? "two-grid" : "one-grid"}`}
      onClick={onClick}
    >
      <div className="card-header">
        <span className="type">{type}</span>
        <span className="id">{id.toString().padStart(4, "0")}</span>
      </div>

      <div className="card-content">
        <img className="pokemon-image" src={image} alt={name} />
        <div className="pokemon-name">{name}</div>
      </div>
    </div>
  );
}

export default PokemonCard;