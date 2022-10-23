BLOCKCHAIN HOUSING RENTAL SYSTEM
--------------------------------

BHRS

John

JUL 31 2022

--

==How to start the project locally?==

===Generate the databse===

Generate a file named .env in the root directory ensure the content incude as below:

```shell

DATABASE_URL="mysql://xxx:xxxxx@xxx.xxx.us-east-1.rds.amazonaws.com:3306/xxx"
SHADOW_DATABASE_URL="mysql://xxxx:xxxx@xxx.xxx.us-east-1.rds.amazonaws.com:3306/xxx"

```

This is the file which Prisma will operate it generate database and tables by it.

===DB config & others===

Generate .env.local file including the content as below:

```shell

ACCESS_KEY=xxxxx # this is AWS S3
SECRET_KEY=xxxxxx # this is AWS S3
BUCKET_NAME=xxx-xxx-xxx # this is AWS S3
DATABASE_URL="mysql://xx:xx@xx.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/xx"  # this is for the db 

```