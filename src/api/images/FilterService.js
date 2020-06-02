import axios from "axios"
const filterServiceURI = 'http://localhost:50000/api/filter';

/* 

GET api/filter/apply?FilterName=name&Image=valore

    <HttpGet>
    <Route("apply")>
    Public Function apply(
        ByVal FilterName As String,     
        ByVal FilterParams As FilterParamsModel,
        ByVal FilterImageContent As ImageContentModel) As ImageContentModel

        ...

        Return result
    End Function

    Public Class FilterParamsModel
        Public Count As Integer
        Public Items(16) As FilterParamModel
    End Class

    Public Class FilterParamModel
        Public Name As String
        Public Value As String
    End Class

    Public Class ImageContentModel
        Public Content As String
    End Class

    Public Class FilterModel
        Public FilterName As String
        Public FilterParams As FilterParamsModel
        Public ImageContent As ImageContentModel
    End Class
*/

function EmptyFilterParamModel() {
    this.name  = '';
    this.value = '';
}

function EmptyFilterParamsModel() {
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
}

function ImageContentModel(content) {
    this.content = String(content);
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

export function emptyFilterParams() {
    return [];
}

export function FilterModel(filterName,filterParams,imageContent) {
    this.filterName         = filterName;
    this.filterParams       = new FilterParamsModel(filterParams);
    this.filterimageContent = new ImageContentModel(imageContent);
}

// new FilterModel(filterName,filterParams,imageContent)
export function apply(filterModel,successFunction,errorFunction) {

    /*
        Public Class FilterModel
            Public FilterName As String
            Public FilterParams As FilterParamsModel
            Public ImageContent As ImageContentModel
        End Class
    */

    axios.post(filterServiceURI + '/apply',filterModel)
        .then(function (result){
            if (typeof successFunction === 'function') {
                let imageContent = result.data.content;
                successFunction(imageContent);
            }
        })
        .catch(function (error) {
            if (typeof errorFunction === 'function')
                errorFunction(error);
        });

}
