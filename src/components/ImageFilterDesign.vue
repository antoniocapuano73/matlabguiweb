<!--
    props:
        text

        onChange(filterParamsModel,index)

    Public Class FilterDesignModel
        Public ID As Integer
        Public Name As String
        Public Note As String
        Public ScriptText As String
        Public Custom As Boolean

        Public ParamNames As FilterParamNamesModel
    End Class
-->
<template>
  <CContainer v-show="filterDesignModel">
    <CRow>
      <h2 class="text">{{text}}</h2>
    </CRow>
    <CRow class="form-check field">
        <label class="form-check-label" for="imageFilterDesignCustom"><h4>Native matlab function</h4></label>
        <input class="form-check-input" type="checkbox" v-model="filterDesignModel.Custom" id="imageFilterDesignCustom" disabled>
    </CRow>
    <CRow class="form-check field">
        <label class="form-check-label" for="imageFilterDesignScriptText"><h4>Script code</h4></label>
        <textarea class="form-control fieldScriptText" v-model="filterDesignModel.ScriptText" placeholder="matlab script" id="imageFilterDesignScriptText" disabled></textarea>
    </CRow>
    <CRow>
        <CCol  class="col-2">
            <CButton class="button" color="primary" disabled>Modify</CButton>
        </CCol>
        <CCol  class="col-2">
            <CButton class="button" color="primary" disabled>Save</CButton>
        </CCol>
    </CRow>
  </CContainer>
</template>

<script>
import {
    FilterDesignModel,
} from '@/api/images/ImageFilterController.js';

export default {
    name: 'ImageFilterDesign',
    props: {
        text: {
            type: String,
            default: 'Script Text',
        },
        filterDesignModel: {
            type: Object,
            default: new FilterDesignModel(),
        }
    }
}
</script>

<style scoped>
    .text {
        color: blue;
    }
    .field {
    margin-top: 5px;
    }
    .fieldScriptText {
        margin-top: 5px;
        height: 250px;
        font-size: 125%;
    }
    .button {
        margin-top: 5px;
        width: 100px;
    }
</style>