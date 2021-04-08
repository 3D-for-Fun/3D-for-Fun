<template>
  <div class="wrapper">My name is {{ name }}.</div>
</template>

<script>
export default {
  data() {
    return {
      name: "jeff.fu",
    };
  },
};
</script>

<style lang="stylus" scoped>
.wrapper {
  color: $accentColor;
}
</style>


