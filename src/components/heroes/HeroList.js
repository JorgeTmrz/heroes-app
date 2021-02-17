import React, { useMemo } from "react";
import { getHeroesByPublisher } from "../../selectors/getHeroByPublisher";
import PropTypes from "prop-types";
import { HeroCard } from "./HeroCard";

export const HeroList = ({ publisher }) => {

  const heroes = useMemo(() => getHeroesByPublisher(publisher), [publisher]);

  return (
    <div className="card-columns animate__animated animate__fadeIn">
      {heroes.map((hero) => (
        <HeroCard {...hero} key={hero.id} />
      ))}
    </div>
  );
};

HeroList.propTypes = {
  publisher: PropTypes.string.isRequired,
};
