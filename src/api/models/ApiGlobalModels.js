/*
    Public Class ImageDataModel
        Public data As JArray
        Public height As Integer
        Public width As Integer
    End Class
*/

export function IsImageDataModel(imageDataModel) {

    try {
        return (
            (imageDataModel) && 
            (imageDataModel.height > 0) &&
            (imageDataModel.width > 0)
        );
    }
    catch (e) {
        return false;
    }
}

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