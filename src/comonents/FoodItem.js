import React from "react";

const FoodItem = ({ recipe }) => {
  return (
    <div key={recipe.url}>
      <img className="card-img-top" src={recipe.image} alt="" style={{width:'300px',height:'300px',borderRadius:'10%'}} />
      <div className="card-body">
        <h5 className="card-title">{recipe.label} - {recipe.cuisineType}</h5>
        <p>Calories: {Math.round(recipe.calories)}</p>
        <a href={recipe.url} target="-blank" className="btn btn-sm btn-dark">
          Read more
        </a>
      </div>
    </div>
  );
};

export default FoodItem;
