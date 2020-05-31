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
*/
function ImageContentModel(content) {
    this.content = String(content);
}

function FilterParamModel(name,value) {
    this.name  = String(name);
    this.value = String(value);
}

function FilterParamsModel(
    name01, value01,
    name02, value02,
    name03, value03,
    name04, value04,
    name05, value05,
    name06, value06,
    name07, value07,
    name08, value08,
    name09, value09,
    name10, value10,
    name11, value11,
    name12, value12,
    name13, value13,
    name14, value14,
    name15, value15,
    name16, value16
) {
    this.count = 0;
    this.items = [
        new FilterParamsModel('',''),
        new FilterParamsModel('',''),
        new FilterParamsModel('',''),
        new FilterParamsModel('',''),
        new FilterParamsModel('',''),
        new FilterParamsModel('',''),
        new FilterParamsModel('',''),
        new FilterParamsModel('',''),
        new FilterParamsModel('',''),
        new FilterParamsModel('',''),
        new FilterParamsModel('',''),
        new FilterParamsModel('',''),
        new FilterParamsModel('',''),
        new FilterParamsModel('',''),
        new FilterParamsModel('',''),
        new FilterParamsModel('','')
    ];

    let names  = [
        name01,
        name02,
        name03,
        name04,
        name05,
        name06,
        name07,
        name08,
        name09,
        name10,
        name11,
        name12,
        name13,
        name14,
        name15,
        name16
    ];

    let values = [
        value01,
        value02,
        value03,
        value04,
        value05,
        value06,
        value07,
        value08,
        value09,
        value10,
        value11,
        value12,
        value13,
        value14,
        value15,
        value16
    ];

    for (let i = 0; i < 16; i++) {
        if ((names[i] !== undefined) && (values[i] !== undefined)) {
            this.count = i+1;
            this.item[i].name  = String(names[i]);
            this.item[i].value = String(values[i]);
            this.count = 1;
        }
        else {
            break;
        }
    }
}

async function apply(filterName,filterParams,filterImageContent) {
    var result = {};

    // class -> json
    filterParams       = JSON.stringify(filterParams);
    filterImageContent = JSON.stringify(filterImageContent);

    const baseURI = `${filterServiceURI}/apply/?
        FilterName=${filterName}&
        FilterParams=${filterParams}&
        FilterImageContent=${filterImageContent}`;

        try {
            api = await axios.get(baseURI);

            // json -> class
            filteredImageContent = JSON.parse(api.data);

            // return
            result = filteredImageContent;

        } catch (e) {
            console.log(e)
        }

    return result;
}

async function applyWP(filterName,filterImageContent) {
    var result = {};

    // class -> json
    filterParams       = JSON.stringify(new FilterParamsModel());
    filterImageContent = JSON.stringify(filterImageContent);

    const baseURI = `${filterServiceURI}/apply/?
        FilterName=${filterName}&
        FilterParams=${filterParams}&
        FilterImageContent=${filterImageContent}`;

        try {
            api = await axios.get(baseURI);

            // json -> class
            filteredImageContent = JSON.parse(api.data);

            // return
            result = filteredImageContent;

        } catch (e) {
            console.log(e)
        }

    return result;
}
