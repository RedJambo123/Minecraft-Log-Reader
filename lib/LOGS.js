const fs = require('fs');
const _ = require('lodash');
const open = require('open');
const unzipper = require('./unzipper');
const logReader = require('./logReader');
const searcher = require('./searcher');

module.exports = (rl, lp) => {

    if(!lp.length){
        rl.question('What is the path for your log folder? (e.g. C:/Users/RedJambo/Documents/Minecraft Logs): ', logPath => {
            logPath = logPath.replace(/['"]+/g, '');
            rl.question('What string would you like to search for? ', search => {
                let allLogFiles = [];
                let results = [];
        
                fs.readdir(logPath, (err, files) => {
                    if (err) console.error(err);
        
                    files = files.filter(f => !f.includes('RESULTS'));
                    
                    let zippedFiles = files.filter(f => {
                        let fb = f.split('.');
                        if(fb[fb.length-1] == 'gz') return true;
                        return false;
                    });
                    let logFiles = files.filter(f => {
                        let fb = f.split('.');
                        if(fb[fb.length-1] == 'log') return true;
                        return false;
                    });
                    unzipper(logPath, zippedFiles).then(unzipped => {
                        allLogFiles.push(unzipped);
                        logReader(logPath, logFiles).then(logs => {
                            allLogFiles.push(logs);
                            allLogFiles = allLogFiles.flat();
                            searcher(logPath, search, allLogFiles);
                        }).catch(err => {
                            if(err) console.error(err);
                        });
        
                    }).catch(err => {
                        console.error(err);
                    });
                });
            });
        });
    }else{
        let logPath = lp;
            rl.question('What string would you like to search for? ', search => {
                let allLogFiles = [];
                let results = [];
        
                fs.readdir(logPath, (err, files) => {
                    if (err) console.error(err);
        
                    files = files.filter(f => !f.includes('RESULTS'));
                    
                    let zippedFiles = files.filter(f => {
                        let fb = f.split('.');
                        if(fb[fb.length-1] == 'gz') return true;
                        return false;
                    });
                    let logFiles = files.filter(f => {
                        let fb = f.split('.');
                        if(fb[fb.length-1] == 'log') return true;
                        return false;
                    });
                    unzipper(logPath, zippedFiles).then(unzipped => {
                        allLogFiles.push(unzipped);
                        logReader(logPath, logFiles).then(logs => {
                            allLogFiles.push(logs);
                            allLogFiles = allLogFiles.flat();
                            searcher(logPath, search, allLogFiles);
                        }).catch(err => {
                            if(err) console.error(err);
                        });
        
                    }).catch(err => {
                        console.error(err);
                    });
                });
            });
    }

    
};