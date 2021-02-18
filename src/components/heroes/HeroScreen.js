import React, { useMemo } from "react";
import { Redirect, useParams } from "react-router-dom";
import { getHeroById } from "../../selectors/getHeroById";

export const HeroScreen = ({history}) => {
  const { heroId } = useParams();
  const hero = useMemo(() => getHeroById(heroId), [heroId])

  if (!hero) {
    return <Redirect to="/" />;
  }

  const {
    superhero,
    publisher,
    alter_ego,
    first_appearance,
    characters,
    image
  } = hero;


  const handleReturn = () => {

    if(history.length <= 2){
        return history.push("./")
    }
    else {
        return history.goBack()
    }
}

  return (
    <div className="row mt-5 animate__animated animate__backInLeft">
      <div className="col-4">
        <img
          src={image}
          alt={superhero}
          className="img-thumbnail"
        />
      </div>
      <div className="col-8">
        <h3>{superhero}</h3>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <b>Alter Ego: </b>
            {alter_ego}
          </li>
          <li className="list-group-item">
            <b>Publisher: </b>
            {publisher}
          </li>
          <li className="list-group-item">
            <b>First Appearance: </b>
            {first_appearance}
          </li>
        </ul>
        <h5 className = "mt-5">Characters</h5>
        <p>{characters}</p>

        <button 
            className = "btn btn-lg btn-outline-dark mt-2"
            onClick = {handleReturn}
        >
            ↩
        </button>
      </div>
    </div>
  );
};
