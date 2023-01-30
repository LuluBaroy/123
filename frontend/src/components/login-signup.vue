<template>
    <div id="login" class="flex content-center justify-center mb-48">
      <div class="flex flex-col content-center items-center justify-content-center lg:flex-row ">
        <h1 class="m-4 w-11/12 lg:w-6/12 lg:text-4xl text-2xl font-bold">Bienvenue sur notre réseau social !</h1>
        <div class="w-11/12 lg:w-6/12 mb-36 lg:mb-0 flex lg:min-h-full items-center justify-center lg:py-12 lg:px-4 sm:px-6 lg:px-8">
          <div class="w-full mt-10 lg:mt-0 max-w-md space-y-8" v-if="!hasClickedSignUp">
            <div>
              <h2 class="lg:mt-6 text-center lg:text-3xl text-xl font-bold tracking-tight text-gray-900">Connectez-vous à votre compte</h2>
              <p class="lg:mt-2 text-center text-sm text-gray-600">
                ou
                <button class="font-medium text-indigo-600 hover:text-indigo-500" @click="hasClickedSignUp = true">Inscrivez-vous</button>
              </p>
            </div>
            <form class="mt-8 space-y-6" action="#" method="POST">
              <input type="hidden" name="remember" value="true">
              <div class="-space-y-px rounded-md shadow-sm">
                <div>
                  <label for="email" class="sr-only">Adresse Email</label>
                  <input id="email" name="email" type="email" autocomplete="email" required class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Adresse Email" v-model="user.email" @keyup="testInput('email')" @change="testInput('email')">
                  <p v-if="textEmail.length > 0" class="text-red-900 font-medium">{{textEmail}}</p>
                </div>
                <div>
                  <label for="username" class="sr-only">Nom d'utilisateur</label>
                  <input id="username" name="username" autocomplete="username" type="text" required class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Nom d'utilisateur" v-model="user.username" @keyup="testInput('username')">
                  <p v-if="textUsername.length > 0" class="text-red-900 font-medium">{{textUsername}}</p>
                </div>
                <div>
                  <label for="password" class="sr-only">Mot de Passe</label>
                  <input id="password" name="password" type="password" autocomplete="current-password" required class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Mot de passe" v-model="user.password" @keyup="testInput('password')">
                  <p v-if="textPassword.length > 0" class="text-red-900 font-medium">{{textPassword}}</p>
                </div>
              </div>

              <div>
                <button type="submit" :disabled="textEmail.length > 0 || textUsername.length > 0 || textPassword.length > 0" class=" disabled:bg-gray-500 group relative flex transition-all w-full justify-center rounded-md border border-transparent bg-blue-900 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2" v-if="error === false" id="connexionBtn" @click.prevent="logMe">
                  <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                    <!-- Heroicon name: mini/lock-closed -->
                    <svg class="h-5 w-5 text-blue-300 group-hover:text-blue-50 transition-all" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
                    </svg>
                  </span>
                  Se connecter
                </button>
              </div>
            </form>
          </div>
          <div class="w-full max-w-md space-y-8" v-if="hasClickedSignUp">
            <div>
              <h2 class="mt-6 text-center lg:text-3xl text-xl font-bold tracking-tight text-gray-900">Inscrivez-vous !</h2>
              <p class="mt-2 text-center text-sm text-gray-600">
                ou
                <button class="font-medium text-indigo-600 hover:text-indigo-500" @click="hasClickedSignUp = false">Connectez-vous</button>
              </p>
            </div>
            <form class="mt-8 space-y-6" action="#" method="POST">
              <input type="hidden" name="remember" value="true">
              <div class="-space-y-px rounded-md shadow-sm">
                <div>
                  <label for="email" class="sr-only">Adresse Email</label>
                  <input id="email" name="email" type="email" autocomplete="email" required class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Adresse Email" v-model="user.email" :state="stateEmail" @keyup="testInput('email')">
                  <p v-if="textEmail.length !== 0" class="text-red-900 font-medium">{{textEmail}}</p>
                </div>
                <div>
                  <label for="username" class="sr-only">Nom d'utilisateur</label>
                  <input id="username" name="username" type="text" required autocomplete="username" class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Nom d'utilisateur" v-model="user.username" :state="stateUsername" @keyup="testInput('username')">
                  <p v-if="textUsername.length !== 0" class="text-red-900 font-medium">{{textUsername}}</p>
                </div>
                <div>
                  <label for="password" class="sr-only">Mot de Passe</label>
                  <input id="password" name="password" type="password" autocomplete="current-password" required class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Mot de passe" v-model="user.password" :state="statePassword" @keyup="testInput('password')">
                  <p v-if="textPassword.length !== 0" class="text-red-900 font-medium" >{{textPassword}}</p>
                </div>
                <div>
                  <label for="bio" class="sr-only">Votre biographie (optionnel)</label>
                  <textarea id="bio" name="bio" type="text" class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Votre biographie (optionnel)" v-model="user.bio" :state="stateBio" @keyup="testInput('bio')"></textarea>
                  <p v-if="textBio.length !== 0" class="text-red-900 font-medium" >{{textBio}}</p>
                </div>
                <div class="flex flex-col lg:flex-row w-full justify-evenly items-center mt-5 mb-5">
                  <div class="flex flex-row lg:w-5/12 mt-5 justify-center items-center p-2 rounded-2xl border border-gray-300 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <label for="fileInputChange" class="flex flex-row justify-center items-center">
                      <i class="fa-regular fa-image ml-2 mr-2"></i>
                      <span class="text-center">Ajouter une photo (optionnel)</span>
                    </label>
                    <input class="mb-5 hidden" type="file" id="fileInputChange"  @change="onFileChanged">
                  </div>
                  <img v-if="file !== null" class="rounded-2xl userPhoto max-w-full max-h-48 mr-auto ml-auto mt-5" :src="url" alt="Photo de profil de l'utilisateur">
                </div>
              </div>
              <div>
                <button type="submit" :disabled="textPassword.length > 0 || textEmail.length > 0 || textUsername.length > 0 || textBio.length > 0" class="group disabled:bg-gray-500 relative flex w-full justify-center transition-all rounded-md border border-transparent bg-blue-900 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" v-if="error === false" id="connexionBtn" @click.prevent="testForm(); registerMe()">
                  <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                    <!-- Heroicon name: mini/lock-closed -->
                    <svg class="h-5 w-5 text-blue-300 group-hover:text-blue-50 transition-all" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
                    </svg>
                  </span>
                  S'inscrire
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'signUp',
  data () {
    return {
      user: {
        email: '',
        password: '',
        username: '',
        bio: ''
      },
      hasClickedSignUp :  false,
      validation: {
        email: '',
        username: '',
        password: ''
      },
      file: null,
      textEmail: '',
      textPassword: '',
      textUsername: '',
      textBio: '',
      error: false,
      url: ''
    }
  },
  computed: {

    stateEmail () {
      // eslint-disable-next-line no-useless-escape
      let regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      if(regex.test(this.user.email)){
        return true
      } else if (!regex.test(this.user.email) && this.user.email.length !== 0) {
        return false
      } else {
        return null
      }
    },
    statePassword () {
      // eslint-disable-next-line no-useless-escape
      let regex = new RegExp(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}/)
      if(this.user.password.length < 8 && this.user.password.length > 0 || this.user.password.length > 0 && !regex.test(this.user.password)){
        return false
      } else if (this.user.password.length > 8 && regex.test(this.user.password) || this.user.password.length === 8 && regex.test(this.user.password)){
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
      if (this.user.username.length > 0 && this.user.username.length < 6 || this.user.username.length > 0 && regex.test(this.user.username) || this.user.username.length > 0 && !regex2.test(this.user.username)){
        return false
      } else if (this.user.username.length > 6 && regex2.test(this.user.username) && !regex.test(this.user.username) || this.user.username.length === 6 && regex2.test(this.user.username) && !regex.test(this.user.username)){
        return true
      } else {
        return null
      }
    },
    stateBio () {
      // eslint-disable-next-line no-useless-escape
      let regex = new RegExp(/[\|\/\\\*\+&#\{\(\[\]\}\)<>$£€%=\^`]/)
      if(this.user.bio.length > 0 && !regex.test(this.user.bio)){
        return true
      } else if (this.user.bio.length > 0 && regex.test(this.user.bio) || regex.test(this.user.bio)){
        return false
      } else {
        return null
      }
    }
  },
  beforeMount () {
    if(this.$cookies.isKey('user')) {
      this.$router.push({name: 'wall'})
    }
  },
  methods: {
   onFileChanged (e) {
      let authorizedFile = ['jpg', 'jpeg', 'gif', 'png']
      const file = e.target.files[0]
      if (!authorizedFile.includes(file.name.split('.')[1])) {
        this.url = 'http://localhost:3000/images/wrongExtension.png'
      } else {
        this.url = URL.createObjectURL(file)
        console.log(this.url)
        this.file = file
      }
    },
    testInput (text) {
      if(text === 'email') {
        if(this.user.email.length === 0){
          this.textEmail = '* Champ obligatoire'
        } else if (!this.stateEmail){
          this.textEmail = `Merci de renseigner un email valide au format 123@123.fr`
        } else {
          this.textEmail = ''
        }
      } else if (text === 'password') {
        if(this.user.password.length === 0){
          this.textPassword = '* Champ obligatoire'
        } else if (!this.statePassword){
          this.textPassword = `Merci de choisir un mot de passe de minimum 8 caractères dont au moins 1 chiffre et une majuscule`
        } else {
          this.textPassword = ''
        }
      }else if (text === 'username') {
        if(this.user.username.length === 0){
          this.textUsername = '* Champ obligatoire'
        } else if (!this.stateUsername){
          this.textUsername = `Merci de choisir un nom d'utilisateur de minimum 6 caractères et de ne pas utiliser les caractères suivants : ['|/*+&#"{([]})<>$£€%=^.]`
        } else {
          this.textUsername = ''
        }
      } else if(text === 'bio') {
        if (!this.stateBio){
          this.textBio = `Merci de ne pas utiliser les caractères suivants : ['|/*+&#"{([]})<>$£€%=^.]`
        } else {
          this.textBio = ''
        }
      }
    },
    testForm () {
      this.user.email.length === 0 ? this.textEmail = '* Champ requis' : this.textEmail = ''
      this.user.password.length === 0 ? this.textPassword = '* Champ requis' : this.textPassword = ''
      this.user.username.length === 0 ? this.textUsername = '* Champ requis' : this.textUsername = ''
    },
    showAlertError (title, timer) {
      this.$swal({
        title: title,
        position: 'center',
        icon: 'error',
        showConfirmButton: false,
        timer: timer})
    },
    registerMe () {
      let authorizedFile = ['jpg', 'jpeg', 'gif', 'png']
      if (this.stateEmail !== true || this.stateUsername !== true || this.statePassword !== true || this.file !== null && !authorizedFile.includes(this.file.name.split('.')[1]) || this.stateBio === false) {
        this.showAlertError('Merci de renseigner les différents champs au bon format', '1500')
        console.log(this.stateEmail, this.stateUsername, this.statePassword, this.file !== null && !authorizedFile.includes(this.file.name.split('.')[1]), this.stateBio)
        this.testForm()
      } else {
        console.log('registering')
        let formData = new FormData()
        formData.append('image', this.file)
        formData.append('email', this.user.email)
        formData.append('password', this.user.password)
        formData.append('username', this.user.username)
        formData.append('bio', this.user.bio)
        this.$store.dispatch('user/registerUser', formData)
          .then(() => {
            this.$store.dispatch('user/logUser', {email: this.user.email, password: this.user.password})
              .then(() => {
                this.$store.dispatch('user/getCurrentUser', this.$store.state.user.currentUser.id)
                  .then(() => {
                    this.$router.push('/wall/')
                  })
              })
          }).catch(error => {
            if (error.message.includes('422')) {
              this.showAlertError(`Merci de renseigner un email valide`, '2500')
            } else if (error.message.includes('500')) {
              this.showAlertError(`Oups ! Quelque chose s'est mal passé ! Si cela se reproduit, merci de nous contacter via la rubrique "Nous contacter" !`, '3500')
            } else if (error.message.includes('401')) {
              this.showAlertError(`Cet email est déjà utilisé !`, '1500')
            } else if (error.message.includes('400')) {
              this.showAlertError(`Merci de renseigner un mot de passe d'au moins 8 caractères avec au moins une majuscule et un chiffre`, '4500')
            }
          })
      }
    },
    logMe () {
      if (this.user.email.length === 0 || this.user.password.length === 0) {
        this.showAlertError('Merci de renseigner les différents champs', '1500')
      } else {
        this.state = true
        let data = {
          email: this.user.email,
          password: this.user.password
        }
        this.$store.dispatch('user/logUser', data)
          .then(() => {
            this.$router.push('/wall')
              .then(() => {
                this.$store.dispatch('user/getCurrentUser', this.$store.state.user.currentUser.id)
              })
          }).catch((error) => {
            console.log(error)
            if (error.message.includes('401')) {
              this.showAlertError('Email ou mot de passe erroné !', '1500')
            } else if (error.message.includes('429')) {
              this.error = true
              this.showAlertError('Trop de tentatives de connexion, merci de patienter 1 minute avant de réessayer', '2500')
            } else if (error.message.includes('404')) {
              this.showAlertError(`Aucun compte n'est associé à cet email`, '2000')
            } else if (error.message.includes('422')) {
              this.showAlertError(`Merci de renseigner un email et/ou un mot de passe valide`, '2000')
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
  .nav-link:focus, .nav-link:hover{
    background-color: #0080C0;
    color: whitesmoke;
  }
  .nav-tabs .nav-link.active:focus, .nav-tabs .nav-link.active:hover{
    background-color: #0080C0;
    color: whitesmoke;
  }
  .userPhoto{
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.57);
    object-fit: cover;
    width: 150px;
    height: 150px;
    border-radius: 100%;
    border: 4px solid rgba(44, 63, 95, 0.66);
  }
  #login{
    flex-grow: 1;
    background-image: url("../assets/img/background.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
  .invalid-feedback{
    font-size: 1em !important;
    color: #f17884;
  }
  h1{
    color: #2C3F5F;
  }
  #tab1{
    width: 500px;
  }
  .formConnexion{
    background-color: #2C3F5F;
    color: white;
    padding: 5%;
    border: 4px solid white;
    box-shadow: 0 0 12px black;
  }
  input{
    text-align: center;
    box-shadow: 0 0 3px lavender;
  }
  .userPhoto{
    object-fit: cover;
    width: 150px;
    height: 150px;
    border-radius: 100%;
    border: 4px solid white;
    box-shadow: 0 0 12px white;
  }
</style>
