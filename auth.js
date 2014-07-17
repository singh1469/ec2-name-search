/**
 * Created by singh1469@gmail.com on 17-07-2014
 * Holds all authentication methods used within this application
 */

/**
 * Attempt to get aws key as variable from the environment or as passed in using the passed in param
 * @param param_key command line param for aws key
 * @returns aws access key
 */
getKey = function (param_key) {
    //attempt to get key from environment variable
    var aws_key = ('AWS_ACCESS_KEY' in process.env) ? process.env['AWS_ACCESS_KEY'] : '';
    if (aws_key === '' && param_key) {
        //check if passed in as param
        aws_key = param_key;
    }
    return aws_key;
};

/**
 * Attempt to get aws secret as variable from the environment or as passed in using the passed in param
 * @param param_secret command line param for aws secret
 * @returns aws access key
 */
getSecret = function (param_secret) {
    //attempt to get secret from environment variable
    var aws_secret = ('AWS_SECRET_KEY' in process.env) ? process.env['AWS_SECRET_KEY'] : '';
    if (aws_secret === '' && param_secret) {
        //check if passed in as param
        aws_secret = param_secret;
    }
    return aws_secret;
};


exports.getKey = getKey;
exports.getSecret = getSecret;