//github-update

//Get app root path. 
var path = require("path");
var rootPath = path.dirname(require.main.filename);

//Get the root app version.
var package = require(rootPath + "/package.json");

//The repository URL minus the protocol. 
var url = package.repository.url.replace(/https?:\/\//ig, "");
var urlParts = url.split("/");

var repo;

//Making sure repository is from GitHub.
if (urlParts[0] == "github.com")
{
	repo = urlParts[1] + "/" + urlParts[2];
}


console.log(repo);


var request = require("request");
var semver = require("semver");

//Get GitHub Releases for a new version of the app.
module.exports.check = function(callback)
{
    //Make a call to the GitHub Releases API.
	request("https://api.github.com/repos/octalmage/" + repo, function(error, response, body)
	{
        //Make sure API call was successful. 
		if (!error && response.statusCode == 200)
		{
            //Need to check for v, and remove it. Supports releases like "v1.2.3" and "1.2.3".
			var githubVersion = body[0].tag_name.substr(1, body[0].tag_name.length);
			console.log(githubVersion)
			console.log(semver.lt(package.version, githubVersion));
		}
	})

};