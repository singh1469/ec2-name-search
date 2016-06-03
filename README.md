[![Build Status](https://travis-ci.org/singh1469/ec2-name-search.svg?branch=master)](https://travis-ci.org/singh1469/ec2-name-search)

#EC2 Name Search

Utility that gets the DNS names of your Amazon Web services EC2 instances based on the name you supply.
This is a command line utility powered by [NodeJS](http://nodejs.org "Node JS").

##Install
- `git clone /path/to/github/repo`
- `cd /clone/path/`
- `npm install`

##Usage
`index.js -q api.bar.foo`

##Docker support
https://hub.docker.com/r/singh1469/ec2-name-search/

#grab your api key
coming soon..

##Requirements

*   [NodeJS](http://nodejs.org "Node JS") must be installed globally
*   Set environment variable called `AWS_ACCESS_KEY`
*   Set environment variable called `AWS_SECRET_KEY`
*   Linux/OSX support only

##License

- re-organise app to docker format i.e. app directory
- fix tests
- create dockerfile
- test

MIT licensed.

Inspired by the python based [Pigeon-droppings](https://github.com/jujhars13/pigeon-droppings "Pigeon Droppings")
