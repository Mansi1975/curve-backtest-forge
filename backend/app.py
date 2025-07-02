from flask import Flask, request, jsonify
from flask_cors import CORS
from utils import create_user, authenticate_user, logout_user
from email.mime.text import MIMEText
from email_utils import send_email
import smtplib
import pandas as pd
import os
from flask import send_file

from backtester.soq_backtester.backtester import Backtester
from strategy import Strategy

app = Flask(__name__)
CORS(app)

YOUR_EMAIL = "anujyadav@iitb.ac.in"
YOUR_PASSWORD = "ybkocnedpestscrb"  # Not your Gmail password – use App Password

@app.route('/', methods=['POST'])
def home():
    return jsonify({'message': 'Backend running'}), 200

# def contact():
#     # method: 'POST'
#     data = request.get_json()
#     name = data.get('name')
#     email = data.get('email')
#     subject = data.get('subject')
#     message = data.get('message')

#     if not name or not email or not subject or not message:
#         return jsonify({'success': False, 'message': 'All fields required'}), 400

#     try:
#         # Message to you
#         body_to_you = f"New message from {name} <{email}>:\n\nSubject: {subject}\n\nMessage:\n{message}"
#         msg_to_you = MIMEText(body_to_you)
#         msg_to_you['Subject'] = f"[Contact Form] {subject}"
#         msg_to_you['From'] = YOUR_EMAIL
#         msg_to_you['To'] = YOUR_EMAIL

#         # Confirmation message to user
#         body_to_user = f"Hi {name},\n\nThanks for contacting QuantEdge! We received your message and will get back to you shortly.\n\nYour message:\n{message}"
#         msg_to_user = MIMEText(body_to_user)
#         msg_to_user['Subject'] = "We received your message"
#         msg_to_user['From'] = YOUR_EMAIL
#         msg_to_user['To'] = email

#         # Send both
#         with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
#             server.login(YOUR_EMAIL, YOUR_PASSWORD)
#             server.sendmail(YOUR_EMAIL, [YOUR_EMAIL], msg_to_you.as_string())
#             server.sendmail(YOUR_EMAIL, [email], msg_to_user.as_string())

#         return jsonify({'success': True}), 200

#     except Exception as e:
#         print("Email error:", e)
#         return jsonify({'success': False, 'message': 'Email failed'}), 500

@app.route('/contact', methods=['POST'])
def contact():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    subject = data.get('subject')
    message = data.get('message')

    if not all([name, email, subject, message]):
        return jsonify({'success': False, 'message': 'All fields required'}), 400

    # Admin Email
    admin_msg = f"New message from {name} <{email}>:\n\nSubject: {subject}\n\nMessage:\n{message}"
    send_email("anujyadav@iitb.ac.in", f"QuantEdge Contact: {subject}", admin_msg)

    # Confirmation to user
    user_msg = f"Hi {name},\n\nThanks for contacting QuantEdge! We've received your message:\n\n{message}\n\nWe'll get back to you shortly.\n\n– QuantEdge Team"
    send_email(email, "Thanks for contacting QuantEdge", user_msg)

    return jsonify({'success': True, 'message': 'Message sent successfully'}), 200


@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if not name or not email or not password:
        return jsonify({'success': False, 'message': 'All fields are required'}), 400

    success, message = create_user(name, email, password)
    return jsonify({'success': success, 'message': message}), (200 if success else 409)

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'success': False, 'message': 'Email and password required'}), 400

    success, message = authenticate_user(email, password)
    return jsonify({'success': success, 'message': message}), (200 if success else 401)

@app.route('/logout', methods=['POST'])
def logout():
    data = request.get_json()
    email = data.get('email')

    success, message = logout_user(email)
    return jsonify({'success': success, 'message': message}), (200 if success else 400)


@app.route('/api/backtest', methods=['GET'])
def run_backtest():
    try:
        filepath = os.path.join(os.path.dirname(__file__), 'data', 'multi_level_ohlcv.csv')

        # Load only once
        data = pd.read_csv(filepath, header=[0, 1], index_col=0, parse_dates=True)
        
        # Slice the data as done in notebook
        data = data[4500:]
        tickers = data.columns.get_level_values(0).unique()[100:200]
        data = data.loc[:, data.columns.get_level_values(0).isin(tickers)]

        # Instantiate and run Backtester (assumes logic from notebook is encapsulated)
        initial_value = 200000.0
        bt = Backtester(data, initial_value)
        bt.run()
        portfolio = bt.vectorbt_run()

        # Return key results
        equity_curve = portfolio.value().reset_index()
        equity_curve.columns = ['date', 'portfolio_value']
        equity_curve['date'] = equity_curve['date'].astype(str)

        metrics = portfolio.stats().to_dict()
        weights = portfolio.weights.to_frame().reset_index()
        weights.columns = ['date'] + list(weights.columns[1:])
        weights['date'] = weights['date'].astype(str)

        return jsonify({
            'equity_curve': equity_curve.to_dict(orient='records'),
            'metrics': metrics,
            'weights': weights.to_dict(orient='records')
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route("/api/equity-curve")
def equity_curve():
    return send_file("data/frontend_data/equity_curve.csv")

@app.route("/api/drawdown")
def drawdown():
    return send_file("data/frontend_data/drawdown.csv")

@app.route("/api/returns")
def returns():
    return send_file("data/frontend_data/returns.csv")

@app.route("/api/portfolio-summary")
def get_portfolio_summary():
    file_path = os.path.join("backtester", "soq_backtester","portfolio.csv")
    return send_file(file_path, mimetype='text/csv')

if __name__ == '__main__':
    app.run(debug=True)
