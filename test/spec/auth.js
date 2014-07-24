/**
 * Created by singh1469@gmail.com July 2014
 * Test custom module auth.js
 */

var mocha = require('mocha');
var chai = require('chai');
var auth = require('../../auth');

var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

describe('Test module Auth', function () {

    /**
     * Test if auth.getKey property exists
     */
    describe('auth.getKey should exist', function () {
        it('should have a property called getKey', function () {
            assert.property(auth, 'getKey');
        });
    });

    /**
     * Test if auth.getSecret property exists
     */
    describe('auth.getSecret should exist', function () {
        it('should have a property called getSecret', function () {
            assert.property(auth, 'getSecret');
        });
    });

    describe('Method getKey()', function () {

        /**
         * Test first param - key
         */
        describe('first parameter key', function () {
            it('should throw exception when param key is not a string', function () {
                assert.throws(function () {
                    var aws_key = {};
                    auth.getKey(aws_key);
                }, 'param_key must be a non-empty string');
            });
        });
    });

    describe('Method getSecret()', function () {

        /**
         * Test first param - secret
         */
        describe('first parameter secret', function () {
            it('should throw exception when param secret is not a string', function () {
                assert.throws(function () {
                    var aws_secret = {};
                    auth.getSecret(aws_secret);
                }, 'param_secret must be a non-empty string');
            });
        });
    });
});