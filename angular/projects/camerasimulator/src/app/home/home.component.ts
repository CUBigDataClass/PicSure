import {Component} from '@angular/core';

import {ApiService} from 'sharedlibrary/api.service';
import {HashService} from 'sharedlibrary/hash.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    private file: File;
    img = 'https://ya-webdesign.com/transparent450_/vector-outline-camera-5.png';
    name = '';
    alert = '';
    alert_color = 'color:##000000';
    constructor(
        private hashService: HashService,
        private apiService: ApiService,
    ) {}

    setImage(event: Event) {
        // Get the file information from the file input field.
        this.file = (event.target as HTMLInputElement).files[0];
        this.name = this.file.name;
        const reader = new FileReader();
        reader.readAsDataURL(this.file); 
        reader.onload = (event) => { 
            this.img = event.target.result as string;
        }
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
                        // Inform the user that the upload was a success.
                        this.alert_color = 'color:#006609';
                        this.alert = 'Image upload successful!';
                        break;
                    case 400:
                        // Inform the user that the data sent is invalid.
                        this.alert_color = 'color:#960917';
                        this.alert = 'Invalid image upload!';
                        break;
                    case 401:
                        // Inform the user that the camera password is invalid.
                        this.alert_color = 'color:#960917';
                        this.alert = 'Invalid camera password!';
                        break;
                }
            }).catch(() => {
                // Inform the user that there was a network error.
                this.alert_color = 'color:#960917';
                this.alert = 'Network error, try again later!';
            });
        }
    }
}
