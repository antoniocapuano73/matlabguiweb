<template>
  <CContainer :id="imageFilterName()">
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
      <ImageFilterParams class="section" text="Filter Params"
        :filterParamsModel="filterParamsModel"
        :onChange="onChangeFilterParams">
      </ImageFilterParams>
    </CRow>
    <CRow>
      <ImageFilterDesign class="section" text="Script Text"
        :filterDesignModel="filterDesignModel"
        :admin="true">
      </ImageFilterDesign>
    </CRow>

  </CContainer>
</template>

<script>

// import components
import OpenImageDialog from '@/components/OpenImageDialog.vue';
import ShowImageDialog from '@/components/ShowImageDialog.vue';
import ImageFilterParams from '@/components/ImageFilterParams.vue';
import ImageFilterDesign from '@/components/ImageFilterDesign.vue';

// import code
import {
  ImageDataModel,
  IsImageDataModel
} from '@/api/models/ApiGlobalModels.js';

import {
  loadImage
}      from '@/lib/images/TagImages.js';

import {
  FilterParamsModel,
  FilterDesignModel,
  applyImageFilter,
  getFilterByName
} from '@/api/images/ImageFilterController.js';

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
    ImageFilterParams,
    ImageFilterDesign
  },
  data: function () {
    return {
      imageDataModelSource      : null,
      imageDataModelDestination : null,
      filterDesignModel         : null,
      filterParamsModel         : null,
    }
  },
  props: {
    name: {
      type: String,
      default: 'Filter',
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
  mounted: function() {
    let that = this;

    // enable component
    that.refreshComponentStatus(false);

    // filterDesignModel
    that.refreshFilterDesignModel(that.name);
  },
  methods: {
    imageFilterName: function() {
      return "ImageFilter" + this.name;
    },
    onChangeFilterParams: function(filterParamsModel,index) {
      let that = this;

      that.filterParamsModel = filterParamsModel;
    },
    onClickSourceImage: function() {

    },
    onLoadSourceImage: function(imageDataModel) {
      // return
      this.imageDataModelSource = imageDataModel;

      // clear destination image
      this.clearImageDataModelDestination();
    },
    clearImageDataModelDestination: function() {
      // clear destination image
      this.imageDataModelDestination = new ImageDataModel();
    },
    onUpload: function() {
      let that = this;

      // image destination
      let tagImageDestination = document.getElementById('imageDestination');
      //that.imageDataModelDestination = null;

      // filter
      if (that.imageDataModelSource !== null) {
        applyImageFilter(that.name,that.filterParamsModel,that.imageDataModelSource, 
          function (imageDataModel) {

            //console.log("imageDataModel");
            //console.log(imageDataModel);

            if (IsImageDataModel(imageDataModel)) {
              that.imageDataModelDestination = imageDataModel;
              setImageData(tagImageDestination,imageDataModel);
            } 
            else {
              // clear destination image
              that.clearImageDataModelDestination();
            }

        },
          function (e) {
            // clear destination image
            that.clearImageDataModelDestination();
        });

      }
    },
    onLoadDestinationImage: function(imageDataModel) {
    
    },
    refreshComponentStatus: function (enabled) {
      let that = this;
      let tagName = that.imageFilterName();

      let disabled = !enabled;

      try {

        let setNode = function (node,disabled) {
          if (node) {
            node.disabled = disabled;
            setChildNodes(node.getElementsByTagName('*'),disabled);
          }
        }

        let setChildNodes = function (childNodes,disabled) {
          if (childNodes)
            for (var node of childNodes) {
              setNode(node,disabled);
            }
        };

        setNode(document.getElementById(tagName),disabled);

      }
      catch (e) {
          console.log("ImageFilter.enabled data");
          console.log(e);
      }


    },
    clone: function(obj) {
        if (null == obj || "object" != typeof obj) return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
    },
    refreshFilterDesignModel: function (filterName) {
      let that = this;

      // init
      that.filterDesignModel = null;
      that.filterParamsModel = null;

      // filter
      getFilterByName(filterName,
        function (filterDesignModel) {
          try {
            
            if (filterDesignModel) {
              that.filterDesignModel = that.clone(filterDesignModel);
              that.filterParamsModel = that.clone(filterDesignModel.filterParams);

                //console.log("that.filterDesignModel.filterParams");
                //console.log(filterDesignModel.filterParams);

                //console.log("that.filterParamsModel");
                //console.log(that.filterParamsModel);

              // enable component
              that.refreshComponentStatus(true);
            }

          } 
          catch (e) {
            console.log("ImageFilter.refreshFilterDesignModel.getFilterByName");
            console.log(e);
          }


        });
    }
  },
  watch: { 
    name: function (filterName) {
      this.refreshFilterDesignModel(filterName);
    }
  }
}

</script>

<style scoped>
  .title {
    margin-bottom: 25px;
  }
  .section {
    margin-top: 25px;
  }
</style>