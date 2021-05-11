var mqtt = require('mqtt'), url = require('url');
// Parse
/*var mqtt_url = url.parse(process.env.CLOUDAMQP_MQTT_URL || 'mqtt://localhost:1883');
var auth = (mqtt_url.auth || ':').split(':');
var url = "mqtt://" + mqtt_url.host;

//username: auth[0] + ":" + auth[0] if you are on a shared instance
var options = {
  port: mqtt_url.port,
  clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
  username: auth[0],
  password: auth[1],
};*/

var options = {
  clean: true, // retain session
  connectTimeout: 4000, // Timeout period
  // Authentication information
  clientId: 'emqx_test',
  username: 'emqx_test',
  password: 'emqx_test',
}
const connectUrl = 'wss://broker.emqx.io:8084/mqtt'
const client = mqtt.connect(connectUrl, options)

// Create a client connection
//var client = mqtt.connect(url, options);
console.log("Cliente no conectado");

client.on('connect', function() { // When connected
    console.log("Cliente conectado");

  // subscribe to a topic
  client.subscribe('esp32/test', function() {
    // when a message arrives, do something with it
    client.on('message', function(topic, message, packet) {
      console.log("Received '" + message + "' on '" + topic + "'");
    });
  });

  // publish a message to a topic
  /*client.publish('hello/world', 'my message', function() {
    console.log("Message is published");
    client.end(); // Close the connection when published
  });*/
});
