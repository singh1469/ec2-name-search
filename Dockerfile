FROM node:argon

#Clone repo to root directory
RUN cd / && git clone https://github.com/singh1469/ec2-name-search

#Directory from which to run commands
WORKDIR /ec2-name-search/app

#Install deps
RUN npm install

#Make script executable
RUN chmod 700 ./run.sh
