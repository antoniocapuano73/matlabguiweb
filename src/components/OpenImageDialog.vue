<!--
    props:
        textButton

        onClick
        onLoad(imageDataModel)
-->
<template>
  <CContainer>
    <CRow>
      <div>
          <CButton class="button" color="primary" @click ="simulate_onClickInputImageSource">{{textButton}}</CButton><br>
          <input type="file" name="inputImageSource" id="inputImageSource"
            accept="image/*"
            style="display: none"
            @change="onImageSourceFilenameChanged">
      </div>
    </CRow>
    <CRow>
    </CRow>
    <CRow>
      <div class="text-center" v-if="visibleSpinner">
        <div class="spinner-border" style="width: 4rem; height: 4rem;" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <div class="preview-image">
          <img id="imageSource" alt="source image" width="100%" @click ="simulate_onClickInputImageSource">
      </div>
    </CRow>
  </CContainer>
</template>

<script>
// import UploadImage from 'vue-upload-image';
import {loadImage} from '@/lib/images/TagImages.js';

import {
  ctxImage,
  getImageData,
  setImageData
} from '@/lib/images/TagImages.js'

export default {
  name: 'OpenImageDialog',
  data: function () {
    return {
      visibleSpinner: false,
    }
  },
  props: {
    textButton: {
      type: String,
      default: 'Select image'
    },
    onClick: {
      type: Function,
      default: null
    },
    onLoad: {
      type: Function,
      default: null
    }
  },
  methods: {
    simulate_onClickInputImageSource: function(event) {
        let that = this;

        // raise event
        this.$emit('click');

        // onClick
        if (that.onClick) {
          if (typeof that.onClick === 'function') {
            try {
              that.onClick();

            } catch (e) {
              console.log('OpenImageDialog onClick error!');
            }
          }
        }

        // simulate
        document.getElementById('inputImageSource').click();

    },
    onImageSourceFilenameChanged: function(e) {
      let that = this;
      let filename       = e.target.files[0];
      let tagImageSource = document.getElementById('imageSource')

      // show spinner
      that.visibleSpinner = true;
      tagImageSource.src = "";

      let successFunction = function(imageDataModel) {

                  tagImageSource.onload = function(e) {
                    // raise event
                    that.$emit('load',imageDataModel);

                    // onLoad
                    if (that.onLoad) {
                      if (typeof that.onLoad === 'function') {
                        that.onLoad(imageDataModel);
                      }
                    }

                  }

        // hide spinner
        that.visibleSpinner = false;

        // display image
        setImageData(tagImageSource,imageDataModel);
      }

      let errorFunction = function(e) {
        // hide spinner
        that.visibleSpinner = false;
      }

      loadImage(filename,successFunction,errorFunction);

    }
  }
}

</script>

<style scoped>
  .button {
    margin-bottom: 5px;
  }
  .preview-image {
    border-style: solid; 
    border-width: 1px;
    width: 100%;
    margin-bottom: 5px;
  }
  .text-center {
    border-style: solid; 
    border-width: 1px;
    width: 100%;
    padding-top: 50%;
    padding-bottom: 50%;
    margin-bottom: 5px;
  }
</style>
