<template>
  <section class="lg:w-9/12 w-full ml-auto mr-auto flex-column pl-1 pt-4 bg-white pr-1">
    <h2  class="border-b border-gray-400 font-bold text-2xl lg:text-4xl bg-gray-300 bg-opacity-50 rounded-xl p-4">Administrateur</h2>
    <div class="flex mt-5 flex-col min-h-screen justify-start items-center bg-white pb-72 md:pb-48">
      <p class="mt-6 mb-6 p-2 border border-gray-300 rounded-xl" v-if="messageWaiting.issues">Total messages : {{allIssues.length + allReports.postReports.length + allReports.commentReports.length}}
      <br>Messages en attente de traitement : {{messageWaiting.issues.length + messageWaiting.postReports.length + messageWaiting.commentReports.length}}</p>
      <article class="flex mt-5 flex-col justify-center items-center w-full items-center">
        <div class="tab bg-gray-200 overflow-hidden flex flex-col sm:flex-row justify-center items-center w-full sm:w-11/12 md:w-9/12 rounded-xl sm:rounded-b-none sm:rounded-t-xl">
          <button class="tablinks p-4 text-base hover:bg-gray-300 transition-all border-b border-b-gray-400 sm:border-b-0 font-medium w-full sm:w-4/12 h-20 " @click="openTab('userIssuesBtn','usersIssues'); getIssues()" id="userIssuesBtn">Problèmes utilisateurs <span v-if="messageWaiting.issues && messageWaiting.issues.length > 0" class="text-red-900 font-medium pt-0.5 pb-0.5 pl-2 pr-2 text-sm rounded-full border-2 border-red-900">{{messageWaiting.issues.length}}</span></button>
          <button class="tablinks p-4 text-base hover:bg-gray-300 transition-all border-b border-b-gray-400 sm:border-b-0 sm:border-r w-full sm:w-4/12 h-20 sm:border-l sm:border-r-gray-300 sm-border-l-gray-300 font-medium " @click="openTab('reportsPostsBtn','reportsPosts'); getAllReports()" id="reportsPostsBtn">Signalements de Posts <span v-if="messageWaiting.postReports && messageWaiting.postReports.length > 0" class="text-red-900 font-medium pt-0.5 pb-0.5 pl-2 pr-2 text-sm rounded-full border-2 border-red-900">{{messageWaiting.postReports.length}}</span></button>
          <button class="tablinks p-4 text-base hover:bg-gray-300 transition-all font-medium w-full sm:w-4/12 h-20" @click="openTab('reportsCommentsBtn','reportsComments'); getAllReports()" id="reportsCommentsBtn">Signalements de Commentaires <span v-if="messageWaiting.commentReports && messageWaiting.commentReports.length > 0" class="text-red-900 font-medium pt-0.5 pb-0.5 pl-2 pr-2 text-sm rounded-full border-2 border-red-900">{{messageWaiting.commentReports.length}}</span></button>
        </div>

        <!-- USERS ISSUES TAB -->
        <div id="usersIssues" class="tabcontent border mt-10 sm:mt-0 border-t-0 border-gray-300 rounded-xl sm:rounded-t-none sm:rounded-b-xl w-full sm:w-11/12 md:w-9/12">
          <h3 class="border-b border-t-none rounded-t-xl sm:rounded-t-none p-2 border-gray-300 bg-gray-300 w-full text-base text-left">Tous les messages</h3>
          <div v-if="allIssues.length === 0" class="p-4">
            <p>Aucun problème signalé</p>
          </div>
          <div v-else v-for="(issue, index) in allIssues" :key="index" class="flex flex-col sm:flex-row justify-center items-center p-4 rounded-b-xl border-b border-gray-300">
            <h4 class="sm:w-4/12 w-full">Message n°{{ issue.id }}</h4>
            <p v-if="issue.status === 'pending'" class="pl-2 flex w-full sm:w-4/12 justify-center pending">En attente de traitement</p>
            <p v-else class="flex w-full sm:w-4/12 justify-center treated">Traité</p><br>
            <div class="flex flex-col w-full sm:w-4/12 justify-center items-center">
              <button @click="openIssue = !openIssue; indexFunction = index" class="p-2 border rounded-xl border-gray-300 hover:bg-gray-200 transition-all w-full sm:w-8/12">Ouvrir</button>
              <button v-if="issue.status === 'treated'" @click="deleteIssue(index)" class="mt-2 p-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-all w-full sm:w-8/12">Supprimer</button>
            </div>

          </div>
          <!--MODAL ISSUE-->
          <div v-if="openIssue" class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div class="fixed inset-0 z-10 overflow-y-auto">
              <div class="flex min-h-full p-2 items-center justify-center text-center sm:items-center sm:p-0">
                <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div class="bg-white">
                    <div class="sm:flex sm:items-start">
                      <div class="text-center sm:text-left w-full">
                          <h3 class="text-xl pl-4 pt-6 pb-6 bg-gray-300 border border-gray-400 font-medium leading-6 text-gray-900" id="modal-title">Problème(s) rencontré(s)</h3>
                          <div class="flex flex-col justify-start items-start pl-4 pr-4 pb-6">
                            <div class="flex flex-col justify-start items-start w-full mt-5">
                                  <h3 class="text-2xl font-bold text-left">{{ allIssues[indexFunction].firstName + ' ' + allIssues[indexFunction].lastName}} vous a écrit</h3>
                                  <p class="text-xs text-gray-500 text-left"> le {{ allIssues[indexFunction].createdAt.split(' ')[0].split('-')[2] }}-{{ allIssues[indexFunction].createdAt.split(' ')[0].split('-')[1] }}-{{ allIssues[indexFunction].createdAt.split(' ')[0].split('-')[0] }} à {{ allIssues[indexFunction].createdAt.split(' ')[1].split(':')[0] }}h{{ allIssues[indexFunction].createdAt.split(':')[1].split(':')[0]  }}</p>
                            </div>
                            <div class="mt-4 mb-4 w-full items-center justify-evenly flex flex-row">
                              <img src="../assets/img/guillemets-g.png" class="max-w-sm max-h-5 flex self-start" alt="guillemet gauche"/>
                              <p class="border border-gray-300 rounded-xl shadow-gray-400 p-4 mt-4 items-center justify-evenly flex flex-row text-left text-base font-light break-all w-9/12">{{ allIssues[indexFunction].issue }}</p>
                              <img src="../assets/img/guillemets-d.png" class="max-w-sm max-h-5 flex self-end" alt="guillemet droit"/>
                            </div>
                          </div>
                      </div>
                    </div>
                  </div>
                  <div class="bg-gray-50 px-4 py-3 text-center sm:flex sm:px-6 justify-end items-center">
                    <button type="button" class=" self-center cursor-pointer inline-flex mb-4 sm:mb-0 w-full justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-base font-medium text-black shadow-sm hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">
                      <a :href="'mailto:' + allIssues[indexFunction].email" type="button" class="text-black">Envoyer un email</a>
                    </button>
                    <button v-if="allIssues[indexFunction].status === 'pending'" type="button" class="inline-flex self-center w-full justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm" @click="openIssue = !openIssue; updateIssue(indexFunction); indexFunction = null">Marqué comme traité</button>
                    <button type="button" class="mt-3 items-center inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" @click="openIssue = !openIssue; indexFunction = null">Annuler</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!--POSTS REPORTS TAB-->
        <div id="reportsPosts" class="tabcontent border mt-10 sm:mt-0 border-gray-300 rounded-xl sm:rounded-t-none sm:rounded-b-xl w-full sm:w-11/12 md:w-9/12">
          <h3 class="border-b p-2 rounded-t-xl sm:rounded-t-none border-gray-300 bg-gray-300 w-full text-base text-left">Tous les signalements de Posts</h3>
          <div class="p-4" v-if="allReports.postReports.length === 0">
            <p>Aucun signalement</p>
          </div>
          <div v-else v-for="(report, index) in allReports.postReports" :key="index" class="flex flex-col sm:flex-row justify-center items-center p-4 rounded-b-xl border-b border-gray-300">
            <h4 class="w-full sm:w-4/12">Signalement de post n°{{ report.id }}</h4>
            <p v-if="report.status === 'pending'" class="flex pl-2 w-full sm:w-4/12 justify-center pending">En attente de traitement</p>
            <p v-else class="flex w-full sm:w-4/12 justify-center treated">Traité</p><br>
            <div class="flex flex-col justify-center items-center w-full sm:w-4/12">
              <button @click="getPost(index); indexFunction = index; openReport = !openReport;" class="p-2 border rounded-xl border-gray-300 hover:bg-gray-200 transition-all w-full sm:w-8/12">Ouvrir</button>
              <button v-if="report.status === 'treated'" @click="deletePostReport(index)" class="mt-2 p-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-all w-full sm:w-8/12">Supprimer</button>
            </div>
          </div>
        </div>
        <!--MODAL POSTS REPORTS-->
        <div v-if="openReport && postInfo" class="relative z-10 mt-6" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          <div class="fixed inset-0 z-10 overflow-y-auto">
            <div class="flex min-h-full p-2 sm:p-0 items-center justify-center text-center sm:items-center ">
              <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-11/12 md:w-10/12 xl:w-8/12">
                <div class="bg-white">
                  <div class="sm:flex sm:items-start">
                    <div class="text-center sm:text-left w-full">
                      <h3 class="text-xl bg-gray-300 font-medium leading-6 text-gray-900 w-full border-t border-b border-gray-300 pt-6 pl-4 pb-6" id="modal-title">Post signalé</h3>
                      <div class="flex flex-col justify-start items-start pl-4 pr-4">
                        <div class="flex flex-col justify-start items-start w-full mt-5">
                          <h4 class="text-2xl font-bold text-left"><span class="break-all">{{ userInfo.username }}</span> a signalé un post</h4>
                          <p class="text-xs text-gray-500 text-left"> le {{ allReports.postReports[indexFunction].createdAt.split(' ')[0].split('-')[2] }}-{{ allReports.postReports[indexFunction].createdAt.split(' ')[0].split('-')[1] }}-{{ allReports.postReports[indexFunction].createdAt.split(' ')[0].split('-')[0] }} à {{ allReports.postReports[indexFunction].createdAt.split(' ')[1].split(':')[0] }}h{{ allReports.postReports[indexFunction].createdAt.split(':')[1].split(':')[0]  }}</p>
                        </div>
                          <div class="mt-4 w-full items-center justify-evenly flex flex-row">
                            <img src="../assets/img/guillemets-g.png" class="max-w-sm max-h-5 flex self-start" alt="guillemet gauche"/>
                            <p class="border border-gray-300 rounded-xl shadow-gray-400 p-4 mt-4 items-center justify-evenly flex flex-row text-left text-base font-light break-all w-9/12">{{ allReports.postReports[indexFunction].report }}</p>
                            <img src="../assets/img/guillemets-d.png" class="max-w-sm max-h-5 flex self-end" alt="guillemet droit"/>
                          </div>
                      </div>
                      <div class="flex ml-auto mr-auto mt-10 flex-col items-center justify-center w-11/12 md:w-10/12 xl:w-8/12">
                        <h4 class="text-xl font-medium underline flex mb-5">Post concerné :</h4>
                       <posts :post="postInfo" class="w-full"></posts>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="bg-gray-50 mt-5 sm:mt-0 px-4 py-3 text-center sm:flex sm:px-6 justify-end items-center mb-6">
                  <button class=" mb-5 sm:mb-0 self-center inline-flex w-full justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-base font-medium text-black shadow-sm hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">
                    <a :href="'mailto:' + userInfo.email" type="button" class="text-black">Envoyer un email à l'auteur du signalement</a>
                  </button>
                  <button class="self-center inline-flex w-full justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-base font-medium text-black shadow-sm hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">
                    <a v-if="postInfo.User.id !== 12" :href="'mailto:' + postInfo.User.email" type="button" class="text-black">Envoyer un email à l'auteur du post</a>
                  </button>
                  <button v-if="allReports.postReports[indexFunction].status === 'pending'" type="button" class="mt-5 sm:mt-0 mb-5 sm:mb-0 inline-flex self-center w-full justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm" @click="openReport = !openReport; updatePostReport(indexFunction)">Marqué comme traité</button>
                  <button type="button" class="mt-3 items-center inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" @click="openReport = !openReport">Fermer</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!--COMMENTS REPORTS TAB-->
        <div id="reportsComments" class="tabcontent border mt-10 sm:mt-0 border-gray-300 rounded-xl sm:rounded-t-none sm:rounded-b-xl w-full sm:w-11/12 md:w-9/12">
          <h3 class="border-b rounded-t-xl sm:rounded-t-none p-2 border-gray-300 bg-gray-300 w-full text-base text-left">Tous les signalements de Commentaires</h3>
          <div class="p-4" v-if="allReports.commentReports.length === 0">
            <p>Aucun signalement</p>
          </div>
          <div v-else v-for="(report, index) in allReports.commentReports" :key="index" class="flex flex-col sm:flex-row justify-center items-center p-4 rounded-b-xl border-b border-gray-300">
            <h4 class="w-full sm:w-4/12">Signalement de commentaire n°{{ report.id }}</h4>
            <p v-if="report.status === 'pending'" class="flex w-full pl-2 sm:w-4/12 justify-center pending">En attente de traitement</p>
            <p v-else class="flex w-full sm:w-4/12 justify-center treated">Traité</p><br>
            <div class="flex flex-col justify-center items-center w-full sm:w-4/12">
              <button @click="getComment(index); openReportComment = !openReportComment; indexFunction = index;  getUserInfo(index)" class="p-2 border rounded-xl border-gray-300 hover:bg-gray-200 transition-all w-full sm:w-8/12">Ouvrir</button>
              <button v-if="report.status === 'treated'" @click="deleteCommentReport(index)" class="mt-2 p-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-all w-full sm:w-8/12">Supprimer</button>
            </div>
          </div>
        </div>
        <!--MODAL COMMENTS REPORT-->
        <div v-if="openReportComment && comment" class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          <div class="fixed inset-0 z-10 overflow-y-auto">
            <div class="flex p-2 sm:p-0 min-h-full items-center justify-center text-center sm:items-center ">
              <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-11/12 md:w-10/12 xl:w-8/12">
                <div class="bg-white">
                  <div class="sm:flex sm:items-start">
                    <div class="text-center sm:text-left w-full">
                      <h3 class="text-xl bg-gray-300 font-medium leading-6 text-gray-900 w-full border-t border-b border-gray-300 pt-6 pl-4 pb-6" id="modal-title">Commentaire signalé</h3>
                      <div class="flex flex-col justify-start items-start w-full pl-4 pr-4">
                        <div class="flex flex-col justify-start items-start w-full mt-5">
                          <h4 class="text-2xl font-bold text-left">{{ userInfo.username }} a signalé un commentaire</h4>
                          <p class="text-xs text-gray-500 text-left"> le {{ allReports.commentReports[indexFunction].createdAt.split(' ')[0].split('-')[2] }}-{{ allReports.commentReports[indexFunction].createdAt.split(' ')[0].split('-')[1] }}-{{ allReports.commentReports[indexFunction].createdAt.split(' ')[0].split('-')[0] }} à {{ allReports.commentReports[indexFunction].createdAt.split(' ')[1].split(':')[0] }}h{{ allReports.commentReports[indexFunction].createdAt.split(':')[1].split(':')[0]  }}</p>
                        </div>
                        <div class="mt-4 w-full items-center justify-evenly flex flex-row">
                          <img src="../assets/img/guillemets-g.png" class="max-w-sm max-h-5 flex self-start" alt="guillemet gauche"/>
                          <p class="border border-gray-300 rounded-xl shadow-gray-400 p-4 mt-4 items-center justify-evenly flex flex-row text-left text-base font-light break-words w-9/12">{{ allReports.commentReports[indexFunction].report }}</p>
                          <img src="../assets/img/guillemets-d.png" class="max-w-sm max-h-5 flex self-end" alt="guillemet droit"/>
                        </div>
                      </div>
                      <div class="flex ml-auto mr-auto mt-10 flex-col items-center justify-center w-full sm:w-10/12 xl:w-8/10">
                        <h4 class="text-xl font-medium underline flex mb-4 ml-2">Commentaire concerné :</h4>
                        <div class="flex flex-col mt-4 mb-6 border border-gray-400 sm:p-2 rounded-xl w-11/12 sm:w-10/12 xl:w-8/12">
                          <div class="flex flex-col w-full">
                            <router-link :to="`/profile/${comment.author.id}`" @click="openReportComment = !openReportComment" aria-label="profil utilisateur" class="sm:w-6/12 w-full flex flex-row justify-start items-center sm:mr-5 p-2 hover:bg-blue-300 hover:rounded-xl">
                              <img :src="comment.author.url_profile_picture" :alt="comment.author.alt_profile_picture" class="userPhotoPosts mr-2"/>
                              <div class="flex flex-col justify-start items-center">
                                <h3 class="text-xl font-bold text-blue-900 break-all">{{ comment.author.username }}</h3>
                                <p class="text-xs text-gray-500"> le {{ comment.infos.created_at.split(' ')[0].split('-')[2] }}-{{ comment.infos.created_at.split(' ')[0].split('-')[1] }}-{{ comment.infos.created_at.split(' ')[0].split('-')[0] }} à {{ comment.infos.created_at.split(' ')[1].split(':')[0] }}h{{ comment.infos.created_at.split(':')[1].split(':')[0]  }}</p>
                              </div>
                            </router-link>
                            <p class="mt-4 mb-4 text-center">{{comment.infos.comment}}</p>
                          </div>
                        </div>
                        <button @click="getContext(indexFunction); hasClickedGetContext = !hasClickedGetContext" class="mt-4 mb-6 w-11/12 text-black p-4 bg-gray-300 rounded-xl hover:bg-gray-400 transition-all">
                          <span v-if="!hasClickedGetContext">Voir le contexte du commentaire</span>
                          <span v-else>Fermer le contexte du commentaire</span>
                        </button>
                        <posts v-if="hasClickedGetContext && postInfo" :post="postInfo" class="w-11/12 xl:w-8/12 m-auto"></posts>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="bg-gray-50 mt-5 sm:mt-0 px-4 py-3 text-center sm:flex sm:px-6 justify-end items-center">
                  <button class=" self-center inline-flex mb-2 sm:mb-0 w-full justify-center items-center rounded-md border border-transparent text-black bg-gray-200 px-4 py-2 text-base font-medium shadow-sm hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">
                    <a :href="'mailto:' + userInfo.email" type="button" class="text-black">Envoyer un email à l'auteur du signalement</a>
                  </button>
                  <button class="mb-2 sm:mb-0 self-center inline-flex w-full justify-center items-center rounded-md border border-transparent text-black bg-gray-200 px-4 py-2 text-base font-medium shadow-sm hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">
                    <a v-if="comment.author.id !== 12" :href="'mailto:' + comment.author.email" type="button" class="text-black">Envoyer un email à l'auteur du commentaire</a>
                  </button>
                  <button v-if="allReports.commentReports[indexFunction].status === 'pending'" type="button" class="mb-2 sm:mb-0 inline-flex self-center w-full justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm" @click="openReportComment = !openReportComment; updateCommentReport(indexFunction)">Marqué comme traité</button>
                  <button type="button" class="mt-3 items-center inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" @click="openReportComment = !openReportComment">Fermer</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
