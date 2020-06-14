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
import {apply0P} from '@/api/images/ImageFilterController.js';

import {
  ctxImage,
  getImageData,
  setImageData
} from '@/lib/images/TagImages.js'

export default {
  name: 'Histeq',
  data: function () {
    return {
      imageDataSource: null,
      imageDataDestination: null
    }
  },
  methods: {
    simulate_onClickInputImageSource: function(event) {
      document.getElementById('inputImageSource').click();
    },
    onImageSourceFilenameChanged (e) {
      let that = this;

      const file = e.target.files[0];

      let img    = document.getElementById('imageSource')
      let reader = new FileReader();

      /*
      reader.onloadstart = printEventType;
      reader.onprogress  = printEventType;
      reader.onload      = printEventType;
      reader.onloadend   = printEventType;
      */

      reader.onload = function (e) {
        let image = e.target.result;
        img.src   = image;
      }

      img.onload = function(e) {
        let tagImage  = e.target;
        let imageData = getImageData(tagImage);

        // return
        that.imageDataSource = 
          new ImageDataModel(
            tagImage.naturalWidth,
            tagImage.naturalHeight,
            imageData);
      }

      // reader.readAsDataURL(file);
      reader.readAsDataURL(file);
    },
    onUpload() {
      let that = this;

      // image destination
      let img = document.getElementById('imageDestination');
      that.imageDataDestination = null;

      // filter
      if (that.imageDataSource !== null) {
        apply0P('histeq',that.imageDataSource, 
          function (result) {
            let imageData = result;
          
            that.imageDataDestination = imageData;
            setImageData(img, 
              imageData.width, 
              imageData.height, 
              imageData.data);

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
