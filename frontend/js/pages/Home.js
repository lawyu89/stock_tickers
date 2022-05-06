import React, { useState } from 'react'
import { TickerTradeDisplay } from './TickerTradeDisplay'

const Home = () => {
  const [inputText, setInputText] = useState('')
  const [searchText, setSearchText] = useState('')

  const onChange = (event) => {
    setInputText(event.target.value)
  };
  const setTickerSearch = () => {
    setSearchText(inputText)
  }

  return (
    <div className="container">
      <div id="ticker-search-bar">
        Enter a Stock Ticker
        <input name="ticker_name" value={inputText} onChange={onChange}/>
        <button onClick={setTickerSearch}>Search</button>
      </div>
      <TickerTradeDisplay tickerName={searchText} />
    </div>
  );
};

export default Home;
