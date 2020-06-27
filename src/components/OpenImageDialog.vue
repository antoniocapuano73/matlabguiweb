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
          <CButton class="button" color="primary" @click ="simulate_onClickInputImageSource">
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="visibleSpinner"></span>
            {{textButton}}
          </CButton>          
          
          <input type="file" name="inputImageSource" id="inputImageSource"
            accept="image/*"
            style="display: none"
            @change="onImageSourceFilenameChanged">
      </div>
    </CRow>
    <CRow>
      <div class="preview-image">
          <img id="imageOpenImageDialog" alt="source image" width="100%" @click ="simulate_onClickInputImageSource">
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
        //console.log("OpenImageDialog.simulate_onClickInputImageSource");

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
      let filename = e.target.files[0];
      let tagImage = document.getElementById('imageOpenImageDialog')

      // clear source image
      tagImage.src  = "";
      that.visibleSpinner = true;

      let successFunction = function(imageDataModel) {

                  tagImage.onload = function(e) {
                    // hide spinner
                    that.visibleSpinner = false;

                    // raise event
                    that.$emit('load',imageDataModel);

                    // onLoad
                    if (that.onLoad) {
                      if (typeof that.onLoad === 'function') {

                        try {
                          that.onLoad(imageDataModel);;

                        } catch (e) {
                          console.log('OpenImageDialog onLoad error!');
                        }

                      }
                    }

                  }

        // display image
        setImageData(tagImage,imageDataModel);
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
</style>
