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
export function getFilterById(idFilter,successFunction,errorFunction) {

    axios
      .get(filterServiceURI + "/" + idFilter)
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
export function getFilterByName(nameFilter,successFunction,errorFunction) {
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
                ret = getName(filterItem.Name);
        }
        catch (e) {

        }

        return ret;
    }

    let filterSuccessFunction = function(filterList) {
        // debug
        //console.log(filterList);

        let filterFound = false;
        let filterItem  = {};
        let filterName  = "";

        let paramNameFilter = getName(nameFilter);

        try {
            let length = filterList.length;

            if (length > 0) {
                for (let i = 0; i < length; i++) {
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
                    filterName = getFilterName(filterItem);

                    if (filterName !== "") {
                        if (filterName === paramNameFilter) {
                            filterFound = true;
                            break;
                        }
                    }
                }
            }
        } finally {

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