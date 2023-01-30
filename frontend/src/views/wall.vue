<template>
  <main id="wall" class="m-auto w-screen p-2 lg:p-0 lg:w-9/12">
    <div class="flex-col">

      <!--SEARCH BAR-->
      <section id="searchBarBg" class="flex mt-5 mb-5 mr-auto ml-auto items-center justify-center w-full xl:w-8/12">
        <form class="flex flex-col sm:flex-row items-center justify-center w-full">
          <label for="barSearch" class="sm:w-3/12 xl:w-2/12 w-full flex mb-0 sm:mr-5 justify-center">Votre recherche</label>
          <input placeholder="Rechercher un utilisateur" type="search" id="barSearch" v-model="userResearch" class="sm:w-6/12 xl:w-7/12 sm:h-12 w-full relative flex text-sm lg:text-base appearance-none sm:rounded-none rounded-xl sm:rounded-bl-xl sm:rounded-tl-xl border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
          <button id="btnSearch" type="submit" @click.prevent="research()" class="sm:w-3/12 xl:w-3/12sm:h-12 w-full flex justify-center items-center rounded-xl text-sm hover:opacity-70 sm:rounded-none sm:rounded-br-xl sm:rounded-tr-xl border border-gray-300 px-3 py-2"><i class="fa-solid fa-magnifying-glass"></i> Rechercher</button>
          <div v-if="hasClickedResearch" class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div class="fixed inset-0 z-10 overflow-y-auto">
              <div class="flex min-h-full items-center justify-center lg:p-4 text-center sm:items-center sm:p-0">
                <div class="relative w-11/12 transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div class="sm:flex flex-col justify-center content-center">
                      <div class="flex flex-row justify-center content-center">
                        <div class="hidden mx-auto lg:flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                          <img src="../assets/img/research.png" alt="Image décorative recherche">
                        </div>
                        <div class="flex mt-3 text-center sm:mt-0 sm:ml-4 self-center">
                          <h3 class="lg:text-lg text-sm font-medium leading-6 text-gray-900" id="modal-title">Résultat de votre recherche :</h3>
                        </div>
                      </div>
                      <div>
                        <div class="mt-5">
                          <div v-if="userResult.length === 0">Aucun utilisateur ne correspond à votre recherche</div>
                          <router-link v-else class="flex flex-col lg:flex-row items-center w-11/12 lg:w-8/12 ml-auto mr-auto mt-5 mb-5 lg:p-2 justify-center hover:bg-blue-300 rounded-xl" v-for="user in userResult" :key="user.id" id="userResearch" :to="`/profile/${user.id}`" >
                            <img :src="user.url_profile_picture" class="lg:mr-5 userPhotoPosts" :alt="user.alt_profile_picture"/>
                            <h4 class="flex text-break text-center lg:self-center lg:w-8/12">{{ user.username }}</h4>
                          </router-link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" @click="clearResearch(), hasClickedResearch = false">Fermer</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>

      <!--USER PART - SEE COMPONENT 'wall_userPart.vue'-->
      <user-part></user-part>

      <!--DIVIDER-->
      <h2 class="divider flex justify-center items-center lg:m-10 p-5 w-12/12">Der&shy;nières actua&shy;lités</h2>

      <!--POST PART - SEE COMPONENT 'wall_postPart.vue'-->
      <posts-part></posts-part>

    </div>

    <!--END DIVIDER-->
    <div id="divider_end" class="flex justify-center self-center mt-5 mb-36">
      <img src="../assets/img/divider_end.png" alt="divider"/>
    </div>
  </main>
</template>

