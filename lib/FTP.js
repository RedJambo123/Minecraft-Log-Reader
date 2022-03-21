const mkdirp = require('mkdirp');
const moment = require('moment');
const getAppDataPath = require('appdata-path');
const ftpClient = require('ftp-client');
let appDataPath = `${getAppDataPath()}/mc_log_reader/`;
let LOGS = require('./LOGS');

module.exports = (rl) => {

    rl.question('What is the FTP host name?: ', host => {
        rl.question('What is your FTP username?: ', user => {
            rl.question('What is your FTP password?: ', password => {
                let client = new ftpClient({
                    host: host,
                    user: user,
                    password: password,
                    port: 21
                });
                client.connect(() => {
                    console.log('FTP Connection Successful!');
                    let time = moment().format('DD-MM-YYYY_HH-mm-ss');
                    mkdirp(`${appDataPath}/ftp-${time}`).then(dir => {
                        console.log(`Downloading logs files, please wait...`);
                        client.download('/logs', `${appDataPath}/ftp-${time}/`, {
                            overwrite: 'none'
                        }, result => {
                            LOGS(rl, `${appDataPath}/ftp-${time}/`);
                        });
                    }).catch(err => {
                        throw err;
                    });
                });
            });
        });
    });
};