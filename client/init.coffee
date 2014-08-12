Meteor.startup ->
	@pixel = 10
	@canvas = $('canvas')[0];   
	canvas.width = 500    
	canvas.height = 500  
	@ctx = canvas.getContext '2d'   
	@left =  0
	@right = 2  
	$('body').on 'contextmenu', 'canvas', (e) ->  false    
	drawUniverse();

Template.sand.events
	'mousedown canvas' : (e)->
		console.log scene.getCoords(e, viewport)
		# coords = getCoords(e);
		# if (e.button === left)
			# leftClick(); 
		# if(e.button === right)
			# rightClick();
