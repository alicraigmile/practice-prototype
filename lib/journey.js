var fs = require("fs"),
    path = require("path");

module.exports = function(id) {
    var jsonFilename =  path.join(__dirname, '..', (id + ".json")),
				contents = fs.readFileSync(jsonFilename),
				jsonContent = JSON.parse(contents);

				return jsonContent;
};
