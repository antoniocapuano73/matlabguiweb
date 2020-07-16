<!--
    props:
        text

        onChange(filterParamsModel,index)

    Public Class ImageFilterDesignModel
        Public filterId As Integer
        Public filterName As String
        Public filterNote As String
        Public filterScriptText As String
        Public filterCustom As Boolean

        Public filterParams As ImageFilterParamsModel
    End Class
-->
<template>
  <CContainer v-show="isFilterDesignModel() && isAdmin()">
    <CRow class="text" @click="showComponent()">
      {{text}}
    </CRow>
    <CContainer v-show="visibleImageFilterDesignBody">
        <CRow class="fieldLabel">
            <CCol class="col-2">Filter Id</CCol>
            <CCol class="col-1">
                <input v-model="m_filterDesignModel.filterId" placeholder="0" disabled>
            </CCol>
        </CRow>

        <CRow class="fieldLabel">
            <CCol class="col-2">Native matlab function</CCol>
            <CCol class="col-1">
                <input type="checkbox" v-model="m_filterDesignModel.filterCustom" disabled>
            </CCol>
        </CRow>

        <CRow class="fieldLabel">
            <CCol class="col-2">Script code</CCol>
            <CCol>
                <textarea class="fieldScriptText" v-model="m_filterDesignModel.filterScriptText" disabled></textarea>
            </CCol>
        </CRow>
    </CContainer>
  </CContainer>
</template>

<script>
import {
    FilterDesignModel,
    IsFilterDesignModel,
} from '@/api/images/ImageFilterController.js';

export default {
    name: 'ImageFilterDesign',
    data: function() {
        return {
            m_filterDesignModel: new FilterDesignModel(),
            visibleImageFilterDesignBody: false,
        }
    },
    props: {
        text: {
            type: String,
            default: 'Script Text',
        },
        filterDesignModel: {
            type: Object,
            default: null,
        },
        admin: {
            type: Boolean,
            default: true
        }
    },
    mounted: function() {
        let that = this;

        if (that.filterDesignModel) {
            that.m_filterDesignModel = that.clone(that.filterDesignModel);
        }
    },
    methods: {
        isAdmin: function () {
            let that = this;

            let ret = false;

            try {
                ret = that.admin;
            }
            catch (e) {

            }

            return ret;
        },
        isFilterDesignModel: function() {
            let ret = 
                IsFilterDesignModel(
                    this.m_filterDesignModel);

            //console.log(ret);

            return ret;
        },
        clone: function(obj) {
            if (null == obj || "object" != typeof obj) return obj;
            var copy = obj.constructor();
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
            }
            return copy;
        },
        showComponent: function() {
            let that = this;

            that.visibleImageFilterDesignBody = 
                !that.visibleImageFilterDesignBody;
        }
    },
    watch: { 
        filterDesignModel: function (nv) {
            let that = this;

            if (nv) {
                that.m_filterDesignModel = that.clone(nv);
            }
        }
    }
}
</script>

<style scoped>
    .text {
        color: blue;
        font-size: 125%;
    }
    .fieldLabel {
        margin-top: 5px;
        font-size: 105%;
    }
    .fieldScriptText {
        margin-top: 5px;
        font-size: 105%;
        width: 100%;
    }
    .button {
        margin-top: 5px;
        margin-right: 5px;
        width: 100px;
    }

</style>