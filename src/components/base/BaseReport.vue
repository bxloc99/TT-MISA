<template>
    <div class="report-success" v-bind:class="{animation: showAnimation}">
        <div class="icon-success">
            <i class="fas fa-check-circle"></i>
        </div>
        <div class="content-report">
            {{message}}
        </div>
        <div class="close-success">
            <i class="fas fa-times"></i>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Report',
  props: {
    show: {
        type: Boolean,
        default: false
    },
    message: {
        type: String,
        default: ''
    }
  },
  computed: {
      showAnimation(){
          return this.show;
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
