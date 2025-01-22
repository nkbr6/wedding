from flask import Flask, render_template

app = Flask(__name__)

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

if __name__ == '__main__':
    app.run(debug=True)