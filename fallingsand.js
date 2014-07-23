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

  });
}
