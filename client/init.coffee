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
