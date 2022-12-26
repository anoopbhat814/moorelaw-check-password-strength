from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def index():
   return render_template("home.html")

@app.route('/support', methods=('GET', 'POST'))
def support():
   return render_template("support.html")  
if __name__ == '__main__':
   app.run()