import os
import pandas as pd
from werkzeug.security import generate_password_hash, check_password_hash

CSV_FILE = 'users.csv'

def load_users():
    if not os.path.exists(CSV_FILE):
        return pd.DataFrame(columns=['name', 'email', 'password', 'is_logged_in'])
    try:
        return pd.read_csv(CSV_FILE)
    except pd.errors.EmptyDataError:
        return pd.DataFrame(columns=['name', 'email', 'password', 'is_logged_in'])

def save_users(df):
    df.to_csv(CSV_FILE, index=False)

def create_user(name, email, password):
    df = load_users()
    if email in df['email'].values:
        return False, 'Email already registered'

    hashed_password = generate_password_hash(password)
    new_user = {
        'name': name,
        'email': email,
        'password': hashed_password,
        'is_logged_in': False  # set False until login
    }

    df = pd.concat([df, pd.DataFrame([new_user])], ignore_index=True)
    save_users(df)
    return True, 'Signup successful'

def authenticate_user(email, password):
    df = load_users()
    user = df[df['email'] == email]

    if user.empty:
        return False, 'User not found'

    stored_password = user.iloc[0]['password']
    if not check_password_hash(stored_password, password):
        return False, 'Incorrect password'

    # Login successful; update flag
    df.loc[df['email'] == email, 'is_logged_in'] = True
    save_users(df)
    return True, 'Login successful'

def logout_user(email):
    df = load_users()
    if email not in df['email'].values:
        return False, 'Email not found'

    df.loc[df['email'] == email, 'is_logged_in'] = False
    save_users(df)
    return True, 'Logout successful'
