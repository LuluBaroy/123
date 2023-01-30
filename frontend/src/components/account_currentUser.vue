<template>
  <div class="lg:w-9/12 w-full m-auto flex-col pl-1 pt-4 pr-1" id="containerbg">
    <h1 class="border-b border-gray-400 bg-gray-300 bg-opacity-50 rounded-xl p-4 mb-4">Votre espace</h1>

    <!--USER INFO'S PART-->
    <section class="flex flex-col items-center p-0 p-lg-3 w-full" >
      <div class="flex flex-col sm:flex-row justify-center sm:justify-evenly items-center w-full 2xl:w-9/12">
        <div class="flex flex-col justify-center items-center">
          <img :src="currentUser.infos.url_profile_picture" :alt="currentUser.infos.alt_profile_picture" class="userPhoto w-5/12">
          <i class="far fa-edit mt-5 cursor-pointer hover:bg-blue-300 rounded-xl transition-all p-2" @click="editInfosUser = !editInfosUser"><span>Editer les informations</span></i>
        </div>
        <div class="flex flex-col justify-center align-items-center w-full p-2 sm:p-0 sm:w-5/12">
          <h2 class="border-b border-gray-400 mb-5">Vos informations</h2>
          <div class="flex flex-col m-auto text-left text-base sm:p-0 p-2 sm:w-8/12">
            <p v-if="currentUser.infos.role && currentUser.infos.role.includes('admin')">Rôle : Administrateur</p>
            <p class="break-all">Nom d'utilisateur : {{currentUser.infos.username}}</p>
            <p>Email : {{currentUser.infos.email}}</p>
            <p>Posts : {{currentUser.infos.Posts.length}}</p>
            <p>Commentaires : {{currentUser.infos.Comments.length}}</p>
            <p>Likes : {{currentUser.infos.Likes.length}} </p>
            <p>Posts signalés : {{currentUser.infos.PostsReports.length}}</p>
            <p>Commentaires signalés : {{currentUser.infos.CommentsReports.length}}</p>
          </div>
        </div>
      </div>
      <div class="mt-5 flex flex-row justify-center mb-5 text-lg sm:p-0 p-2 sm:w-8/12" v-if="currentUser.infos.bio.length > 0">
        <img class="w-4 h-4 self-start" src="../assets/img/guillemets-g.png" alt="image guillemets gauche">
        <p class="ml-2 mr-2 self-center">{{currentUser.infos.bio}}</p>
        <img class="w-4 h-4 self-end" src="../assets/img/guillemets-d.png" alt="image guillemets droite">
      </div>

      <p class="mt-5 mb-5 text-lg sm:p-0 p-2 sm:w-8/12" v-else>Vous n'avez pas renseigné de bio</p>

      <!--MODAL - EDIT INFO-->
      <div v-if="editInfosUser" class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-11/12 md:w-8/12">
              <div class="bg-white">
                <div class="sm:flex w-full">
                  <div class="text-left w-full">
                    <h3 class="pl-4 pt-6 pb-6 bg-gray-300 border border-gray-400 font-medium text-xl w-full leading-6 text-gray-900" id="modal-title">Editer les informations</h3>
                    <div class="mt-2 w-full">
                      <form class="flex flex-col w-11/12 sm:w-9/12 justify-center items-center ml-auto mr-auto">
                        <div class="flex flex-col sm:flex-row items-center w-full mt-5">
                          <div class="flex flex-col items-center sm:w-5/12">
                            <label for="input-1" class=" text-base flex sm:self-start text-center sm:text-left">Email :</label>
                            <p v-if="textEmail.length > 0">{{textEmail}}</p>
                          </div>
                          <input class="text-center w-full text-base border-b border-b-gray-400 " id="input-1" v-model="userInfo.email" :state="stateEmail" @keyup="testInput('email')">
                        </div>
                        <div class="flex flex-col sm:flex-row items-center w-full mt-5">
                          <div class="flex flex-col items-center w-full sm:w-5/12">
                            <label for="input-2" class=" text-base flex sm:self-start text-center sm:text-left">Mot de passe : </label>
                            <p v-if="textPassword.length > 0">{{textPassword}}</p>
                          </div>
                          <input class="text-center w-full text-base border-b border-b-gray-400 " id="input-2" v-model="userInfo.newPassword" :state="statePassword" @keyup="testInput('password')">
                        </div>
                        <div class="flex flex-col sm:flex-row w-full items-center mt-5">
                          <div class="flex flex-col items-center w-full sm:w-5/12 ">
                            <label for="input-3" class=" text-base flex sm:self-start text-center sm:text-left">Nom d'utilisateur : </label>
                            <p v-if="textUsername.length > 0">{{textUsername}}</p>
                          </div>
                          <input id="input-3" class="w-full text-base text-center border-b border-b-gray-400 " v-model="userInfo.username" :state="stateUsername" @keyup="testInput('username')">
                        </div>
                        <div class="flex flex-col sm:flex-row w-full items-center mt-5">
                          <div class="flex flex-col items-center w-full sm:w-3/12">
                            <label for="input-4" class=" text-base flex sm:self-start text-center sm:text-left">Bio :</label>
                            <p v-if="textBio.length > 0">{{textBio}}</p>
                          </div>
                          <textarea class="text-center w-full sm:w-9/12 rounded-xl resize-none text-base border border-gray-400" id="input-4" rows="4" @keyup="testInput('bio')" placeholder="Partagez quelques informations à propos de vous..." v-model="userInfo.bio" :state="stateBio">{{userInfo.bio}}</textarea>
                        </div>
                        <div class="flex flex-col justify-center items-center mt-5 w-full">
                          <img :src="currentUser.infos.url_profile_picture" v-if="url.length === 0" class="userPhoto rounded-xl max-w-full max-h-48 mr-auto ml-auto " :alt="currentUser.infos.alt_profile_picture"/>
                          <img v-else :src="url" class="mr-auto ml-auto max-w-full max-h-48 rounded-xl userPhoto" alt="Preview new image">
                          <div class="flex mt-5 mb-5 flex-row w-full sm:w-5/12 cursor-pointer hover:bg-blue-50 justify-center self-center p-2 rounded-2xl border border-gray-300 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <label for="fileInput" class="flex flex-row justify-center items-center">
                              <i class="fa-regular fa-image ml-2 mr-2"></i>
                              <span class="text-center">Modifier l'image</span>
                            </label>
                            <input class="mb-5 hidden" type="file" id="fileInput" @change="onFileChanged">
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button type="button" :disabled="textEmail.length > 0 || textPassword.length > 0 || textUsername.length > 0 || textBio.length > 0" class="inline-flex disabled:bg-gray-500 w-full justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm" @click="updateUser(); url = ''; editInfosUser = !editInfosUser">Editer les informations</button>
                <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" @click="url = ''; editInfosUser = !editInfosUser">Annuler</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!--USER'S POSTS-->
    <section class="flex flex-col items-center w-full p-0 mt-4">
      <h2 class="w-full border-b border-gray-400 bg-gray-300 bg-opacity-50 rounded-xl p-4 mb-4">Vos publications</h2>

      <!--NO POST PUBLISHED-->
      <article v-if="userPosts.length === 0" class="flex flex-col items-center justify-between allPosts">
        <h3 class="pt-3">Vous n'avez rien posté pour le moment, Lancez-vous !</h3>
        <p>Rendez-vous sur le <router-link class="p-2 text-lg hover:bg-blue-300 rounded-xl" to="/wall">mur principal</router-link> (si vous ne savez pas comment faire, vous pouvez consulter nos astuces dans la rubrique <router-link :to="{name: 'faq'}" class="p-2 text-lg hover:bg-blue-300 rounded-xl">FAQ</router-link> !)</p>
        <img src="../assets/img/hello.gif" alt="hello gif" class="imgPosts max-w-full max-h-48 mr-auto ml-auto rounded-xl mb-5">
      </article>

      <!--ALL USER'S POSTS-->
      <article v-else id="postPart" class="flex flex-col items-center mt-2 pb-2 w-full" v-for="(post, indexPost) in userPosts" :key="indexPost">
        <posts :post="post" :index-post="indexPost" class="w-full sm:w-9/12 lg:8/12 xl:w-6/12"></posts>
      </article>
    </section>

    <!--ACCOUNT PARAMETERS-->
    <section class="flex flex-col w-full items-center mt-10 pb-36" id="accountParam">
      <h2 class="border-b border-gray-400 w-full bg-gray-300 bg-opacity-50 rounded-xl p-4 mb-4">Paramètres du compte</h2>
      <article class="w-full sm:w-9/12 flex flex-col flex-row justify-center mb-5">
        <div class="flex flex-col sm:flex-row justify-evenly items-center mt-10">
          <!--DOWNLOAD CURRENT USER INFO-->
          <button @click="downloadInfo()" class="inline-flex w-full sm:w-5/12 justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">Télécharger les informations du compte</button>

          <!--MODAL - DELETE ACCOUNT-->
          <button @click="openDeleteAccountModal = !openDeleteAccountModal" class="w-full mt-5 sm:mt-0 sm:w-5/12 inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">Supprimer le compte</button>
        </div>
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
                      <h3 class="text-lg font-medium leading-6 text-gray-900" id="modal-title">Supprimer le compte</h3>
                      <div class="mt-2">
                        <p class="text-sm text-gray-500">Êtes vous sûr(e) de vouloir supprimer votre compte ? Toutes vos données seront supprimées définitivement. Cette action ne pourra pas être annulée.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button type="button" class="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm" @click="deleteAccount()">Supprimer</button>
                  <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" @click="openDeleteAccountModal = !openDeleteAccountModal">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      <!--CONSENTS-->
      <article class="flex w-full sm:w-9/12 flex-col mt-5 justify-around">
        <h3 id="consentsTitle" class="mb-5">Consentements pour le traitement de vos données</h3>
        <div>
          <form class="flex flex-col sm:flex-row justify-center items-center w-full">
            <fieldset class="flex flex-col w-full sm:w-5/12 p-3 border-b sm:border-b-0 mb-5 sm:mb-0 sm:border-r border-gray-400">
              <legend class="text-base">Acceptez-vous que nous partagions vos informations avec nos partenaires commerciaux ?</legend>
              <div class="flex flex-row justify-evenly items-center sm:mt-5">
                <label for="shareableTrue" class="text-base">Oui
                  <input type="radio" v-model="newConsents.shareable" id="shareableTrue" name="shareableTrue" value="true" @change="consentsHaveChanged = true">
                </label>
                <label for="shareableFalse" class="text-base">Non
                  <input type="radio" id="shareableFalse" v-model="newConsents.shareable" name="shareableFalse" value="false" @change="consentsHaveChanged = true">
                </label>
              </div>
            </fieldset>
            <fieldset class="flex flex-col w-full sm:w-5/12 p-2">
              <legend class="text-base">Acceptez-vous d'être contacté par nos services (notifications, newsletter, ...) ?</legend>
              <div class="flex flex-row justify-evenly items-center sm:mt-5">
                <label class="text-base" for="contactableTrue">Oui
                  <input type="radio" id="contactableTrue" v-model="newConsents.contactable" name="contactableTrue" value="true" @change="consentsHaveChanged = true">
                </label>
                <label class="text-base" for="contactableFalse">Non
                  <input type="radio" id="contactableFalse" v-model="newConsents.contactable" name="contactableFalse" value="false" @change="consentsHaveChanged = true">
                </label>
              </div>
            </fieldset>
          </form>
          <button class="inline-flex mt-5 w-full justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm" v-if="consentsHaveChanged" @click.prevent="updateUser()">Valider les changements</button>
        </div>
      </article>
    </section>
  </div>
