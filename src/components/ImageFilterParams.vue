<!--
    props:
        text

        onChange(filterParamsModel,index)
-->
<template>
  <CContainer>
    <CRow>
      <h2 class="text">{{text}}</h2>
    </CRow>
    <CRow v-for="(filterParamModel,index) in filterParamsModel.items" :key="index" 
          v-show="(index <= (filterParamsModel.count-1))"
          class="filterParam">
      <CCol class="col-3">
        <h4>{{ filterParamModel.name}}</h4>
      </CCol>
      <CCol class="col-1">
          <input v-model="filterParamModel.value" :placeholder="filterParamModel.name" @keydown="onChangeFilterParam(index)">
      </CCol>
      <CCol class="col-8">
      </CCol>
    </CRow>
  </CContainer>
</template>

<script>
import {
    FilterParamsModel,
} from '@/api/images/ImageFilterController.js';

export default {
    name: 'ImageFilterParams',
    props: {
        text: {
            type: String,
            default: 'Filter Params',
        },
        filterParamsModel: {
            type: Object,
            default: new FilterParamsModel(),
        },
        onChange: {
            type: Function,
            default: null,
        }
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
        }
    }
}

</script>

<style scoped>
    .text {
        color: blue;
    }
    .filterParam {
    margin-top: 5px;
    }
</style>