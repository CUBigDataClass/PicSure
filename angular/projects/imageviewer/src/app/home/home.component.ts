import {Component} from '@angular/core';

import {ApiService} from "sharedlibrary/api.service";
import {HashService} from "sharedlibrary/hash.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
})
export class HomeComponent {
    private file: File;

    public imageSrc: string = '';

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
            this.imageSrc = image;

            const hash = this.hashService.hash(image);

            // Check the hash against the api.
            this.apiService.checkImage(hash).then(status => {
                switch (status) {
                    case 200:
                        // TODO: Inform the user that the image has not be modified.
                        break;
                    case 204:
                        // TODO: Inform the user that the image may or may not have been modified.
                        break;
                    case 400:
                        // TODO: Inform the user that the data sent is invalid.
                        break;
                }
            }).catch(error => {
                console.log(error);
                // TODO: Inform the user that there was a network error.
            });
        }
    }
}
