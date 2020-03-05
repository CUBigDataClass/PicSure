import {Injectable} from '@angular/core';

import {CONFIG} from '../config';

@Injectable()
export class ApiService {
    async uploadImage(imageHash: string): Promise<number> {
        return (await fetch(CONFIG.endpointAddress, {
            method: 'POST',
            body: JSON.stringify({
                hash: imageHash,
                password: CONFIG.password,
            }),
        })).status;
    }

    async checkImage(imageHash: string): Promise<number> {
        const address = `${CONFIG.endpointAddress}?hash=${imageHash}`;

        return (await fetch(address, {
            method: 'GET',
        })).status;
    }
}
