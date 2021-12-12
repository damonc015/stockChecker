import React, {useState, useEffect, createContext} from "react";
import Setup from "./Components";
import SetupBody from "./ComponentsBody";
import Login from "./Login";


export const Night = createContext();

function App() {
  // Collapse Menu State
  const [menu, setMenu] = useState(true);
  // Night Mode State
  const [day, setDay] = useState(true);
  const isNight = day?"dayMode":"nightMode";
  const isNightContainer = `container ${isNight}`
  // Search State
  const [search,setSearch] = useState("")
  // Filtered Search 
  const [stockNames, setStockNames] = useState([]);
  // Info
  const [info, setInfo] = useState(false);
  // Samp Settings
  const [sampSettings, setSampSettings] = useState(false);
  // Settings
  const [settings, setSettings] = useState([]);
  
  const clear = ()=>{
    if(search){
    setStockNames([]);
    }
    if(sampSettings){
      setSampSettings(false);
    }
    if(settings.includes(true)){
      setSettings([...settings].fill(false))
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <Night.Provider
      value={{
        day,
        setDay,
        menu,
        setMenu,
        search,
        setSearch,
        stockNames,
        setStockNames,
        info,
        setInfo,
        sampSettings,
        setSampSettings,
        settings,
        setSettings
      }}
    >
      <Login></Login>
      <div className={isNightContainer} onClick={clear}>
        <Setup></Setup>
        <SetupBody></SetupBody>
      </div>
      <div className="footer" style={day?null:{backgroundColor:"#49576a"}}></div>
    </Night.Provider>
  );
}

export default App;
