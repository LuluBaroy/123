<template>
  <section class="lg:flex-row flex-col content-center justify-center" id="user">

    <!--USERNAME + PROFILE PICTURE-->
    <div class="flex flex-col justify-center content-center lg:ml-5 lg:mr-5 mb-10">
      <div class="flex sm:flex-row flex-col">
        <div class=" flex flex-col sm:w-4/12 md:w-4/12 m-auto justify-center items-center">
          <h1 class="mb-5 lg:text-2xl break-all text-lg">Bonjour<br> {{ currentUser.infos.username }} !</h1>
          <!--LINK TO CURRENT USER PROFILE-->
          <router-link :to="`/profile/${currentUser.id}`" class="flex flex-col items-center text-decoration-none mb-5 hover:bg-transparent hover:rounded-full hover:opacity-50" aria-label="profil utilisateur">
            <img :src="currentUser.infos.url_profile_picture" :alt="currentUser.infos.alt_profile_picture" class="userPhoto">
            <!--IF USER IS ADMIN => NOTIFICATION FOR USER MESSAGE & REPORTS-->
          </router-link>
          <router-link :to="{name: 'admin'}" class="text-decoration-none p-2 lg:mt-5 hover:bg-blue-50 hover:rounded-xl" aria-label="page admin">
            <i id="messages" v-if="currentUser.infos.role && currentUser.infos.role.includes('admin')" class="fas fa-envelope mb-2">
              <span class="ml-1 text-center">{{ messageWaiting.total }}</span>
            </i>
            <p class="text-left" v-if="currentUser.infos.role && currentUser.infos.role.includes('admin') && messageWaiting"><span class="underline">Notification(s) :</span> <br>Message(s): {{ messageWaiting.issues.length }} en attente <br>Signalement(s): {{ messageWaiting.postReports.length + messageWaiting.commentReports.length }} en attente</p>
          </router-link>
        </div>
        <!--FORM TO PUBLISH POST-->
        <div class="formPart flex flex-col m-auto sm:w-7/12 md:w-8/12 w-full rounded-2xl">
          <h2 class="sm:m-5 mt-2 mb-2 text-xl">Voulez-vous partager quelque chose ?</h2>
          <form class="flex flex-col content-center justify-center w-11/12 lg:w-8/12 m-auto">
            <div class="flex flex-col lg:flex-row w-full justify-center items-center">
              <label for="title" class="m-0">Titre : </label>
              <p class="text-red-900 font-bold lg:ml-5" v-if="textTitle.length !== 0">{{ textTitle }}</p>
            </div>
            <input class="mb-5 rounded-xl" type="text" id="title" v-model="userPost.title" :state="stateTitle" @keyup="testInput('title')">
            <div class="flex flex-col lg:flex-row w-full justify-center items-center">
              <label for="content" class="m-0">Publication : </label>
              <p class="text-red-900 font-bold lg:ml-5 lg:mr-2" v-if="textContent.length !== 0">{{textContent}}</p>
            </div>
            <div class="flex flex-row justify-evenly items-center w-full bg-white border border-gray-400 rounded-xl mb-5">
                <textarea class="resize-none w-11/12 h-36 rounded-xl border-none active:outline-none outline-white outline-0 hover:outline-0 focus:outline-0" type="text" id="content" v-model="userPost.content" :state="stateContent" @keyup="testInput('content')"></textarea>
                <div class="relative inline-block">
                    <button type="button" class="inline-flex justify-center rounded-full m-2 p-2 border border-gray-300 bg-white text-lg font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100" id="menu-button" aria-expanded="true" aria-haspopup="true" @click="hasClickedEmoji = !hasClickedEmoji">
                      😃
                    </button>
                  <div v-if="hasClickedEmoji" class="max-h-48 w-52 absolute overflow-y-scroll lg:-left-20 -left-36 right-0 z-10 mt-2 origin-center rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                    <div class="p-1" role="none">
                      <button v-for="(emoji, index) in emojis" :key="index" @click.prevent="getEmoji(index)" class="text-lg p-2">{{ emoji }}</button>
                    </div>
                  </div>
                </div>
            </div>
            <div class="flex flex-row items-center justify-center">
              <div class="flex flex-row lg:w-6/12 cursor-pointer hover:bg-blue-50 justify-center self-center p-2 rounded-2xl border border-gray-300 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <label for="fileInput" class="flex flex-row justify-center items-center">
                  <i class="fa-regular fa-image ml-2 mr-1"></i>
                  <span class="text-center">Ajouter une image</span>
                </label>
                <input class="mb-5 hidden" type="file" id="fileInput" @change="onFileChanged">
              </div>
              <p class="text-red-900 font-bold ml-5 mr-2" v-if="textFile.length !== 0 && this.file === null">{{textFile}}</p>
            </div>
            <img v-if="url.length > 0" :src="url" alt="GIF choisi par l'utilisateur" class="w-44 sm:w-52 max-w-md max-h-48 rounded-2xl flex mr-auto ml-auto mt-5 mb-3"/>
            <button type="submit" @click.prevent="testForm(); publish()" class="mt-8 mb-5 mr-auto ml-auto bg-blue-900 text-white hover:bg-gray-500 transition-all disabled:bg-gray-500 p-3 rounded-2xl w-10/12" :disabled="textTitle.length !== 0 || textContent.length !== 0">Publier</button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'userPart',
  data () {
    return {
      hasClickedEmoji : false,
      userPost: {
        title: '',
        content: ''
      },
      file: null,
      emojis: this.$store.state.posts.emojis,
      textTitle: '',
      textContent: '',
      textFile: '',
      url: ''
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.user.currentUser
    },
    messageWaiting () {
      return this.$store.state.issues.messageWaiting
    },
    //FORM VALIDATION
    stateTitle () {
      // eslint-disable-next-line no-useless-escape
      let regex = new RegExp(/[\|\/\\\*\+&#\{\(\[\]\}\)<>$£€%=\^`]/g)
      if(this.userPost.title.length > 0 && !regex.test(this.userPost.title)){
        return true
      } else if (this.userPost.title.length > 0 && regex.test(this.userPost.title) || regex.test(this.userPost.title)){
        return false
      } else {
        return null
      }
    },
    stateContent () {
      // eslint-disable-next-line no-useless-escape
      let regex = new RegExp(/[\|\/\\\*\+&#\{\(\[\]\}\)<>$£€%=\^`]/g)
      if(this.userPost.content.length > 0 && !regex.test(this.userPost.content)){
        return true
      } else if (this.userPost.content.length > 0 && regex.test(this.userPost.content) || regex.test(this.userPost.content)){
        return false
      } else {
        return null
      }
    },
  },
  methods: {
    console(index){
      console.log(index)
    },
    onFileChanged (e) {
      console.log('onFileChanged')
      let authorizedFile = ['jpg', 'jpeg', 'gif', 'png']
      const file = e.target.files[0]
      if (!authorizedFile.includes(file.name.split('.')[1])) {
        this.url = 'https://groupo123456789.herokuapp.com/images/wrongExtension.png'
      } else {
        this.url = URL.createObjectURL(file)
        this.file = file
      }
    },
    testInput (text) {
      if(text === 'title') {
        if(this.userPost.title.length === 0){
          this.textTitle = '* Champ obligatoire'
        } else if (!this.stateTitle){
          this.textTitle = `Merci de ne pas utiliser les caractères [|/*+&#{([]})<>$£€%=^]`
        } else {
          this.textTitle = ''
        }
      } else if (text === 'content') {
        if(this.userPost.content.length === 0){
          this.textContent = '* Champ obligatoire'
        } else if (!this.stateContent){
          this.textContent = `Merci de ne pas utiliser les caractères [|/*+&#{([]})<>$£€%=^]`
        } else {
          this.textContent = ''
        }
      } else if(text === 'file') {
        this.file !== null ? this.textFile = '' : this.textFile = '* Champ obligatoire'
      }
    },
    testForm () {
      this.userPost.title.length === 0 ? this.textTitle += '* Champ obligatoire' : this.textTitle = ''
      this.userPost.content.length === 0 ? this.textContent += '* Champ obligatoire' : this.textContent = ''
      this.file === null ? this.textFile += '* Champ obligatoire' : this.textFile = ''
    },
    showAlert (title, icon, timer) {
      this.$swal({
        title: title,
        position: 'center',
        icon: icon,
        showConfirmButton: false,
        timer: timer})
    },
    getEmoji (index) {
      let emojiCode = this.emojis[index]
      if(this.userPost.content === null) {
        this.userPost.content = emojiCode
      } else {
        this.userPost.content += emojiCode
      }
      this.$swal({
        title: '',
        timer: '500',
        text: '✔ Ajouté !️',
        showConfirmButton: false
      })
      this.hasClickedEmoji = false;
    },
    publish () {
      if (this.userPost.content.length === 0|| this.userPost.title.length === 0 || this.file === null) {
        this.showAlert('Merci de renseigner les différents champs', 'error', '1500')
      } else {
        let authorizedFile = ['jpg', 'jpeg', 'gif', 'png']
        if (!authorizedFile.includes(this.file.name.split('.')[1])) {
          this.showAlert(`Ce type de fichier n'est pas pris en charge`, 'error', '1500')
        } else {
          let formData = new FormData()
          formData.append('title', this.userPost.title.toString())
          formData.append('content', this.userPost.content.toString())
          formData.append('image', this.file)
          this.$store.dispatch('posts/createPost', formData)
            .then(() => {
              this.showAlert('Post publié !', 'success', '1500')
              this.$store.dispatch('posts/getAllPosts')
              this.userPost.title = ''
              this.userPost.content = ''
              this.file = null
              this.url = ''
            }).catch(error => {
              if (error.message.split('code ')[1].includes('400')) {
                this.showAlert(`Vous devez ajouter une image au format JPG, JPEG, PNG ou GIF !`, 'error', '2500')
              } else if (error.message.split('code ')[1].includes('500')) {
                this.showAlert(`Oups ! Quelque chose s'est mal passé ! Si cela se reproduit, merci de nous contacter via la rubrique "Nous contacter" !`, 'error', '3500')
              }
            })
        }
      }
    }
  }
}
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

  label{
    cursor: pointer;
    margin-bottom: 0 !important;
  }
  .custom-file-input:lang(en) ~ .custom-file-label::after {
    content: 'Rechercher' !important;
  }
  .swal2-popup, .modal{
    font-family: 'Poppins', sans-serif;
  }
  .swal2-title{
    color: #2C3F5F;
  }
  .swal2-shown{
    color: #2C3F5F;
  }
  #messages, #messages span{
    font-size: 25px;
  }
  a{
    color: #2C3F5F !important;
  }
  .userPhoto{
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.57);
    object-fit: cover;
    width: 150px;
    height: 150px;
    border-radius: 100%;
    border: 4px solid rgba(44, 63, 95, 0.66);
  }
  .fa-envelope{
    text-decoration: none;
    color: #2C3F5F;
  }
  .fa-envelope:hover{
    color: #0762a3;
  }
</style>
