import os
import psycopg2
from distutils.log import debug
from fileinput import filename
from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import pandas as pd

app = Flask(__name__)

def get_db_connection():
    conn = psycopg2.connect(host='localhost',
                            database='flask_db',
                            user="postgres",
                            password="oui")
    return conn

def parseCSV(filePath):
      # CVS Column Names
      col_names = ['id','Bearing 1','Bearing 2', 'Bearing 3', 'Bearing 4']
      # Use Pandas to parse the CSV file
      csvData = pd.read_csv(filePath, names=col_names)
      # Loop through the Rows
      for i,row in csvData.iterrows():
             print(i,row['id'],row['Bearing 1'],row['Bearing 2'],row['Bearing 3'],row['Bearing 4'])


@app.route('/')
def index():  
    return render_template("index.html") 

@app.route('/success', methods = ['POST'])  
def success():  
    if request.method == 'POST':
        f = request.files['file']
        filepath = os.path.join('uploaded_data', f.filename)
        f.save(os.path.join('uploaded_data', f.filename))  
        parseCSV(filepath)
        return render_template("sucess.html", name = f.filename)  
  
if __name__ == '__main__':  
    app.run(debug=True)



app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:oui@localhost:5432/flask_db"
db = SQLAlchemy(app)
migrate = Migrate(app, db)

class Data(db.Model):
    __tablename__ = 'data'

    id = db.Column(db.Date, primary_key=True)
    Bearing1 = db.Column(db.Float())
    Bearing2 = db.Column(db.Float())
    Bearing3 = db.Column(db.Float())
    Bearing4 = db.Column(db.Float())

    def __init__(self, Bearing1, Bearing2, Bearing3, Bearing4):
        self.Bearing1 = Bearing1
        self.Bearing2 = Bearing2
        self.Bearing3 = Bearing3
        self.Bearing4 = Bearing4

    def __repr__(self):
        return f"<Car {self.name}>"

