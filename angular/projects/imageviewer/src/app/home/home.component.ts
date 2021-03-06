import {Component} from '@angular/core';
import {ApiService} from "sharedlibrary/api.service";
import {HashService} from "sharedlibrary/hash.service";
import {toast} from 'materialize-css';

interface CachedImage {
    image: string;
    isModified: boolean;
}

@Component({
    selector: 'app-home',
    styleUrls: ['./home.component.css'],
    templateUrl: './home.component.html',
})
export class HomeComponent {
    private file: File;

    public imageSrc: string = '';
    public imageCache: CachedImage[] = [];
    public hiddenIndicator: boolean = true;
    public isModified: boolean = false;

    constructor(
        private hashService: HashService,
        private apiService: ApiService,
    ) {
        let tempCache: CachedImage[] = JSON.parse(localStorage.getItem('image_cache'));
        if (tempCache != null) this.imageCache = tempCache;
    }

    clearCache() {
        localStorage.clear();
        this.imageCache = [];
    }

    getModifiedColor(): string {
        return this.isModified ? 'red' : 'green';
    }
    
    setToast(message: string, modifiedColor: string) { 
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
            
            this.apiService.checkImage(hash).then(status => {
                switch (status) {
                    case 200:
                        this.isModified = false;
                        this.setToast('Image has not been modified.', 'green');
                        break;
                    case 204:
                        this.isModified = true;
                        this.setToast('Image may or may not have been modified.', 'red');
                        break;
                    case 400:
                        this.imageSrc = '';
                        this.isModified = true;
                        this.setToast('Uploaded image data is invalid.', 'red');
                        break;
                }
            }).catch(error => {
                console.log(error);
                this.isModified = true;
                this.setToast('Network error has occured. Please try again.', 'red');
            }).finally(() => {
                this.imageCache.unshift({
                    image: image,
                    isModified: this.isModified
                });
            
                if (this.imageCache.length > 100) {
                    this.imageCache.pop();
                }
    
                if (localStorage) {
                    localStorage.setItem('image_cache', JSON.stringify(this.imageCache));
                }
            });
        }
    }
}
