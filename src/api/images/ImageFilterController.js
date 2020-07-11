import axios from "axios"
// const filterServiceURI = 'http://localhost:50000/api/filter';
const filterServiceURI = process.env.VUE_APP_FILTER_SERVICE_URI;

/*
    Utility
*/
function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

/*
    Public Class ImageFilterParamModel
        Public name As String
        Public value As String
        Public type As TypeImageFilterParam
    End Class
*/
function iif(condition,__true__,__false__) {
    if (condition)
        return __true__;
    else
        return __false__;
}

export function FilterParamModel(name,value,type) {
    this.name  = iif(name, name, '');
    this.value = iif(value,value,'0');
    this.type  = iif(type, type,  0);
}

export function FilterParamsModel(filterParams) {
    // params
    //  [
    //    ['name','value','type'],  ...
    //    ...
    //    ['name','value','type']
    //  ]

    // default return
    this.count = 0;
    this.items = [];

    for (let i=0; i < process.env.VUE_APP_FILTER_PARAMS_COUNT; i++) {
        this.items.push(new FilterParamModel());
    }

    // fill
    if (filterParams) {
        for (let i = 0; i < process.env.VUE_APP_FILTER_PARAMS_COUNT; i++) {
            try {
                let filterParam = filterParams[i];

                if (filterParam) {

                    let filterParamName  = filterParam[0];
                    let filterParamValue = filterParam[1];
                    let filterParamType  = filterParam[2];

                    if (filterParamName) {

                        this.count   = i+1;
                        this.item[i] = 
                            new FilterParamModel( 
                                filterParamName,
                                filterParamValue,
                                filterParamType);
                    }
                }
            }
            catch (e) {
            }
        }
    }
}

// (1) effettua una copia
// (2) Entrambi i parametri devono essere già allocati
export function copyFilterParamModel(dstFilterParamModel,srcFilterParamModel) {
    try {
        if ((dstFilterParamModel) && (srcFilterParamModel)) {
            dstFilterParamModel.name  = srcFilterParamModel.name;
            dstFilterParamModel.value = srcFilterParamModel.value;
            dstFilterParamModel.type  = srcFilterParamModel.type;
        }
    }
    catch (e) {
        console.log("ImageFilterController function copyFilterParamModel");
        console.log(e);
    }
}

export function copyFilterParamsModel(dstFilterParamsModel,srcFilterParamsModel) {
    try {
        if ((dstFilterParamsModel) && (srcFilterParamsModel)) {
            dstFilterParamsModel.count = srcFilterParamsModel.count;

            for (let i=0; i<srcFilterParamsModel.count; i++) {
                copyFilterParamModel(
                    dstFilterParamsModel.items[i],
                    srcFilterParamsModel.items[i]);
            }

        }
        else
        {
            if (dstFilterParamsModel) {
                dstFilterParamsModel.count = 0;
            }
        }

    }
    catch (e) {
        console.log("ImageFilterController function copyFilterParamsModel");
        console.log(e);
    }
}

export function FilterModel(filterName,filterParamsModel,imageDataModel) {
    this.filterName      = filterName;
    this.filterParams    = filterParamsModel;
    this.filterImageData = imageDataModel;
}

/*
    Public Class ImageFilterDesignModel
        Public filterId As Integer
        Public filterName As String
        Public filterNote As String
        Public filterScriptText As String
        Public filterCustom As Boolean

        Public filterParams As ImageFilterParamsModel
    End Class
*/
export function FilterDesignModel() {
    this.filterId         = -1;
    this.filterName       = '';
    this.filterNote       = '';
    this.filterScriptText = '';
    this.filterCustom     = false;

    this.filterParams      = new FilterParamsModel();
}

export function IsFilterParamsModel(filterParamsModel) {

    try {
        return (
            (filterParamsModel) && 
            (filterParamsModel.count > 0));
    }
    catch (e) {
        return false;
    }
}

export function IsFilterDesignModel(filterDesignModel) {

    try {
        return (
            (filterDesignModel) && 
            (filterDesignModel.filterId > 0));
    }
    catch (e) {
        return false;
    }
}

