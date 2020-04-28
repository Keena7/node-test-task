'use strict';

const butlers = require('../InputOutputFiles/Butlers.json');

/*
 * Method Name:- allocateButlerToClient
 * Description:- Allocates butler to client
 */
function allocateButlerToClient(request, butler, hours) {
    if (butler.hours >= hours) {
        butler.hours = butler.hours - hours;
        butler.clients.push({
            requestId: request.requestId,
            allocatedHours: hours
        });
    } else {
        // assign partial hours to the requested butler
        const unAllocatedHours = hours - butler.hours;
        butler.clients.push({
            requestId: request.requestId,
            hoursAllocated: butler.hours
        });
        butler.hours = 0;
        if (unAllocatedHours) {
            request.hours = unAllocatedHours;
            allocateButler(request, butlers);
        }
    }
}

/*
 * Method Name:- allocateButler
 * Description:- Allocates butler
 */
function allocateButler(request, butlers) {
    let hours = request.hours;
    if (!hours) {
        // No need to process further when requested hour is 0
        return;
    }
    let butler = butlers.find(butler => butler.butlerId === request.clientId);
    if(butler && butler.hours !== 0) {
        allocateButlerToClient(request, butler, hours);
    } else {
        // assign client to another butler
        let availableButlers = butlers.filter(butler => butler.hours !== 0);
        if (availableButlers.length === 0) {
            console.log('No butler is available at the moment');
            return;
        }
        let availableButler = availableButlers[Math.floor(Math.random() * availableButlers.length)];
        allocateButlerToClient(request, availableButler, hours);
    }
}

/*
 * Method Name:- prepareReport
 * Description:- Prepares butler allocation report
 */
function prepareReport(clientRequests, callback) {
    let responseObject = {
        butlers: [],
        spreadClientIds: []
    };
    clientRequests.forEach((request) => {
        allocateButler(request, butlers);
    });
    butlers.forEach((butler) => {
        if (butler.clients.length) {
            responseObject.butlers.push({
                requests: butler.clients.map((client) => client.requestId)
            });
            responseObject.spreadClientIds.push(butler.butlerId);
        }
    });
    console.log('butlers data', JSON.stringify(butlers));
    return callback(responseObject);
}

module.exports = {prepareReport};
