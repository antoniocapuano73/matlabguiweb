<!--
    props:
        text

        onChange(filterParamsModel,index)

    Public Class ImageFilterParamModel
        Public name As String
        Public value As String
        Public type As TypeImageFilterParam
    End Class
-->
<template>
  <CContainer v-show="isFilterParamsModel()">
    <CRow>
      <span class="text" @click="showComponent()">{{text}}</span>
    </CRow>
    <div v-show="visibleImageFilterParamsBody">
        <CRow v-for="(filterParamModel,index) in m_filterParamsModel.items" :key="index" 
            v-show="(index < m_filterParamsModel.count)"
            class="filterParamRow">
        <CCol class="col-3">
            <span class="filterParamName">{{ filterParamModel.name}}</span>
        </CCol>
        <CCol class="col-1">
            <input v-model="filterParamModel.value" 
                :placeholder="filterParamModel.name" 
                @keydown="onChangeFilterParam(index)">
        </CCol>
        <CCol class="col-8">
        </CCol>
        </CRow>
    </div>
  </CContainer>
</template>

<script>
import {
    FilterParamsModel,
    copyFilterParamsModel,
    IsFilterParamsModel,
} from '@/api/images/ImageFilterController.js';

export default {
    name: 'ImageFilterParams',
    data: function () {
        return {
            m_filterParamsModel : new FilterParamsModel(),
            visibleImageFilterParamsBody: false
        }
    },
    props: {
        text: {
            type: String,
            default: 'Filter Params',
        },
        filterParamsModel: {
            type: Object,
            default: null,
        },
        onChange: {
            type: Function,
            default: null,
        }
    },
    mounted: function() {
        let that = this;

        copyFilterParamsModel(that.m_filterParamsModel,that.filterParamsModel);
    },
    methods: {
        onChangeFilterParam: function(index) {
            let that = this;

            // raise event
            this.$emit('change');

            // onClick
            if (that.onChange) {
                if (typeof that.onChange === 'function') {

                    try {
                        that.onChange(that.filterParamsModel,index);

                    } catch (e) {
                        console.log('ImageFilterParams onChange error!');
                    }
                    
                }
            }
        },
        isFilterParamsModel: function() {
            let that = this;

            let ret = IsFilterParamsModel(that.m_filterParamsModel);

            //console.log("isFilterParamsModel");
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

            that.visibleImageFilterParamsBody = !that.visibleImageFilterParamsBody;
        }
    },
    watch: { 
        filterParamsModel: function (nv) {
            let that = this;

            copyFilterParamsModel(that.m_filterParamsModel,nv);
        }
    }
}

</script>

<style scoped>
    .text {
        color: blue;
        font-size: 125%;
    }
    .filterParamRow {
        margin-top: 5px;
    }
    .filterParamName {
        font-size: 105%;
    }
</style>