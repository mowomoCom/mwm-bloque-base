#!usr/env/bin node

//include the fs, path modules
const fs = require("fs");
const path = require("path");

//copy the $file to $dir2
const copyFile = (file, dir2) => {
  var f = path.basename(file);
  var source = fs.createReadStream(file);
  var dest = fs.createWriteStream(path.resolve(dir2, f));

  source.pipe(dest);
  source.on("end", function() {});
  source.on("error", function(err) {
    console.log(err);
  });
};

// Run all the code
const run = async () => {
  fs.readFile("./mwm-bloque-base.php", "utf8", function(err, contents) {
    let blockName = contents.split(" * @package ");
    blockName = blockName[1].split(" ");
    blockName = blockName[0].split("\n");
    blockName = blockName[0].split("\r");
    blockName = blockName[0];

    if (!fs.existsSync("./exports/" + blockName + "/")) {
      fs.mkdirSync("./exports/" + blockName + "/");
    }

    if (!fs.existsSync("./exports/" + blockName + "/build/")) {
      fs.mkdirSync("./exports/" + blockName + "/build/");
    }

    copyFile("./build/block.build.js", "./exports/" + blockName + "/build/");
    copyFile(
      "./build/block.editor.build.css",
      "./exports/" + blockName + "/build/"
    );
    copyFile(
      "./build/block.style.build.css",
      "./exports/" + blockName + "/build/"
    );
    copyFile("./mwm-bloque-base.php", "./exports/" + blockName + "/");
    fs.rename(
      "./exports/" + blockName + "/mwm-bloque-base.php",
      "./exports/" + blockName + "/generador-" + blockName + ".php",
      err => {
        if (err) console.log("ERROR: " + err);
      }
    );

    console.log("Exportación lista");
  });
};

// Execute the code
run();
