<template>
  <CContainer>
    <CRow>
      <CCol Cols="6">
        <div>
          <CButton color="primary" @click ="simulate_onClickInputImageSource">Select image</CButton><br>
          <input type="file" name="inputImageSource" id="inputImageSource"
            accept="image/*"
            style="display: none"
            @change="onImageSourceFileChanged">
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
import {
  ImageDataModel,
  apply0P,
  applyCP
  } from '@/api/images/FilterService.js';

export default {
  name: 'Histeq',
  data: function () {
    return {
      imageDataSource: null,
      imageDataDestination: null
    }
  },
  methods: {
    simulate_onClickInputImageSource (event) {
      document.getElementById('inputImageSource').click();
    },
    ctxImage(tagImage) {
      let canvas    = document.createElement("canvas");
      canvas.width  = tagImage.naturalWidth;
      canvas.height = tagImage.naturalHeight;

      let ctx = canvas.getContext("2d");

      return ctx
    },
    imageData(tagImage) {
      let ctx = this.ctxImage(tagImage);
      ctx.drawImage(tagImage,0,0,tagImage.naturalWidth,tagImage.naturalHeight);
      let imageData = ctx.getImageData(0,0,tagImage.width,tagImage.height);

      return imageData.data;
    },
    onImageSourceFileChanged (e) {
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
        let imageData = that.imageData(tagImage);

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

      // reset image destination
      that.imageDataDestination = null;

      // filter
      if (that.imageDataSource !== null) {
        apply0P('histeq',that.imageDataSource, 
          function (result) {
          
          console.log(result);

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
