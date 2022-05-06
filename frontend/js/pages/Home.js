import React, { useState } from 'react'
import { TickerTradeDisplay } from './TickerTradeDisplay'

const Home = () => {
  const [inputText, setInputText] = useState('')
  const [searchText, setSearchText] = useState('')
  const [missingTicker, setMissingTicker] = useState(false)

  const onChange = (event) => {
    setMissingTicker(false)
    setInputText(event.target.value.toUpperCase())
  };
  const setTickerSearch = () => {
    if (inputText.replace(/\s/g, '') === "") {
      setMissingTicker(true)
    } else {
      setSearchText(inputText)
    }
  }

  return (
    <div className="container">
      <div id="ticker-search-bar">
        Enter a Stock Ticker
        <input name="ticker_name" value={inputText} onChange={onChange}/>
        <button onClick={setTickerSearch}>Search</button>
        {
          missingTicker ? <div className="error-message">Ticker name required!</div> : null
        }
      </div>
      <TickerTradeDisplay tickerName={searchText} />
    </div>
  );
};

export default Home;
