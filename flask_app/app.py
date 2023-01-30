import csv
import time
import io
import os
import random
from subprocess import PIPE, Popen
import subprocess
import time
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

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def index():  
    return render_template("index.html") 

@app.route('/success', methods=['POST'])  
def success():  
    if request.method == 'POST':
        f = request.files['file']
        if f and allowed_file(f.filename):
            filepath = os.path.join('../uploaded_data', f.filename)
            f.save(filepath)
            with open(filepath) as file_obj:
                metadata = db.metadata
                metadata.clear()
                data = csv.reader(file_obj)
                header = next(data)

                # Dynamically create a new SQLAlchemy model class

                table_name = f"{f.filename.rsplit('.', 1)[0]}_{str(int(time.time()))}"

                table_dict = {
                    "__tablename__": table_name,
                }
                table_dict.update({col: db.Column(db.String(50), primary_key=True) for col in header})

                model_class = type("Data", (db.Model,), table_dict)
                # Clear the session's state
                db.session.remove()

                # Create the table
                model_class.__table__.drop(db.engine, checkfirst=True)
                model_class.__table__.create(db.engine)

                # Create instances of the new model class and add them to the database session
                for row in data:
                    instance = model_class(**dict(zip(header, row)))
                    db.session.add(instance)
                db.session.commit()
            return {"message": "Oui youpi."}
        else: 
            return {"error": "Not a CSV file"}

if __name__ == '__main__':  
    app.run(debug=True)
