from flask import Flask, jsonify, request, render_template
from flask_socketio import SocketIO, emit
from engineio.payload import Payload
import json

Payload.max_decode_packets = 500
app = Flask(__name__)
socketio = SocketIO(app, async_mode='eventlet')

team_a = "A"
team_b = "B"
totalPlayer = 0

playersPosition = dict()
playerIndex = dict()
playersPosition[team_a] ={}
playersPosition[team_b] = {}

score = dict()
score[team_a] = 0
score[team_b] = 0

def initPlayer(playerName):
    print('new player '+ playerName+' initiating...')
    global totalPlayer
    currentTeam = team_a
    if(totalPlayer%2):
        currentTeam = team_b
    
    emit('connectedPlayers', ("A",json.dumps(playersPosition[team_a]), playerName, currentTeam), room=request.sid )
    emit('connectedPlayers', ("B", json.dumps(playersPosition[team_b]), playerName, currentTeam), room=request.sid)

    playerIndex[playerName]=totalPlayer//2

    if totalPlayer%2 == 0:
        playersPosition[team_a][playerName] =0
        socketio.emit('addToTeam',("A", playerName))
    else:
        playersPosition[team_b][playerName] =0
        socketio.emit('addToTeam', ("B",playerName))
    
    emit('updateScore', (score[team_a], score[team_b]), room=request.sid)
    totalPlayer+=1

@socketio.on('scoreChange')
def scoreChanged(scoreJson):
    score[team_a] = scoreJson[team_a]
    score[team_b] = scoreJson[team_b]
    socketio.emit('updateScore', (score[team_a], score[team_b]))

@socketio.on( 'move' )
def moveThePlayer(moveJson):
    playerName = moveJson['name']
    position = moveJson['position']
    clientTeam = moveJson['team']
    playersPosition[str(clientTeam)][playerName] = position
    socketio.emit('movePlayer', (clientTeam, playerIndex[playerName], position))

@socketio.on('addPlayer')
def addPlayer(playerJson):
    player = playerJson['name']
    print('new player joined with name: ' + player)
    initPlayer(player)

@socketio.on( 'game start' )
def newLogging(data):
  print( data['msg'] )

@app.route('/')
def home():
    return render_template('index.html')

if __name__ == '__main__':
    socketio.run(app)
