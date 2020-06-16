<template>
  <CContainer>
    <CRow>
      <CCol Cols="6">
        <OpenImageDialog 
          textButton='Select image'
          @click="onClickSourceImage()"
          @load="onLoadSourceImage(arguments[0])">
        </OpenImageDialog>
      </CCol>
      <CCol Cols="6">
        <ShowImageDialog
          textButton='Filter image'
          :imageDataModel="imageDataModelDestination"
          @click="onUpload">
        </ShowImageDialog>
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
  name: 'Histeq',
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
  methods: {
    onClickSourceImage: function() {
      // debug
      //console.log('click');

      // image destination
      let tagImageDestination   = document.getElementById('imageDestination');

    },
    onLoadSourceImage: function(imageDataModel) {
      // debug
      //console.log('load');
      //console.log(imageDataModel);

      // return
      this.imageDataModelSource = imageDataModel;
    },
    onUpload() {
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
