import axios from "axios"
const filterServiceURI = 'http://localhost:50000/api/filter';

function EmptyFilterParamModel() {
    this.name  = '';
    this.value = '';
}

function FilterParamModel(name,value) {
    this.name  = String(name);
    this.value = String(value);
}

function FilterParamsModel(filterParams) {
    // params
    //  [
    //    ['name','value'],  ...
    //    ...
    //    ['name','value']
    //  ]

    // default return
    this.count = 0;
    this.items = [
        new EmptyFilterParamModel(),
        new EmptyFilterParamModel(),
        new EmptyFilterParamModel(),
        new EmptyFilterParamModel(),
        new EmptyFilterParamModel(),
        new EmptyFilterParamModel(),
        new EmptyFilterParamModel(),
        new EmptyFilterParamModel(),
        new EmptyFilterParamModel(),
        new EmptyFilterParamModel(),
        new EmptyFilterParamModel(),
        new EmptyFilterParamModel(),
        new EmptyFilterParamModel(),
        new EmptyFilterParamModel(),
        new EmptyFilterParamModel(),
        new EmptyFilterParamModel()
    ];

    for (let i = 0; i < 16; i++) {
        try {
            let filterParam = filterParams[i];

            if (filterParam) {
                filterParamName  = filterParam[0];
                filterParamValue = filterParam[1];

                if ((filterParamName) && (filterParamValue)) {
                    this.count   = i+1;
                    this.item[i] = 
                        new FilterParamModel( 
                                filterParamName,
                                filterParamValue);
                }
            }
        }
        catch (e) {
        }
    }
}

export function ImageDataModel(width,height,imageData) {
    this.width  = width;
    this.height = height;
    this.data   = Array.from(imageData);
}

function FilterModel(filterName,filterParams,imageDataModel) {
    this.filterName      = filterName;
    this.filterParams    = new FilterParamsModel(filterParams);
    this.filterImageData = imageDataModel;
}

// new FilterModel(filterName,filterParams,imageContent)
export function apply0P(filterName,imageDataModel,
    successFunction,errorFunction) {

    applyCP(filterName,[],imageDataModel,
        successFunction,errorFunction);
}

export function applyCP(filterName,filterParams,imageDataModel,
    successFunction,errorFunction) {

    /*
        Public Class FilterModel
            Public FilterName As String
            Public FilterParams As FilterParamsModel
            Public ImageContent As ImageContentModel
        End Class
    */
    let filterModel = 
        new FilterModel(filterName,filterParams,imageDataModel);

    axios.post(filterServiceURI + '/apply',filterModel)
        .then(function (result){
            if (typeof successFunction === 'function') {
                let imageData = result.data;
                successFunction(imageData);
            }
        })
        .catch(function (error) {
            if (typeof errorFunction === 'function')
                errorFunction(error);
        });

}
