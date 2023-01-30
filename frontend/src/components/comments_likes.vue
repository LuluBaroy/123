<template>
<!--  COMMENTS AND LIKES-->
  <div class="flex flex-col justify-around items-center w-full mt-5 border-t border-b border-gray-300 pt-2 pb-2">
    <div class="flex flex-row justify-around items-center w-full">
      <!--COMMENTS BTN-->
      <i @click="getComments(indexPost); changeOpenCommentsValue(indexPost); openLikes = null" type="button" class="fas fa-comments cursor-pointer justify-center self-center justify-center px-4 py-2 text-xl font-medium text-blue-500 hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100" id="menu-button" aria-expanded="true" aria-haspopup="true"><span class="ml-2 text-base" v-if="post.Comments.length > 1">{{ post.Comments.length }} commentaires</span><span class="ml-2 text-base" v-else>{{ post.Comments.length }} commentaire</span></i>
      <!--LIKES BTN-->
      <i @click="getLikes(indexPost); changeOpenLikesValue(indexPost); openComments = null" type="button" class="fa-regular fa-heart cursor-pointer justify-center self-center px-4 py-2 text-xl font-medium text-red-900 hover:text-red-400"><span class="ml-2 text-base" v-if="post.Likes.length > 1">{{post.Likes.length}} likes</span><span class="ml-2 text-base" v-else>{{post.Likes.length}} like</span></i>
    </div>
    <!--COMMENTS VIEW-->
    <div v-if="openComments === indexPost && comments.length > 0" class="max-h-48 w-full overflow-y-scroll mt-2 origin-center rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
      <h2 class="border-b border-gray-600 p-2 text-left bg-gray-200 text-black">Commentaires</h2>
      <div class="flex flex-row justify-center items-center postAuthor top-0 right-0 w-full" v-for="(comment, indexComment) in comments" :key="comment.id">
        <div class="flex flex-col justify-center items-center w-full p-2">
          <div class="flex flex-row w-full">
            <router-link :to="`/profile/${comment.UserId}`" @click="openComments = null" aria-label="profil utilisateur" class="w-8/12 md:w-6/12 flex flex-row justify-start items-center sm:mr-5 p-2 hover:bg-blue-300 hover:rounded-xl">
              <img :src="comment.User.url_profile_picture" :alt="comment.User.alt_profile_picture" class="userPhotoPosts mr-2"/>
              <div class="flex flex-col justify-start items-center">
                <h3 class="sm:text-xl text-base break-all font-bold">{{ comment.User.username }}</h3>
                <p class="text-xs text-gray-500"> le {{ comment.createdAt.split(' ')[0].split('-')[2] }}-{{ comment.createdAt.split(' ')[0].split('-')[1] }}-{{ comment.createdAt.split(' ')[0].split('-')[0] }} à {{ comment.createdAt.split(' ')[1].split(':')[0] }}h{{ comment.createdAt.split(':')[1].split(':')[0]  }}</p>
              </div>
            </router-link>

<!--            COMMENTS OPTIONS-->
            <i class="fa-solid fa-ellipsis flex justify-center sm:justify-end items-center cursor-pointer text-xl w-4/12 sm:w-6/12 sm:mr-5" @click="changeOpenCommentsOptionsValue(indexComment); indexFunction = indexComment"></i>
          </div>
          <div v-if="openCommentsOptions === indexComment" class="flex flex-col right-0 md:-top-14 sm:-top-7 sm:left-20 md:left-24 z-10 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
<!--            REPORT COMMENT BTN-->
            <button @click.prevent="checkCommentsReports(indexFunction);" class="p-2 border-b border-gray-300 w-full hover:bg-blue-200"><i class="fa-solid fa-triangle-exclamation"></i> Signaler le commentaire</button>
<!--            OPTIONS FOR ADMIN OR COMMENT AUTHOR-->
            <div v-if="comment.User && comment.User.id === currentUser.id || currentUser.infos.role && currentUser.infos.role.includes('admin')" class="flex flex-col justify-center items-center">
<!--              DELETE COMMENT BTN-->
              <button @click.prevent="openModalDeleteComment = !openModalDeleteComment" class="p-2 border-b border-gray-300 w-full hover:bg-blue-200"><i class="fa-solid fa-trash-can"></i> Supprimer le commentaire</button>
