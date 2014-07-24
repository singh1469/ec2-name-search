/**
 * Created by singh1469@gmail.com July 2014
 * Test custom module Search.js
 */

var mocha = require('mocha');
var chai = require('chai');
var search = require('../../search');

var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

describe('Test module Search', function () {

    /**
     * Test if search.instances property exists
     */
    describe('search.instances should exist', function () {
        it('should have a property called instances', function () {
            assert.property(search, 'instances');
        });
    });

    describe('Method instances()', function () {

        /**
         * Test first param - queryString
         */
        describe('first parameter queryString', function () {
            it('should throw exception when queryString param is not a string', function () {
                assert.throws(function () {
                    var queryString = {};
                    var awsKey = 'test';
                    var awsSecret = 'test';
                    var awsRegion = 'test';
                    search.instances(queryString, awsKey, awsSecret, awsRegion);
                }, 'queryString param must be a non-empty string');
            });

            it('should throw exception when queryString param is an empty string', function () {
                it('should throw exception when queryString param is an empty string', function () {
                    assert.throws(function () {
                        var queryString = ' ';
                        var awsKey = 'test';
                        var awsSecret = 'test';
                        var awsRegion = 'test';
                        search.instances(queryString, awsKey, awsSecret, awsRegion);
                    }, 'queryString param must be a non-empty string');
                });
            })
        });

        /**
         * Test second param - awsKey
         */
        describe('second parameter awsKey', function () {
            it('should throw exception when awsKey param is not a string', function () {
                assert.throws(function () {
                    var queryString = 'test';
                    var awsKey = {};
                    var awsSecret = 'test';
                    var awsRegion = 'test';
                    search.instances(queryString, awsKey, awsSecret, awsRegion);
                }, 'awsKey param must be a non-empty string');
            });

            it('should throw exception when awsKey param is an empty string', function () {
                it('should throw exception when awsKey param is an empty string', function () {
                    assert.throws(function () {
                        var queryString = 'test';
                        var awsKey = ' ';
                        var awsSecret = 'test';
                        var awsRegion = 'test';
                        search.instances(queryString, awsKey, awsSecret, awsRegion);
                    }, 'awsKey param must be a non-empty string');
                });
            })
        });

        /**
         * Test third param - awsSecret
         */
        describe('third parameter awsSecret', function () {
            it('should throw exception when awsKey param is not a string', function () {
                assert.throws(function () {
                    var queryString = 'test';
                    var awsKey = 'test';
                    var awsSecret = {};
                    var awsRegion = 'test';
                    search.instances(queryString, awsKey, awsSecret, awsRegion);
                }, 'awsSecret param must be a non-empty string');
            });

            it('should throw exception when awsSecret param is an empty string', function () {
                it('should throw exception when awsSecret param is an empty string', function () {
                    assert.throws(function () {
                        var queryString = 'test';
                        var awsKey = 'test';
                        var awsSecret = ' ';
                        var awsRegion = 'test';
                        search.instances(queryString, awsKey, awsSecret, awsRegion);
                    }, 'awsSecret param must be a non-empty string');
                });
            })
        });

        /**
         * Test fourth param - awsRegion
         */
        describe('fourth param', function () {
            it('should throw exception when awsRegion param is not a string', function () {
                assert.throws(function () {
                    var queryString = 'test';
                    var awsKey = 'test';
                    var awsSecret = 'test';
                    var awsRegion = {};
                    search.instances(queryString, awsKey, awsSecret, awsRegion);
                }, 'awsRegion param must be a non-empty string');
            });

            it('should throw exception when awsRegion param is an empty string', function () {
                it('should throw exception when awsRegion param is an empty string', function () {
                    assert.throws(function () {
                        var queryString = 'test';
                        var awsKey = 'test';
                        var awsSecret = 'test';
                        var awsRegion = ' ';
                        search.instances(queryString, awsKey, awsSecret, awsRegion);
                    }, 'awsRegion param must be a non-empty string');
                });
            })
        });
    });
});