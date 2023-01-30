<template>
  <footer @mouseenter="footerFunctionEnter" @click="footerFunctionEnter" @mouseleave="footerFunctionLeave" class="pt-5 pb-5 footerBg flex flex-col lg:flex-row justify-center items-center fixed bottom-0 right-0 left-0 bg-gray-300 ">
    <div id="chevronUp" class="rounded-t-full text-xl absolute flex justify-center items-center bottom-2 h-14 w-14 bg-gray-300"><i class="fa-solid fa-chevron-up"></i></div>
    <div class="lg:w-9/12 flex flex-col lg:flex-row items-center hidden transition-all" id="footerFunction">
      <div class="lg:w-4/12">

        <!--CONTACT US-->
        <button class="p-2 text-base lg:text-lg hover:bg-blue-300 rounded-xl transition-all ease-in" @click="contactUsActive = !contactUsActive">Nous contacter</button>
        <!--MODAL CONTACT US-->
        <div v-if="contactUsActive" class="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          <div class="fixed inset-0 z-10 overflow-y-auto">
            <div class="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
              <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div class="bg-white">
                  <div class="sm:flex sm:items-start">
                    <div class="text-center sm:text-left">
                      <h3 class="pl-1 md:pl-4 pt-6 pb-6 bg-gray-300 border border-gray-400 lg:text-xl text-base font-medium leading-6 text-gray-900" id="modal-title">Nous contacter</h3>
                      <div class="m-2">
                        <p class="text-base text-center mt-5">Avant de nous faire part de votre problème, vérifiez notre rubrique <router-link :to="{name: 'faq'}" class="hover:bg-blue-300 hover:bg-opacity-50 rounded-xl p-1">FAQ</router-link></p>
                        <form class="flex flex-col justify-evenly align-center lg:w-9/12 mr-auto ml-auto mt-5 mb-5">
                          <div class="flex flex-col lg:flex-row mt-4 items-center">
                            <label
                                id="lastNameG"
                                for="lastName" class="lg:w-4/12">Nom :</label>
                            <input class="w-11/12 lg:w-8/12 text-center border-b" id="lastName" placeholder="Entrez votre nom" v-model="lastName" :state="stateLastName" @keyup="testFormInput('lastName')">
                          </div>
                            <p v-if="textLastName.length !== 0" class="text-red-900 font-medium">{{textLastName}}</p>
                          <div class="flex flex-col lg:flex-row mt-4 items-center">
                            <label
                                id="firstNameG"
                                for="firstName" class="lg:w-4/12">Prénom :</label>
                            <input class="w-11/12 lg:w-8/12 text-center border-b" placeholder="Entrez votre prénom" id="firstName" v-model="firstName" :state="stateFirstName" @keyup="testFormInput('firstName')">
                          </div>
                          <p v-if="textFirstName.length !== 0" class="text-red-900 font-medium">{{textFirstName}}</p>
                          <div class="flex flex-col lg:flex-row items-center mt-4">
                            <label
                                id="emailG"
                                for="email" class="lg:w-4/12">Email :</label>
                            <input class="w-11/12 lg:w-8/12 text-center border-b" placeholder="Entrez votre email" id="email" v-model="email" :state="stateEmail" @keyup="testFormInput('email')" @change="testFormInput('email')">
                          </div>
                          <p v-if="textEmail.length !== 0" class="text-red-900 font-medium">{{textEmail}}</p>
                          <div class="flex flex-col lg:flex-row items-center mt-4">
                            <label
                                for="issueG" class="lg:w-4/12">Vos questions :</label>
                            <textarea class="w-11/12 lg:w-8/12 text-center rounded-xl resize-none border-gray-300"
                                id="issue"
                                v-model="issue"
                                placeholder="Pourquoi souhaitez-vous nous contacter ?"
                                rows="3"
                                :state="stateIssue"
                                @keyup="testFormInput('issue')"
                            ></textarea>
                          </div>
                          <p v-if="textIssue.length !== 0" class="text-red-900 font-medium">{{textIssue}}</p>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button type="submit" :disabled="textIssue.length > 0 || textLastName.length > 0 || textFirstName.length > 0 || textEmail.length > 0" class="inline-flex disabled:bg-gray-500 w-full justify-center rounded-md border border-transparent bg-blue-900 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm" @click.prevent="submitForm(); footerFunctionLeave()" id="submitIssue">Envoyer</button>
                  <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" @click="contactUsActive = !contactUsActive; footerFunctionLeave(); lastName = ''; firstName = ''; email= ''; issue= ''">Annuler</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--COMING SOON-->
      <div class="lg:w-4/12">
        <button class="hover:scale-75 transition-all ease-linear duration-200" @click="logoClicked = !logoClicked"><img src="../assets/img/logoFooter.png" alt="Logo Groupomania" class="p-2 w-full"></button>
        <!--COMING SOON MODAL-->
        <div v-if="logoClicked" class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          <div class="fixed inset-0 z-10 overflow-y-auto">
            <div class="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
              <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div class="bg-white">
                  <div class="sm:flex sm:items-start">
                    <div class="text-center sm:text-left">
                      <h3 class="pl-4 pt-6 pb-6 bg-gray-300 border border-gray-400 text-xl font-medium leading-6 text-gray-900" id="modal-title">Accès au site de l'entreprise</h3>
                      <div class="m-2">
                        <img src="../assets/img/background.jpg" class="rounded-xl shadow shadow-lg shadow-gray-600" alt="image du site Groupomania"/>
                        <p class="text-base text-center mt-5">Retrouvez bientôt l'accès au site de l'entreprise !</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" @click="logoClicked = !logoClicked; footerFunctionLeave();">Fermer</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--LINK FAQ-->
      <div class="w-4/12">
        <router-link :to="{name: 'faq'}" class="p-2 text-lg hover:bg-blue-300 rounded-xl">FAQ</router-link>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'footerBar',
  data () {
    return {
      lastName: '',
      firstName: '',
      email: '',
      logoClicked: false,
      issue: '',
      textEmail: '',
      textLastName: '',
      textFirstName: '',
      textIssue: '',
      contactUsActive: false
    }
  },
  computed: {
    stateLastName () {
      let regexNames = new RegExp(/[A-Za-z -']{1,25}/)
      // eslint-disable-next-line no-useless-escape
      let regexNoCode = new RegExp(/[\|\/\\\*\+&#\{\(\[\]\}\)<>$£€%=\^`0-9]/g)
      if(this.lastName.length > 0 && regexNames.test(this.lastName) && !regexNoCode.test(this.lastName)){
        return true
      } else if(this.lastName.length > 0 && !regexNames.test(this.lastName) || this.lastName.length > 0 && regexNoCode.test(this.lastName) || regexNoCode.test(this.lastName)){
        return false
      } else {
        return null
      }
    },
    stateFirstName () {
      let regexNames = new RegExp(/[A-Za-z -']{1,25}/)
      // eslint-disable-next-line no-useless-escape
      let regexNoCode = new RegExp(/[\|\/\\\*\+&#\{\(\[\]\}\)<>$£€%=\^`0-9]/g)
      if(this.firstName.length > 0 && regexNames.test(this.firstName) && !regexNoCode.test(this.firstName)){
        return true
      } else if(this.firstName.length > 0 && !regexNames.test(this.firstName) || this.firstName.length > 0 && regexNoCode.test(this.firstName) || regexNoCode.test(this.firstName)){
        return false
      } else {
        return null
      }
    },
    stateEmail () {
      // eslint-disable-next-line no-useless-escape
      let regexEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      if(this.email.length > 0 && regexEmail.test(this.email)){
        return true
      } else if (this.email.length > 0 && !regexEmail.test(this.email)){
        return false
      } else {
        return null
      }
    },
    stateIssue () {
      // eslint-disable-next-line no-useless-escape
      let regexNoCode = new RegExp(/[\|\/\\\*\+&#\{\(\[\]\}\)<>$£€%=\^`]/g)
      if(this.issue.length > 0 && !regexNoCode.test(this.issue)){
        return true
      } else if (this.issue.length > 0 && regexNoCode.test(this.issue) || regexNoCode.test(this.issue)){
        return false
      } else {
        return null
      }
    }
  },
  methods: {
    console(){
      console.log('click')
    },
    footerFunctionEnter (){
      let footer = document.getElementById('footerFunction')
      let chevron = document.getElementById('chevronUp')
        footer.classList.remove('hidden')
        chevron.classList.add('hidden')
    },
    footerFunctionLeave (){
      if(!this.contactUsActive && !this.logoClicked){
        let footer = document.getElementById('footerFunction')
        let chevron = document.getElementById('chevronUp')
        footer.classList.add('hidden')
        chevron.classList.remove('hidden')
      }
    },
    testFormInput (text) {
      if(text === 'email') {
        if(this.email.length === 0){
          this.textEmail = '* Champ obligatoire'
        } else if (!this.stateEmail){
          this.textEmail = `Merci de renseigner un email valide au format 123@123.fr`
        } else {
          this.textEmail = ''
        }
      } else if (text === 'firstName') {
        if(this.firstName.name === 0){
          this.textFirstName = '* Champ obligatoire'
        } else if (!this.stateFirstName){
          this.textFirstName = `Merci de renseigner un prénom valide et de ne pas utiliser les caractères [|/*+&#{([]})<>$£€%=^]`
        } else {
          this.textFirstName = ''
        }
      } else if (text === 'lastName') {
        if(this.lastName.length === 0){
          this.textLastName = '* Champ obligatoire'
        } else if (!this.stateLastName){
          this.textLastName = `Merci de renseigner un nom valide et de ne pas utiliser les caractères [|/*+&#{([]})<>$£€%=^]`
        } else {
          this.textLastName = ''
        }
      } else if(text === 'issue') {
        if(this.issue.length === 0){
          this.textIssue = '* Champ obligatoire'
        } else if (!this.stateIssue){
          this.textIssue = `Merci de ne pas utiliser les caractères [|/*+&#{([]})<>$£€%=^]`
        } else {
          this.textIssue = ''
        }
      }
    },
    submitForm () {
      if (this.email.length === 0 || this.stateEmail !== true ||
          this.firstName.length === 0 || this.stateFirstName !== true ||
          this.lastName.length === 0 || this.stateLastName !== true ||
          this.issue.length === 0 || this.stateIssue !== true) {
        this.showAlertError('Merci de renseigner les différents champs au bon format', '1500')
      } else {
        let data = {
          lastName: this.lastName,
          firstName: this.firstName,
          email: this.email,
          issue: this.issue
        }
        this.$store.dispatch('createIssue', data)
                .then(() => {
                  this.showAlertSuccess('Votre demande a bien été envoyée !')
                  this.lastName = ''
                  this.firstName = ''
                  this.email = ''
                  this.issue = ''
                  this.contactUsActive = !this.contactUsActive
                  this.$store.dispatch('messageWaiting')
                  this.$store.dispatch('readAllIssues')
                  this.$store.dispatch('readAllReports')
                  this.$store.dispatch('readAllPending')
                })
                .catch((error) => {
                  console.log(error)
                  this.showAlertError('Une erreur est survenue, merci de réessayer ultérieurement !', '4000')
                })
      }
    },
    showAlertSuccess (title) {
      this.$swal({
        title: title,
        position: 'center',
        icon: 'success',
        showConfirmButton: false,
        timer: '2500'})
    },
    showAlertError (title, timer) {
      this.$swal({
        title: title,
        position: 'center',
        icon: 'error',
        showConfirmButton: false,
        timer: timer})
    }
  }
}
</script>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
