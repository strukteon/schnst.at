const pug = require('pug');
const data = require("../../data.json");
const fs = require("fs");

// Compile the source code
const compiledFunction = pug.compileFile(__dirname + '/index.pug');

for (let proj of data["projects"]) {
    if (proj["is_link"]) continue;
    
    if (!fs.existsSync(__dirname + `./${proj.path}`)){
        fs.mkdirSync(__dirname + `/${proj.path}`, { recursive: true });
    }

    let proj_data = {
        proj,
        devices: data["devices"],
        technologies: data["technologies"]
    }

    fs.writeFile(__dirname + `/${proj.path}/index.html`, compiledFunction(proj_data), console.log)
}