import {Injectable} from '@angular/core';
import {sha512} from 'js-sha512';

@Injectable()
export class HashService {
    hash(content: string): string {
        // TODO: Generate a SHA512 hash of the content 
        const imageHash = sha512(content);
        return imageHash;
    }
}
