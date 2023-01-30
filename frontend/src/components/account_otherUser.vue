<template>
  <div class="lg:w-9/12 m-auto flex-col pl-1 pt-4 pr-1 bg-white pb-48">
    <!--OTHER USER INFO-->
    <h1 class="border-b border-gray-400 bg-gray-300 bg-opacity-50 rounded-xl p-4 mb-4">Compte utilisateur</h1>
    <section class="flex flex-col items-center w-full mb-5 ">
      <div class="flex flex-col sm:flex-row justify-center items-center w-full 2xl:w-9/12 mt-5 mb-5">
        <div class="flex flex-col justify-center items-center w-full sm:w-5/12">
          <img :src="infos.url_profile_picture" class="userPhoto" :alt="infos.alt_profile_picture">
        </div>
        <div class="flex flex-col justify-center align-items-center sm:w-5/12">
          <h2 class="text-center break-all">{{ infos.username }}</h2>
          <div class="mt-5 flex flex-row justify-evenly mb-5 text-lg" v-if="infos.bio && infos.bio.length > 0">
            <img class="w-4 h-4 self-start" src="../assets/img/guillemets-g.png" alt="image guillemets gauche">
            <p class="mr-1 ml-1">{{infos.bio}}</p>
            <img class="w-4 h-4 self-end" src="../assets/img/guillemets-d.png" alt="image guillemets droite">
          </div><p v-else class="text-left text-base italic">{{infos.username}} n'a pas renseigné de bio</p>
        </div>
      </div>
    </section>

    <!--OTHER USER POSTS-->
    <section class="flex flex-col items-center w-full">
      <h2 class="w-full border-b border-gray-400 bg-gray-300 bg-opacity-50 rounded-xl p-4 mb-4">Ses publications</h2>

      <!--NO POST PUBLISHED-->
      <article v-if="userPosts.length === 0" class="flex flex-col items-center justify-between allPosts">
        <h3 class="pt-3">{{ infos.username }} n'a rien posté !</h3>
        <p class="">Retrouvez toutes les publications sur le <router-link class="p-2 text-lg hover:bg-blue-300 rounded-xl text-blue-900" to="/wall">mur principal</router-link></p>
        <img src="../assets/img/hello.gif" alt="hello gif" class="mt-5 rounded-xl max-w-full max-h-48 mr-auto ml-auto imgPosts">
      </article>

      <!--ALL USER'S POSTS-->
      <article class="flex flex-col items-center mt-2 pb-2 w-full" v-for="(post, indexPost) in userPosts" :key="indexPost">
        <posts :index-post="indexPost" :post="post" class="w-full sm:w-9/12 lg:8/12 xl:w-6/12"></posts>
      </article>
    </section>

    <!--ADMIN PANEL IF CURRENT USER IS ADMIN-->
    <section v-if="currentUser.infos.role && currentUser.infos.role.includes('admin')" class="flex mt-10 flex-col items-center w-full">
      <h2 class="w-full border-b border-gray-400 bg-gray-300 bg-opacity-50 rounded-xl p-4 mb-4">Options pour l'utilisateur</h2>
      <div class="flex flex-col sm:flex-row w-full sm:w-9/12 items-center justify-between mt-5">
        <div class="flex flex-col w-full sm:w-5/12 mb-10 sm:mb-0">

          <!--UPDATE USER ROLE-->
          <h3>Privilège(s) de <span class="break-all">{{ infos.username }}</span></h3>
          <p class="text-base mb-2 sm:mb-0">Actuellement <span class="break-all">{{ infos.username }}</span> dispose des droits suivants : <span class="underline font-bold">{{ userRole.toUpperCase() }}</span></p>
          <button  @click.prevent="updatePrivilege()" class="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">Modifier les privilèges</button>
        </div>
        <div class="flex flex-col w-full sm:w-5/12">
          <a :href="'mailto:' + infos.email" class="inline-flex w-full text-white justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-base font-medium shadow-sm hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">Envoyer un mail à l'utilisateur</a>
          <button type="button" class="mt-5 inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm" @click="openDeleteAccountModal = !openDeleteAccountModal">Supprimer le compte de l'utilisateur</button>
          <div v-if="openDeleteAccountModal" class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div class="fixed inset-0 z-10 overflow-y-auto">
              <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div class="sm:flex sm:items-start">
                      <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                        </svg>
                      </div>
                      <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 class="text-lg font-medium leading-6 text-gray-900" id="modal-title">Supprimer le compte de <span class="break-all">{{infos.username}}</span></h3>
                        <div class="mt-2">
                          <p class="text-sm text-gray-500">Êtes vous sûr(e) de vouloir supprimer le compte de <span class="break-all">{{infos.username}}</span> ? Toutes les données seront supprimées définitivement. Cette action ne pourra pas être annulée.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button type="button" class="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm" @click="deleteUser()">Supprimer</button>
                    <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" @click="openDeleteAccountModal = !openDeleteAccountModal">Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Posts from "@/components/posts.vue";
