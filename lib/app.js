const fs = require('fs');
const readline = require('readline');
const _ = require('lodash');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const open = require('open');
const unzipper = require('./unzipper');
const logReader = require('./logReader');
const searcher = require('./searcher');
const LOGS = require('./LOGS');
const FTP = require('./FTP.js');

console.log(`
==============================
Welcome to MC Log Search! 
Written by RedJambo.

Please make sure you have downloaded all your Minecraft (Java) log files to a separate folder,
There is no need to unzip the .gz files

Please follow the instructions below to search your logs.
==============================
`);

rl.question('How would you like to search? FTP or LOGS?: ', searchType => {
    searchType = searchType.toLowerCase();
    switch (searchType) {
        case 'logs':
            LOGS(rl, '');
            break;
        case 'ftp':
            FTP(rl);
            break;
        default:
            break;
    }
});

rl.on('close', () => {
    console.log('Goodbye');
    process.exit();
});
