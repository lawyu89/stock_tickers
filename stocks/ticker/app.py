import json
import requests
import sys

# Move TICKER_URL/API-Key to env var if this code was used staging/prod environments.
# see https://docs.aws.amazon.com/lambda/latest/dg/configuration-envvars.html
TICKER_URL = "https://api.polygon.io/v2/aggs/ticker/{0}/range/1/day/2020-01-01/2020-12-31?apiKey=taIMgMrmnZ8SUZmdpq9_7ANRDxw3IPIx"


def handler(event, _context):
    ticker_name = event.get('pathParameters', {}).get('tickerName', None)
    return {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "http://localhost:8000",
            "Access-Control-Allow-Methods": "GET"
        },
        "body": json.dumps(get_ticker_data(ticker_name)),
    }


def get_ticker_data(ticker_name):
    response = requests.get(TICKER_URL.format(ticker_name))
    if response.status_code == 200:
        data = json.loads(response.text)
        total_trades = data['resultsCount']
        trades = data.get('results')
        if total_trades > 0:
            result = {
                'min_trade_price': sys.maxsize,
                'min_trade_volume': sys.maxsize,
                'max_trade_price': 0,
                'max_trade_volume': 0,
                'average_trade_price': 0,
                'average_trade_volume': 0
            }
            total_trade_volume = 0
            total_average_trade_price = 0
            for trade in trades:
                result['min_trade_price'] = min(result.get('min_trade_price'), trade.get('l'))
                result['min_trade_volume'] = min(result.get('min_trade_volume'), trade.get('v'))
                result['max_trade_price'] = max(result.get('max_trade_price'), trade.get('h'))
                result['max_trade_volume'] = max(result.get('max_trade_volume'), trade.get('v'))
                total_trade_volume += trade.get('v')
                # since we're dealing with money/floats, convert to price cents and convert back to
                # dollars to avoid precision errors
                total_average_trade_price += trade.get('vw') * 100
            result['average_trade_price'] = round(total_average_trade_price/total_trades/100, 2)
            result['average_trade_volume'] = round(total_trade_volume/total_trades)
            result['min_trade_price'] = round(result['min_trade_price'], 2)
            result['max_trade_price'] = round(result['max_trade_price'], 2)
            return result
        return {}