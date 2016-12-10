var fs = require("fs"),
    path = require("path");

module.exports = function(id) {
	try {
    var jsonFilename =  path.join(__dirname, '..', 'journeys', (id + ".json")),
				contents = fs.readFileSync(jsonFilename),
				jsonContent = JSON.parse(contents);

				return jsonContent;
  } catch(e) {
    return '';
  }
};