<script>
import Posts from "@/components/posts.vue";
export default {
  name: 'accountAdmin',
  components: {Posts},
  data () {
    return {
      indexFunction: null,
      openIssue: false,
      openReport: false,
      openReportComment: false,
      hasClickedGetContext: false,
      allIssues: '',
      allPending: '',
      allReports: {
        postReports: '',
        commentReports: ''
      },
      userInfo: '',
      comment: null
    }
  },
  computed: {
    messageWaiting () {
      return this.$store.state.issues.messageWaiting
    },
    postInfo(){
      return this.$store.state.posts.postInfo
    }
  },
  methods: {
      openTab(id, tabName) {
        let i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
          tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
          tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(tabName).style.display = "block";
        document.getElementById(id).className += " active";
      },
    //ALL REPORTS
    getAllReports () {
      this.$store.dispatch('readAllReports')
              .then(response => {
                this.allReports.postReports = response.data.postReports
                this.allReports.commentReports = response.data.commentReports
              })
    },
    //POSTS REPORTS
    updatePostReport (index) {
      let id = this.allReports.postReports[index].id
      this.$store.dispatch('updatePostReport', id)
              .then(() => {
                this.showAlertSuccess('Le signalement a été mis à jour !', '2000')
                this.getAllReports()
                this.$store.dispatch('messageWaiting')
              })
    },
    deletePostReport (index) {
      let id = this.allReports.postReports[index].id
      this.$store.dispatch('deleteOnePostReport', id)
              .then(() => {
                this.showAlertSuccess('Signalement supprimé', '1500')
                this.getAllReports()
                this.$store.dispatch('messageWaiting')
              })
    },
    getUserInfo (index) {
      let userId = this.allReports.postReports[index].UserId
      this.$store.dispatch('user/getOneUser', userId)
              .then((response) => {
                this.userInfo = response.data
              })
    },
    getPost (index) {
      let postId = this.allReports.postReports[index].PostId
      this.$store.dispatch('posts/getOnePost', postId)
              .then(() => {
                this.getUserInfo(index)
              }).catch(err => console.log(err))
    },
    //COMMENTS REPORTS
    updateCommentReport (indexComment) {
      let id = this.allReports.commentReports[indexComment].id
      this.$store.dispatch('updateCommentReport', id)
              .then(() => {
                this.showAlertSuccess('Le signalement a été mis à jour !', '2000')
                this.getAllReports()
                this.$store.dispatch('messageWaiting')
              })
    },
    deleteCommentReport (indexComment) {
      let id = this.allReports.commentReports[indexComment].id
      this.$store.dispatch('deleteOneCommentReport', id)
              .then(() => {
                this.showAlertSuccess('Signalement supprimé', '1500')
                this.getAllReports()
                this.$store.dispatch('messageWaiting')
              })
    },
    getComment (indexComment) {
        let payload = {
          id: this.allReports.commentReports[indexComment].PostId,
          commentId: this.allReports.commentReports[indexComment].CommentId
        }
        this.$store.dispatch('posts/getOneComment', payload)
            .then(response => {
              this.$store.dispatch('user/getOneUser', response.data.user_id)
                  .then(user => {
                    this.comment = {
                      infos: response.data,
                      author: user.data
                    }
                  })
            })

    },
    getContext (indexComment) {
      let postId = this.allReports.commentReports[indexComment].PostId
      this.$store.dispatch('posts/getOnePost', postId)
    },
    //ISSUES
    getIssues () {
      this.$store.dispatch('readAllIssues')
              .then(response => {
                this.allIssues = response.data
              })
    },
    getPending () {
      this.$store.dispatch('readAllPending')
              .then(response => {
                if (!response.data.message) {
                  this.allPending = response.data
                } else {
                  this.allPending = []
                }

              })
    },
    updateIssue (index) {
      let issueId = this.allIssues[index].id
      this.$store.dispatch('updateIssue', issueId)
              .then(() => {
                this.getIssues()
                this.getPending()
                this.$store.dispatch("messageWaiting")
              })
    },
    deleteIssue (index) {
      this.$store.dispatch('deleteIssue', this.allIssues[index].id)
              .then(() => {
                this.showAlertSuccess('Message supprimé !', '1500')
                this.getIssues()
                this.getPending()
                this.$store.dispatch('messageWaiting')
              })
    },
    showAlertSuccess (title, timer) {
      this.$swal({
        title: title,
        position: 'center',
        icon: 'success',
        showConfirmButton: false,
        timer: timer})
    },
    showAlertError (title, timer) {
      this.$swal({
        title: title,
        position: 'center',
        icon: 'error',
        showConfirmButton: false,
        timer: timer})
    }
  },
  beforeCreate () {
    if (!this.$cookies.isKey('user')) {
      this.$router.push({name: 'auth'})
    } else {
      this.$store.dispatch('user/getCurrentUser')
        .then(() => {
          if (!this.$store.state.user.currentUser.infos.role.includes('admin')){
            this.$router.push({name: 'wall'})
              .then(() => {
                this.showAlertError(`Vous n'avez pas les droits nécessaires pour accéder à cette page !`, '3500')
              })
          } else {
            this.$store.dispatch('user/getAllUser')
                    .then(() => {
                      this.$store.dispatch('messageWaiting')
                          .then(() => {
                            this.getIssues()
                            this.getAllReports()
                            this.getPending()
                          })
                    })
          }
        })
    }
  },
  mounted () {
    document.getElementById('usersIssues').style.display = "block"
    document.getElementById('userIssuesBtn').className += " active"
  }
}
</script>
<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
.tab button.active {
  background-color: rgba(68, 130, 215, 0.66);
}
.tabcontent {
  display: none;
}
.pending{
  color: brown;
}
.treated{
  color: darkcyan;
}
</style>
