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
instances = function (queryString, aws_region) {
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
    var ec2 = new AWS.EC2({region: aws_region, maxRetries: 2});
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
    var is_match = (haystack.indexOf(needle) === -1) ? false : true;
    return is_match;
}


exports.instances = instances;