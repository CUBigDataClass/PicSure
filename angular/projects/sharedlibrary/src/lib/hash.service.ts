import {Injectable} from '@angular/core';
import {sha512} from 'js-sha512';

@Injectable()
export class HashService {
    hash(content: string): string {
        const imageHash = sha512(content);
        return imageHash;
    }
}
