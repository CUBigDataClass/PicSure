import {Component} from '@angular/core';

import {ApiService} from "sharedlibrary/api.service";
import {HashService} from "sharedlibrary/hash.service";
import {toast} from 'materialize-css';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
})
export class HomeComponent {
    private file: File;

    public imageSrc: string = '';
    public hiddenIndicator: boolean = true;
    public isModified: boolean = false;


    constructor(
        private hashService: HashService,
        private apiService: ApiService,
    ) {}

    setToast(message: string, modifiedColor: string) { // TODO: add param for different cases 
        toast({
            html: message,  
            classes: 'rounded '.concat(modifiedColor),
            displayLength: 4000
        });
    }

    setImage(event: Event) {
        // Get the file information from the file input field.
        this.file = (event.target as HTMLInputElement).files[0];
    }

    uploadImage() {
        this.hiddenIndicator = false;
        const reader = new FileReader();
        reader.readAsDataURL(this.file);
        reader.onload = () => {
            // Converting the result to a string creates a Base64 string of the image.
            const image = reader.result.toString();
            this.imageSrc = image;

            const hash = this.hashService.hash(image);

            // Check the hash against the api.

            // TODO: boolean value for indicator: whether the check or X shows or not
            // TODO: another bool value for a check mark or an X mark if image has been modified or not
            this.apiService.checkImage(hash).then(status => {
                status = 204; // TODO: get rid of this line. only for test purposes
                switch (status) {
                    case 200:
                        // TODO: Inform the user that the image has not be modified.
                        this.setToast('Image has not been modified.', 'green');
                        break;
                    case 204:
                        // TODO: Inform the user that the image may or may not have been modified.
                        this.isModified = true;
                        this.setToast('Image may or may not have been modified.', 'red');
                        break;
                    case 400:
                        // TODO: Inform the user that the data sent is invalid.
                        this.imageSrc = '';
                        this.isModified = true;
                        this.setToast('Uploaded image data is invalid.', 'red');
                        break;
                }
            }).catch(error => {
                console.log(error);
                // TODO: Inform the user that there was a network error.
                this.setToast('Network error has occured. Please try again.', 'red');
            });
        }
    }
}
