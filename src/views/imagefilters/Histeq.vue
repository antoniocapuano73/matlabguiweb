<template>
  <CContainer>
    <CRow>
      <div>
        <CButton color="primary" @click ="simulate_onClickInputImageSource">Select image</CButton><br>
        <input type="file" name="inputImageSource" id="inputImageSource"
          accept="image/*"
          style="display: none"
          @change="onImageSourceFileChanged">
      </div>
    </CRow>
    <CRow>
      <p> </p>
    </CRow>
    <CRow>
      <CCol Cols="6">
        <div>
          <img id="imageSource" class="preview-image" alt="source image" 
            @click ="simulate_onClickInputImageSource"
          >
        </div>
      </CCol>
      <CCol Cols="6">
        <div style="border-style: solid; border-width: 1px;">
          <img src="" alt="filtered image" >
        </div>
      </CCol>
    </CRow>
  </CContainer>
</template>

<script>
import UploadImage from 'vue-upload-image';
export default {
  name: 'Histeq',
  data: function () {
    return {
      dataImageSource: ''
    }
  },
  methods: {
    simulate_onClickInputImageSource (event) {
      document.getElementById('inputImageSource').click();
    },
    onImageSourceFileChanged (e) {
      const file = e.target.files[0];
      let img = document.getElementById('imageSource')

      let reader = new FileReader();
      reader.onload = function (e) {
        img.src = e.target.result;
      }

      reader.readAsDataURL(file);
    },
    onUpload() {
      // upload file
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
