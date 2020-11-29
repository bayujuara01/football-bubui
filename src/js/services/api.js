import { data } from "jquery";

const api_base_url = "https://api.football-data.org/v2/";
const id_liga = 2021; // Liga Inggris
const endpoint_latest = `${api_base_url}teams/86/matches?status=FINISHED&limit=1`;
const endpoint_upcoming = `${api_base_url}teams/81/matches?status=SCHEDULED&limit=1`;
const endpoint_klasemen = `${api_base_url}competitions/${id_liga}/standings?standingType=TOTAL`;
const endpoint_jadwal_upcoming = `${api_base_url}competitions/${id_liga}/matches?status=SCHEDULED&limit=20`;
const endpoint_match = `${api_base_url}matches/`;
const endpoint_team = `${api_base_url}teams/`;
const endpoint_player = `${api_base_url}players/`;

const fetchApi = (url) =>
  fetch(url, {
    headers: {
      "X-Auth-Token": "671d21c32d664960b6958658638bb3e8",
    },
  });

function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}

const json = (response) => response.json();

const error = (error) => {
  console.log("Error : " + error);
};

export const getLatestMatch = () =>
  new Promise((resolve, reject) => {
    if ("caches" in window) {
      caches.match(endpoint_latest).then((response) => {
        if (response) {
          response.json().then((data) => {
            resolve(data);
          });
        }
      });
    }

    fetchApi(endpoint_latest)
      .then(status)
      .then(json)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const getUpcoming = () =>
  new Promise((resolve, reject) => {
    if ("caches" in window) {
      caches.match(endpoint_upcoming).then((response) => {
        if (response) {
          response.json().then((data) => {
            resolve(data);
          });
        }
      });
    }

    fetchApi(endpoint_upcoming)
      .then(status)
      .then(json)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const getKlasemen = () =>
  new Promise((resolve, reject) => {
    if ("caches" in window) {
      caches.match(endpoint_klasemen).then((response) => {
        if (response) {
          response.json().then((data) => {
            resolve(data);
          });
        }
      });
    }

    fetchApi(endpoint_klasemen)
      .then(status)
      .then(json)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const getMatchLeague = () =>
  new Promise(function (resolve, reject) {
    if ("caches" in window) {
      caches.match(endpoint_jadwal_upcoming).then((response) => {
        if (response) {
          response.json().then((data) => {
            resolve(data);
          });
        }
      });
    }

    fetchApi(endpoint_jadwal_upcoming)
      .then(status)
      .then(json)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const getDetailMatchById = (id) =>
  new Promise((resolve, reject) => {
    if ("caches" in window) {
      caches.match(endpoint_match + id).then(function (response) {
        if (response) {
          response.json().then((data) => {
            resolve(data);
          });
        }
      });
    }
    fetchApi(endpoint_match + id)
      .then(status)
      .then(json)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
