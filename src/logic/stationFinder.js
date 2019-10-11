import stations from './stations';

const compareCode = query => ({ code }) => code.toLowerCase() === query;

const compareName = query => ({ name }) => name.toLowerCase().includes(query);

const sortStations = query => (station1, station2) => {
    const index1 = station1.name.toLowerCase().indexOf(query);
    const index2 = station2.name.toLowerCase().indexOf(query);

    return index1 - index2;
};

export const findStations = async (query) => {
    // If there's no query, or the query is too short, terminate
    if (!query || query.length < 3) {
        return null;
    }

    // convert the query to lowercase
    query = query.toLowerCase();

    // Find stations with a matching code
    const foundByCode = stations.filter(compareCode(query));

    // Find stations where the name contains the query, and weight the array
    // so that a lower index is first
    const foundByName = stations.filter(compareName(query)).sort(sortStations(query));

    // create an array of already found stations
    const existing = [];

    const retVal = [];

    const handleStation = (station) => {
        if (!existing.includes(station.code)) {
            existing.push(station.code);
            retVal.push(station);
        }
    }

    // Add all stations found by code to the object
    foundByCode.forEach(handleStation);

    // Add all stations found by name to the object
    foundByName.forEach(handleStation);

    return retVal;
};
