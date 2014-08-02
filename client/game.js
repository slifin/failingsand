function getCoords(evt){
	var rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
}
function unSettle(){
	atoms.find().forEach(function(row){
		atoms.update(row._id,{$set: {settled:0}});
	});	
}
function leftClick(){
	atoms.insert({
		x: coords.x,
		y: coords.y,
		settled: 0
	});
}
function rightClick(){
	point = atoms.find({
		x:{$gt:coords.x-pixel,$lt:coords.x+pixel},
		y:{$gt:coords.y-pixel,$lt:coords.y+pixel}
	});
	Meteor.call('removeAtoms'); 
}
drawUniverse = function(){
	Meteor.subscribe('atoms',function(){
		var cursor = atoms.find();
		cursor.map(function(row){
			ctx.fillRect(row.x,row.y,pixel,pixel);
		});
		cursor.observe({
			added:function(row){
				universe.insert(row);
			},
			removed:function(row){
				universe.remove(row._id);
			},
			changed:function(move,old){
				universe.update(old._id,move);
			}
		});
	});
};
var applyGravity = function applyGravity(){
	falling = universe.find({y:{$lt:490}, settled:0});
	falling.forEach(function(row){
		if (universe.find({ 
			x:{$gt:row.x-pixel,$lt:row.x+pixel},
			y:{$gt:row.y-1,$lt:row.y+pixel}
		}).count() === 1 ) //check space below current pixel
			if (row.y < 488) 
				universe.update(row._id,{$inc: {y:2}});
			else //settle things that hit the floor
				atoms.update(row._id,{$set: {settled:1,x:row.x,y:row.y}});
			else //settled on another atom
				atoms.update(row._id,{$set: {settled:1,x:row.x,y:row.y}});
		});
	requestAnimationFrame(applyGravity);
};
Meteor.startup(function(){
	Meteor.subscribe('atoms',function(){
		universe = new Meteor.Collection(null);
		existence = universe.find()
		existence.observe({
			added:function(row){
				ctx.fillRect(row.x,row.y,pixel,pixel);
			},
			removed:function(row){
				ctx.clearRect(row.x,row.y-1,pixel+2,pixel+2);
			},
			changed:function(next,prev){
				ctx.clearRect(prev.x,prev.y-1,pixel,pixel);
				ctx.fillRect(next.x,next.y,pixel,pixel);
			}
		});
		window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
		requestAnimationFrame(applyGravity);
	});
});  
Template.sand.events({
	'mousedown canvas' : function(e){
		coords = getCoords(e);
		if (e.button === left)
			leftClick(); 
		if(e.button === right)
			rightClick();
	}
});