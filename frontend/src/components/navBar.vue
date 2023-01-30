<template>
  <header class="container-fluid sm:flex-row flex-col items-center p-2 flex ">
    <!--LINK RETURN-->
    <div class="sm:w-3/12 w-full order-3 sm:order-1 flex justify-center items-center m-auto">
      <router-link v-if="$route.name !== 'wall' && $route.name !== 'auth'" :to="{name: 'wall'}" class="hover:bg-transparent hover:opacity-70 justify-center p-0">
        <i class="far fa-arrow-alt-circle-left flex flex-row items-center">
          <span>Retour</span>
        </i>
      </router-link>
    </div>
      <!--LOGO-->
    <router-link :to="{name: 'wall'}" class="order-1 sm:order-2 sm:w-6/12 flex justify-center items-center hover:scale-75 hover:bg-transparent">
      <img src="../assets/img/logo.png" tabindex="0" class="p-0" alt="Logo Groupomania" id="navBarLogo">
    </router-link>
    <!--DISCONNECTION BUTTON-->
    <div class="sm:w-3/12 w-full flex order-2 sm:order-3 mb-4 mt-2 sm:mb-0 sm:mt-0 justify-evenly items-center sm:m-auto">
      <div class="w-full flex flex-row justify-evenly items-center" v-if="currentUser.infos.role !== undefined" :style="{display: this.$cookies.isKey('user') ? 'flex' : 'none'}">
        <div class=" w-4/12 flex items-center justify-center">
          <router-link :to="{name: 'admin'}" class="justify-center w-full hover:bg-transparent hover:opacity-50" aria-label="Administration">
            <i v-if="currentUser.infos.role.includes('admin')" class="fa-solid fa-users-gear " id="admin">
            </i>
          </router-link>
        </div>
        <router-link :to="`/profile/${currentUser.id}`" class="w-4/12 justify-center items-center hover:bg-transparent hover:opacity-50" arial-label="Profil">
          <i class="fa-regular fa-user " id="profileIcon">
          </i>
        </router-link>
        <router-link :to="{name: 'auth'}" class="w-4/12 justify-center hover:bg-transparent items-center hover:opacity-50" aria-label="déconnexion">
          <i class="fa-solid fa-power-off" @click.prevent="removeCookie" id="signOff"></i>

        </router-link>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'navBar',
  computed: {
    visibilityTest () {
      if (this.$route.name === 'profile') {
        return true
      } else if (this.$route.name === 'faq') {
        return true
      } else if (this.$route.name === 'admin') {
        return true
      } else {
        return false
      }
    },
    currentUser () {
      return this.$store.state.user.currentUser
    }
  },
  methods: {
    removeCookie () {
      this.$cookies.remove('user')
      this.$router.push({name: 'auth'})
    }
  }
}
</script>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
.container-fluid{
  background-color: #2C3F5F;
  margin: 0;
}
img{
  object-fit: scale-down;
  max-height: 60px;
}
i{
  font-size: 25px;
  color: white;
}
</style>
