#EC2 Name Search

Utility that gets the DNS names of your Amazon Web services EC2 instances based on the name you supply.
This is a command line utility powered by [NodeJS](http://nodejs.org "Node JS").

##Usage
`ec2namesearch -q api.bar.foo`

##Requirements

*   [NodeJS](http://nodejs.org "Node JS") must be installed globally
*   Set environment variable called AWS_ACCESS_KEY_ID
*   Set environment variable called AWS_SECRET_ACCESS_KEY
*   Linux/OSX support only

##License

MIT licensed.

Inspired by the python based [Pigeon-droppings](https://github.com/jujhars13/pigeon-droppings "Pigeon Droppings")

##TODO
*   Create test for auth.js module?