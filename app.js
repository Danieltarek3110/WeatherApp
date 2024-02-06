//Importing packages
const request = require('postman-request');
const chalk = require('chalk');
const express = require('express');

//
const url = 'http://api.weatherapi.com/v1/current.json?key=83ea0460bee84aae82c224123240602&q=London';
request({url: url} , (error , response)=>{
    console.log(response);
});