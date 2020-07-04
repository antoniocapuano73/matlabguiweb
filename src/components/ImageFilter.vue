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
      <ImageFilterParams class="section" v-if="isFilterParamsModel()"
        text="Filter Params"
        :filterParamsModel="filterParamsModel"
        :onChange="onChangeFilterParams">
      </ImageFilterParams>
    </CRow>
    <CRow>
      <ImageFilterDesign class="section" v-if="isFilterDesignModel()"
        text="Script Text"
        :filterDesignModel="filterDesignModel">
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
import {ImageDataModel} from '@/api/models/ApiGlobalModels.js';
import {loadImage}      from '@/lib/images/TagImages.js';
import {
    FilterParamsModel,
    FilterDesignModel,
    apply0P,
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
      filterDesignModel         : new FilterDesignModel(),
      filterParamsModel         : new FilterParamsModel(),
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
    isFilterParamsModel: function() {
      let that = this;

      try {
        return (
          (that.filterParamsModel) && 
          (that.filterParamsModel.count > 0));
      }
      catch (e) {
        return false;
      }
    },
    isFilterDesignModel: function() {
      let that = this;

      try {
        return (
          (that.filterDesignModel) && 
          (that.filterDesignModel.ID > 0));
        }
      catch (e) {
        return false;
      }
    },
    onChangeFilterParams: function(filterParamsModel,index) {


    },
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

      // filter
      if (that.imageDataModelSource !== null) {
        apply0P(that.name,that.imageDataModelSource, 
          function (imageDataModel) {

            //console.log(imageDataModel);

            that.imageDataModelDestination = imageDataModel;
            setImageData(tagImageDestination,imageDataModel);

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
    refreshFilterDesignModel: function (filterName) {
      let that = this;

      // init
      that.filterDesignModel = null;
      that.filterParamsModel = new FilterParamsModel();

      // filter
      getFilterByName(filterName,
        function (filterDesignModel) {
          try {

            if (filterDesignModel) {
              that.filterDesignModel = filterDesignModel;

              if (that.filterDesignModel.ParamNames) {

                if (that.filterDesignModel.ParamNames.count > 0) {

                  // filterParamsModel.count
                  that.filterParamsModel.count = that.filterDesignModel.ParamNames.count;

                  // filterParamsModel.items
                  for (let i=0; i < that.filterDesignModel.ParamNames.count; i++) {
                    let filterParamModel = that.filterParamsModel.items[i];
                    let paramName        = that.filterDesignModel.ParamNames.items[i];

                    filterParamModel.name = paramName;
                  }

                  // enable component
                  that.refreshComponentStatus(true);
                }
              }
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
      this.getFilterDesignModel(filterName);
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