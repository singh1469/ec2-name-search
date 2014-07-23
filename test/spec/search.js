/**
 * Created by singh1469@gmail.com July 2014
 * Test custom module Search.js
 */

/**
 * Test search.instances()
 */
var search = require('../../search');

describe('Test module Search', function(){

    describe('Method instances()', function(){

        /**
         * Test first param - queryString
         */
        it('should throw exception when queryString param is not a string', function(){
            var queryString = {};
            var awsKey = 'test';
            var awsSecret = 'test';
            var awsRegion = 'test';
            expect(search.instances(queryString,awsKey,awsSecret,awsRegion)).to.throw('queryString param must be a non-empty string');
        });
        it('should throw exception when queryString param is an empty string', function(){
            var queryString = ' ';
            var awsKey = 'test';
            var awsSecret = 'test';
            var awsRegion = 'test';
            expect(search.instances(queryString,awsKey,awsSecret,awsRegion)).to.throw('queryString param must be a non-empty string');
        });

        /**
         * Test second param - awsKey
         */
        it('should throw exception when awsKey param is not a string', function(){
            var queryString = 'test';
            var awsKey = {};
            var awsSecret = 'test';
            var awsRegion = 'test';
            expect(search.instances(queryString,awsKey,awsSecret,awsRegion)).to.throw('awsKey param must be a non-empty string');
        });
        it('should throw exception when awsKey param is an empty string', function(){
            var queryString = 'test';
            var awsKey = ' ';
            var awsSecret = 'test';
            var awsRegion = 'test';
            var search = search;
            expect(search.instances(queryString,awsKey,awsSecret,awsRegion)).to.throw('awsKey param must be a non-empty string');
        });

        /**
         * Test third param - awsSecret
         */
        it('should throw exception when awsSecret param is not a string', function(){
            var queryString = 'test';
            var awsKey = 'test';
            var awsSecret = {};
            var awsRegion = 'test';
            var search = search;
            expect(search.instances(queryString,awsKey,awsSecret,awsRegion)).to.throw('awsSecret param must be a non-empty string');
        });
        it('should throw exception when awsSecret param is an empty string', function(){
            var queryString = 'test';
            var awsKey = 'test';
            var awsSecret = ' ';
            var awsRegion = 'test';
            var search = search;
            expect(search.instances(queryString,awsKey,awsSecret,awsRegion)).to.throw('awsSecret param must be a non-empty string');
        });

        /**
         * Test fourth param - awsRegion
         */
        it('should throw exception when awsRegion param is not a string', function(){
            var queryString = 'test';
            var awsKey = 'test';
            var awsSecret = 'test';
            var awsRegion = {};
            var search = search;
            expect(search.instances(queryString,awsKey,awsSecret,awsRegion)).to.throw('awsRegion param must be a non-empty string');
        });
        it('should throw exception when awsRegion param is an empty string', function(){
            var queryString = 'test';
            var awsKey = 'test';
            var awsSecret = 'test';
            var awsRegion = ' ';
            var search = search;
            expect(search.instances(queryString,awsKey,awsSecret,awsRegion)).to.throw('awsRegion param must be a non-empty string');
        });
    });


})
