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

#for the game landing page
teamA=[]
teamB=[]
player_no = 0

playersPosition = dict()
playerIndex = dict()
score = dict()
ball = dict()

def initialize():
    playersPosition[team_a] ={}
    playersPosition[team_b] = {}
    score[team_a] = 0
    score[team_b] = 0
    ball["x"] = 0
    ball["y"] = 0
    ball["vx"] = 0
    ball["vy"] = 0

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

@socketio.on('updateBall')
def updateBall(ballJson):
    for key, val in ballJson.items():
        ball[key] = val
    socketio.emit('syncBall', (ball['x'], ball['y'], ball['vx'], ball['vy']))

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


#for the game landing page
@app.route("/newplayer/index.html")
def index():
	return render_template("index.html")

@app.route("/newplayer/")
def home():
	global player_no 
	global teamA
	global teamB
	player_no +=1
	player = request.args.get('player')
	room = request.args.get('room')
	if player_no%2 == 1:
		team = "teamA"
		teamA.append(player)
	else:
		team = "teamB"
		teamB.append(player)

	data = {
		'player':player,
		'team':team,
		'player_no':player_no,
		'room': room,
		'teamA': teamA,
		'teamB':teamB
	}
	return render_template("indexholder.html",data=data)

if __name__ == '__main__':
    initialize()
    socketio.run(app)
