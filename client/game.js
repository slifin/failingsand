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
	unSettle();
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
}

Template.sand.events({
	'mousedown canvas' : function (e) {
		coords = getCoords(e);
		if (e.button === left)
			leftClick(); 
		if(e.button === right)
			rightClick();

	}
});