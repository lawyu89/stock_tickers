import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { stockActions } from '../store/stocks'

export const TickerTradeDisplay = (props) => {
  const { tickerName } = props
  const dispatch = useDispatch()
  const stocks = useSelector((state) => state.stocks)
  const tickerData = stocks?.result ?? null

  useEffect(() => {
    if (tickerName) {
      const action = stockActions.fetchTickerData(tickerName)
      dispatch(action)
    }
  }, [tickerName])

  if (!tickerData ) return null

  return (
    <table id="ticker-trade-data">
      <thead>
         <tr>
           <th>Item</th>
           <th>Maximum</th>
           <th>Minimum</th>
           <th>Average</th>
         </tr>
      </thead>
      <tbody>
        <tr>
          <td>Price</td>
          <td>${tickerData.max_trade_price?.toFixed(2) ?? 0}</td>
          <td>${tickerData.min_trade_price?.toFixed(2) ?? 0}</td>
          <td>${tickerData.average_trade_price?.toFixed(2) ?? 0}</td>
        </tr>
        <tr>
          <td>Volume</td>
          <td>{tickerData.max_trade_volume ?? 0}</td>
          <td>{tickerData.min_trade_volume ?? 0}</td>
          <td>{tickerData.average_trade_volume ?? 0}</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  );
};
