import React from "react";
import ReactDOM from "react-dom";

import { databasePromise } from "./js/services/db";
import App from "./js/app";

const requestPermission = () => {
  if ("Notification" in window) {
    Notification.requestPermission().then((result) => {
      if (result === "denied") {
        console.log("Fitur notifikasi tidak diijinkan.");
        return;
      } else if (result === "default") {
        console.error("Pengguna menutup kotak dialog permintaan ijin.");
        return;
      }

      const urlBase64ToUint8Array = (base64String) => {
        const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
        const base64 = (base64String + padding)
          .replace(/-/g, "+")
          .replace(/_/g, "/");
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);
        for (let i = 0; i < rawData.length; ++i) {
          outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
      };

      navigator.serviceWorker.ready.then(() => {
        const vapidKey = {
          publicKey:
            "BIr2PZbn4qELf1uvwMCgYedpQe5sSP2ugV3N9QA3XQ21P_DsyTrERecx-hfQwSdWBgUR0uECy7kB2DrW4uLd3-M",
          privateKey: "J_eonEqTl9QTSEAyIAGagyzIyCzr-z7CiM5MUSksKVM",
        };
        if ("PushManager" in window) {
          navigator.serviceWorker.getRegistration().then((registration) => {
            registration.pushManager
              .subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(vapidKey.publicKey),
              })
              .then((subscribe) => {
                console.log(
                  "Berhasil melakukan subscribe dengan endpoint: ",
                  subscribe.endpoint
                );
                console.log(
                  "Berhasil melakukan subscribe dengan p256dh key: ",
                  btoa(
                    String.fromCharCode.apply(
                      null,
                      new Uint8Array(subscribe.getKey("p256dh"))
                    )
                  )
                );
                console.log(
                  "Berhasil melakukan subscribe dengan auth key: ",
                  btoa(
                    String.fromCharCode.apply(
                      null,
                      new Uint8Array(subscribe.getKey("auth"))
                    )
                  )
                );
              })
              .catch((e) => {
                console.error("Tidak dapat melakukan subscribe ", e.message);
              });
          });
        }
      });
    });
  }
};

if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("Service Worker teregistrasi: ", registration);
      })
      .catch((registrationError) => {
        console.log("Service Worker registrasi gagal: ", registrationError);
      })
      .finally(() => {
        requestPermission();
      });
  });
}

databasePromise();

ReactDOM.render(<App />, document.getElementById("app"));
