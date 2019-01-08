/* eslint-disable no-console */

import { register } from 'register-service-worker';

// if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}sw.js`, {
    registered () {
      console.log('Service worker has been registered.')
      navigator.serviceWorker.addEventListener('message', function(event){
        const data = typeof event === "object" ? event.data : {};
        switch (data.message) {
            case "update":
              console.log("There is an update of the extension. Please download.");
              break;
        }
      });
      navigator.serviceWorker.controller.postMessage({message: "check_for_update", domain: window.VAR_DOMAIN, version: window.VERSION});
    },
    updated () {
      navigator.serviceWorker.getRegistrations().then(function(registrations) {
        for(let registration of registrations) {
         registration.unregister()
       } })
      console.log('New content is available; please refresh.')
    },
    error () {
      console.log("ERROR");
    }
  });
// }
