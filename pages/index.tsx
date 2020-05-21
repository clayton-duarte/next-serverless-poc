import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import urlJoin from "url-join";
import Axios from "axios";

const Home: NextPage = () => {
  const [errorMessage, setErrorMessage] = useState<any>();
  const [planets, setPlanets] = useState<any>();
  const [people, setPeople] = useState<any>();
  const [ships, setShips] = useState<any>();

  const getData = async (route, dispatcher) => {
    const internalRoute = urlJoin(process.env.INTERNAL_API_SW, route);
    try {
      const { data } = await Axios.get(internalRoute);
      dispatcher(data);
    } catch (err) {
      if (err.response.data) {
        setErrorMessage(err.response.data);
      } else {
        throw new Error(err);
      }
    }
  };

  useEffect(() => {
    getData("planets", setPlanets);
    getData("people", setPeople);
    getData("starships", setShips);
  }, []);

  if (errorMessage) {
    return (
      <>
        <p className="error">Server responded with: {errorMessage}</p>
        <style jsx>{`
          p.error {
            color: #d63447;
          }
        `}</style>
      </>
    );
  }

  const renderList = (title, list?) => {
    if (!list) return <p>Fetching {title}...</p>;
    return (
      <ul>
        <h3>{title}</h3>
        {list.results.map(({ name }) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <section className="row">
        {renderList("Planets", planets)}
        {renderList("People", people)}
        {renderList("Ships", ships)}
      </section>

      <style jsx>{`
        section.row {
          justify-content: space-evenly;
          display: flex;
        }
      `}</style>
    </>
  );
};

export default Home;
