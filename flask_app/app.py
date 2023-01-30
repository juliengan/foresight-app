import csv
import io
import os
from subprocess import PIPE, Popen
import subprocess
import psycopg2
from distutils.log import debug
from fileinput import filename
from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import pandas as pd
from werkzeug.utils import secure_filename

app = Flask(__name__)


app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:oui@localhost:5432/flask_db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db = SQLAlchemy(app)
migrate = Migrate(app, db)

ALLOWED_EXTENSIONS = {'csv'}


class Data(db.Model):
    __tablename__ = 'data'

    id = db.Column(db.TIMESTAMP(), primary_key=True)
    Bearing1 = db.Column(db.Float())
    Bearing2 = db.Column(db.Float())
    Bearing3 = db.Column(db.Float())
    Bearing4 = db.Column(db.Float())

    def __init__(self, id, Bearing1, Bearing2, Bearing3, Bearing4):
        self.id = id
        self.Bearing1 = Bearing1
        self.Bearing2 = Bearing2
        self.Bearing3 = Bearing3
        self.Bearing4 = Bearing4

    def __repr__(self):
        return f"<Car {self.name}>"



def get_db_connection():
    conn = psycopg2.connect(host='localhost',
                            database='flask_db',
                            user="postgres",
                            password="oui")
    return conn

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def index():  
    return render_template("index.html") 

@app.route('/success', methods = ['POST'])  
def success():  
    if request.method == 'POST':
        f = request.files['file']
        if f and allowed_file(f.filename):
            filepath = os.path.join('../uploaded_data', f.filename)
            f.save(os.path.join('../uploaded_data', f.filename))
            #subprocess.run(["bash", "bash/migrate.sh"])
            with open(filepath) as file_obj:
                # Convert the data to a dictionary using the csv module
                data = csv.DictReader(file_obj)
                print(data)
                # Iterate over the rows of the CSV file and create a new car for each row
                for row in data:
                    existing_data = Data.query.filter_by(id=row['id']).first()
                    if existing_data:
                        existing_data.Bearing1 = row['Bearing 1']
                        existing_data.Bearing2 = row['Bearing 2']
                        existing_data.Bearing3 = row['Bearing 3']
                        existing_data.Bearing4 = row['Bearing 4']
                    else:
                        new_data = Data(id=row['id'], Bearing1=row['Bearing 1'], Bearing2=row['Bearing 2'], Bearing3=row['Bearing 3'], Bearing4=row['Bearing 4'])
                        db.session.add(new_data)
                db.session.commit()
            return {"message": "Oui youpi."}
        else: 
            return {"error": "Not a CSV file"}
        
  
if __name__ == '__main__':  
    app.run(debug=True)

