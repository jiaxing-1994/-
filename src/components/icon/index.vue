<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="`#icon-${name}`"></use>
  </svg>
</template>

<script>
  export default {
    name: 'icon',
    props: {
      name: {
        type: String,
      }
    },
  }
</script>

<style scoped>

</style>
