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
    .option('-k --key [value]', 'AWS Key [value]', 'value')
    .option('-s --secret [value]', 'AWS Secret [value]', 'value');
//.option('-q --query [value]','Query [value]','value');


program.command('query [value]')
    .description('search instances')
    .action(function (value) {
        var aws_key = auth.getKey(program.key); //get aws key
        var aws_secret = auth.getSecret(program.secret); //get aws secret
        var aws_region = 'eu-west-1'; //todo make this an option param
        if (aws_key === '' || aws_secret === '') {
            console.log(chalk.red.bold('please add AWS_ACCESS_KEY | AWS_SECRET_KEY as environment variables to continue'));
        }
        //perform aws ec2 instance search
        search.instances(value, aws_region);
    });

//exit on ctl-c
process.on('', function () {
    console.log(chalk.green('use -h | --helper for help'));
    process.exit(0);
});

program.parse(process.argv);