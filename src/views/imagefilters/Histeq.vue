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
  emptyFilterParams,
  FilterModel,
  apply
  } from '@/api/images/FilterService.js';

export default {
  name: 'Histeq',
  data: function () {
    return {
      filterName: 'histeq',
      dataImageSource: null,
      dataImageDestination: null
    }
  },
  methods: {
    simulate_onClickInputImageSource (event) {
      document.getElementById('inputImageSource').click();
    },
    onImageSourceFileChanged (e) {
      let that = this;

      const file = e.target.files[0];
      let img    = document.getElementById('imageSource')
      let reader = new FileReader();

      reader.onload = function (e) {
        img.src = e.target.result;
        that.dataImageSource = e.target.result;

        // console.log(that.dataImageSource);
      }

      reader.readAsDataURL(file);
    },
    onUpload() {
      let that = this;

      // reset image destination
      that.dataImageDestination = null;

      // filter
      if (this.dataImageSource !== null) {

        apply(
          new FilterModel(that.filterName,emptyFilterParams(),that.dataImageSource), 
          function (result) {

          let img = document.getElementById('imageDestination')
          img.src = result;
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
