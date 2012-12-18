if (Meteor.isClient) {

  /*
  Template.init.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
*/
  $(document)
    .on('drop', '#receiver', function(e){
      e.stopPropagation();
      e.preventDefault();
      var files = e.originalEvent.dataTransfer.files;
      if ( files && files.length > 0 ) {
        var file = files[0];
        var reader = new FileReader();
        reader.onload = function(event) {
          var data = {'statuses': JSON.parse(this.result)};
          for ( var i = 0 ; i < data.statuses.length ; i++ ) {
            // parse tweet
            var temp = twttr.txt.autoLink(data.statuses[i].text);
            data.statuses[i].text = temp;
            // geo 
            if ( data.statuses[i].geo ) {
              data.statuses[i].geo.lat = data.statuses[i].geo.coordinates[0];
              data.statuses[i].geo.lng = data.statuses[i].geo.coordinates[1];
            }
          }
          var str = Template.timeline(data);
          $('#timeline').html(str);
        }
        reader.readAsText(file);
      }
    });
  /*
    .on('dragover', '#receiver', function(e){
      e.stopPropagation();
      e.preventDefault();

      console.log('dragover: '+e.dataTransfer);
      return false;
    })
    .on('dragenter', '#receiver', function(e){
      e.stopPropagation();
      e.preventDefault();

      console.log('dragenter: '+e.dataTransfer);
      return false;
    });
  */
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
