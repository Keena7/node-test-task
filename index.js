'use strict';

const {prepareReport} = require('./helpers/allocateButlerHelper');
const {_writeJsonFile} = require('./helpers/fileOperationHelper');
const clientRequests = require('./InputOutputFiles/inputClientRequests');

prepareReport(clientRequests, (response) => {
    _writeJsonFile('./InputOutputFiles/output.json', JSON.stringify(response), (err) => {
        if (err) {
            console.log('error', err);
            process.exit(1);
        }
        console.log('success');
        process.exit(0);
    });
});
