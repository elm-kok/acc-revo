from db import db


class Answer(db.Model):
    __tablename__ = 'answers'

    id = db.Column(db.Integer, primary_key=True)
    qt_number = db.Column(db.String(80))
    date = db.Column(db.DateTime)
    cus_id = db.Column(db.Integer)
    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)
    path = db.Column(db.String(80))
    send_date = db.Column(db.DateTime)
    def __init__(self, qt_number,date,cus_id,created_at,updated_at,path,send_date):
        self.qt_number=qt_number
        self.date=date
        self.cus_id=cus_id
        self.created_at=created_at
        self.updated_at=updated_at
        self.path=path
        self.send_date=send_date
    def json(self):
        return {
            'id': self.id,
            'qt_number': self.qt_number,
            'date': self.date,
            'cus_id': self.cus_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'path': self.path,
            'send_date': self.send_date
        }

    @classmethod
    def find_by_id(cls, id):
        return cls.query.filter_by(name=id).first()

    @classmethod
    def find_all(cls):
        return cls.query.all()

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()