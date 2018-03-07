import * as baseService from './base';

async function allLocations() {
    return baseService.get('/api/location');
}

async function allInstruments() {
    return baseService.get('/api/instrument');
}

async function allGenres() {
    return baseService.get('/api/genre');
}

export { allLocations, allInstruments, allGenres };