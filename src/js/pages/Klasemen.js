import React, { useState, useEffect } from "react";
import { getKlasemen } from "../services/api";
import Spinner from "../components/Spinner";

export default function Klasemen() {
  const [loading, setLoading] = useState({ klasemen: true });
  const [klasemen, setKlasemen] = useState({
    competition: {},
    standings: [
      {
        table: [],
      },
    ],
  });

  useEffect(() => {
    getKlasemen()
      .then((data) => {
        setKlasemen(data);
        setLoading({ klasemen: false });
      })
      .catch((error) => {
        console.log(error);
        setLoading({ klasemen: false });
      });
  }, []);
  return (
    <div className="row container center-align">
      <div className="container">
        <h4 className="text-bold">{klasemen.competition.name}</h4>
        <h6 className="text-bold">Competition Standings</h6>
      </div>
      <div className="col s12 m12" id="klasemen-content">
        {console.log(klasemen)}
        {loading.klasemen ? (
          <Spinner />
        ) : (
          klasemen.standings.map((standing, index) => (
            <div className="card" key={index}>
              <div className="card-content">
                <h6 className="text-bold a-mb-2">
                  Last Updated:{" "}
                  {new Date(
                    klasemen.competition.lastUpdated
                  ).toLocaleDateString("id-ID")}
                </h6>
                <table className="responsive-table striped ">
                  <thead>
                    <tr>
                      <th className="center-align">Position</th>
                      <th>Team</th>
                      <th className="center-align">Played</th>
                      <th className="center-align">Won</th>
                      <th className="center-align">Draw</th>
                      <th className="center-align">Lost</th>
                      <th className="center-align">GF</th>
                      <th className="center-align">GA</th>
                      <th className="center-align">GD</th>
                      <th className="center-align">Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {standing.table.map((dataKlub) => (
                      <tr key={dataKlub.team.id}>
                        <td className="center-align">{dataKlub.position}</td>
                        <td className="center-align">
                          <div>
                            <p className="hide-on-small-only">
                              <img
                                className="show-on-medium-and-up show-on-medium-and-down a-img-club-klasemen"
                                src={dataKlub.team.crestUrl}
                                alt="Logo {dataKlub.team.name}"
                              />
                              <span className="text-bold">
                                {dataKlub.team.name}
                              </span>
                            </p>
                            <p className="hide-on-med-and-up">
                              <img
                                src={dataKlub.team.crestUrl}
                                alt="Logo {dataKlub.team.name}"
                                className="a-img-club-klasemen"
                              />
                            </p>
                          </div>
                        </td>
                        <td className="center-align">{dataKlub.playedGames}</td>
                        <td className="center-align">{dataKlub.won}</td>
                        <td className="center-align">{dataKlub.draw}</td>
                        <td className="center-align">{dataKlub.lost}</td>
                        <td className="center-align">{dataKlub.goalsFor}</td>
                        <td className="center-align">
                          {dataKlub.goalsAgainst}
                        </td>
                        <td className="center-align">
                          {dataKlub.goalDifference}
                        </td>
                        <td className="center-align">{dataKlub.points}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
