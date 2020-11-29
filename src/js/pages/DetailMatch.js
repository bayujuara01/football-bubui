import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { getDetailMatchById } from "../services/api";
import { FavoriteMatch } from "../services/db";
import Spinner from "../components/Spinner";

export default function DetailMatch() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const matchId = params.get("id");

  const [loading, setLoading] = useState({ match: true });
  const [matches, setMatches] = useState({
    id: 0,
    head2head: {
      awayTeam: {
        name: "",
        wins: 0,
        draws: 0,
        losses: 0,
      },
      homeTeam: {
        name: "",
        wins: 0,
        draws: 0,
        losses: 0,
      },
      numberOfMatches: 0,
      totalGoals: 26,
    },
    match: {
      matchday: 0,
      utcDate: "",
    },
  });
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    checkLocal(matchId);
  }, []);

  const setFavorit = () => {
    if (favorite) {
      FavoriteMatch.delete(matches.id);
      setFavorite(false);
    } else {
      FavoriteMatch.create(matches);
      setFavorite(true);
    }
  };

  const checkLocal = async (id) => {
    try {
      const data = await FavoriteMatch.check(id);
      if (data) {
        setMatches({
          id: data.match.id,
          head2head: data.head2head,
          match: data.match,
        });
        console.log("Data From Local");
        setFavorite(true);
      }
    } catch (err) {
      console.log(err);
      try {
        let matches = await getDetailMatchById(id);
        setMatches({
          id: matches.match.id,
          head2head: matches.head2head,
          match: matches.match,
        });
        console.log("Data From Server");
      } catch (err) {
        console.log(err);
      }
    } finally {
      setLoading({ match: false });
    }
  };

  return (
    <div className="container">
      <div className="row a-mt-3">
        <div className="card-content">
          <div className="center-align">
            <h5 className="text-bold a-mb-3">Detail Match</h5>
          </div>
        </div>
        <div className="card">
          <div className="card-content">
            <div className="center-align" id="a-preloader">
              {loading.match ? <Spinner /> : ""}
            </div>
            <h5 id="a-matchDay" className="center-align">
              Matchday : {matches.match.matchday}
            </h5>
            <div id="a-kickOff" className="center-align">
              Kick Off :{" "}
              {new Date(matches.match.utcDate).toLocaleString("id-ID")}
            </div>

            <div className="row" style={{ margin: "20px" }}>
              <div className="col s5 right-align truncate">
                <span
                  id="a-homeTeamName"
                  className="text-bold blue-grey-text text-darken-4"
                >
                  {matches.head2head.homeTeam.name}
                </span>
              </div>
              <div className="col s2 center-align">VS</div>
              <div className="col s5 left-align truncate">
                <span
                  id="a-awayTeamName"
                  className="text-bold blue-grey-text text-darken-4"
                >
                  {matches.head2head.awayTeam.name}
                </span>
              </div>
            </div>

            <div id="a-venue" className="center-align"></div>

            <div className="row center">
              <hr size="5px" />
              <h6 className="center-align">Head To Head </h6>
              <div className="center-align" id="a-numberOfMatches">
                Number Of Matches : {matches.head2head.numberOfMatches}
              </div>
              <div className="center-align" id="a-totalGoals">
                total Goals : {matches.head2head.totalGoals}
              </div>

              <div className="col s4 right-align">
                <span className="text-bold blue-grey-text text-darken-4">
                  {matches.head2head.awayTeam.wins}
                </span>
              </div>
              <div className="col s4">WINS</div>
              <div className="col s4 left-align">
                <span className="text-bold blue-grey-text text-darken-4">
                  {matches.head2head.homeTeam.wins}
                </span>
              </div>
              <div className="col s4 right-align">
                <span className="text-bold blue-grey-text text-darken-4">
                  {matches.head2head.awayTeam.draws}
                </span>
              </div>
              <div className="col s4">DRAWS</div>
              <div className="col s4 left-align">
                <span className="text-bold blue-grey-text text-darken-4">
                  {matches.head2head.homeTeam.draws}
                </span>
              </div>
              <div className="col s4 right-align">
                <span className="text-bold blue-grey-text text-darken-4">
                  {matches.head2head.awayTeam.losses}
                </span>
              </div>
              <div className="col s4">LOSSES</div>
              <div className="col s4 left-align">
                <span className="text-bold blue-grey-text text-darken-4">
                  {matches.head2head.homeTeam.losses}
                </span>
              </div>
            </div>
            <div className="row center">
              <a className="btn blue-grey darken-4">
                <i
                  id="iconFav"
                  className={favorite ? "fas fa-heart" : "far fa-heart"}
                  onClick={setFavorit}
                >
                  &nbsp; {favorite ? "Favorited" : "Tambah ke Favorit"}
                </i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
