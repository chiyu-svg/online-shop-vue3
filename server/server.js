const express = require('express');
const themHome = require('./themHome.json');

const server = express();

server.get('/home/themHome',(req, res, next) => {
    res.send(themHome);
})

server.listen(3000, () => {
    console.log('服务器已经启动');
})