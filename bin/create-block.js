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
    blockName = blockName[0].slice(0, -2);

    if (!fs.existsSync("./" + blockName + "/")) {
      fs.mkdirSync("./" + blockName + "/");
    }

    if (!fs.existsSync("./" + blockName + "/build/")) {
      fs.mkdirSync("./" + blockName + "/build/");
    }

    copyFile("./build/block.build.js", "./" + blockName + "/build/");
    copyFile("./build/block.editor.build.css", "./" + blockName + "/build/");
    copyFile("./build/block.style.build.css", "./" + blockName + "/build/");
    copyFile("./mwm-bloque-base.php", "./" + blockName + "/");
    fs.rename(
      "./" + blockName + "/mwm-bloque-base.php",
      "./" + blockName + "/generador-" + blockName + ".php",
      err => {
        if (err) console.log("ERROR: " + err);
      }
    );
  });
};

// Execute the code
run();
