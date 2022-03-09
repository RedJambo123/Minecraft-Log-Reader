const fs = require('fs');
const _ = require('lodash');

module.exports = (path, logArray) => {
    return new Promise((resolve, reject) => {

        let logs = [];

        const resolver = _.after(logArray.length, () => {
            return resolve(logs);
        });

        if(!logArray.length) return resolver();

        logArray.forEach(log => {
            fs.readFile(`${path}/${log}`, (err, logFile) => {
                if (err) return reject(err);
                logs.push({
                    fileName: log,
                    data: logFile
                });
                resolver();
            });
        });
    });
};