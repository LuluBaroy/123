<template>
  <div class="flex formPart flex-col p-2 sm:p-5 sm:m-5 mt-5 rounded-2xl">
    <!--POST AUTHOR AND POST OPTIONS-->
    <div class="flex flex-col sm:flex-row justify-center items-center sm:justify-start sm:items-start mb-5 pb-5 postAuthor ">
      <div class="flex flex-col justify-center items-center sm:justify-start sm:items-start sm:w-8/12">
        <router-link v-if="post.UserId !== 12" :to="`/profile/${post.UserId}`" aria-label="profil utilisateur" class="flex flex-row break-all justify-center items-center sm:mr-5 sm:p-2 hover:bg-blue-300 hover:rounded-xl">
          <img :src="post.User.url_profile_picture" :alt="post.User.alt_profile_picture" class="userPhotoPosts mr-2"/>
          <div class="flex flex-col justify-start items-center">
            <h3 class="text-2xl font-bold">{{ post.User.username }}</h3>
            <p class="text-xs text-gray-500"> le {{ post.createdAt.split(' ')[0].split('-')[2] }}-{{ post.createdAt.split(' ')[0].split('-')[1] }}-{{ post.createdAt.split(' ')[0].split('-')[0] }} à {{ post.createdAt.split(' ')[1].split(':')[0] }}h{{ post.createdAt.split(':')[1].split(':')[0]  }}</p>
          </div>
        </router-link>
        <div v-else class="flex flex-row justify-center items-center sm:mr-5 p-2">
          <img :src="post.User.url_profile_picture" :alt="post.User.alt_profile_picture" class="userPhotoPosts mr-2"/>
          <div class="flex flex-col justify-start items-center">
            <h3 class="text-2xl font-bold">{{ post.User.username }}</h3>
            <p class="text-xs text-gray-500"> le {{ post.createdAt.split(' ')[0].split('-')[2] }}-{{ post.createdAt.split(' ')[0].split('-')[1] }}-{{ post.createdAt.split(' ')[0].split('-')[0] }} à {{ post.createdAt.split(' ')[1].split(':')[0] }}h{{ post.createdAt.split(':')[1].split(':')[0]  }}</p>
          </div>
        </div>
      </div>

      <!--OPTIONS USER = AUTHOR || ADMIN-->
      <div class="flex flex-row justify-center items-center mt-2 sm:mt-0 sm:justify-end sm:items-start sm:w-6/12 w-11/12">
        <div>
          <button type="button" class="" id="options-button" aria-expanded="true" aria-haspopup="true" @click="hasClickedOptions = !hasClickedOptions; indexFunction = indexPost;">
            <i class="fa-solid fa-ellipsis text-4xl cursor-pointer"></i>
          </button>
        </div>

        <div v-if="indexFunction === indexPost && hasClickedOptions" class="absolute left-0 right-0 top-7 z-10 mt-2 origin-center rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="options-button" tabindex="-1">
          <!--REPORT POST BTN-->
          <button  @click.prevent="indexFunction = indexPost; checkReports(indexFunction);" class="border-b border-gray-300 hover:bg-blue-100 w-full pt-2 pb-2"><i class="fa-solid fa-triangle-exclamation"></i> Signaler le post</button>
          <div v-if="post.User.id === currentUser.id || currentUser.infos.role && currentUser.infos.role.includes('admin')" class="flex-col flex justify-center items-center" role="none">
            <!--DELETE POST BTN-->
            <button @click.prevent="openModalDeletePost = !openModalDeletePost; indexFunction = indexPost;" class="border-b border-gray-300 hover:bg-blue-100 w-full pt-2 pb-2"><i class="fa-solid fa-trash-can"></i> Supprimer le post</button>
            <!--UPDATE POST BTN-->
            <button @click.prevent="openModalUpdatePost = !openModalUpdatePost; indexFunction = indexPost; setPostValue(indexPost)" class="hover:bg-blue-100 w-full pt-2 pb-2"><i class="fa-regular fa-pen-to-square"></i> Editer le post</button>
          </div>
        </div>
      </div>
    </div>
    <!--POST CONTENT-->
    <div class="bg-white rounded-xl shadow-gray-400 p-4">
        <h4 class="text-xl text-left mb-5 font-normal">{{ post.title }}</h4>
        <div class="flex flex-col items-center justify-center mr-auto ml-auto w-11/12">
          <p class="text-left text-base font-light mb-5 break-all">{{ post.content }}</p>
          <img :src="post.url_gif" :alt="post.alt_gif" class="max-w-full max-h-48 mr-auto ml-auto rounded-2xl"/>
        </div>
    </div>
    <comments_likes :post="post" :index-post="indexPost"></comments_likes>
    <!--MODAL POST REPORT-->
    <div v-if="openModalReportPost" class="relative z-10" aria-labelledby="modal-delete" role="dialog" aria-modal="true">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex p-2 min-h-full items-center justify-center text-center sm:p-0">
          <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-2xl transition-all sm:w-full sm:max-w-lg">
            <div class="bg-white">
              <div class="sm:flex sm:items-start">
                <div class="text-center sm:text-left w-full">
                  <h3 class=" pl-4 pt-6 pb-6 bg-gray-300 w-full border border-gray-400 text-xl font-medium leading-6 text-gray-900" id="modal-title">Signaler le post</h3>
                  <div class="mt-6 pl-4 pr-4 mb-6">
                    <form class="flex flex-col sm:flex-row justify-center sm:justify-evenly items-center">
                      <label for="postReport" class="text-base sm:w-3/12">Signalement :</label>
                      <p v-if="textReport.length > 0">{{textReport}}</p>
                      <textarea
                          id="postReport"
                          placeholder="Expliquez nous le problème que vous rencontrez avec ce post ..."
                          v-model="postReport"
                          class="postInput w-11/12 sm:w-8/12 resize-none rounded-xl "
                          required
                          rows="3"
                          max-rows="6"
                          :state="statePostReport"
                          @keyup="testInput('report')"
                      ></textarea>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button type="button" :disabled="textReport.length > 0" class="inline-flex disabled:bg-gray-500 w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 sm:ml-3 sm:w-auto sm:text-sm" @click.prevent="sendPostReport(indexFunction); openModalReportPost = !openModalReportPost; hasClickedOptions=false; showAlertSuccess('Post signalé !'); indexFunction = null">Signaler le post</button>
              <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" @click.prevent="openModalReportPost = !openModalReportPost; hasClickedOptions = false; indexFunction = null">Annuler</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--MODAL DELETE POST-->
    <div v-if="openModalDeletePost" class="relative z-10" aria-labelledby="modal-delete" role="dialog" aria-modal="true">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex p-2 sm:p-0 min-h-full items-center justify-center text-center">
          <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-2xl transition-all sm:w-full sm:max-w-lg">
            <div class="bg-white w-full">
              <div class="sm:flex sm:items-start w-full">
                <div class="text-center sm:text-left w-full">
                  <h3 class="pl-4 pt-6 pb-6 bg-gray-300 border border-gray-400 font-medium text-xl w-full leading-6 text-gray-900" id="modal-title">Supprimer le post</h3>
                  <div class="mt-6 mb-6 pl-4 pr-4">
                    <p class="text-base text-gray-900">Êtes-vous sûr(e) de vouloir supprimer le post ?</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button type="button" class="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm" @click.prevent="deletePost(indexFunction); hasClickedOptions=false; indexFunction = null">Supprimer le post</button>
              <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" @click.prevent="openModalDeletePost = !openModalDeletePost; hasClickedOptions = false; indexFunction = null">Annuler</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--MODAL UPDATE POST-->
    <div v-if="openModalUpdatePost" class="relative z-10" aria-labelledby="modal-update" role="dialog" aria-modal="true">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full p-2 sm:p-0 items-end justify-center text-center sm:items-center">
          <div class="relative w-11/12 md:w-10/12 xl:w-8/12 transform overflow-y-scroll rounded-lg bg-white text-left shadow-xl transition-all ">
            <div class="bg-white">
              <div class="flex">
                <div class="flex flex-col ml-auto mr-auto w-full">
                  <h3 class="sm:pl-4 text-center sm:text-left pt-6 pb-6 bg-gray-300 border border-gray-400 font-medium text-xl w-full leading-6 text-gray-900" id="modal-title">Editer le post</h3>
                  <div class="formPart flex flex-col justify-center items-center rounded-2xl w-11/12 pr-2 pl-2 sm:w-9/12 xl:w-7/12 ml-auto mr-auto mt-6 sm:pl-4 sm:pr-4 mb-6">
                    <form class="flex flex-col content-center justify-center m-auto w-11/12">
                      <label for="title" class="mt-5">Titre : </label>
                      <p class="text-red-900 font-bold ml-5" v-if="textTitle.length !== 0">{{ textTitle }}</p>
                      <input class="mb-5 postInput mb-3 w-full rounded-xl" type="text" id="titleUpdate"
                             v-model="userPost.title"
                             required
                             :state="statePostTitle" @keyup="testInput('title')">
                      <label for="content" class="m-0">Publication : </label>
                      <p class="text-red-900 font-bold ml-5 mr-2" v-if="textContent.length !== 0">{{textContent}}</p>
                      <div class="flex flex-row justify-evenly items-center w-full bg-white border border-gray-400 rounded-xl mb-5">
                                  <textarea class="postInput w-11/12 h-36 resize-none border-none rounded-xl" type="text" id="contentUpdate"
                                            v-model="userPost.content"
                                            required
                                            :state="statePostContent" @keyup="testInput('content')"
                                  >{{ userPost.content }}></textarea>
                        <div class="relative inline-block">
                          <button type="button" class="inline-flex justify-center text-lg m-2 rounded-full border border-gray-300 bg-white p-2 font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100" id="menu-button" aria-expanded="true" aria-haspopup="true" @click="hasClickedEmoji = !hasClickedEmoji">
                            😃
                          </button>
                          <div v-if="hasClickedEmoji" class="max-h-48 w-52 absolute overflow-y-scroll sm:-left-20 -left-32 right-0 z-10 mt-2 origin-center rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                            <div class="py-1" role="none">
                              <button v-for="(emoji, index) in emojis" :key="index" @click.prevent="getEmoji(index, 'post')" class="text-lg p-2">{{ emoji }}</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="flex flex-row justify-around items-center">
                        <div class="flex flex-row sm:w-5/12 p-2 rounded-2xl border border-gray-300 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <label for="fileInputChange" class="flex flex-row justify-center items-center">
                            <i class="fa-regular fa-image ml-2 mr-2"></i>
                            <span class="text-center">Modifier l'image</span>
                          </label>
                          <input class="mb-5 hidden" type="file" id="fileInputChange"  @change="onFileChangedUpdate">
                        </div>
                      </div>
                      <img :src="userPost.img" v-if="url.length === 0" class=" rounded-2xl max-w-full max-h-48 mr-auto ml-auto flex mt-5 mb-5" id="updateImg" :alt="userPost.altImg"/>
                      <img v-else :src="url" class=" mr-auto ml-auto rounded-2xl max-w-full flex mt-5 mb-5" alt="Preview new image">
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button type="button" class="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-900 focus:outline-none focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm disabled:bg-gray-500" @click.prevent="testForm(); updatePost(indexFunction); " :disabled="textTitle.length !== 0 || textContent.length !== 0">Editer le post</button>
              <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" @click.prevent="openModalUpdatePost = !openModalUpdatePost; hasClickedOptions = false; indexFunction = null">Annuler</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Comments_likes from "@/components/comments_likes.vue";
