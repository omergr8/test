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

    const readDataAndSetConsentPref = (data, dt) => {
      console.log("i am read data first", data.detail,data, dt, window)

      // if (window.utag.gdpr.getSelectedCategories().length) {
      //   console.log("i am read data first if")
      //   window.utag.view(window.utag.data);
      // }
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
