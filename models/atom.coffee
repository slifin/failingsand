class atom extends Model
	create: ->

	remove:->

	clear:-> 





@atoms = new Meteor.Collection "atom", transform: (doc)-> new atom doc

