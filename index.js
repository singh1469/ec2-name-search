#!/usr/bin/env node
"use strict";

/**
 * Created by singh1469@gmail.com on 10-07-2014
 * Primary file for app
 * @type {exports}
 */

var program = require('commander');
var chalk = require('chalk');
var auth = require('./auth'); //custom module
var search = require('./search'); //custom module

program
    .version('0.0.1')
    .usage('<keywords>')
    .option('-k --key [value]', 'AWS Key [value]', '')
    .option('-s --secret [value]', 'AWS Secret [value]', '')
    .option('-r --region [value]', 'AWS Region [value]', 'eu-west-1')
    .option('-q --query [value]', 'Query [value]', '')
    .parse(process.argv);

if (program.query) {
    var aws_key = auth.getKey(program.key.value); //get aws key
    var aws_secret = auth.getSecret(program.secret.value); //get aws secret
    var aws_region = program.region.toLowerCase().trim();
    if (aws_key === '' || aws_secret === '') {
        console.log(chalk.red.bold('please add AWS_ACCESS_KEY | AWS_SECRET_KEY as environment variables to continue'));
    }
    //perform aws ec2 instance search
    search.instances(program.query, aws_region);
}
else {
    program.help();
}

//exit on ctl-c
process.on('', function () {
    console.log(chalk.green('use -h | --helper for help'));
    process.exit(0);
});

program.parse(process.argv);