 atom = new Meteor.Collection('atom');
 pixel = 10;

 if (Meteor.isClient) {
  Meteor.startup(function () {
    canvas = $('canvas')[0];
    canvas.width = 500; 
    canvas.height = 500;
    ctx = canvas.getContext('2d');
    left =  0;
    right = 2;

    $('body').on('contextmenu', 'canvas', function(e){ return false; });
    drawUniverse();
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    Meteor.publish('atoms',function(){
      return atom.find();
    });

    Future = Npm.require('fibers/future');


    Meteor.setInterval(function(){
      falling = atom.find({y:{$lt:490},settled:0});

      falling.forEach(function(row){
        if (atom.find({
          x:{$gt:row.x-pixel,$lt:row.x+pixel},
          y:{$gt:row.y-1,$lt:row.y+pixel}
        }).count() ===1)
          atom.update(row._id,{$inc:{'y':1}});
          else
            atom.update(row._id,{$set: {settled:1}});
        });
    },100);
  });
}
