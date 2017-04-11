import * as api from './api';
import config from '../config.js';

export function getResults(address, citystatezip) {
    return api.get(`${config.serverUrl}/api/search?address=${address}&citystatezip=${citystatezip}`);
}
