module.exports = function(RED) {

    var request = require('request');
    var j = request.jar();
    var request = request.defaults({jar:j});

    function YoulessNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;

        const loginPath = '/L?w=';
        const statusPath = '/a?f=j/';

        node.password = config.password;
        node.topic = config.topic;
        node.ipaddress = config.ipaddress;

        node.on('input', function(msg) {

            var statusUrl = "http://" + node.ipaddress + statusPath;
            var loginUrl = "http://" + node.ipaddress + loginPath + node.password; 
            if (!node.topic.endsWith("/")) {
                node.topic = node.topic + "/";
            }; 

            request({
                    uri: loginUrl,
                    method: 'GET',
                    json:true
                }, function () { 
                    request({
                        uri: statusUrl,
                        method: 'GET',
                        json:true
                    }, function (error, response, body) {

                        if (!error && response.statusCode === 200) {
                            //console.log(body) // Print the json response
                            var measurementTypes = [ "cnt", "pwr", "lvl", "dev", "det", "con", "sts", "cs0", "ps0", "raw" ];
                            var response = [];
                            measurementTypes.forEach( function(s) { 
                                msg = {};
                                msg.payload = body[s];
                                msg.topic = node.topic + s;
                                response.push(msg);
                            } );
                            node.send(response);
                        }
                        else if (response) {
                            if (response.statusCode === 403) {
                                node.error("Unauthorized request, did you set a (correct) password?");
                            }
                            else {
                                node.error("Request failed with status code: " + response.statusCode);
                            }
                        }
                        else {
                            node.error("Request error: " + error );
                        }
                    });
                });
        });
    }
    
    RED.nodes.registerType("youless",YoulessNode, {
        credentials: {
            password: {type:"password"}
        }
    });
    
}