function getCoords(evt){
	var rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
}

function unSettle(){
	atom.find().forEach(function(row){
		atom.update(row._id,{$set: {settled:0}});
	});	
}

function leftClick(){
	atom.insert({
		x: coords.x,
		y: coords.y,
		hp: 1,
		type: 0,
		settled: 0
	});
}




function rightClick(){
	point = atom.find({
		x:{$gt:coords.x-pixel,$lt:coords.x+pixel},
		y:{$gt:coords.y-pixel,$lt:coords.y+pixel}
	});
	point.forEach(function(row){
		atom.remove(row._id); 
	});
}

drawUniverse = function(){
	Meteor.subscribe('atoms',function(){
		var cursor = atom.find();

		cursor.map(function(row){
			ctx.fillRect(row.x,row.y,pixel,pixel);
		});
		cursor.observe({
			added:function(row){
				ctx.fillRect(row.x,row.y,pixel,pixel);
			},
			removed:function(row){
				ctx.clearRect(row.x,row.y,pixel,pixel);
			},
			changed:function(move,old){
				ctx.clearRect(old.x,old.y,pixel,pixel);
				ctx.fillRect(move.x,move.y,pixel,pixel);
			}
		});
	});
};

var applyGravity = function applyGravity(){
	falling = atom.find({y:{$lt:490}});
	falling.forEach(function(row){
		if (atom.find({
			x:{$gt:row.x-pixel,$lt:row.x+pixel},
			y:{$gt:row.y-1,$lt:row.y+pixel}
		}).count() ===1)
			atom.update(row._id,{$inc:{'y':1}});
			else
				atom.update(row._id,{$set: {settled:1}});
		});
	requestAnimationFrame(applyGravity);
};
Meteor.startup(function(){
	window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	requestAnimationFrame(applyGravity);
});  

Template.sand.events({
	'mousedown canvas' : function (e) {
		coords = getCoords(e);
		if (e.button === left)
			leftClick(); 
		if(e.button === right)
			rightClick();

	}
});