#Amazon S3 file upload do-dad

Quick and dirty Grunt.js task to deploy image files to an Amazon S3 bucket with a generated .json file manifest.

Requires [S3cmd](http://s3tools.org/s3cmd) to be configured and running on your system.

##Project configuration

Clone repo etc.

```shell
npm install
```

Edit package.json to your destination directory, S3 bucket etc.

/dist is default directory for files.

```shell
grunt
```