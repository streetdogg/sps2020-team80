from flask import Flask, jsonify, request, render_template
from flask_socketio import SocketIO, emit
from engineio.payload import Payload
import json

Payload.max_decode_packets = 500
app = Flask(__name__)
socketio = SocketIO(app, async_mode='eventlet')

@socketio.on( 'game start' )
def newLogging(data):
  print( data['msg'] )

@app.route('/')
def home():
    return render_template('index.html')

if __name__ == '__main__':
    socketio.run(app)
