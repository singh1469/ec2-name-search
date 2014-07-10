#!/usr/bin/env node
"use strict";
var program = require('commander');
var chalk = require('chalk');
var AWS = require('aws-sdk');

program
    .version('0.0.1')
    .usage('<keywords>')
    .option('-k --key [value]', 'AWS Key [value]', 'value')
    .option('-s --secret [value]', 'AWS Secret [value]', 'value');
//.option('-q --query [value]','Query [value]','value');


program.command('query [value]')
    .description('search instances')
    .action(function (value) {
        var aws_key = getKey();
        var aws_secret = getSecret();
        var aws_region = 'eu-west-1'; //todo make this an option param
        if (aws_key === '' || aws_secret == '') {
            console.log(chalk.red.bold('please add AWS_ACCESS_KEY | AWS_SECRET_KEY as environment variables to continue'));
        }
        //perform aws ec2 instance search
        console.log(chalk.yellow('Checking for "%s" amongst your EC2 instances...'), value);
        var params = {
            DryRun: false,
            Filters: [
                {
                    Name: 'instance-state-name',
                    Values: [
                        'running'
                    ]
                }
            ]
        };
        var ec2 = new AWS.EC2({region: aws_region, maxRetries: 2});
        ec2.describeInstances(params, function (err, data) {
            if (err) {
                console.log(err, err.stack);
                process.exit(1);
            }
            if (data.Reservations.length < 1) {
                console.log(chalk.red('Didn\t find any running instances beginning with %s', query));
                process.exit(1);
            }

            console.log(chalk.green('Found %s running instances:'), data.Reservations.length);
            //console.log(data);
            //filter results by query term
            var instance, instance_name;
            data.Reservations.forEach(function (el) {
                instance = el.Instances[0];
                instance_name = '*Blank*';
                //get instance name
                instance.Tags.forEach(function (v) {
                    if (v.Key === 'Name') {
                        instance_name = v.Value;
                        return false; //exit loop //todo check this works
                    }
                });

                if (isMatch(value, instance_name)) {
                    console.log(chalk.cyan(instance.PublicDnsName) + ' | ' + chalk.magenta(instance_name));
                }
            });
            process.exit(0);
        });

    });

//exit on ctl-c
process.on('', function () {
    console.log(chalk.green('use -h | --helper for help'));
    process.exit(0);
});

program.parse(process.argv);

/**
 * Check if needle exists in haystack
 * @param needle
 * @param haystack
 * @returns {boolean}
 */
function isMatch(needle, haystack) {
    var is_match = (haystack.indexOf(needle) === -1) ? false : true;
    return is_match;
}

/**
 * Get AWS Key
 * @returns {*}
 */
function getKey() {
    //attempt to get key from environment variable
    var aws_key = ('AWS_ACCESS_KEY' in process.env) ? process.env['AWS_ACCESS_KEY'] : '';
    if (aws_key === '' && program.key) {
        //check if passed in as param
        aws_key = program.key;
    }
    return aws_key;
}

/**
 * Get AWS Secret
 * @returns {*}
 */
function getSecret() {
    //attempt to get secret from environment variable
    var aws_secret = ('AWS_SECRET_KEY' in process.env) ? process.env['AWS_SECRET_KEY'] : '';
    if (aws_secret === '' && program.secret) {
        //check if passed in as param
        aws_secret = program.secret;
    }
    return aws_secret;
}