// new FilterModel(filterName,filterParams,imageContent)
export function applyImageFilter(filterName,filterParamsModel,imageDataModel,
    successFunction,errorFunction) {

    /*
        Public Class FilterModel
            Public FilterName As String
            Public FilterParams As FilterParamsModel
            Public ImageContent As ImageContentModel
        End Class
    */
    let filterModel = 
        new FilterModel(
            filterName,
            iif(filterParamsModel,filterParamsModel,new FilterParamsModel),
            imageDataModel);

    axios.post(filterServiceURI + '/apply',filterModel)
        .then(function (result){
            if (typeof successFunction === 'function') {
                try {
                    let imageData = result.data;
                    successFunction(imageData);
                }
                catch (e){
                    console.log("ImageFilterController.js function applyCP");
                    console.log(e);
                }
            }
        })
        .catch(function (error) {
            if (typeof errorFunction === 'function')
                try {
                    errorFunction(error);
                }
                catch (e){
                }
        });

}

/*
    ' GET api/filter

    Array of:

    Public Class Filter
        Public Property ID As Integer
        Public Property Name As String
        Public Property Note As String
        Public Property ScriptText As String
        Public Property Custom As Boolean

    End Class
*/
export function getFilterList(successFunction,errorFunction) {

    axios
      .get(filterServiceURI)
      .then(function (result){
        if (typeof successFunction === 'function') {
            try {
                let list = result.data;
                successFunction(list);
            }
            catch (e){
                console.log("ImageFilterController.js function filterList");
                console.log(e);
            }
        }
      })
      .catch(function (error) {
        if (typeof errorFunction === 'function')
            try {
                errorFunction(error);
            }
            catch (e){
            }
      })
}

/*
    ' GET api/filter/5

    syntax function:
        successFunction(FilterDesignModel)
        errorFunction()
*/
export function getFilterById(filterId,successFunction,errorFunction) {

    axios
      .get(filterServiceURI + "/" + filterId)
      .then(function (result){
        if (typeof successFunction === 'function') {
            try {
                let list = result.data;
                successFunction(list);
            }
            catch (e){
                console.log("ImageFilterController.js function getFilterById");
                console.log(e);
            }
        }
      })
      .catch(function (error) {
        if (typeof errorFunction === 'function')
            try {
                errorFunction(error);
            }
            catch (e){
            }
      })

}

/*
    syntax function:
        successFunction(FilterDesignModel)
        errorFunction()
*/
export function getFilterByName(filterName,successFunction,errorFunction) {
    let getName = function (text) {
        let ret = "";

        try {
            if (text)
                ret = text.trim().toUpperCase();
        }
        catch (e) {

        }

        return ret;
    }

    let getFilterName = function(filterItem) {
        let ret = "";

        try {
            if (filterItem)
                ret = getName(filterItem.filterName);
        }
        catch (e) {

        }

        return ret;
    }

    let filterSuccessFunction = function(filterList) {
        // debug
        //console.log("getFilterList");
        //console.log(filterList);

        let filterFound = false;
        let filterItem  = {};

        let searchingFilterName = getName(filterName);

        try {
            if (filterList) {
                
                if (filterList.length > 0) {
                    for (let i = 0; i < filterList.length; i++) {
                        /*
                            Public Class Filter
                                Public Property ID As Integer
                                Public Property Name As String
                                Public Property Note As String
                                Public Property ScriptText As String
                                Public Property Custom As Boolean

                            End Class
                        */
                        filterItem = filterList[i];

                        let name = getFilterName(filterItem);

                        //console.log("filterItem");
                        //console.log(filterItem);

                        //console.log("filterItemName");
                        //console.log(filterItemName);

                        if (name !== "") {
                            if (name === searchingFilterName) {
                                //console.log("getFilterByName found filter!");
                                //console.log(filterItem);

                                filterFound = true;
                                break;
                            }
                        }
                    }
                }

            }
        } 
        catch (e) {
            console.log("getFilterByName Error!");
            console.log(e);
        }
        finally {

            if (filterFound == true) {
                try {
                    successFunction(filterItem);
                }
                catch (e){
                    console.log('ImageFilterController.js getFilterByName successFunction error!');
                }

            } else {
                filterErrorFunction();
            }

        }
    }

    let filterErrorFunction = function() {
        if (typeof errorFunction === 'function')
            try {
                errorFunction();
            }
            catch (e){
                console.log('ImageFilterController.js getFilterByName errorFunction error!');
            }
    }

    getFilterList(
        filterSuccessFunction,
        filterErrorFunction);
}