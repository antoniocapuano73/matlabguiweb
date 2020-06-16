<!--
    props:
        textButton

    events:
        click
        load(imageDataModel)
-->
<template>
  <CContainer>
    <CRow>
        <div >
            <CButton color="primary" @click ="simulate_onClickInputImageSource">{{textButton}}</CButton><br>
            <input type="file" name="inputImageSource" id="inputImageSource"
              accept="image/*"
              style="display: none"
              @change="onImageSourceFilenameChanged">
        </div>
    </CRow>
    <CRow>
    </CRow>
    <CRow>
        <div class="preview-image">
            <img id="imageSource" alt="source image" src=""
            @click ="simulate_onClickInputImageSource"
            >
        </div>
    </CRow>
  </CContainer>
</template>

<script>
// import UploadImage from 'vue-upload-image';
import {loadImage}      from '@/lib/images/TagImages.js';

import {
  ctxImage,
  getImageData,
  setImageData
} from '@/lib/images/TagImages.js'

export default {
  name: 'OpenImageDialog',
  data: function () {
    return {
      
    }
  },
  props: {
    textButton: {
      type: String,
      default: 'Select image'
    },
  },
  methods: {
    simulate_onClickInputImageSource: function(event) {
        // raise event
        this.$emit('click');

        // simulate
        document.getElementById('inputImageSource').click();

    },
    onImageSourceFilenameChanged: function(e) {
      let that = this;
      let filename       = e.target.files[0];
      let tagimageSource = document.getElementById('imageSource')

      loadImage(filename, function(imageDataModel){
        // display image
        setImageData(tagimageSource,imageDataModel);

        // raise event
        that.$emit('load',imageDataModel);
      });

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
