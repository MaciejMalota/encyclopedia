
<template>
  <vue3-star-ratings v-model="rating" />
</template>

<script>
import { defineComponent } from "vue";
import vue3starRatings from "vue3-star-ratings";

export default defineComponent({
  components: {
    vue3starRatings,
  },
});
</script>