export default {
  name: "posts.vue",
  components: {Comments_likes},
  props: ['post', 'indexPost'],
  data () {
    return {
      openModalDeletePost : false,
      openModalUpdatePost: false,
      openModalReportPost: false,
      indexFunction: null,
      indexEmoji: null,
      textTitle: '',
      textContent: '',
      textFile: '',
      textReport: '',
      userPost: {
        title: '',
        content: '',
        img: '',
        altImg: ''
      },
      emojis: this.$store.state.posts.emojis,
      url: '',
      postReport: '',
      hasClickedOptions: false,
      hasClickedEmoji : false,
      file: null
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.user.currentUser
    },
    posts() {
      return this.$store.state.posts.allPosts
    },
    comments() {
      return this.$store.state.posts.allComments
    },

    //FORM VALIDATION
    statePostTitle() {
      // eslint-disable-next-line no-useless-escape
      let regex = new RegExp(/['\|\/\\\*\+&#"\{\(\[\]\}\)<>$£€%=\^`]/g)
      if (this.userPost.title.length > 0 && !regex.test(this.userPost.title)) {
        return true
      } else if (this.userPost.title.length > 0 && regex.test(this.userPost.title) || regex.test(this.userPost.title)) {
        return false
      } else {
        return null
      }
    },
    statePostContent() {
      // eslint-disable-next-line no-useless-escape
      let regex = new RegExp(/['\|\/\\\*\+&#"\{\(\[\]\}\)<>$£€%=\^`]/g)
      if (this.userPost.content.length > 0 && !regex.test(this.userPost.content)) {
        return true
      } else if (this.userPost.content.length > 0 && regex.test(this.userPost.content) || regex.test(this.userPost.content)) {
        return false
      } else {
        return null
      }
    },
    statePostReport() {
      // eslint-disable-next-line no-useless-escape
      let regex = new RegExp(/['\|\/\\\*\+&#"\{\(\[\]\}\)<>$£€%=\^`]/g)
      if (this.postReport.length > 0 && !regex.test(this.postReport)) {
        return true
      } else if (this.postReport.length > 0 && regex.test(this.postReport) || regex.test(this.postReport)) {
        return false
      } else {
        return null
      }
    }
  },
  methods: {
    console(index) {
      console.log(index)
    },
    //POSTS
    getEmoji(index, name) {
      let emojiCode = this.emojis[index]
      switch (name) {
        case 'post' :
          if (this.userPost.content === null) {
            this.userPost.content = emojiCode
          } else {
            this.userPost.content += emojiCode
          }
          this.$swal({
            title: '',
            timer: '1000',
            text: '✔ Ajouté !️',
            showConfirmButton: false
          })
          this.hasClickedEmoji = false;
          break;
      }

    },
    onFileChangedUpdate(e) {
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
        } else if (!this.statePostTitle){
          this.textTitle = `Merci de ne pas utiliser les caractères [|/*+&#{([]})<>$£€%=^]`
        } else {
          this.textTitle = ''
        }
      } else if (text === 'content') {
        if(this.userPost.content.length === 0){
          this.textContent = '* Champ obligatoire'
        } else if (!this.statePostContent){
          this.textContent = `Merci de ne pas utiliser les caractères [|/*+&#{([]})<>$£€%=^]`
        } else {
          this.textContent = ''
        }
      }else if (text === 'report') {
        if(this.postReport.length === 0){
          this.textReport = '* Champ obligatoire'
        } else if (!this.statePostReport){
          this.textReport = `Merci de ne pas utiliser les caractères [|/*+&#{([]})<>$£€%=^]`
        } else {
          this.textReport = ''
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
    getPosts() {
      if(this.$route.name === 'profile'){
        this.$store.dispatch('posts/getAllPostsFromOneUser', this.currentUser.id)
            .catch(() => {
              this.showAlertError(`Oups ! Quelque chose s'est mal passé ! Si cela se reproduit, merci de nous contacter via la rubrique "Nous contacter" !`, '3500')
            })
      } else if(this.$route.name === 'admin'){
        this.$store.dispatch('posts/getOnePost', this.post.id)
            .catch(() => {
              this.showAlertError(`Oups ! Quelque chose s'est mal passé ! Si cela se reproduit, merci de nous contacter via la rubrique "Nous contacter" !`, '3500')
            })
      } else {
        this.$store.dispatch('posts/getAllPosts')
            .catch(() => {
              this.showAlertError(`Oups ! Quelque chose s'est mal passé ! Si cela se reproduit, merci de nous contacter via la rubrique "Nous contacter" !`, '3500')
            })
      }
    },
    getCurrentUser() {
      this.$store.dispatch('user/getCurrentUser')
          .catch(() => {
            this.showAlertError(`Oups ! Quelque chose s'est mal passé ! Si cela se reproduit, merci de nous contacter via la rubrique "Nous contacter" !`, '3500')
          })
    },
    setPostValue(index) {
      let postId
      if(index){
        postId = this.posts[index].id
      } else {
        postId = this.post.id
      }
      this.$store.dispatch('posts/getOnePost', postId)
          .then(post => {
            this.userPost.title = post.data.title
            this.userPost.content = post.data.content
            this.userPost.img = post.data.url_gif
            this.userPost.altImg = post.data.alt_url_gif
          }).catch(() => {
        this.showAlertError(`Oups ! Quelque chose s'est mal passé ! Si cela se reproduit, merci de nous contacter via la rubrique "Nous contacter" !`, '3500')
      })
    },
    updatePost(index) {
      let authorizedFile = ['jpg', 'jpeg', 'gif', 'png']
      console.log(this.textTitle.length)
      if (this.textTitle.length !== 0 || this.textContent.length !== 0  || this.file !== null && !authorizedFile.includes(this.file.name.split('.')[1])) {
        this.showAlertError('Merci de renseigner les différents champs au bon format', '1500')
      } else {
        let postId
        if(index){
          postId = this.posts[index].id
        } else {
          postId = this.post.id
        }
        let formData = new FormData()
        formData.append('title', this.userPost.title.toString())
        formData.append('content', this.userPost.content.toString())
        formData.append('image', this.file)
        let payload = {
          id: postId,
          data: formData
        }
        this.isClicked = false
        this.$store.dispatch('posts/updatePost', payload)
            .then(() => {
              this.openModalUpdatePost = !this.openModalUpdatePost;
              this.hasClickedOptions=false;
              this.indexFunction = null
              this.showAlertSuccess('Post édité !');
              this.getPosts()
              this.file = null
              this.userPost.title = ''
              this.userPost.content = ''
            }).catch(error => {
          if (error.message.split('code ')[1].includes('500')) {
            this.showAlertError(`Oups ! Quelque chose s'est mal passé ! Si cela se reproduit, merci de nous contacter via la rubrique "Nous contacter" !`, '3500')
          } else if (error.message.split('code ')[1].includes('403')) {
            this.showAlertError(`Vous n'avez pas le droit de modifier ce post, si besoin, vous pouvez signaler le contenu du post en cliquant sur le drapeau rouge !`, '4000')
          } else if (error.message.split('code ')[1].includes('404')) {
            this.showAlertError(`Ce post n'existe pas !`, '1500')
          } else if (error.message.split('code ')[1].includes('401')) {
            this.showAlertError(`Nous n'avons pas pu vous identifier, merci de vous connecter ou de créer un compte !`, '2500')
          } else if (error.message.split('code ')[1].includes('422')){
            this.showAlertError(`Merci de ne pas utiliser les caractères [|/*+&#{([]})<>$£€%=^]`, '3500')
          }
        })
      }
    },
    deletePost(index) {
      let postId
      if(index){
        postId = this.posts[index].id
      } else {
        postId = this.post.id
      }
      this.$store.dispatch('posts/deletePost', postId)
          .then(() => {
            this.showAlertSuccess('Post supprimé !', '2500')
            this.openModalDeletePost = !this.openModalDeletePost
            if(this.$route.name !== 'admin'){
              this.getPosts()
            }
            if (this.currentUser.infos.role.includes('admin')) {
              this.$store.dispatch('messageWaiting')
            }
          }).catch(error => {
        if (error.message.split('code ')[1].includes('500')) {
          this.showAlertError(`Oups ! Quelque chose s'est mal passé ! Si cela se reproduit, merci de nous contacter via la rubrique "Nous contacter" !`, '3500')
        } else if (error.message.split('code ')[1].includes('401')) {
          this.showAlertError(`Vous n'avez pas le droit de supprimer ce post, si besoin, vous pouvez signaler le contenu du post en cliquant sur le drapeau rouge !`, '4000')
        }
      })
    },
    checkReports(indexFunction){
      let postReport = this.currentUser.infos.PostsReports;
      if(postReport.length === 0){
        this.openModalReportPost = !this.openModalReportPost;
      } else {
        let postId = [];
        for(let report in postReport){
          postId.push(postReport[report].post_id);
        }
        let currentPostId
        if(indexFunction){
          currentPostId = this.posts[indexFunction].id
        } else {
          currentPostId = this.post.id
        }
        if (postId.includes(currentPostId)){
          this.showAlertError('Vous avez déjà signalé ce post, votre demande est en cours de traitement.', '3000')
        } else {
          this.openModalReportPost = !this.openModalReportPost
        }
      }
    },
    sendPostReport (index) {
      if (this.statePostReport !== true) {
        this.showAlertError('Merci de renseigner les différents champs', '1500')
      } else {
        let postId
        if(index){
          postId = this.posts[index].id
        } else {
          postId = this.post.id
        }
        let payload = {
          id: postId,
          newReport: {
            report: this.postReport.toString()
          }
        }
        this.showAlertSuccess('Post signalé !')
        this.$store.dispatch('posts/sendPostReport', payload)
            .then(() => {
              this.postReport = ''
              if(this.currentUser.infos.role.includes('admin')){
                this.$store.dispatch('messageWaiting')
              }
              this.getCurrentUser();
            }).catch(error => {
          if (error.message.split('code ')[1].includes('500')) {
            this.showAlertError(`Oups ! Quelque chose s'est mal passé ! Si cela se reproduit, merci de nous contacter via la rubrique "Nous contacter" !`, '3500')
          } else if (error.message.split('code ')[1].includes('400')) {
            this.showAlertError(`Nous n'avons pas pu vous identifier, merci de vous connecter ou de créer un compte !`, '3500')
          }
        })
      }
    },
    //MODALS + ALERTS
    showAlertSuccess (title) {
      this.$swal({
        title: title,
        position: 'center',
        icon: 'success',
        showConfirmButton: false,
        timer: '1500'})
    },
    showAlertError (title, timer) {
      this.$swal({
        title: title,
        position: 'center',
        icon: 'error',
        showConfirmButton: false,
        timer: timer})
    },
    settings (index) {
      return 'settings' + index
    }
  },
}
</script>

<style scoped>

</style>