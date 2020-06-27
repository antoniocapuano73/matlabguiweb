<!--
    props:
        textButton
        onClick()
        onLoad(imageDataModel)
        imageDataModel       <- ImageDataModel
-->
<template>
  <CContainer>
    <CRow>
        <div >
            <CButton class="button" color="primary" @click ="getImage">
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="visibleSpinner"></span>
              {{textButton}}
            </CButton>
        </div>
    </CRow>
    <CRow>
        <div class="preview-image">
            <img id="imageShowImageDialog" alt="showing image" width="100%">
        </div>
    </CRow>
  </CContainer>
</template>

<script>
// import UploadImage from 'vue-upload-image';
import {setImageData} from '@/lib/images/TagImages.js'

export default {
  name: 'ShowImageDialog',
  data: function () {
    return {
      visibleSpinner: false,
    }
  },
  props: {
    textButton: {
      type: String,
      default: 'Show image'
    },
    onClick: {
      type: Function,
      default: null
    },
    onLoad: {
      type: Function,
      default: null
    },
    imageDataModel: {
      type: Object,
      default: null
    }
  },
  methods: {
    getImage: function() {
        let that = this;
        let tagImage = document.getElementById('imageShowImageDialog');

        // clear source image
        tagImage.src  = "";

        // show spinner
        that.visibleSpinner = true;

        // debug
        // console.log("that.visibleSpinner",that.visibleSpinner);

        // raise event
        this.$emit('click');
  
        // onClick
        if (that.onClick) {
          if (typeof that.onClick === 'function') {

            try {
              that.onClick();

            } catch (e) {
              console.log('ShowImageDialog onClick error!');
            }

          }
        }
    },
    showedImage: function() {
      let that = this;

      // hide spinner
      that.visibleSpinner = false;

      // debug
      // console.log("that.visibleSpinner",that.visibleSpinner);

      // raise event
      that.$emit('load',that.imageDataModel);

      // onLoad
      if (that.onLoad) {
        if (typeof that.onLoad === 'function') {
          try {
            that.onLoad(that.imageDataModel);

          } catch (e) {
            console.log('ShowImageDialog onLoad error!');
          }
        }
      }
    }
  },
  watch: { 
    imageDataModel: function (imageDataModel) {
      let that = this;
      let tagImage = document.getElementById('imageShowImageDialog');

      if (imageDataModel) {
        tagImage.onload = that.showedImage();

        setImageData(tagImage,imageDataModel);
      }
      else {
        // hide spinner
        //that.visibleSpinner = false;
        tagImage.src="";
      }


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