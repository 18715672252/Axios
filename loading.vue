<template>
    <div class="loading-wrapper-phone">
        <div class="toast toast-loading">
            <div class="toast-loading-wrap">
                <div class="toast-loading-leaf" v-for="(v, i, index) in 12" :style="{transform: `rotate(${30*i}deg) translate(7.92px)`, animationDelay: i*0.1+'s'}" :key="index"></div>
            </div>
            <p class="toast-loading-text">{{loadingTxt}}</p>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      loadingTxt: 'Loading...'
    }
  }
}
</script>

<style lang="stylus" scoped>
.loading-wrapper-phone
  position fixed
  z-index 10000
  width 100%
  height 100%
  top 0
  left: 0
  .toast
    left: 50%
    top: 35%
    margin-left: -3.8em
    transition-duration .2s
    transform scale(0.9)
    z-index 1000
    position fixed
    width 7.6em
    min-height 7.6em
    margin-left -3.8em
    background rgba(0, 0, 0, .7)
    text-align center
    border-radius: 5px
    color #fff
    display flex
    justify-content center
    align-items center
    flex-direction column
.toast-loading-wrap
  display flex
  justify-content center
  align-items center
  min-height 3em
  margin 0 0 1em 0
.toast-loading-leaf
  top -1px
  opacity .25
  animation toast-loading 1.2s linear infinite
.toast-loading-leaf:before
  content " "
  position absolute
  width 8.14px
  height 3.08px
  background #d1d1d5;
  box-shadow 0 0 1px rgba(0, 0, 0, .0980392)
  border-radius 1px
  -webkit-transform-origin: left 50% 0
  transform-origin left 50%
@keyframes toast-loading {
    0%,
    16.6767% {
        opacity: .25;
    }
    16.6867% {
        opacity: 1;
    }
    76.6767%,
    100% {
        opacity: .25;
    }
}
</style>
