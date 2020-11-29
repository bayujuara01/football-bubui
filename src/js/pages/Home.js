import React, { useState, useEffect } from "react";
import { getLatestMatch, getUpcoming } from "../services/api";

import Spinner from "../components/Spinner";
import imgStadium from "../../images/stadium.jpg";

export default function Home() {
  const [loading, setLoading] = useState({
    matches: true,
    upcoming: true,
  });
  const [matches, setMatches] = useState([]);
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    getLatestMatch()
      .then((data) => {
        setMatches(...matches, data.matches);
        setLoading({ matches: false });
      })
      .catch((error) => {
        setLoading({ matches: false });
      });

    getUpcoming()
      .then((data) => {
        setUpcoming(...upcoming, data.matches);
        setLoading({ upcoming: false });
      })
      .catch((error) => {
        setLoading({ upcoming: false });
      });
  }, []);

  return (
    <div>
      <div className="row center-align">
        <div className="parallax-container">
          <div className="parallax">
            <img
              className="a-home-img"
              alt="stadium"
              src={imgStadium}
              height="120px"
            />
          </div>
          <div className="a-caption">
            <div className="container">
              <h4 className="text-bold">Selamat Datang</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="container center-align a-latest-result">
        <div className="container">
          <h5 className="text-bold">LATEST RESULT</h5>
        </div>
        <div className="col s12 m12" id="latest-content">
          {loading.matches ? (
            <Spinner />
          ) : (
            matches.map((match) => (
              <div key="{match.id">
                <ul className="a-score">
                  <li>{match.score.fullTime.homeTeam}</li>
                  <li>:</li>
                  <li>{match.score.fullTime.awayTeam}</li>
                </ul>
                <ul className="a-club-title">
                  <li className="text-bold">{match.homeTeam.name}</li>
                  <li>&nbsp;VS&nbsp;</li>
                  <li className="text-bold">{match.awayTeam.name}</li>
                </ul>
                <ul className="a-stadium">
                  <li>{match.competition.name}</li>
                </ul>
                <ul className="a-date">
                  <li className="text-bold">
                    {new Date(match.utcDate).toLocaleString("id-ID")}
                  </li>
                </ul>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="a-line a-mt-2"></div>

      <div className="container center-align a-latest-result a-mb-3">
        <div className="container">
          <h5 className="text-bold">UPCOMING MATCH</h5>
        </div>
        <div className="col s12 m12" id="upcoming-content">
          {loading.upcoming ? (
            <Spinner />
          ) : (
            upcoming.map((upcoming) => (
              <div key={upcoming}>
                <ul className="a-club-title">
                  <li className="text-bold">{upcoming.homeTeam.name}</li>
                  <li>&nbsp;VS&nbsp;</li>
                  <li className="text-bold">{upcoming.awayTeam.name}</li>
                </ul>
                <ul className="a-stadium">
                  <li>{upcoming.competition.name}</li>
                </ul>
                <ul className="a-date">
                  <li className="text-bold">
                    {new Date(upcoming.utcDate).toLocaleString("id-ID")}
                  </li>
                </ul>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
