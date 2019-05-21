# Falcor POC
A falcor API using express as http server to fetch some important data.

# How to run?

```
$ git clone https://github.com/anzileiro/falcor-poc.git
$ cd falcor-poc
$ yarn add global pm2 && yarn install
$ pm2 start pm2.json --local
```
Now visit `http://localhost:3000/statics/index.html` and you should see the falcor result from the server.






