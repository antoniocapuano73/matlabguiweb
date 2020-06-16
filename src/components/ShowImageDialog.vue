<!--
    props:
        textButton
        loadFunction
        imageDataModel       <- ImageDataModel

    events:
        click
        change
-->
<template>
  <CContainer>
    <CRow>
        <div >
            <CButton color="primary" @click ="onClick">{{textButton}}</CButton><br>
        </div>
    </CRow>
    <CRow>
    </CRow>
    <CRow>
        <div class="preview-image">
            <img id="image" alt="showing image" @load ="onLoad">
        </div>
    </CRow>
  </CContainer>
</template>

<script>
// import UploadImage from 'vue-upload-image';
import {setImageData} from '@/lib/images/TagImages.js'

export default {
  name: 'ShowImageDialog',
  data: function () {
    return {
      
    }
  },
  props: {
    textButton: {
      type: String,
      default: 'Show image'
    },
    loadFunction: {
      type: Function,
      default: null
    },
    imageDataModel: {
      type: Object,
      default: null
    }
  },
  methods: {
    onClick: function(event) {
        // raise event
        this.$emit('click');
    },
    onLoad: function(event) {
      let that = this;

      // raise event
      that.$emit('change',that.imageDataModel);

    }
  },
  watch: { 
    imageDataModel: function (imageDataModel) {
      let tagImage = document.getElementById('image');
      setImageData(tagImage,imageDataModel);
    }
  }
}

</script>

<style scoped>
  .preview-image {
    border-style: solid; 
    border-width: 1px;
    width: 100%;
    margin-top: 5px;
  }
</style>