export function ImageDataModel(width,height,imageData) {
    try {
        this.width  = width;
        this.height = height;
        this.data   = Array.from(imageData);
    }
    catch (e) {
        this.width  = 0;
        this.height = 0;
        this.data   = null;
    }
}