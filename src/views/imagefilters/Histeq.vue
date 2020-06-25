<template>
  <CContainer>
    <ImageFilter
      name="Histeq"
      textButtonSelectImage="Select Image" 
      textButtonFilterImage="Filter Image">
    </ImageFilter>
  </CContainer>
</template>

<script>

// import components
import ImageFilter from '@/components/ImageFilter.vue';

export default {
  name: 'Histeq',
  components: {
    ImageFilter
  },
  data: function () {
    return {

    }
  },
  methods: {

  }
}

</script>