<script>
import UserPart from '@/components/wall_userPart.vue'
import PostsPart from '@/components/wall_postsPart.vue'
export default {
  name: 'wall',
  components: {PostsPart, UserPart},
  data () {
    return {
      hasClickedResearch : false,
      userResearch: '',
      posts: this.$store.state.posts.allPosts,
      userResult: '',
      showModal: false,
      firstConnexion: false
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.user.currentUser
    },
  },
  beforeCreate () {
    if (!this.$cookies.isKey('user')) {
      this.$router.push({name: 'auth'})
    } else {
      this.$store.dispatch('user/getCurrentUser')
        .catch(error => {
          if(error.message.split('code ')[1].includes('404')){
            this.$router.push({name: 'auth'})
            .then(() => {
              this.$cookies.remove('user')
            })
          }
        })
    }
  },
  beforeMount() {
    if (!this.$cookies.isKey('user')) {
      this.$router.push({name: 'auth'})
    } else {
      this.$store.dispatch('posts/getAllPosts')
          .then(() => {
            this.$store.dispatch('user/getCurrentUser', this.$cookies.get('user').user_id)
                .then(() => {
                  if (this.$store.state.user.currentUser.infos.lastLogin === '0000-00-00 00:00:00') {
                    this.showWelcomeAlert()
                  }
                  if (this.$store.state.user.currentUser.infos.role.includes('admin')) {
                    this.$store.dispatch('messageWaiting')
                  }
                })
          })
    }

  },
  methods: {
    showWelcomeAlert () {
      this.$swal({
        title: '<h2 style="color: deepskyblue;">Bienvenue !</h2>',
        position: 'center',
        html: `<p style="color: #2C3F5F;">Vous venez de vous inscrire sur notre réseau social !<br>
        Pour vous aider à commencer à vous servir de ses fonctionnalités,<br>
        voici quelques conseils : <br><br>
        - Vous pouvez accéder à votre page profil en cliquant sur <i class="fas fa-user" style="color: white; background-color: #2C3F5F; padding: 2%;"></i><br><br>
        - Si vous rencontrez un problème, rendez-vous sur la page FAQ<br><br>
        - Si vous ne trouvez pas de réponse à votre problème sur la page FAQ, n'hésitez pas à nous contacter via la rubrique "Nous Contacter"<br><br>
        <strong style="color: lightcoral;">- N'oubliez pas de rester courtois et poli lors de vos publications ou commentaires faute de quoi ceux-ci pourront être modifiés ou supprimés par l'administrateur</strong><br><br>
        - N'hésitez pas à signaler tout contenu déplacé ou désobligeant en cliquant sur les options du post ou du commentaire puis sur " <i class="fa-solid fa-triangle-exclamation"></i> Signaler le post/commentaire "<br><br>
        Bonne navigation !</p>`,
        showConfirmButton: true
      }).then(() => {
        let formData = new FormData
        formData.append('lastLogin', '')
        let payload = {
          userId: this.currentUser.id,
          formData: formData
        }
        this.$store.dispatch('user/updateUser', payload)
      })
    },
    showAlertError (title, timer) {
      this.$swal({
        title: title,
        position: 'center',
        icon: 'error',
        showConfirmButton: false,
        timer: timer})
    },
    clearResearch () {
      this.showModal = false
      this.userResearch = ''
      this.userResult = ''
    },
    research () {
      // eslint-disable-next-line no-useless-escape
      let regex = new RegExp(/['\|\/\\\*\+&#"\{\(\[\]\}\)<>$£€%=\^`]/g)
      if (this.userResearch.length === 0) {
        this.showAlertError('Merci de renseigner un nom avant de cliquer sur le bouton de recherche', '1500')
      } else if (regex.test(this.userResearch)){
        this.showAlertError(`Merci de ne pas utiliser les caractères suivant : |/*+&#{([]})<>$£€%=^ `, '4000')
      } else {
          let data = {
          research: this.userResearch.toString()
        }
        this.hasClickedResearch = true
        this.$store.dispatch('researchUser', data)
          .then(() => {
            this.userResult = this.$store.state.research.resultResearch
          }).catch(error => {
            if (error.message.split('code ')[1].includes('500')) {
              this.showAlertError(`Oups ! Quelque chose s'est mal passé ! Si cela se reproduit, merci de nous contacter via la rubrique "Nous contacter" !`, '3500')
            } else if (error.message.split('code ')[1].includes('400')) {
              this.showAlertError(`Merci de renseigner un nom avant de cliquer sur le bouton de recherche`, '4000')
            } else if (error.message.split('code ')[1].includes('422')) {
              this.showAlertError(`Merci de ne pas utiliser les caractères suivant : |/*+&#{([]})<>$£€%=^ `, '4000')
            }
          })
      }
    }
  }
}
</script>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
  #wall{
    box-shadow: 0 0 6px grey;
    background-color: rgb(239, 239, 239);
  }
.userPhotoPosts{
  width: 50px;
  height: 50px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.57);
  object-fit: cover;
  border-radius: 100%;
  border: 4px solid rgba(44, 63, 95, 0.66);
}
  a {
    display: flex;
    flex: 0 0 20%;
    justify-content: center;
  }
  .imgResearch{
    width: 50px;
    height: 50px;
    border-radius: 100%;
    border: 4px solid #2C3F5F;
    box-shadow: 0 0 6px black;
  }

  #btnSearch{
    padding: 2%;
    background-color: #2C3F5F;
    color: white;
  }
  #btnSearch i{
    font-size: 1.5em;

  }
  .container{
    box-shadow: 0 0 12px;
    background-color: #F7F7F7;
  }
  .divider{
    background-color: #2C3F5F;
    color: whitesmoke;
    border-radius: 50px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.76);
  }
  .divider img{
    max-width: 5%;
  }
  @media screen and (min-width: 768px){
    #searchBarBg{
      padding: 2%;
    }
  }
</style>
