from flask import Flask, render_template, request, redirect, url_for
import sqlite3

app = Flask(__name__)

# Create database and table
def init_db():
    conn = sqlite3.connect('rsvp.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS guests (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            message TEXT
        )
    ''')
    conn.commit()
    conn.close()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/location')
def location():
    return render_template('location.html')

@app.route('/qa')
def qa():
    return render_template('qa.html')

@app.route('/contact-us')
def contact_us():
    return render_template('contact-us.html')

@app.route('/rsvp', methods=['POST'])
def rsvp():
    name = request.form.get('name')
    email = request.form.get('email')
    message = request.form.get('message', '')

    if not name or not email:
        return "Name and email are required.", 400

    conn = None
    try:
        conn = sqlite3.connect('rsvp.db')
        cursor = conn.cursor()
        cursor.execute('INSERT INTO guests (name, email, message) VALUES (?, ?, ?)', (name, email, message))
        conn.commit()
    except sqlite3.Error as e:
        print(f"Database error: {e}")
        return "An error occurred while processing your RSVP.", 500
    finally:
        if conn:
            conn.close()

    return redirect(url_for('thank_you'))

@app.route('/thank-you')
def thank_you():
    return render_template('thank_you.html')

if __name__ == '__main__':
    init_db()
    app.run(debug=True)