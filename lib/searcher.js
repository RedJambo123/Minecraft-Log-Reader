const fs = require('fs');
const _ = require('lodash');
const open = require('open');

module.exports = (path, search, allLogFiles) => {

    let results = [];

    const logResults = _.after(allLogFiles.length, () => {
        if(!allLogFiles.length) {
            results.push('=================================================');
            results.push(`No log files were found in : "${path}"`);
            results.push('=================================================');
        }
        if (!results.length) {
            results.push('=================================================');
            results.push(`There were no results for search term: ${search}`);
            results.push('=================================================');
        }
        fs.writeFile(`${path}/RESULTS_${search}.log`, results.join('\n'), (err, file) => {
            if (err) console.error(err);
            open(`${path}/RESULTS_${search}.log`, { wait: true }).then(() => {
                process.exit();
            }).catch(err => {
                if (err) console.error(err);
            });
        });
    });

    if(!allLogFiles.length) return logResults();


    allLogFiles.forEach(file => {
        let log = file.data.toString();
        let logArray = log.split('\n');
        let regex = new RegExp(`${search}`, 'i');

        logArray.forEach((l, i) => {
            if (l.search(regex) >= 0) {
                results.push(`[${file.fileName}] ${l}`);
            }
        });
        logResults();
    });
};