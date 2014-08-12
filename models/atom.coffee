class atom extends Model
	create: (x,y)->
		atoms.insert
			x: coords.x,
			y: coords.y,
			settled: 0
		

	remove:->

	clear:-> 





@atoms = new Meteor.Collection "atom", transform: (doc)-> new atom doc

