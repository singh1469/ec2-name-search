/**
 * Created by singh1469@gmail.com on 17-07-2014
 * Holds all authentication methods used within this application
 */

var AWS = require('aws-sdk');
var chalk = require('chalk');

/**
 * Attempt to get aws key as variable from the environment or as passed in using the passed in param
 * @param param_key command line param for aws key
 * @returns aws access key
 */
instances = function (queryString, awsKey, awsSecret, awsRegion) {
    if (typeof queryString !== 'string' || queryString.trim() === '') {
        throw new Error('queryString param must be a non-empty string');
    }
    if (typeof awsKey !== 'string' || awsKey.trim() === '') {
        throw new Error('awsKey param must be a non-empty string');
    }
    if (typeof awsSecret !== 'string' || awsSecret.trim() === '') {
        throw new Error('awsSecret param must be a non-empty string');
    }
    if (typeof awsRegion !== 'string' || awsRegion.trim() === '') {
        throw new Error('awsRegion param must be a non-empty string');
    }
    queryString = queryString.trim();
    awsKey = awsKey.trim();
    awsSecret = awsSecret.trim();
    awsRegion = awsRegion.trim();

    console.log(chalk.yellow('Checking for "%s" amongst your EC2 instances...'), queryString);
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
    /**
     * Hardcoding credentials this way isn't recomended..
     * ..I've gone this way so to allow users to pass credentials via the command-line incase they don't want to set
     * ..environment variables
     */
    AWS.config.update({accessKeyId: awsKey, secretAccessKey: awsSecret});
    var ec2 = new AWS.EC2({region: awsRegion, maxRetries: 2});
    ec2.describeInstances(params, function (err, data) {
        if (err) {
            console.log(err, err.stack);
            process.exit(1);
        }
        if (data.Reservations.length < 1) {
            console.log(chalk.red('Didn\'t find any running instances beginning with %s', queryString));
            process.exit(1);
        }

        console.log(chalk.green('Found %s running instances:'), data.Reservations.length);
        //filter results by query term
        var i = 0;
        var increment;
        data.Reservations.forEach(function (el) {
            increment = filter(el, queryString);
            i = i + increment;
        });
        console.log(chalk.green('%s matches.'), i);
        process.exit(0);
    });
};

/**
 * Check passed in variable contains name[key] which matches queryString
 * @param el
 * @param queryString term to match
 * @return int 1|0
 */
function filter(el, queryString) {
    //Make sure el is not null
    //check if el value is null first because null is of type object
    if (el === null || typeof el !== 'object' || typeof el.Instances instanceof Array || el.Instances.length < 1) {
        throw new Error('el param must be an object with an Instances property with an array value');
    }
    if (typeof queryString !== 'string' || queryString.trim() === '') {
        throw new Error('queryString param must be a non-empty string');
    }
    var instance, instanceName, isMatch;
    instance = el.Instances[0];
    instanceName = '*Blank*';
    //get instance name
    instance.Tags.forEach(function (v) {
        if (v.Key === 'Name') {
            instanceName = v.Value;
            return false; //exit loop //todo check this works
        }
    });

    isMatch = find(queryString, instanceName);
    if (isMatch) {
        console.log(chalk.cyan(instance.PublicDnsName) + ' | ' + chalk.magenta(instanceName));
    }
    return (isMatch) ? 1 : 0;
}

/**
 * Check if needle exists in haystack
 * @param needle
 * @param haystack
 * @returns {boolean}
 */
function find(needle, haystack) {
    if (typeof needle !== 'string' || needle.trim() === '') {
        throw new Error('first param must be a non-empty string');
    }
    if (typeof haystack !== 'string' || haystack.trim() === '') {
        throw new Error('second param must be a non-empty string');
    }
    var is_match = (haystack.indexOf(needle) === -1) ? false : true;
    return is_match;
}


exports.instances = instances;