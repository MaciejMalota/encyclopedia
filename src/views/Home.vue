<template>
  <div class="home">
  SIEMA
    </div>
<!-- <star-rating @update:rating ="setRating" increment="0.5"></star-rating> -->
</template>

<script>
// import StarRating from 'vue-star-rating';
export default {
  // components: {StarRating},
  beforeCreate() {
    // do body background w global.css
    document.body.className = "home";
  },
  data() {
    return {
      rating: 0,
    };
  },
  methods: {
  
  },
};
</script>

<style scoped>

</style>>


