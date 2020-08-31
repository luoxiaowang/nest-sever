项目启动步骤：
1、git pull拉取各个代码
2、client：
    2.1  npm run build
    2.2  pm2 delete server
    2.3  pm2 start server.js
3、sever：
    3.1  npm run build
    3.2  pm2 delete dist
    3.3  pm2 start dist/

4、启动mongod
    mongod --config /etc/mongod.conf --noIndexBuildRetry
    mongod -shutdown -dbpath=/data/db

5、命令行永久有效mongod
    echo $PATH
    vim ~/.bashrc
    export PATH=/usr/local/mongodb/bin:$PATH
    source ~/.bashrc


项目地址：http://176.122.171.171/#/demand