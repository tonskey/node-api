# Node REST API

`NodeAPI` is REST API server implementation built on top `Node.js` and `Express.js` with `Mongoose.js` for `MongoDB` integration. Access control follows `OAuth 2.0` spec with the help of `OAuth2orize` and `Passport.js`.

## Running project

## Manual

You need to have [Node.js](https://nodejs.org) and [MongoDB](https://www.mongodb.com) installed.

### Node setup on Debian and Ubuntu based Linux distributions

Node.js v10.x:

```sh
# Update Everything before installing all dependencies
sudo apt-get update && sudo apt-get upgrade && sudo apt-get dist-upgrade

# Install Node (+npm) using Ubuntu
curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Node (+npm) using Debian, as root
curl -sL https://deb.nodesource.com/setup_10.x | bash -
apt-get install -y nodejs

# Install npm dependencies in project folder
npm install
```

### [MongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu) setup on Ubuntu

```sh
#Import the public key
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4

#Create a list file for MongoDB (for Ubuntu 18.04)
echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list

#Reload local package database
sudo apt-get update

#Install the MongoDB packages
sudo apt-get install -y mongodb-org

#Start MongoDB
sudo service mongod start

# Create directory for MongoDB data (Optional)
mkdir -p ./data/mongo

# Run MongoDB daemon process with path to data directory (Optional)
mongod --dbpath ./data/mongo
```

### Run server

```sh
npm start
# alias for
node bin/www
```

### Create demo data

```sh
npm run-script generate
# alias for
node generateData.js
```

## Docker

You need to have [Docker](https://www.docker.com/community-edition) installed.

### Run server

```sh
docker-compose up -d --build
```

### Create demo data

```sh
docker-compose exec app node generateData.js
```
