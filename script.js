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
          //console.log(this.result);
          var data = {'statuses': JSON.parse(this.result)};
          console.log(data);
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
