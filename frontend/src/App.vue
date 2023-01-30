<template>
  <div class="flex flex-col content-center justify-items-center h-screen" id="container">
    <!--NAVBAR - SEE COMPONENT 'navBar.vue'-->
    <nav-bar></nav-bar>

    <!--ROUTER - SEE 'router/index.js'-->
    <router-view @click="footerFunctionLeave"></router-view>

    <!--FOOTERBAR - SEE COMPONENT 'footerBar.vue'-->
    <footerBar></footerBar>
  </div>
</template>

<script>
import navBar from '@/components/navBar.vue'
import footerBar from '@/components/footerBar.vue'
export default {
  name: 'App',
  components: {navBar, footerBar},
  methods: {
    footerFunctionLeave (){
      if(!this.contactUsActive && !this.logoClicked){
        let footer = document.getElementById('footerFunction')
        let chevron = document.getElementById('chevronUp')
        footer.classList.add('hidden')
        chevron.classList.remove('hidden')
      }
    },
  }
}
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
@font-face {
  font-family: 'Chewy';
  src: url("./assets/fonts/Chewy.woff") format('woff');
}
a, button, i, input, textarea{
  outline: 0 none !important;
}
::before, ::after{
  font-weight: bold !important;
}
#container {
  font-family: 'Poppins', sans-serif;
  text-align: center;
}
#app{
  display: flex !important;
  flex-direction: column !important;
  width: 100% !important;
  padding: 0 !important;
  margin: 0 !important;
  max-width: 100% !important;
}
</style>
