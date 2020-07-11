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
  <CContainer v-show="isFilterDesignModel()">
    <CRow>
      <span class="text" @click="showComponent()">{{text}}</span>
    </CRow>
    <form v-show="visibleImageFilterDesignBody">
        <div class="form-row">
            <div class="form-group col-3">
                <label for="imageFilterDesignFilterId"><span class="fieldLabel">Filter Id</span></label>
                <input type="text" class="form-control" v-model="m_filterDesignModel.filterId" id="imageFilterDesignFilterId" placeholder="0" disabled>
            </div>
            <div class="form-group  col-2">
                <label class="form-check-label" for="imageFilterDesignCustom"><span class="fieldLabel">Native matlab function</span></label>
                <input class="form-check-input" type="checkbox" v-model="m_filterDesignModel.filterCustom" id="imageFilterDesignCustom" disabled>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group col-12">
                <label class="form-check-label" for="imageFilterDesignScriptText"><span class="fieldLabel">Script code</span></label>
                <textarea class="form-control fieldScriptText" v-model="m_filterDesignModel.filterScriptText" placeholder="matlab script" id="imageFilterDesignScriptText" disabled></textarea>
            </div>
        </div>
        <CButton class="button" color="primary" disabled>Modify</CButton>
        <CButton class="button" color="primary" disabled>Save</CButton>
    </form>
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
        }
    },
    mounted: function() {
        let that = this;

        if (that.filterDesignModel) {
            that.m_filterDesignModel = that.clone(that.filterDesignModel);
        }
    },
    methods: {
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

            that.visibleImageFilterDesignBody = !that.visibleImageFilterDesignBody;
        }
    },
    watch: { 
        filterDesignModel: function (nv) {
            let that = this;

            that.filterDesignModel = nv;
            if (that.filterDesignModel) {
                that.m_filterDesignModel = that.clone(that.filterDesignModel);
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
        font-size: 105%;
    }
    .fieldScriptText {
        margin-top: 5px;
        height: 250px;
        font-size: 105%;
    }
    .button {
        margin-top: 5px;
        margin-right: 5px;
        width: 100px;
    }
</style>