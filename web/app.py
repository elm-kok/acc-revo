from flask import Flask,jsonify,render_template
from sqlalchemy import create_engine
app = Flask(__name__)
uri= 'mysql://root:1234@localhost/quotation_accrevo';
engine = create_engine(uri);
result = engine.execute('SELECT * FROM answers')
print (result.fetchall())
@app.route('/')
def home():
    return render_template('index.html');
if __name__ == '__main__':
    app.run(port=5000,debug=True)