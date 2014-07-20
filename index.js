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
    try {
        var aws_key = auth.getKey(program.key); //get aws key
        var aws_secret = auth.getSecret(program.secret); //get aws secret
        var aws_region = program.region.toLowerCase().trim();
        console.log('aws key is ' + aws_key);
        console.log('aws secret is ' + aws_secret);
        if (aws_key === '' || aws_secret === '') {
            console.log(chalk.red.bold('To continue, add [AWS_ACCESS_KEY_ID] [AWS_SECRET_ACCESS_KEY] as environment variables OR pass in using parameters'));
            process.exit(0);
        }
        //perform aws ec2 instance search
        search.instances(program.query, aws_key, aws_secret, aws_region);
    }
    catch (e) {
        console.log(chalk.red.bold(e.message));
        process.exit(1);
    }
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