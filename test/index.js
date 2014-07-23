
    var mocha = require('mocha');
    var chai = require('chai');
    mocha.setup('bdd');

    var assert = chai.assert;
    var expect = chai.expect;
    var should = chai.should();

    //get modules to test
    require('../search.js');

