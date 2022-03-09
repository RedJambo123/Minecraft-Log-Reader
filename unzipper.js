const zlib = require('zlib');
const fs = require('fs');
const _ = require('lodash');

module.exports = (path, zipArray) => {
    return new Promise((resolve, reject) => {
        let unzipped = [];

        const resolver = _.after(zipArray.length, () => {
            return resolve(unzipped);
        });

        if(!zipArray.length) return resolver();

        zipArray.forEach(zip => {
            fs.readFile(`${path}/${zip}`, (err, zipFile) => {
                if (err) return reject(err);
                zlib.gunzip(zipFile, (err, file) => {
                    if (err) return reject(err);
                    unzipped.push({
                        fileName: zip,
                        data: file
                    });
                    resolver();
                });
            });
        });
    });
};