#!/usr/env node

var fs=require('fs');
var request = require('request');
var async = require('async');

process.stdin.setEncoding('utf8');
var cities = fs.readFileSync('/dev/stdin')
              .toString()
              .split("\n");

cities.pop(); //Last element of Cities is the empty string because of how split() works, so we pop it off

function calculateDistances(cities) {
  calculateLocations(cities, function(results){

    distances = [];
    var currloc = results[0];
    for (var i = 1; i < results.length; i++){
      distances.push(haversine(results[i], currloc));
      currloc = results[i];
    }

    for (var i = 0; i < distances.length; i++){
      console.log(cities[i] + " -> " + cities[i+1] + ": " + distances[i].toString() + " miles");
    }

    console.log("Total distance covered in your trip: " + distances.reduce(function(a, b){return a + b}).toString()  + "miles");
  });
}

function haversine(loc1, loc2) {
  //Haversine formula taken from wikipedia, Javascript implementation taken from RosettCode
       var coords = [loc1.lat, loc1.lng, loc2.lat, loc2.lng];
       var radians = coords.map(function(deg) { return deg/180.0 * Math.PI; });
       var lat1 = radians[0], lon1 = radians[1], lat2 = radians[2], lon2 = radians[3];
       var R = 3959; // Radius of earth in miles
       var dLat = lat2 - lat1;
       var dLon = lon2 - lon1;
       var a = Math.sin(dLat / 2) * Math.sin(dLat /2) + Math.sin(dLon / 2) * Math.sin(dLon /2) * Math.cos(lat1) * Math.cos(lat2);
       var c = 2 * Math.asin(Math.sqrt(a));
       return R * c;
}

function calculateLocations(cities, callback){
  async.map(cities, getLocation, function(err, results){
    callback(results);
  });
}


function getLocation(city, callback){
  var endpoint = "http://maps.googleapis.com/maps/api/geocode/json?address=";
  request(endpoint + city, function(err, response, body){
    rval = JSON.parse(body).results[0].geometry.location;
    callback(null, rval);
  });
}

calculateDistances(cities);
