import {Component} from '@angular/core';

import {ApiService} from 'sharedlibrary/api.service';
import {HashService} from 'sharedlibrary/hash.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
})
export class HomeComponent {
    private file: File;

    constructor(
        private hashService: HashService,
        private apiService: ApiService,
    ) {}

    setImage(event: Event) {
        // Get the file information from the file input field.
        this.file = (event.target as HTMLInputElement).files[0];
    }

    uploadImage() {
        const reader = new FileReader();
        reader.readAsDataURL(this.file);
        reader.onload = () => {
            // Converting the result to a string creates a Base64 string of the image.
            const image = reader.result.toString();

            const hash = this.hashService.hash(image);

            // Upload the hash to the api.
            this.apiService.uploadImage(hash).then(status => {
                switch (status) {
                    case 200:
                        // TODO: Inform the user that the upload was a success.
                        break;
                    case 400:
                        // TODO: Inform the user that the data sent is invalid.
                        break;
                    case 401:
                        // TODO: Inform the user that the camera password is invalid.
                        break;
                }
            }).catch(() => {
                // TODO: Inform the user that there was a network error.
            });
        }
    }
}