<!--              UPDATE COMMENT BTN-->
              <button @click.prevent="openModalUpdateComment = !openModalUpdateComment; userComment.comment = comment.comment;" class="p-2 w-full hover:bg-blue-200"><i class="fa-regular fa-pen-to-square"></i> Editer le commentaire</button>
            </div>
          </div>
          <p class="text-left text-base font-light mb-5 mt-5 break-words">{{ comment.comment }}</p>
        </div>
      </div>
    </div>
    <div v-if="openComments === indexPost && comments.length === 0" class="max-h-48 w-full relative overflow-y-scroll mt-2 origin-center rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
      <h2 class="border-b border-gray-600 p-2 text-left bg-gray-200 text-black">Commentaires</h2>
      <p class="p-3">Aucun Commentaire</p>
    </div>
    <!--LIKES VIEW-->
    <div class="flex-col flex justify-center items-center w-full">
      <div v-if="openLikes === indexPost" class="w-full">
        <div v-if="likes && likes.length > 0" class="w-full max-h-48 overflow-y-scroll mt-2 origin-center rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <h2 class="border-b border-gray-600 p-2 text-left bg-gray-200 text-black">Likes</h2>
          <div class="flex flex-row justify-center items-center border-b border-gray-300" v-for="like in likes" :key="like.id">
            <div class="flex flex-col justify-center items-center p-2">
              <div class="flex flex-col sm:flex-row w-full">
                <router-link :to="`/profile/${like.id}`" @click="openLikes = null" aria-label="profil utilisateur" class="w-full flex flex-col sm:flex-row justify-center items-center p-2 hover:bg-blue-300 hover:rounded-xl">
                  <img :src="like.url_profile_picture" :alt="like.alt_profile_picture" class="userPhotoPosts mr-2"/>
                  <div class="flex flex-col justify-start items-center">
                    <h3 class="text-base sm:text-lg font-bold break-all">{{ like.username }}</h3>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="w-full max-h-48 overflow-y-scroll mt-2 origin-center rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <h2 class="border-b border-gray-600 p-2 text-left bg-gray-200 text-black">Likes</h2>
          <p class="p-3">Aucun like</p>
        </div>
      </div>
    </div>
  </div>
  <!--ADD COMMENT/LIKE-->
  <div class="flex flex-col justify-center sm:flex-row sm:justify-around items-center">
    <!--ADD COMMENT-->
    <div class="flex order-2 sm:order-1 flex-col justify-around w-full mt-3 sm:w-7/12 ">
      <div class="flex justify-center items-center">
        <form class="flex flex-col justify-center items-center w-full">
          <div class="flex flex-col justify-around items-center mb-2">
            <label
                for="userComment"
                class="text-center cursor-default">Commenter :</label>
            <p v-if="textComment.length > 0">{{textComment}}</p>
          </div>
          <div class="flex flex-row justify-between items-center w-full bg-white border border-gray-400 rounded-xl">
                <textarea
                    id="userComment"
                    required
                    v-model="userComment.comment"
                    placeholder="Entrez votre commentaire ..."
                    class=" resize-none w-full sm:w-9/12 border-none focus:outline-0 focus:outline-white rounded-xl"
                    :state="stateComment" @keyup="testInput('comment')" @focusout="textComment = ''"
                ></textarea>
            <div class="relative inline-block sm:w-3/12">
              <div class="flex justify-center">
                <button type="button" class="text-lg inline-flex w-6/12 justify-center rounded-full border border-gray-300 bg-white p-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true" @click="hasClickedEmoji = !hasClickedEmoji; indexEmoji = indexPost">
                  😃
                </button>
              </div>
              <div v-if="!openModalUpdateComment && hasClickedEmoji && indexEmoji === indexPost" class="max-h-48 w-52 absolute overflow-y-scroll sm:left-0 -left-40 right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                <div class="p-1" role="none">
                  <button v-for="(emoji, index) in emojis" :key="index" @click.prevent="getEmoji(index, 'comment')" class="text-lg p-2">{{ emoji }}</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <button type="submit" :disabled="textComment.length > 0" @click.prevent="addComment(indexPost); getComments(indexPost); getPosts();" class="p-2 flex justify-center self-center mt-5 w-full sm:w-6/12 rounded-md disabled:bg-gray-500 bg-blue-900 hover:bg-gray-500 transition-all text-white ring-1 ring-black ring-opacity-5">Commenter</button>
    </div>
    <!--ADD LIKE-->
    <button type="submit" @click.prevent="checkLikes(indexPost); getLikes(indexPost); getPosts(); " class="order-1 sm:order-2 p-2 flex justify-center self-center mt-5 w-full sm:w-3/12 rounded-md bg-blue-900 hover:bg-gray-500 transition-all text-white ring-1 ring-black ring-opacity-5"><span v-if="post.Likes.length > 0 && post.Likes.filter(like => like.user_id === currentUser.infos.id).length > 0 ">Retirer le like</span><span v-else>Liker</span></button>
  </div>

  <!--MODAL REPORT COMMENT-->
  <div v-if="openModalReportComment" class="relative inset-0 z-10" aria-labelledby="modal-reportComment" role="dialog" aria-modal="true">
    <div class="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity"></div>
    <div class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex min-h-full items-center justify-center p-2 text-center sm:items-center sm:p-0">
        <div class="relative transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all sm:w-full sm:max-w-lg">
          <div class="bg-white">
            <div class="sm:flex sm:items-start">
              <div class="text-center sm:text-left w-full">
                <h3 class="text-xl rounded-t-xl border border-gray-400 bg-gray-300 pt-6 pb-6 pl-4 font-medium leading-6 text-gray-900" id="modal-title">Signaler le commentaire</h3>
                <div class="mt-6 mb-6">
                  <form class="flex flex-col justify-center sm:flex-row sm:justify-evenly items-center">
                    <label for="commentReport" class="sm:w-3/12 w-full text-base text-center">Signalement :</label>
                    <p v-if="textCommentReport.length > 0">{{textCommentReport}}</p>
                    <textarea
                        id="commentReport"
                        placeholder="Expliquez nous le problème que vous rencontrez avec ce commentaire ..."
                        v-model="commentReport"
                        class="postInput w-11/12 sm:w-8/12 resize-none rounded-xl "
                        required
                        rows="3"
                        max-rows="6"
                        :state="stateCommentReport"
                        @keyup="testInput('report')"
                    ></textarea>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button :disabled="textCommentReport.length > 0" type="button" class="inline-flex disabled:bg-gray-500 w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm" @click.prevent="sendCommentReport(indexPost, indexFunction); getComments(indexPost); getPosts(); openCommentsOptions = null; openModalReportComment = !openModalReportComment; showAlertSuccess('Commentaire signalé !');">Signaler le commentaire</button>
            <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" @click.prevent="openModalReportComment = !openModalReportComment; openCommentsOptions = null;">Annuler</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--MODAL DELETE COMMENT-->
  <div v-if="openModalDeleteComment" class="relative inset-0 z-10" aria-labelledby="modal-deleteComment" role="dialog" aria-modal="true">
    <div class="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity"></div>
    <div class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex min-h-full p-2 items-center justify-center text-center sm:items-center sm:p-0">
        <div class="relative transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all sm:w-full sm:max-w-lg">
          <div class="bg-white">
            <div class="sm:flex sm:items-start">
              <div class="text-center sm:text-left w-full">
                <h3 class="text-xl rounded-t-xl pt-6 pb-6 pl-4 bg-gray-300 border-b border-b-gray-400 font-medium leading-6 text-gray-900" id="modal-title">Supprimer le commentaire</h3>
                <div class="mt-6 mb-6 pl-4 pr-4">
                  <p class="text-base text-gray-900">Êtes-vous sûr(e) de vouloir supprimer le commentaire ?</p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button type="button" class="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm" @click.prevent="deleteComment(indexPost, indexFunction); getComments(indexPost); getPosts(); openCommentsOptions = null; openModalDeleteComment = !openModalDeleteComment; showAlertSuccess('Commentaire supprimé !')">Supprimer le commentaire</button>
            <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" @click.prevent="openModalDeleteComment = !openModalDeleteComment; openCommentsOptions = null">Annuler</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--MODAL UPDATE COMMENT-->
  <div v-if="openModalUpdateComment" class="absolute inset-0 z-50" aria-labelledby="modal-updateComment" role="dialog" aria-modal="true">
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
    <div class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex min-h-full p-2 items-center justify-center text-center sm:items-center sm:p-0">
        <div class="relative sm:w-8/12 transform overflow-y-scroll rounded-xl bg-white text-left shadow-xl transition-all sm:my-8">
          <div class="bg-white">
            <div class="flex">
              <div class="flex flex-col ml-auto mr-auto w-full">
                <h3 class="text-xl pl-4 pt-6 pb-6 rounded-t-xl bg-gray-300 border-b border-b-gray-400 font-medium leading-6 text-gray-900" id="modal-title">Editer le commentaire</h3>
                <div class="formPart flex flex-col w-11/12 sm:w-9/12 md:w-7/12 justify-center items-center rounded-2xl ml-auto mr-auto mt-6 mb-6">
                  <form class="flex p-1 flex-col mt-5 mb-5 items-center justify-center w-full sm:w-10/12 m-auto">
                    <label for="commentUpdate" class="text-center p-2">Votre commentaire :</label>
                    <p v-if="textComment.length > 0">{{textComment}}</p>
                    <div class="flex flex-row bg-white justify-between items-center w-11/12 mt-5 mb-5 rounded-xl">
                                        <textarea
                                            id="commentUpdate"
                                            required
                                            v-model="userComment.comment"
                                            class="postInput w-11/12 text-center resize-none border-none rounded-xl sm:w-7/12 md:w-9/12"
                                            rows="3"
                                            max-rows="6"
                                            :state="stateComment"
                                            @keyup="testInput('comment')"
                                        >{{userComment.comment}}</textarea>
                      <div class="relative inline-block float-right sm:w-5/12 md:w-2/12">
                        <button type="button" class="inline-flex text-lg rounded-full border border-gray-300 bg-white p-2 font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100" id="menu-button" aria-expanded="true" aria-haspopup="true" @click="hasClickedEmoji = !hasClickedEmoji">
                          😃
                        </button>
                        <div v-if="hasClickedEmoji" class="max-h-32 w-52 absolute overflow-y-scroll sm:-left-20 -left-44 right-0 z-10 mt-2 origin-center rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                          <div class="py-1" role="none">
                            <button v-for="(emoji, index) in emojis" :key="index" @click.prevent="getEmoji(index, 'comment')" class="text-lg p-2">{{ emoji }}</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button type="button" :disabled="textComment.length > 0" class="inline-flex w-full disabled:bg-gray-500 justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm" @click.prevent="updateComment(indexPost, indexFunction); showAlertSuccess('Commentaire édité !'); userComment.comment = ''; openModalUpdateComment = !openModalUpdateComment; openCommentsOptions = null; getPosts(); getComments(indexPost)">Editer le commentaire</button>
            <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" @click.prevent="openModalUpdateComment = !openModalUpdateComment; userComment.comment = ''; openCommentsOptions = null">Annuler</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "comments.vue",
  props: ['indexPost', 'post'],
  data () {
    return {
      indexFunction: null,
      indexEmoji: null,
      openComments: null,
      commentPostId : [],
      openLikes: null,
      openCommentsOptions: null,
      openModalUpdateComment: false,
      hasClickedOptions: false,
      hasClickedEmoji : false,
      openModalDeleteComment: false,
      openModalReportComment: false,
      textComment: '',
      textCommentReport: '',
      emojis: this.$store.state.posts.emojis,
      likes: null,
      posts: null,
      comments: [],
      userComment: {
        comment: ''
      },
      commentReport: '',
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.user.currentUser
    },
    stateComment () {
      // eslint-disable-next-line no-useless-escape
      let regex = new RegExp(/['\|\/\\\*\+&#"\{\(\[\]\}\)<>$£€%=\^`]/g)
      if(this.userComment.comment.length > 0 && !regex.test(this.userComment.comment)){
        return true
      } else if (this.userComment.comment.length > 0 && regex.test(this.userComment.comment) || regex.test(this.userComment.comment)){
        return false
      } else {
        return null
      }
    },
    stateCommentReport () {
      // eslint-disable-next-line no-useless-escape
      let regex = new RegExp(/['\|\/\\\*\+&#"\{\(\[\]\}\)<>$£€%=\^`]/g)
      if(this.commentReport.length > 0 && !regex.test(this.commentReport)){
        return true
      } else if (this.commentReport.length > 0 && regex.test(this.commentReport) || regex.test(this.commentReport)){
        return false
      } else {
        return null
      }
    }
  },
  methods: {
    //USER
    getCurrentUser (){
      this.$store.dispatch('user/getCurrentUser')
          .catch(() => {
            this.showAlertError(`Oups ! Quelque chose s'est mal passé ! Si cela se reproduit, merci de nous contacter via la rubrique "Nous contacter" !`, '3500')
          })
    },
    testInput (text) {
      if (text === 'comment'){
        if (this.userComment.comment.length === 0){
          this.textComment = '* Champ obligatoire'
        } else if(!this.stateComment) {
          this.textComment = `Merci de ne pas utiliser les caractères [|/*+&#{([]})<>$£€%=^]`
        } else {
          this.textComment = ''
        }
      } else if(text === 'report'){
        if (this.commentReport.length === 0){
          this.textCommentReport = '* Champ obligatoire'
        } else if(!this.stateCommentReport) {
          this.textCommentReport = `Merci de ne pas utiliser les caractères [|/*+&#{([]})<>$£€%=^]`
        } else {
          this.textCommentReport = ''
        }
      }

    },
    testForm () {
      this.userComment.comment.length === 0 ? this.textComment = '* Champ obligatoire' : this.textComment = ''
    },
    //EMOJI
    getEmoji (index, name) {
      let emojiCode = this.emojis[index]
      switch (name) {
        case 'comment':
          if(this.userComment.comment === null) {
            this.userComment.comment = emojiCode
          } else {
            this.userComment.comment += emojiCode
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
    //POSTS
    getPosts () {
      if(this.$route.name === 'profile'){
        this.$store.dispatch('posts/getAllPostsFromOneUser', this.currentUser.id)
            .catch(() => {
              this.showAlertError(`Oups ! Quelque chose s'est mal passé ! Si cela se reproduit, merci de nous contacter via la rubrique "Nous contacter" !`, '3500')
            })
      } else if(this.$route.name === 'admin'){
        this.$store.dispatch('posts/getOnePost', this.post.id)
            .then(response => {
              this.$parent.$data.postInfo = response.data
            })
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
    //COMMENTS & LIKE
    changeOpenCommentsValue(index){
      if(this.openComments === null || this.openComments !== index){
        this.openComments = index
      } else {
        this.openComments = null
      }
    },
    changeOpenLikesValue(index){
      if(this.openLikes === null || this.openLikes !== index){
        this.openLikes = index
      } else {
        this.openLikes = null
      }
    },
    changeOpenCommentsOptionsValue(indexComment){
      if(this.openCommentsOptions === null || this.openCommentsOptions !== indexComment){
        this.openCommentsOptions = indexComment
      } else {
        this.openCommentsOptions = null
      }
    },
    getComments (index) {
      let postId = this.post.id
      this.$store.dispatch('posts/getComments', postId)
          .then(response => {
            this.comments = response.data
          })
          .catch(() => {
            this.showAlertError(`Oups ! Quelque chose s'est mal passé ! Si cela se reproduit, merci de nous contacter via la rubrique "Nous contacter" !`, '3500')
          })
    },
    addComment (index) {
      if (this.stateComment !== true) {
        this.showAlertError('Merci de renseigner les différents champs', '1500')
      } else {
        let postId = this.post.id
        let payload = {
          id: postId,
          newComment: {
            comment: this.userComment.comment.toString()
          }
        }
        this.showAlertSuccess('Commentaire ajouté !')
        this.$store.dispatch('posts/createComment', payload)
            .then(() => {
              this.userComment.clicked = false
              this.userComment.comment = ''
              this.getComments(index)
              this.getPosts()
            }).catch(() => {
          this.showAlertError(`Oups ! Quelque chose s'est mal passé ! Si cela se reproduit, merci de nous contacter via la rubrique "Nous contacter" !`, '3500')
        })
      }
    },
    setCommentValue (indexComment, index) {
      let payload = {
        commentId: this.comments[indexComment].id
      }
      this.$store.dispatch('posts/getOneComment', payload)
          .then(comment => {
            this.userComment.comment = comment.data.comment
          }).catch(() => {
        this.showAlertError(`Oups ! Quelque chose s'est mal passé ! Si cela se reproduit, merci de nous contacter via la rubrique "Nous contacter" !`, '3500')
      })
    },
    updateComment (index, indexComment) {
      if(this.stateComment === false){
        this.showAlertError('Merci de renseigner le champ au bon format', '1500')
      } else {
        this.showAlertSuccess('Commentaire modifié !')
        let postId = this.post.id
        let payload = {
          id: postId,
          commentId: this.comments[indexComment].id,
          newComment: {
            comment: this.userComment.comment.toString()
          }
        }
        this.isClicked = false
        this.$store.dispatch('posts/updateComment', payload)
            .then(() => {
              this.getComments(index)
              this.getPosts()
              this.userComment.comment = ''
            }).catch(error => {
          if (error.message.split('code ')[1].includes('500')) {
            this.showAlertError(`Oups ! Quelque chose s'est mal passé ! Si cela se reproduit, merci de nous contacter via la rubrique "Nous contacter" !`, '3500')
          } else if (error.message.split('code ')[1].includes('403')) {
            this.showAlertError(`Vous n'avez pas le droit de modifier ce commentaire, si besoin, vous pouvez signaler le contenu du post en cliquant sur le drapeau rouge !`, '4000')
          } else if (error.message.split('code ')[1].includes('404')) {
            this.showAlertError(`Ce commentaire n'existe pas !`, '1500')
          }
        })
      }
    },
    deleteComment (index, indexComment) {
      let postId = this.post.id
      let payload = {
        id: postId,
        commentId: this.comments[indexComment].id
      }
      this.$store.dispatch('posts/deleteComment', payload)
          .then(() => {
            this.getComments(index)
            this.getPosts()
            if(this.currentUser.infos.role.includes('admin')){
              this.$store.dispatch('messageWaiting')
            }
          }).catch(error => {
        if (error.message.split('code ')[1].includes('500')) {
          this.showAlertError(`Oups ! Quelque chose s'est mal passé ! Si cela se reproduit, merci de nous contacter via la rubrique "Nous contacter" !`, '3500')
        } else if (error.message.split('code ')[1].includes('403')) {
          this.showAlertError(`Vous n'avez pas le droit de supprimer ce commentaire, si besoin, vous pouvez signaler le contenu du post en cliquant sur le drapeau rouge !`, '4000')
        } else if (error.message.split('code ')[1].includes('404')) {
          this.showAlertError(`Ce commentaire n'existe pas !`, '1500')
        }
      })
    },
    checkCommentsReports(indexFunction){
      let commentReport = this.currentUser.infos.CommentsReports;
      if(commentReport.length === 0){
        this.openModalReportComment = !this.openModalReportComment;
      } else {
        let commentId = [];
        for(let report in commentReport){
          commentId.push(commentReport[report].comment_id);
        }
        if (commentId.includes(this.comments[indexFunction].id)){
          this.showAlertError('Vous avez déjà signalé ce commentaire, votre demande est en cours de traitement.', '3000')
        } else {
          this.openModalReportComment = !this.openModalReportComment
        }
      }
    },
    //COMMENTS REPORTS
    sendCommentReport (index, indexComment) {
      if (this.stateCommentReport !== true) {
        this.showAlertError('Merci de renseigner les différents champs', '1500')
      } else {
        let postId = this.post.id
        let payload = {
          id: postId,
          commentId: this.comments[indexComment].id,
          newReport: {
            report: this.commentReport.toString()
          }
        }
        this.isCommentReportClicked = false
        this.showAlertSuccess('Commentaire signalé !')
        this.$store.dispatch('posts/sendCommentReport', payload)
            .then(() => {
              this.commentReport = ''
              if(this.currentUser.infos.role.includes('admin')){
                this.$store.dispatch('messageWaiting')
              }
              this.getCurrentUser()
            }).catch(() => {
          this.showAlertError(`Oups ! Quelque chose s'est mal passé ! Si cela se reproduit, merci de nous contacter via la rubrique "Nous contacter" !`, '3500')
        })
      }
    },
    //LIKES
    checkLikes(index){
      let post = this.post
        if(post.Likes.filter(like => like.user_id === this.currentUser.infos.id).length > 0){
          this.showAlertSuccess('Like retiré !', '2500')
        } else {
          this.showAlertSuccess('Like ajouté !', '2500')
        }
        this.createLike(index)
    },
    getLikes (index) {
      let postId = this.post.id
      this.$store.dispatch('posts/getLikes', postId)
          .then(response => {
            this.likes = response.data
          }).catch(error => {
        if (error.message.split('code ')[1].includes('500')) {
          this.showAlertError(`Oups ! Quelque chose s'est mal passé ! Si cela se reproduit, merci de nous contacter via la rubrique "Nous contacter" !`, '3500')
        } else if (error.message.split('code ')[1].includes('400')) {
          this.showAlertError(`Nous n'avons pas pu vous identifier, merci de vous connecter ou de créer un compte !`, '3500')
        }
      })
    },
    createLike (index) {
      let postId = this.post.id
      this.$store.dispatch('posts/createLike', postId)
          .then(() => {
            this.getLikes(index)
            this.getPosts()
          })
          .catch(error => {
        if (error.message.split('code ')[1].includes('500')) {
          this.showAlertError(`Oups ! Quelque chose s'est mal passé ! Si cela se reproduit, merci de nous contacter via la rubrique "Nous contacter" !`, '3500')
        } else if (error.message.split('code ')[1].includes('400')) {
          this.showAlertError(`Nous n'avons pas pu vous identifier, merci de vous connecter ou de créer un compte !`, '3500')
        }
      })
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
  }
}
</script>

<style scoped>

</style>