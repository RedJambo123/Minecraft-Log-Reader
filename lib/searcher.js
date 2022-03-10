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
        results = results.sort((a,b) => (a.file > b.file) ? 1 : ((b.file > a.file) ? -1 : 0));
        results = results.map(r => r.logs);

        search = search.replace(/([\/<>:"\/\\|?*])/g, '');

        fs.writeFile(`${path}/RESULTS_${search}.log`, results.flat().join('\n'), (err, file) => {
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

            // l = l.replace(/([\/])/g, '');

            if (l.search(regex) >= 0) {
                if(results.find(r => r.file == file.fileName)){
                    results.find(r => r.file == file.fileName).logs.push(`[${file.fileName}] ${l}`);
                }else{
                    results.push({
                        file: file.fileName,
                        logs: [`[${file.fileName}] ${l}`]
                    });
                }
            }
        });
        logResults();
    });
};