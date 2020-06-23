<!--
    props:
        textButton

        onClick
        onLoad(imageDataModel)
-->
<template>
  <CContainer>
    <CRow>
        <div >
            <CButton color="primary" @click ="simulate_onClickInputImageSource">{{textButton}}</CButton><br>
            <input type="file" name="inputImageSource" id="inputImageSource"
              accept="image/*"
              style="display: none"
              @change="onImageSourceFilenameChanged">
        </div>
    </CRow>
    <CRow>
    </CRow>
    <CRow>
        <div class="preview-image">
            <img id="imageSource" alt="source image" width="100%"
            @click ="simulate_onClickInputImageSource"
            >
        </div>
    </CRow>
  </CContainer>
</template>

<script>
// import UploadImage from 'vue-upload-image';
import {loadImage}      from '@/lib/images/TagImages.js';

import {
  ctxImage,
  getImageData,
  setImageData
} from '@/lib/images/TagImages.js'

export default {
  name: 'OpenImageDialog',
  data: function () {
    return {
      
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
      let tagimageSource = document.getElementById('imageSource')

      loadImage(filename, function(imageDataModel){
        tagimageSource.onload = function(e) {
          // raise event
          that.$emit('load',imageDataModel);

          // onLoad
          if (that.onLoad) {
            if (typeof that.onLoad === 'function') {
              try {
                that.onLoad(imageDataModel);

              } catch (e) {
                console.log('OpenImageDialog onLoad error!');
              }
            }
          }
        }

        // display image
        setImageData(tagimageSource,imageDataModel);

      });

    }
  }
}

</script>

<style scoped>
  .preview-image {
    border-style: solid; 
    border-width: 1px;
    width: 100%;
    margin-top: 5px;
  }
</style>
