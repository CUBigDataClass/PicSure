import {Injectable} from '@angular/core';

@Injectable()
export class HashService {
    hash(content: string): string {
        // TODO: Generate a SHA512 hash of the content concatenated with this.secretKey.
        return 'This will be the hash of the image.';
    }
}
