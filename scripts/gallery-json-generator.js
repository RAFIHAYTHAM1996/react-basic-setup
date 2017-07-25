'use strict';
var fs = require('graceful-fs');
var path = require('path');
var ExifImage = require('exif').ExifImage;

const folder = './raw-assets/images/gallery/';
const saveFile = './static/json/gallery.json';

var output = "{\n";
var images = "\t\"images\": [\n";
var videos = "\t\"videos\": [\n";

var description = "";

function setDescription(desc){
  description = desc;
  console.log(description);
}

fs.readdir(folder, (err, files) => {
  if(err){
    output += "\t\"error\": \"" + err +"\"\n";
  }
  else if(files.length < 1){
    output += "\t\"warning\": \"No items available to display\"\n";
  }
  else{
    files.forEach(file => {

      var nameOnly = file.substr(0, file.indexOf("."));
      var extension = file.substr(file.indexOf(".") + 1, file.length - 1).toLowerCase();
      var jsonString = "\t\t{\n" +
                        "\t\t\t\"src\": \"" + file + "\",\n" +
                        "\t\t\t\"alt\": \"" + description + "\",\n" +
                        "\t\t\t\"fileFormat\": \"" + extension + "\"\n" +
                       "\t\t},\n";

       if(extension == "jpg" || extension == "jpeg" || extension == "png" || extension == "tiff" || extension == "bmp" ){
         images += jsonString;
       }
       else if(extension == "mp4" || extension == "webm" || extension == "mpeg" || extension == "ogg")
       {
         videos += jsonString;
       }
    });

    images += "\t],\n";
    videos += "\t]\n";
    output += images + videos;
  }

  output += "}";
  fs.writeFile(saveFile, output, function(err) {
      if(err) {
          return console.log("\x1b[31m Error creating Gallery JSON file: " + err);
      }
      console.log("\x1b[32m Gallery JSON was created successfully");
  });

})
