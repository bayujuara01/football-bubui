import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FavoriteMatch } from "../services/db";
import Spinner from "../components/Spinner";

export default function Favorit() {
  const [loading, setLoading] = useState({ league: true });
  const [league, setLeague] = useState([]);

  useEffect(() => {
    FavoriteMatch.getAll()
      .then((data) => {
        setLeague(data);
        setLoading({ league: false });
      })
      .catch((err) => {
        setLoading({ league: false });
      });
  }, []);

  return (
    <div className="container">
      <h4 className="center-align text-bold">Favorit</h4>
      <div className="center-align"></div>

      <div className="row a-mt-3">
        <div className="col s12 m12" id="a-favorit-load">
          <div className="center-align" id="preloader">
            {console.log(league)}
            {loading.league ? (
              <Spinner />
            ) : (
              league.map((data) => (
                <div key={data.match.id} className="col s12 m6 l6">
                  <div className="card">
                    <div className="card-content">
                      <div className="center-align">
                        <h5 className="center-align">
                          Matchday : {data.match.matchday}
                        </h5>
                        <div className="center-align">
                          Kick Off :{" "}
                          {new Date(data.match.utcDate).toLocaleDateString(
                            "id-ID"
                          )}
                        </div>

                        <h6 className="center-align text-bold">
                          {data.match.homeTeam.name}
                        </h6>
                        <h5 className="center-align text-bold">VS</h5>
                        <h6 className="center-align text-bold">
                          {data.match.awayTeam.name}
                        </h6>
                        <div className="center-align">
                          <Link
                            to={`match?id=${
                              data.match.id
                            }&flag=${Math.random().toString(36).substring(2)}`}
                            className="blue-grey darken-4 waves-effect waves-light btn"
                          >
                            Info Detail
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
