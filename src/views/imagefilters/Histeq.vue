<template>
  <CContainer>
    <CRow>
      <CCol Cols="6">
        <div>
          <CButton color="primary" @click ="simulate_onClickInputImageSource">Select image</CButton><br>
          <input type="file" name="inputImageSource" id="inputImageSource"
            accept="image/*"
            style="display: none"
            @change="onImageSourceFilenameChanged">
        </div>
      </CCol>
      <CCol Cols="6">
        <div>
          <CButton color="primary" @click ="onUpload">Filter image</CButton><br>
        </div>
      </CCol>
    </CRow>
    <CRow>
      <p> </p>
    </CRow>
    <CRow>
      <CCol Cols="6">
        <div class="preview-image">
          <img id="imageSource" alt="source image" 
            @click ="simulate_onClickInputImageSource"
          >
        </div>
      </CCol>
      <CCol Cols="6">
        <div class="preview-image">
          <img id="imageDestination" alt="filtered image" >
        </div>
      </CCol>
    </CRow>
  </CContainer>
</template>

<script>
// import UploadImage from 'vue-upload-image';
import {ImageDataModel} from '@/api/models/ApiGlobalModels.js';
import {loadImage}      from '@/lib/images/TagImages.js';
import {apply0P}        from '@/api/images/ImageFilterController.js';

import {
  ctxImage,
  getImageData,
  setImageData
} from '@/lib/images/TagImages.js'

export default {
  name: 'Histeq',
  data: function () {
    return {
      imageDataModelSource: null,
      imageDataModelDestination: null
    }
  },
  methods: {
    simulate_onClickInputImageSource: function(event) {
      document.getElementById('inputImageSource').click();
    },
    onImageSourceFilenameChanged: function(e) {
      let that = this;
      let filename       = e.target.files[0];
      let tagimageSource = document.getElementById('imageSource')

      loadImage(filename, function(imageDataModel){
        // display image
        setImageData(tagimageSource,imageDataModel);

        // return
        that.imageDataModelSource = imageDataModel;
      });

    },
    onUpload() {
      let that = this;

      // image destination
      let tagImageDestination   = document.getElementById('imageDestination');
      that.imageDataModelDestination = null;

      // filter
      if (that.imageDataModelSource !== null) {
        apply0P('histeq',that.imageDataModelSource, 
          function (imageDataModel) {

            //console.log(imageDataModel);

            that.imageDataModelDestination = imageDataModel;
            setImageData(tagImageDestination,imageDataModel);

        });

      }
    }
  }
}

</script>

<style scoped>
  .preview-image {
    border-style: solid; 
    border-width: 1px;
    width: 100%;
  }
</style>
