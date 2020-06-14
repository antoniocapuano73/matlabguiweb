/*
    il tagImage deve contenere l'immagine.
    E' bene eseguire questa funzione nell'eventi
    ' onload del tagImage
*/
export function ctxImage(tagImage) {
    let ret = null;

    if (tagImage) {
        try {
            let canvas    = document.createElement("canvas");
            canvas.width  = tagImage.naturalWidth;
            canvas.height = tagImage.naturalHeight;
    
            let ctx = canvas.getContext("2d");
    
            // return
            ret = ctx;
        }
        catch (e) {
        }

    }

    return ret;
}

/*
    il tagImage deve contenere l'immagine.
    E' bene eseguire questa funzione nell'eventi
    ' onload del tagImage
*/
export function getImageData(tagImage) {
    let ret = null;

    if (tagImage) {
        try {
            let ctx = this.ctxImage(tagImage);
            ctx.drawImage(tagImage,0,0,tagImage.naturalWidth,tagImage.naturalHeight);
            let imageData = ctx.getImageData(0,0,tagImage.width,tagImage.height);
        
            // return
            ret = imageData.data;
        }
        catch (e) {
        }
    }

    return ret;
}

/*
    Sovrascrive sul tagImage l'immagine imageData
    fornita come un Array di byte
*/
export function setImageData(tagImage, width, height, imageData) {
    try {
        if ((tagImage) && (imageData) && (width > 0) && (height > 0)) {
            let canvas = document.createElement("canvas");
            canvas.width  = width;
            canvas.height = height;
        
            let ctx    = canvas.getContext("2d");
            let ctxImageData = 
            new ImageData(
                Uint8ClampedArray.from(imageData),
                width,height
            )
        
            ctx.putImageData(ctxImageData,0,0);
            tagImage.src = canvas.toDataURL();
        }
    }
    catch (e) {
    }

}