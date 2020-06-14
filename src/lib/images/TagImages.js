import {ImageDataModel} from '../../api/models/ApiGlobalModels.js'
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
    E' bene eseguire questa funzione nell'evento
    ' onload del tagImage

    return ApiGlobalModels.ImageDataModel
*/
export function getImageData(tagImage) {
    let ret = null;

    if (tagImage) {
        try {
            let ctx = ctxImage(tagImage);
            ctx.drawImage(tagImage,0,0,tagImage.naturalWidth,tagImage.naturalHeight);
            let imageData = ctx.getImageData(0,0,tagImage.width,tagImage.height);
        
            // return
            ret = 
                new ImageDataModel(
                    tagImage.naturalWidth,
                    tagImage.naturalHeight,
                    imageData.data);
        }
        catch (e) {
            console.log('Tagimages.getImageData');
            console.log(e);
        }
    }

    return ret;
}

/*
    Sovrascrive sul tagImage l'immagine imageDataModel
    fornita come un Array di byte

    ApiGlobalModels.ImageDataModel
*/
export function setImageData(tagImage, imageDataModel) {
    try {
        if ((tagImage) && (imageDataModel)) {
            let canvas = document.createElement("canvas");
            canvas.width  = imageDataModel.width;
            canvas.height = imageDataModel.height;
        
            let ctx    = canvas.getContext("2d");
            let ctxImageData = 
                new ImageData(
                    Uint8ClampedArray.from(imageDataModel.data),
                    imageDataModel.width,
                    imageDataModel.height
                )
            //console.log(ctxImageData);

            ctx.putImageData(ctxImageData,0,0);
            tagImage.src = canvas.toDataURL();
        }
    }
    catch (e) {
        console.log('Tagimages.setImageData');
        console.log(e);
    }

}

/*
    return:
        ApiGlobalModels.ImageDataModel
        visualizza immagine su tagImage
*/
export function loadImage(filename,successFunction) {
    let ret = false;

    try {
        let img    = document.createElement('img');
        let reader = new FileReader();
  
        reader.onload = function (e) {
          let urlImage = e.target.result;
          img.src   = urlImage;
        }
  
        img.onload = function(e) {
          // data
          let imageDataModel = getImageData(img);

          // return
          if (typeof successFunction === 'function')
            successFunction(imageDataModel);
  
        }
  
        // reader.readAsDataURL(file);
        reader.readAsDataURL(filename);

        // return
        ret = true;
    }
    catch (e) {
        console.log('Tagimages.loadImage');
        console.log(e);
    }

    return ret;
}