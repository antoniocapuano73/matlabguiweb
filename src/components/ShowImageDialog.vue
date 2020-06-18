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
            <CButton color="primary" @click ="getImage">{{textButton}}</CButton><br>
        </div>
    </CRow>
    <CRow>
    </CRow>
    <CRow>
        <div class="preview-image">
            <img id="image" alt="showing image" @load ="showedImage">
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
      setImageData(document.getElementById('image'),imageDataModel);
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