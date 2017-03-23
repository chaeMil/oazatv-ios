import Photo from './Photo'

class Album {
    constructor(input) {
        this.id = input.id;
        this.hash = input.hash;
        this.nameCs = input.name_cs;
        this.nameEn = input.name_en;
        this.descriptionEn = input.description_en;
        this.descriptionCs = input.description_cs;
        this.date = input.date;
        this.days = input.days;
        this.tags = input.tags.replace(/\s/g,'').split(",");
        this.thumbs = input.thumbs;

        let photos = [];
        for(let i = 0; i < input.photos.size; i++) {
            let photo = Photo(input.photos[i]);
            photos.add(photo);
        }

        this.photos = photos;
    }

    getName() {
        switch(LangUtils.getLocale()) {
            case "en":
                return this.nameEn;
            case "cs":
            case "sk":
                return this.nameCs;
            default:
                return this.nameEn;
        }
    }

    getPhotos() {
        return this.photos;
    }

    getHash() {
        return this.hash;
    }

    getDescription() {
        switch(LangUtils.getLocale()) {
            case "en":
                return this.descriptionEn;
            case "cs":
            case "sk":
                return this.descriptionCs;
            default:
                return this.descriptionEn;
        }
    }

}

module.exports = Album;