</template>

<script>
import pdfMake from 'pdfmake/build/pdfmake'
pdfMake.fonts = {
  Roboto: {
    normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
    bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
    italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
    bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
  }
}
import Posts from "@/components/posts.vue";
export default {
  name: 'accountCurrentUser',
  components: {Posts},
  data () {
    return {
      newConsents: {
        contactable: JSON.parse(this.$store.state.user.currentUser.infos.consents).contactable,
        shareable: JSON.parse(this.$store.state.user.currentUser.infos.consents).shareable
      },
      userRole: JSON.parse(this.$store.state.user.currentUser.infos.role),
      file: null,
      openDeleteAccountModal : false,
      userInfo: {
        email: this.$store.state.user.currentUser.infos.email,
        password: this.$store.state.user.currentUser.infos.password,
        username: this.$store.state.user.currentUser.infos.username,
        bio: this.$store.state.user.currentUser.infos.bio,
        newPassword: ''
      },
      url: '',
      emojis: this.$store.state.posts.emojis,
      commentReport: '',
      postReport: '',
      consentsHaveChanged: false,
      editInfosUser: false,
      textEmail: '',
      textPassword: '',
      textUsername: '',
      textBio: ''
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.user.currentUser
    },
    userPosts (){
      return this.$store.state.posts.allPostsFromUser
    },
    //FORM VALIDATION
    stateEmail () {
      // eslint-disable-next-line no-useless-escape
      let regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      if(regex.test(this.userInfo.email)){
        return true
      } else if (!regex.test(this.userInfo.email) && this.userInfo.email.length !== 0) {
        return false
      } else {
        return null
      }
    },
    statePassword () {
      // eslint-disable-next-line no-useless-escape
      let regex = new RegExp(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}/)
      if(this.userInfo.newPassword.length < 8 && this.userInfo.newPassword.length > 0 || this.userInfo.newPassword.length > 0 && !regex.test(this.userInfo.newPassword)){
        return false
      } else if (this.userInfo.newPassword.length > 0 && this.userInfo.newPassword.length > 8 && regex.test(this.userInfo.newPassword) || this.userInfo.newPassword.length === 8 && regex.test(this.userInfo.newPassword)){
        return true
      } else {
        return null
      }
    },
    stateUsername () {
      // eslint-disable-next-line no-useless-escape
      let regex = new RegExp(/['\|\/\\\*\+&#"\{\(\[\]\}\)<>$£€%=\^`.]/)
      // eslint-disable-next-line no-useless-escape
      let regex2 = new RegExp(/[a-zA-Z0-9_ ]{6,16}/)
      if (this.userInfo.username.length > 0 && this.userInfo.username.length < 6 || this.userInfo.username.length > 0 && regex.test(this.userInfo.username) || this.userInfo.username.length > 0 && !regex2.test(this.userInfo.username)){
        return false
      } else if (this.userInfo.username.length > 6 && regex2.test(this.userInfo.username) && !regex.test(this.userInfo.username) || this.userInfo.username.length === 6 && regex2.test(this.userInfo.username) && !regex.test(this.userInfo.username)){
        return true
      } else {
        return null
      }
    },
    stateBio () {
      // eslint-disable-next-line no-useless-escape
      let regex = new RegExp(/[\|\/\\\*\+&#\{\(\[\]\}\)<>$£€%=\^`]/)
      if(this.userInfo.bio !== null && this.userInfo.bio.length > 0 && !regex.test(this.userInfo.bio)){
        return true
      } else if (this.userInfo.bio !== null && this.userInfo.bio.length > 0 && regex.test(this.userInfo.bio) || regex.test(this.userInfo.bio)) {
        return false
      } else {
        return null
      }
    },
  },
  methods: {
    //POSTS
    getUserPosts () {
      this.$store.dispatch('posts/getAllPostsFromOneUser', this.$route.params.id)
    },
    onFileChanged (e) {
      let authorizedFile = ['jpg', 'jpeg', 'gif', 'png']
      const file = e.target.files[0]
      if (!authorizedFile.includes(file.name.split('.')[1])) {
        this.url = 'http://localhost:3000/images/wrongExtension.png'
      } else {
        this.url = URL.createObjectURL(file)
        this.file = file
      }
    },
    testInput (text) {
      if(text === 'email') {
        if(this.userInfo.email.length === 0){
          this.textEmail = '* Champ obligatoire'
        } else if (!this.stateEmail){
          this.textEmail = `Merci de renseigner un email valide au format 123@123.fr`
        } else {
          this.textEmail = ''
        }
      } else if (text === 'password') {
        if(this.userInfo.password.length === 0){
          this.textPassword = '* Champ obligatoire'
        } else if (!this.statePassword){
          this.textPassword = `Merci de choisir un mot de passe de minimum 8 caractères dont au moins 1 chiffre et une majuscule`
        } else {
          this.textPassword = ''
        }
      }else if (text === 'username') {
        if(this.userInfo.username.length === 0){
          this.textUsername = '* Champ obligatoire'
        } else if (!this.stateUsername){
          this.textUsername = `Merci de choisir un nom d'utilisateur de minimum 6 caractères et de ne pas utiliser les caractères suivants : ['|/*+&#"{([]})<>$£€%=^.]`
        } else {
          this.textUsername = ''
        }
      } else if(text === 'bio') {
        if(this.userInfo.bio.length === 0){
          this.textBio = '* Champ obligatoire'
        } else if (!this.stateBio){
          this.textBio = `Merci de ne pas utiliser les caractères suivants : ['|/*+&#"{([]})<>$£€%=^.]`
        } else {
          this.textBio = ''
        }
      }
    },

    //USERS OPTIONS
    updateUser () {
      let authorizedFile = ['jpg', 'jpeg', 'gif', 'png']
      if(this.stateEmail === false || this.statePassword === false || this.stateUsername === false || this.stateBio === false){
        this.showAlertError('Merci de renseigner les différents champs au bon format', '1500')
      } else if (this.file !== null && !authorizedFile.includes(this.file.name.split('.')[1])) {
        this.showAlertError("Ce type de fichier n'est pas autorisé", '1500')
      } else {
        let formData = new FormData()
        formData.append('image', this.file)
        formData.append('email', this.userInfo.email)
        formData.append('password', this.userInfo.newPassword)
        formData.append('username', this.userInfo.username)
        formData.append('bio', this.userInfo.bio)
        formData.append('shareable', this.newConsents.shareable)
        formData.append('contactable', this.newConsents.contactable)
        let payload = {
          userId: this.$store.state.user.currentUser.id,
          formData: formData
        }
        this.$store.dispatch('user/updateUser', payload)
                .then(() => {
                  this.showAlertSuccess('Informations modifiées !')
                  this.consentsHaveChanged = false
                  this.$store.dispatch('user/getCurrentUser', this.$store.state.user.currentUser.id)
                      .then(()=> {
                        this.getUserPosts()
                      })
                }).catch(error => {console.log(error)})
      }
    },
    deleteAccount () {
      if(this.currentUser.infos.role.includes('admin')){
        this.$store.dispatch('user/getAllUser')
            .then(response => {
               let adminUser = []
               response.data.forEach(user => {
                 if(user.role.includes('admin') && user.id !== this.currentUser.id){
                   adminUser.push(user)
                 }
               })
               if(adminUser.length !== 0){
                this.$store.dispatch('user/deleteUser', this.$store.state.user.currentUser.id)
                    .then(() => {
                        this.$cookies.remove('user')
                        this.$store.state.user.currentUser = {
                           id: '',
                           infos: {}
                        }
                        this.$router.push({name: 'auth'})
                    })
               } else {
                   this.showAlertError(`Vous devez donner le privilège "admin" a au moins un utilisateur avant de pouvoir supprimer votre compte !`, '5000')
               }
            })
      } else {
        this.$store.dispatch('user/deleteUser', this.$store.state.user.currentUser.id)
            .then(() => {
              this.$cookies.remove('user')
              this.$store.state.user.currentUser = {
                id: '',
                infos: {}
              }
              this.$router.push({name: 'auth'})
            })
      }
    },
    downloadInfo () {
      this.$store.dispatch('user/getOneUser', this.$store.state.user.currentUser.id)
              .then((user) => {
                let posts = []
                let comments = []
                let likes = []
                let postsReports = []
                let commentsReports = []
                let consents = []
                if (user.data.Posts.length === 0) {
                  posts.push(`Vous n'avez rien posté !`)
                } else {
                  for (let i in user.data.Posts) {
                    for (const [key, value] of Object.entries(user.data.Posts[i])) {
                      posts.push(`${key} : ${value}`)
                    }
                  }
                }
                if (user.data.Comments.length === 0) {
                  comments.push(`Vous n'avez rien commenté !`)
                } else {
                  for (let j in user.data.Comments) {
                    for (const [key, value] of Object.entries(user.data.Comments[j])) {
                      comments.push(`${key} : ${value}`)
                    }
                  }
                }
                if (user.data.Likes.length === 0) {
                  likes.push(`Vous n'avez rien liké !`)
                } else {
                  for (let k in user.data.Likes) {
                    for (const [key, value] of Object.entries(user.data.Likes[k])) {
                      likes.push(`${key} : ${value}`)
                    }
                  }
                }
                if (user.data.PostsReports.length === 0) {
                  postsReports.push(`Vous n'avez pas signalé de post !`)
                } else {
                  for (let i in user.data.PostsReports) {
                    for (const [key, value] of Object.entries(user.data.PostsReports[i])) {
                      postsReports.push(`${key} : ${value}`)
                    }
                  }
                }
                if (user.data.CommentsReports.length === 0) {
                  commentsReports.push(`Vous n'avez pas signalé de commentaire !`)
                } else {
                  for (let i in user.data.CommentsReports) {
                    for (const [key, value] of Object.entries(user.data.CommentsReports[i])) {
                      commentsReports.push(`${key} : ${value}`)
                    }
                  }
                }
                  consents.push(user.data.consents)

                const document = {
                  content: [
                    {
                      text: 'All your information\n\n',
                      style: 'header'
                    },
                    {
                      text: 'User Info\n\n',
                      style: 'subheader'
                    },
                    {
                      ul: [
                        `id : ${user.data.id}`,
                        `email : ${user.data.email}`,
                        `password : ${user.data.password}`,
                        `username : ${user.data.username}`,
                        `role : ${user.data.role}`,
                        `bio : ${user.data.bio}`,
                        `url_profile_picture : ${user.data.url_profile_picture}`,
                        `alt_profile_picture : ${user.data.alt_profile_picture}`,
                        `created at : ${user.data.createdAt}`,
                        `updated at : ${user.data.updatedAt}\n\n`
                      ]
                    },
                    {
                      text: 'Posts\n\n',
                      style: 'subheader'
                    },
                    {
                      ul: [
                        posts
                      ]
                    },
                    {
                      text: '\n\nComments\n\n',
                      style: 'subheader'
                    },
                    {
                      ul: [
                        comments
                      ]
                    },
                    {
                      text: '\n\nLikes\n\n',
                      style: 'subheader'
                    },
                    {
                      ul: [
                        likes
                      ]
                    },
                    {
                      text: '\n\nPosts Reports\n\n',
                      style: 'subheader'
                    },
                    {
                      ul: [
                        postsReports
                      ]
                    },
                    {
                      text: '\n\nComments Reports\n\n',
                      style: 'subheader'
                    },
                    {
                      ul: [
                        commentsReports
                      ]
                    },
                    {
                      text: '\n\nConsents\n\n',
                      style: 'subheader'
                    },
                    {
                      ul: [
                        consents
                      ]
                    },
                  ],
                  styles: {
                    header: {
                      fontSize: 18,
                      bold: true
                    },
                    subheader: {
                      fontSize: 15,
                      bold: true
                    }
                  }
                }
                pdfMake.createPdf(document).download()
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
    showAlertSuccess (title) {
      this.$swal({
        title: title,
        position: 'center',
        icon: 'success',
        showConfirmButton: false,
        timer: '1500'})
    }
  },
  beforeMount () {
    if (!this.$cookies.isKey('user')) {
      this.$router.push({name: 'auth'})
    } else {
      this.$store.dispatch('posts/getAllPostsFromOneUser', this.$store.state.user.currentUser.id)
    }
  }
}
</script>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
  .userPhoto{
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.57);
    object-fit: cover;
    width: 150px;
    height: 150px;
    border-radius: 100%;
    border: 4px solid rgba(44, 63, 95, 0.66);
  }
  h1{
    font-size: 35px;
  }
  h2{
    font-size: 25px;
  }
  h3{
    font-size: 22px;
  }
  #consentsTitle{
    text-decoration: underline;
  }
</style>
