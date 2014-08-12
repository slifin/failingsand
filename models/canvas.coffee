class canvas
	leftMouse: 0
	middleMouse: 1
	rightMouse: 2

	constructor: -> 
		viewport = $('canvas')[0]
		viewport.width = viewport.height = 500;
		@ctx = viewport.getContext '2d'
		$('body').on 'contextmenu', 'canvas',(e)->false
		new universe
	getCoords: (evt,viewport)->
		rect = viewport.getBoundingClientRect();
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top








if (Meteor.isClient)
	Meteor.startup ->
		@scene = new canvas
	