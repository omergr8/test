import logo from './logo.svg';
import React, { useEffect } from 'react';
import './App.css';

function App() {

  useEffect(() => {
    const addListener = (element, event, callback) => {
      if (element.addEventListener) {
        element.addEventListener(event, callback, false);
      } else if (element.attachEvent) {
        element.attachEvent('on' + event, callback);
      }
    };

    const getCookie = (cookie_name) => {
      const name = cookie_name + '=';
      const decodedCookie = decodeURIComponent(document.cookie);
      const ca = decodedCookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length);
        }
      }
      return '';
    };

    const readCookieAndCreateObj = (cookie_name) => {
      let groups = '';
      let groupArr = [];
      let cookie = '';
      let groupObj = {};
      let elem = [];
      cookie = getCookie(cookie_name);
      console.log("test readCookieAndCreateObj", cookie, cookie_name)
      if (cookie && cookie !== '') {
        cookie = cookie.split('&');
      } else {
        return '';
      }
      for (let i = 0; i < cookie.length; i++) {
        if (/groups/gi.test(cookie[i])) {
          groups = cookie[i].split('=')[1].replace(/0_/g, '');
        }
      }
      groupArr = groups.split(',');
      for (let j = 0; j < groupArr.length; j++) {
        elem = groupArr[j].split(':');
        groupObj[elem[0]] = elem[1];
      }
      return groupObj;
    };

    const readDataAndSetConsentPref = (data, dt) => {
      window.utag.loader.ol = 0;
      window.utag.loader.INIT();
      const groupObj = readCookieAndCreateObj('OptanonConsent');
      console.log("test readdata", groupObj, window.utag)
    };

    addListener(window, 'consent.onetrust', readDataAndSetConsentPref);

    // Cleanup the event listener when the component unmounts
    return () => {
      // Assuming you need to remove the same event listener
      window.removeEventListener('consent.onetrust', readDataAndSetConsentPref);
    };
  }, []); 
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
