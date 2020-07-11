<template>
  <CContainer>
    <ImageFilter
      name="histeq"
      textButtonSelectImage="Select Image" 
      textButtonFilterImage="Filter Image">
    </ImageFilter>
  </CContainer>
</template>

<script>

// import components
import ImageFilter from '@/components/ImageFilter.vue';

export default {
  name: 'histeq',
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