export default {
  name: 'accountOtherUser',
  components: {Posts},
  data () {
    return {
      infos: {},
      openDeleteAccountModal: false,
      userRole: '',
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.user.currentUser
    },
    userPosts () {
      return this.$store.state.posts.allPostsFromUser
    },
  },
  methods: {
    //USER OPTIONS WHEN CURRENT USER IS ADMIN
    deleteUser () {
      if(this.$route.params.id == 2){
        this.showAlertError(`Vous ne pouvez pas supprimer ce compte par défaut`, '2500')
      } else {
        this.$store.dispatch('user/deleteUser', this.$route.params.id)
                .then(() => {
                  this.showAlertSuccess('Utilisateur Supprimé')
                  this.$router.push({name: 'wall'})
                })
      }
    },
    updatePrivilege () {
      let id = this.infos.id
      this.$store.dispatch('user/updatePrivilege', id)
        .then(() => {
          this.$store.dispatch('user/getOneUser', this.$route.params.id)
            .then((response) => {
              this.showAlertSuccess(`Les privilèges de ${response.data.username} ont été modifiés : ${JSON.parse(response.data.role).join(', ')}!`, '2500')
              this.infos = response.data
              this.userRole = JSON.parse(response.data.role).join(', ')
            })
        })
    },
    //MODALS AND ALERTS
    showAlertError (title, timer) {
      this.$swal({
        title: title,
        position: 'center',
        icon: 'error',
        showConfirmButton: false,
        timer: timer})
    },
    showAlertSuccess (title, timer) {
      this.$swal({
        title: title,
        position: 'center',
        icon: 'success',
        showConfirmButton: false,
        timer: timer || '1500'})
    },
  },
  beforeMount () {
    if (!this.$cookies.isKey('user')) {
      this.$router.push({name: 'auth'})
    } else {
      this.$store.dispatch('user/getCurrentUser')
        .then((user) => {
          if(this.$route.params.id == 2 && !user.data.role.includes('admin')){
            this.$router.push({name: 'wall'})
            this.showAlertError('Vous ne disposez pas des droits nécessaires pour accéder à ce profil', '2500')
          } else {
            this.$store.dispatch('user/getOneUser', this.$route.params.id)
                    .then(response => {
                      this.infos = response.data
                      this.userRole = JSON.parse(response.data.role).join(', ')
                      this.$store.dispatch('posts/getAllPostsFromOneUser', this.infos.id)
                              .then(posts => {
                                this.posts = posts.data
                              })
                    })
          }
        })
    }
  }
}
</script>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
  h1{
    font-size: 35px;
  }
  h2{
    font-size: 25px;
  }
  h3{
    font-size: 22px;
  }
  a:hover{
    text-decoration: none;
  }
  i{
    font-size: 1.2em;
  }
  i span{
    font-size: 0.8em;
  }
  .userPhoto{
    object-fit: cover;
    width: 150px;
    height: 150px;
    border-radius: 100%;
    border: 4px solid #2C3F5F;
    box-shadow: 0 0 12px black;
  }
</style>
