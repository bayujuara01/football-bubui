import { openDB } from "idb";

export const databasePromise = () => {
  console.log("Creating Database");
  const dbPromise = openDB("db_footballpwa_react", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("match_favorite")) {
        const indexFavMatch = db.createObjectStore("match_favorite", {
          keyPath: "id",
        });
        indexFavMatch.createIndex("homeTeam", "match.homeTeam.name", {
          unique: false,
        });
        indexFavMatch.createIndex("awayTeam", "match.awayTeam.name", {
          unique: false,
        });
      }
    },
  });
  return dbPromise;
};

export const FavoriteMatch = {
  STORE_NAME: "match_favorite",
  check: function (id) {
    return new Promise((resolve, reject) => {
      databasePromise()
        .then((db) => {
          return db.get(this.STORE_NAME, parseInt(id));
        })
        .then((data) => {
          if (data) {
            resolve(data);
          } else {
            reject(false);
          }
        });
    });
  },
  create: function (data) {
    return databasePromise().then((db) => {
      const tx = db.transaction(this.STORE_NAME, "readwrite");
      tx.objectStore(this.STORE_NAME).put(data);
      console.log("Team berhasil disimpan.");
    });
  },
  delete: function (id) {
    return databasePromise().then((db) => {
      const tx = db.transaction(this.STORE_NAME, "readwrite");
      tx.objectStore(this.STORE_NAME).delete(id);
      console.log("Team berhasil dihapus.");
    });
  },
  getAll: function () {
    return databasePromise().then((db) => db.getAll(this.STORE_NAME));
  },
};
