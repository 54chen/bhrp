BLOCKCHAIN HOUSING RENTAL SYSTEM
========================

BHRS

John

JUL 31 2022


How to start the project locally?
========================

Generate the databse
--------

Generate a file named .env in the root directory ensure the content incude as below:

```shell

DATABASE_URL="mysql://xxx:xxxxx@xxx.xxx.us-east-1.rds.amazonaws.com:3306/xxx"
SHADOW_DATABASE_URL="mysql://xxxx:xxxx@xxx.xxx.us-east-1.rds.amazonaws.com:3306/xxx"

```

This is the file which Prisma will operate it generate database and tables by it.

DB config & others
------

Generate .env.local file including the content as below:

```shell

ACCESS_KEY=xxxxx # this is AWS S3
SECRET_KEY=xxxxxx # this is AWS S3
BUCKET_NAME=xxx-xxx-xxx # this is AWS S3
DATABASE_URL="mysql://xx:xx@xx.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/xx"  # this is for the db 

```

How to generate new smart contracts?
====================================

Install the Hardhat (Solidity development environment)
----

```shell

npm install --save-dev hardhat@latest

npx hardhat

npx hardhat compile

npx hardhat test

```

If there is no any error after above steps, the environment works.

Run Solidity locally
---

```shell

npx hardhat run scripts/run.js

```


Deploy to remote public chain (goerli)
----

```shell

npx hardhat run scripts/deploy.js --network goerli

```

The result will give the new address of the smart contracts. Then the address needs to be modified in the web3.js.

How to deploy to Vercel?
-------

1. Login in https://vercel.com/ with any account.
2. Generate a project.
3. Config the Github url as Next.js project.
4. Commit source codes to the Github repo.