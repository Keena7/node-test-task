'use strict';

const fs = require('fs');

/*
 * Method Name:- _writeJsonFile
 * Description:- Writes into specific json file
 */
function _writeJsonFile(path, data, callback) {
    fs.writeFile(path, data, (err) => {
        if (err) {
            return callback(new Error('There was an error while writing the json file'));
        }
        return callback();
    });
}

module.exports = {_writeJsonFile};
