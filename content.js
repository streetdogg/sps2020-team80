//rG0ybd LCXT6 is the calss of the white tab at the bottom of the meet screen
var is_on = false;
var player_no=0;
chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {
	if(message=="hello"){
		let if_exists = document.getElementsByClassName("f0WtFf");
		if(if_exists.length!=0 && is_on==false){
			var button_bar=if_exists[0];
			console.log("inside-meeting");
			var btn = document.createElement("button");
			btn.innerHTML = "Pong!";
			btn.onclick = function(){
				gameArea();
			};
			button_bar.insertBefore(btn,button_bar.childNodes[0]);
			is_on=true;
		}
		else{
			console.log("outside-meeting");
			var self = document.getElementsByClassName("cS7aqe NkoVdd")[0];
			console.log(self)
			console.log(""+self);
		}
	}
}

function gameArea(){	
	player_no ++;
	
	let url = 'http://127.0.0.1:5000/addplayer/?player=';

	//get the player name and add to the url
	var self = document.getElementById("_ij").text;
	var name = "";
	for (let i = self.length-1; i>=0; i--){
		if (self[i]=='@'){
			while(self[i-1]!="'"){
				i--;
				name = self[i] + name;
			}
		}
	}
	url = url + name;
	
	//get meeting room and add to the url
	let room = "" + location;
	room = room.slice(24);
	var n = room.indexOf("?");
 	if(n!=-1){
 		room=room.slice(0,n);
 	}
 	url = url + "&room=" + room;
	window.open(url, '_blank');
}


//function to add a canvas somewhere in the meet screen
function paintGame(){
	let canv = document.createElement("div");
	canv.style.color="#000000";
	canv.style.height="200px";
	canv.style.weidth="200px";
	canv.id="new";
	console.log("new window");

	let par = document.getElementsByClassName("crqnQb")[0];
	console.log(par);
	par.insertBefore(canv,par.childNodes[3]);
}