import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { useForm } from "../../hooks/useForm";
import { HeroCard } from "../heroes/HeroCard";
import { getHeroesByName } from "../../selectors/getHeroesByName";

export const SearchScreen = ({ history }) => {
  const location = useLocation();
  const { q: query = "" } = queryString.parse(location.search);

  const { formState, handleInputChange } = useForm({
    search: query,
  });

  const { search } = formState;

  const heroesFiltered = useMemo(() => getHeroesByName(query), [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    history.push(`?q=${search}`);
  };

  return (
    <div>
      <h1>Search Screen</h1>
      <hr />

      <div className="row">
        <div className="col-5">
          <h4>Search Form</h4>
          <hr />
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="find a hero"
              className="form-control"
              name="search"
              value={search}
              onChange={handleInputChange}
              autoComplete="off"
            />
            <button
              type="submit"
              className="btn m-1 btn-block btn-outline-primary"
            >
              Search
            </button>
          </form>
        </div>
        <div className="col-7">
          <h4>Results</h4>
          <hr />
          {!query ? (
            <div className="alert alert-info text-center">Search a hero</div>
          ) : query && heroesFiltered.length === 0 ? (
            <div className="alert alert-danger text-center">
              There's no hero with this name
            </div>
          ) : (
            heroesFiltered.map((hero) => <HeroCard key={hero.id} {...hero} />)
          )}
        </div>
      </div>
    </div>
  );
};
