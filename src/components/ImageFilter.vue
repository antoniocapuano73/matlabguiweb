<template>
  <CContainer>
    <CRow>
      <h1 class="title">{{ name }}</h1>
    </CRow>
    <CRow>
      <CCol Cols="6">
        <OpenImageDialog
          :textButton="textButtonSelectImage"
          :onClick="onClickSourceImage"
          :onLoad ="onLoadSourceImage">
        </OpenImageDialog>
      </CCol>
      <CCol Cols="6">
        <ShowImageDialog
          :textButton="textButtonFilterImage"
          :imageDataModel="imageDataModelDestination"
          :onClick="onUpload"
          :onLoad ="onLoadDestinationImage">
        </ShowImageDialog>
      </CCol>
    </CRow>
    <CRow>
      <CCol Cols="6">
      </CCol>
      <CCol Cols="6">
      </CCol>
    </CRow>
  </CContainer>
</template>

<script>

// import components
import OpenImageDialog from '@/components/OpenImageDialog.vue';
import ShowImageDialog from '@/components/ShowImageDialog.vue';

// import code
import {ImageDataModel} from '@/api/models/ApiGlobalModels.js';
import {loadImage}      from '@/lib/images/TagImages.js';
import {apply0P}        from '@/api/images/ImageFilterController.js';

import {
  ctxImage,
  getImageData,
  setImageData
} from '@/lib/images/TagImages.js'

export default {
  name: 'ImageFilter',
  components: {
    OpenImageDialog, 
    ShowImageDialog,
  },
  data: function () {
    return {
      imageDataModelSource: null,
      imageDataModelDestination: null
    }
  },
  props: {
    name: {
      type: String,
      default: 'Filter'
    },
    textButtonSelectImage: {
      type: String,
      default: 'Select image'
    },
    textButtonFilterImage: {
      type: String,
      default: 'Filter image'
    }
  },
  methods: {
    onClickSourceImage: function() {

    },
    onLoadSourceImage: function(imageDataModel) {
      // return
      this.imageDataModelSource = imageDataModel;

      // clear destination image
      this.imageDataModelDestination = null;
    },
    onUpload: function() {
      let that = this;

      // image destination
      let tagImageDestination = document.getElementById('imageDestination');
      that.imageDataModelDestination = null;

      // debug
      // console.log(that.imageDataModelSource);

      // filter
      if (that.imageDataModelSource !== null) {
        apply0P('histeq',that.imageDataModelSource, 
          function (imageDataModel) {

            //console.log(imageDataModel);

            that.imageDataModelDestination = imageDataModel;
            setImageData(tagImageDestination,imageDataModel);

        });

      }
    },
    onLoadDestinationImage: function(imageDataModel) {
    
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
  .title {
    margin-bottom: 25px;
  }
</style>