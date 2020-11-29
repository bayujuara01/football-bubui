import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getMatchLeague } from "../services/api";
import Spinner from "../components/Spinner";

export default function Jadwal() {
  const [loading, setLoading] = useState({ league: true });
  const [league, setLeague] = useState({
    competition: {},
    matches: [],
  });

  useEffect(() => {
    getMatchLeague()
      .then((data) => {
        setLeague(data);
        setLoading({ league: false });
      })
      .catch((error) => {
        setLoading({ league: false });
      });
  }, []);

  return (
    <div className="row container center-align">
      <div className="container">
        <h4 className="text-bold">Jadwal Tanding Tim</h4>
        <h6 className="text-bold">United Kingdom League</h6>
      </div>
      <div className="col s12 m12" id="jadwal-content">
        {loading.league ? (
          <Spinner />
        ) : (
          league.matches.map((match) => (
            <div key={match.id} className="col s12 m6 l6">
              <div className="card">
                <div className="card-content">
                  <div className="center-align">
                    <h5 className="center-align">
                      Matchday : {match.matchday}
                    </h5>
                    <div className="center-align">
                      Kick Off :{" "}
                      {new Date(match.utcDate).toLocaleDateString("id-ID")}
                    </div>

                    <h6 className="center-align text-bold">
                      {match.homeTeam.name}
                    </h6>
                    <h5 className="center-align text-bold">VS</h5>
                    <h6 className="center-align text-bold">
                      {match.awayTeam.name}
                    </h6>
                    <div className="center-align">
                      <Link
                        to={`match?id=${match.id}&flag=${Math.random()
                          .toString(36)
                          .substring(2)}`}
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
  );
}
