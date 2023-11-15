import React, { useEffect, useState } from "react";
import "./App.css";
import { cookieGroup } from "./utils/constant";

function App() {
  const [consentData, setConsentData] = useState([]);

  // Function to map cookie IDs to corresponding names
  const mapCookieIdsToNames = (cookieIds, cookieMapping) => {
    return cookieIds.map((id) => cookieMapping[id]).filter(Boolean);
  };

  // Function to perform actions based on accepted cookies
  const performActionsForCookies = (cookieIds) => {
    cookieIds.forEach((element) => {
      // Use a switch statement for better readability
      switch (element) {
        case "C0001":
        case "C0002":
        case "C0004":
          console.log(`Accepted ${cookieGroup[element]} cookies`);
          // Perform necessary actions based on the accepted cookie group
          // Add more cases as needed
          break;
        default:
          // Handle other cases if needed
          break;
      }
    });
  };

  // Callback function when user accepts cookies
  const readDataAndSetConsentPref = (data) => {
    // Check if OneTrust is available
    if (window.OneTrust) {
      // Perform actions for the accepted cookies
      performActionsForCookies(data.detail);
      // Update the state to showcase accepted cookies (if needed)
      setConsentData(data.detail);
    }
  };

  useEffect(() => {
    // Add event listener for OneTrust consent changes
    window.addEventListener("consent.onetrust", readDataAndSetConsentPref);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("consent.onetrust", readDataAndSetConsentPref);
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {/* Showcase the accepted cookies */}
        {consentData.length > 0 &&
          mapCookieIdsToNames(consentData, cookieGroup).map((el, i) => (
            <h1 key={i}>{el}</h1>
          ))}
      </header>
    </div>
  );
}

export default App;
