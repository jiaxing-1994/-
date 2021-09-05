<template>
  <preview-code
    :type="1"
  ></preview-code>
</template>

<script>
import { useSelfRoute, useSelfRouter } from '../../use/useSelfRoute';
import PreviewCode from "../../components/previewCode/index";
export default {
  name: '',
  components: {PreviewCode},
  setup() {
    const { query } = useSelfRoute();
    const { Router } = useSelfRouter();
    return {
      Router,
      query,
    }
  },
}
</script>

<style scoped>

</style>
