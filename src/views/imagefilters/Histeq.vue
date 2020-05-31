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
          <img id="destinationSource" alt="filtered image" >
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
      dataImageSource: null,
      dataImageDestination: null
    }
  },
  methods: {
    simulate_onClickInputImageSource (event) {
      document.getElementById('inputImageSource').click();
    },
    onImageSourceFileChanged (e) {
      const file = e.target.files[0];
      let img    = document.getElementById('imageSource')
      let reader = new FileReader();

      reader.onload = function (e) {
        img.src = e.target.result;
        this.dataImageSource = e.target.result;


        console.log(this.dataImageSource);
      }

      reader.readAsDataURL(file);
    },
    onUpload() {
      console.log("this.dataImageSource: " + this.dataImageSource);

      if (this.dataImageSource !== null) {
        // upload file
        console.log("1");
        data = 
          filterService.applyWP( 
              'histeq', 
              new ImageContentModel(this.dataImageSource));

        console.log("2");
        this.dataImageDestination = data.content;


        console.log(this.dataImageDestination);
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
