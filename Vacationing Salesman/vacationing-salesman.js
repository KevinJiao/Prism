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

    console.log(calculateDistance(results[0], results[1]));
    distances = [];
    var currloc = results[0];
    for (var i = 1; i < results.length; i++){
      distances.push(calculateDistance(currloc, results[i]));
      currloc = results[i];
    }

    for (var i = 0; i < distances.length; i++){
      console.log(cities[i] + " -> " + cities[i+1] + ": " + distances[i].toString() + " miles");
    }
  });
}

function calculateDistance(loc1, loc2){
  //Haversine formula taken from wikipedia, Javascript implementation taken from StackOverflow
  deg2rad = function(deg) {
    return deg * (Math.PI/180)
  }

  var R = 3959; // Radius of the earth in mi
  var dLat = deg2rad(loc2.lat-loc1.lat);
  var dLon = deg2rad(loc2.lng-loc2.lng);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(loc1.lat)) * Math.cos(deg2rad(loc2.lat)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in mi
  return d;
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
