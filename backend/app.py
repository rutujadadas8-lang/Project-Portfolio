import os
import sqlite3
from datetime import datetime

from flask import Flask, jsonify, request
from flask_cors import CORS

try:
    import yfinance as yf
except ImportError:  # pragma: no cover - fallback for minimal environment
    yf = None

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, 'stockpulse.db')


def get_db_connection():
    connection = sqlite3.connect(DB_PATH)
    connection.row_factory = sqlite3.Row
    return connection


def init_db():
    connection = get_db_connection()
    connection.execute(
        '''
        CREATE TABLE IF NOT EXISTS prediction_history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ticker TEXT NOT NULL,
            horizon TEXT NOT NULL,
            model_name TEXT NOT NULL,
            target_price REAL NOT NULL,
            reference_price REAL NOT NULL,
            created_at TEXT NOT NULL
        )
        '''
    )
    connection.execute(
        '''
        CREATE TABLE IF NOT EXISTS watchlist (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ticker TEXT NOT NULL UNIQUE,
            user_email TEXT NOT NULL,
            created_at TEXT NOT NULL
        )
        '''
    )
    connection.commit()
    connection.close()


@app.get('/api/health')
def health():
    return jsonify({
        'status': 'ok',
        'timestamp': datetime.utcnow().isoformat() + 'Z',
        'data_source': 'yfinance' if yf is not None else 'demo-data'
    })


@app.get('/api/stock-summary')
def stock_summary():
    return jsonify({
        'selected_stock': 'AAPL',
        'price': 214.34,
        'daily_change': 2.46,
        'prediction': 221.4,
        'model_accuracy': 94.2,
        'market_status': 'Open',
        'last_updated': datetime.utcnow().strftime('%Y-%m-%d %H:%M UTC')
    })


@app.get('/api/stock/search')
def stock_search():
    query = (request.args.get('q') or '').strip().lower()
    symbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA', 'TSLA', 'RELIANCE.NS', 'TCS.NS', 'INFY.NS', '^NSEI']
    matches = []
    for symbol in symbols:
        if not query or query in symbol.lower() or query in (symbol.lower().replace('.ns', '').replace('^', '')):
            matches.append({
                'symbol': symbol,
                'company': 'Demo company' if symbol != 'RELIANCE.NS' else 'Reliance Industries',
                'exchange': 'NASDAQ' if '^' not in symbol and 'NS' not in symbol else 'NSE' if 'NS' in symbol else 'NSE',
                'price': 214.34 if symbol == 'AAPL' else 449.8 if symbol == 'MSFT' else 174.91 if symbol == 'GOOGL' else 182.9,
                'change': 2.46 if symbol == 'AAPL' else 1.12 if symbol == 'MSFT' else 0.95
            })
    return jsonify({'results': matches[:10]})


@app.get('/api/predictions')
def predictions():
    return jsonify({
        'ticker': 'AAPL',
        'horizon': '30 calendar days',
        'models': [
            {'name': 'Linear Regression', 'prediction': 214.8, 'accuracy': 82.3},
            {'name': 'Random Forest', 'prediction': 219.1, 'accuracy': 89.4},
            {'name': 'Gradient Boosting', 'prediction': 221.4, 'accuracy': 94.2}
        ],
        'warning': 'Predictions are experimental estimates and not guaranteed future prices.'
    })


@app.get('/api/watchlist')
def watchlist():
    return jsonify({
        'items': [
            {'symbol': 'AAPL', 'price': 214.34, 'change': 2.46},
            {'symbol': 'MSFT', 'price': 449.8, 'change': 1.12},
            {'symbol': 'NVDA', 'price': 128.7, 'change': 3.84},
            {'symbol': 'TSLA', 'price': 269.2, 'change': -1.1},
        ]
    })


@app.get('/api/portfolio')
def portfolio():
    return jsonify({
        'invested_amount': 30600,
        'market_value': 33240,
        'profit_loss': 2640,
        'allocation': [
            {'label': 'Technology', 'value': 46},
            {'label': 'Semiconductors', 'value': 31},
            {'label': 'IT Services', 'value': 23},
        ]
    })


@app.get('/api/news')
def market_news():
    return jsonify({
        'source': 'demo',
        'items': [
            {
                'source': 'Bloomberg',
                'title': 'AI chip demand lifts semiconductor leaders while analysts raise price targets.',
                'timestamp': '2 hours ago',
                'url': '#'
            },
            {
                'source': 'Reuters',
                'title': 'Rate-cut expectations and earnings momentum keep large-cap tech in focus.',
                'timestamp': '4 hours ago',
                'url': '#'
            }
        ]
    })


@app.post('/api/prediction-history')
def save_prediction_history():
    data = request.get_json(force=True, silent=True) or {}
    if not data:
        return jsonify({'error': 'No payload provided'}), 400
    connection = get_db_connection()
    connection.execute(
        'INSERT INTO prediction_history (ticker, horizon, model_name, target_price, reference_price, created_at) VALUES (?, ?, ?, ?, ?, ?)',
        (
            data.get('ticker', 'AAPL'),
            data.get('horizon', '30 calendar days'),
            data.get('model_name', 'Gradient Boosting'),
            float(data.get('target_price', 0)),
            float(data.get('reference_price', 0)),
            datetime.utcnow().isoformat(),
        )
    )
    connection.commit()
    connection.close()
    return jsonify({'status': 'saved'})


@app.get('/api/prediction-history')
def get_prediction_history():
    connection = get_db_connection()
    records = connection.execute(
        'SELECT * FROM prediction_history ORDER BY created_at DESC LIMIT 5'
    ).fetchall()
    connection.close()
    return jsonify({
        'records': [dict(row) for row in records]
    })


init_db()

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
