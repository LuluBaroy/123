<template>
  <main class="bg-white w-11/12 p-2 mr-auto ml-auto shadow shadow-gray-400">
    <!--FAQ VIEW-->
    <h1 class="text-2xl mt-5 mb-5 font-medium">Bienvenue sur notre section Foire aux Questions !</h1>
    <h2 class="text-lg mb-6">Quel est votre problème ?</h2>
    <section class="flex flex-col lg:flex-col justify-center items-center pb-48">
      <div class="tab bg-gray-200 mb-5 md:mb-0 overflow-hidden flex flex-col lg:flex-row justify-center items-center w-full md:w-9/12 rounded-t-xl border-b border-gray-300">
        <button class="tablinks p-1 xl:p-4 text-base hover:bg-gray-300 transition-all font-medium w-full border-b border-b-gray-400 lg:border-b-0 lg:w-2/12 h-20 " @click="openTab('loginSignUpBtn','loginSignUp'); scrollTo('loginSignUp')" id="loginSignUpBtn">Connexion / Inscription</button>
        <button class="tablinks p-1 xl:p-4 text-base hover:bg-gray-300 transition-all w-full border-b border-b-gray-400 lg:border-b-0 lg:w-2/12 h-20 lg:border-r lg:border-l md:border-r-gray-300 lg:border-l-gray-300 font-medium" @click="openTab('postsBtn','posts'); scrollTo('posts')" id="postsBtn">Posts</button>
        <button class="tablinks p-1 xl:p-4 text-base hover:bg-gray-300 transition-all font-medium w-full border-b border-b-gray-400 lg:border-b-0 lg:w-2/12 h-20 " @click="openTab('commentsBtn','comments'); scrollTo('comments')" id="commentsBtn">Commen&shy;taires</button>
        <button class="tablinks p-1 xl:p-4 text-base hover:bg-gray-300 transition-all font-medium w-full border-b border-b-gray-400 lg:border-b-0 lg:w-2/12 h-20 lg:border-l lg:border-l-gray-300" @click="openTab('likesBtn','likes'); scrollTo('likes')" id="likesBtn">Likes</button>
        <button class="tablinks p-1 xl:p-4 text-base hover:bg-gray-300 transition-all font-medium w-full border-b border-b-gray-400 lg:border-b-0 lg:w-2/12 h-20 lg:border-l lg:border-r lg:border-r-gray-300 lg:border-l-gray-300" @click="openTab('accountBtn','account'); scrollTo('account')" id="accountBtn">Compte</button>
        <button class="tablinks p-1 xl:p-4 text-base hover:bg-gray-300 transition-all font-medium w-full lg:w-2/12 h-20" @click="openTab('otherUsersBtn','otherUsers'); scrollTo('otherUsers')" id="otherUsersBtn">Autres utilisateurs</button>
      </div>

      <!--LOGIN/SIGNUP-->
      <div id="loginSignUp" class="tabcontent rounded-b-xl bg-white border border-t-0 border-gray-300 w-full sm:w-9/12 mr-auto ml-auto">
        <div class="tab overflow-hidden flex flex-col sm:flex-row justify-center w-full items-center border-b border-b-gray-300">
          <button class="tablink p-4 text-base hover:rounded-bl-xl hover:bg-gray-50 transition-all font-medium h-20 w-full sm:w-6/12 " @click="openTabs('loginBtn','login'); scrollTo('login')" id="loginBtn">Connexion</button>
          <button class="tablink p-4 text-base hover:rounded-br-xl hover:bg-gray-50 transition-all border-l h-20 w-full sm:w-6/12 border-l-gray-300 font-medium " @click="openTabs('signUpBtn','signUp'); scrollTo('signUp') " id="signUpBtn">Inscription</button>
        </div>
        <!--LOGIN-->
        <div id="login" class="tabcontents border border-t-0 border-gray-300">
          <h3 class="border-b border-t-none p-2 border-gray-300 bg-gray-300 w-full text-base text-left">Connexion</h3>
          <div class="sm:w-11/12 w-full mt-10 mb-10 flex flex-col sm:flex-row justify-center sm:justify-evenly items-center mr-auto ml-auto text-center">
            <img src="../assets/img/Connexion.png" alt="connexion" class="order-2 h-44 sm:h-auto sm:order-1 sm:w-5/12 rounded-xl"/>
            <p class="w-full order-1 sm:order-2 sm:w-6/12">Pour vous connecter, rendez-vous sur <router-link class="mr-5 underline p-2 hover:bg-blue-300 hover:rounded-xl" :to="{name: 'auth'}">la page d'accueil</router-link><br>
            Renseignez l'email utilisé lors de l'inscription, votre nom d'utilisateur ainsi que votre mot de passe,
            cliquez sur "Connexion" et le tour est joué !</p>
          </div>
        </div>
        <!--SIGNUP-->
        <div id="signUp" class="tabcontents border border-t-0 border-gray-300">
          <h3 class="border-b border-t-none p-2 border-gray-300 bg-gray-300 w-full text-base text-left">Inscription</h3>
          <div class=" w-full mt-10 mb-10 flex flex-col sm:flex-row justify-center sm:justify-evenly items-center mr-auto ml-auto text-center">
            <div class="flex flex-col sm:5/12 order-2 sm:order-1 justify-center items-center">
              <img src="../assets/img/clickSignUp.png" alt="inscription" class="h-16 mb-5 rounded-xl"/>
              <img src="../assets/img/signup.png" alt="inscription" class="h-44 rounded-xl"/>
            </div>
            <p class="sm:w-6/12 w-full order-1 sm:order-2 mb-5 sm:mb-0">Pour vous inscrire, rendez-vous sur <router-link :to="{name: 'auth'}" class="mr-5 underline p-2 hover:bg-blue-300 hover:rounded-xl">la page d'accueil.</router-link><br>
              Cliquez sur "Inscrivez-vous"
              Renseignez les différents champs concernant votre email, mot de passe, nom d'utilisateur,
              parlez un peu de vous dans le champ "Bio" (optionnel), choisissez une photo de profil (si vous n'en choisissez pas, une photo par défaut vous sera
              assignée) puis cliquez sur "Inscription" et le tour est joué !</p>
          </div>
        </div>
      </div>

      <!--POSTS-->
      <div id="posts" class="tabcontent rounded-b-xl bg-white border border-t-0 border-gray-300 w-full sm:w-9/12 mr-auto ml-auto">
        <div class="tab overflow-hidden flex flex-col sm:flex-row justify-center w-full items-center border-b border-b-gray-300">
          <button class="tablink p-4 hover:rounded-bl-xl text-base hover:bg-gray-50 transition-all font-medium h-20 w-full sm:w-3/12" @click="openTabs('publishPostBtn','publishPost'); scrollTo('publishPost')" id="publishPostBtn">Publier un post</button>
          <button class="tablink p-4 text-base hover:bg-gray-50 transition-all border-l h-20 w-full sm:w-3/12 border-l-gray-300 font-medium" @click="openTabs('editPostBtn','editPost'); scrollTo('editPost')" id="editPostBtn">Editer un post</button>
          <button class="tablink p-4 text-base hover:bg-gray-50 transition-all border-l h-20 w-full sm:w-3/12 border-l-gray-300 font-medium" @click="openTabs('deletePostBtn','deletePost');scrollTo('deletePost') " id="deletePostBtn">Supprimer un post</button>
          <button class="tablink p-4 hover:rounded-br-xl text-base hover:bg-gray-50 transition-all border-l h-20 w-full sm:w-3/12 border-l-gray-300 font-medium" @click="openTabs('reportPostBtn','reportPost'); scrollTo('reportPost') " id="reportPostBtn">Signaler un post</button>
        </div>
        <!--PUBLISH-->
        <div id="publishPost" class="tabcontents border border-t-0 border-gray-300">
          <h3 class="border-b border-t-none p-2 border-gray-300 bg-gray-300 w-full text-base text-left">Publier un post</h3>
          <div class="sm:w-11/12 mt-10 mb-10 flex sm:flex-row w-full flex-col justify-center sm:justify-evenly items-center mr-auto ml-auto text-center">
            <img src="../assets/img/post.png" alt="how to post" class="sm:order-1 h-44 sm:h-auto sm:w-5/12 order-2 rounded-xl"/>
            <p class="sm:w-6/12 sm:order-2 order-1">Une fois connecté, vous trouverez une partie "Voulez-vous partager quelque chose ?" :<br>
              Indiquez un titre, le texte que vous souhaitez partagez, choisissez un fichier image (.jpg, .jpeg, .gif, .png uniquement) puis
              cliquez sur "Publier" et votre post est publié !</p>
          </div>
        </div>
        <!--EDIT-->
        <div id="editPost" class="tabcontents border border-t-0 border-gray-300">
          <h3 class="border-b border-t-none p-2 border-gray-300 bg-gray-300 w-full text-base text-left">Editer un post</h3>
          <div class="flex sm:flex-row flex-col justify-center sm:justify-evenly items-center mt-10 mb-10">
            <div class="flex flex-col justify-center items-center order-2 sm:order-1">
              <img src="../assets/img/editPost.png" class="rounded-xl h-44 mb-5" alt="image illustration options du post">
              <img src="../assets/img/editPostOptions.png" class="rounded-xl h-44" alt="image illustration options du post - editer le post">
            </div>
            <p class="sm:w-6/12 order-1 sm:order-2">Si vous êtes bien l'auteur du post, cliquer sur le bouton options du post : <i class="fa-solid fa-ellipsis text-2xl"></i> puis cliquez sur "Editer le post"</p>
          </div>
        </div>
        <!--DELETE-->
        <div id="deletePost" class="tabcontents border border-t-0 border-gray-300">
          <h3 class="border-b border-t-none p-2 border-gray-300 bg-gray-300 w-full text-base text-left">Supprimer un post</h3>
          <div class="flex sm:flex-row sm:justify-evenly flex-col justify-center items-center mt-10 mb-10">
            <div class="flex flex-col justify-center items-center order-2 sm:order-1">
              <img src="../assets/img/editPost.png" class="h-44 rounded-xl mb-5" alt="image illustration options du post">
              <img src="../assets/img/deletePostOptions.png" class="h-44 rounded-xl" alt="image illustration options du post - supprimer le post">
            </div>
            <p class="sm:w-6/12 order-1 sm:order-2">Si vous êtes bien l'auteur du post, cliquer sur le bouton options du post : <i class="fa-solid fa-ellipsis text-2xl"></i><br>
              Puis cliquez sur "Supprimer le post"</p>
          </div>
        </div>
        <!--REPORT-->
        <div id="reportPost" class="tabcontents border border-t-0 border-gray-300">
          <h3 class="border-b border-t-none p-2 border-gray-300 bg-gray-300 w-full text-base text-left">Signaler un post</h3>
          <div class="flex  sm:flex-row sm:justify-evenly flex-col justify-center items-center mt-10 mb-10">
            <div class="flex order-2 sm:order-1 flex-col justify-center items-center">
              <img src="../assets/img/editPost.png" class="rounded-xl h-44 mb-5" alt="image illustration options du post">
              <img src="../assets/img/reportPostOptions.png" class="rounded-xl h-44" alt="image illustration options du post - signaler le post">
            </div>
            <p class="sm:w-6/12 order-1 sm:order-2">Cliquer sur le bouton options du post : <i class="fa-solid fa-ellipsis text-2xl"></i><br>
              Puis cliquez sur "Signaler le post"
            </p>
          </div>
        </div>
      </div>

      <!--COMMENTS-->
      <div id="comments" class="tabcontent rounded-b-xl bg-white border border-t-0 border-gray-300 w-full sm:w-9/12 mr-auto ml-auto">
        <div class="tab overflow-hidden flex sm:flex-row flex-col justify-center w-full items-center border-b border-b-gray-300">
          <button class="tablink p-4 hover:rounded-bl-xl text-base hover:bg-gray-50 transition-all font-medium h-20 sm:h-32 md:h-32 lg:h-20 w-full sm:w-3/12" @click="openTabs('publishCommentBtn','publishComment');scrollTo('publishComment')" id="publishCommentBtn">Publier un commen&shy;taire</button>
          <button class="tablink p-4 text-base hover:bg-gray-50 transition-all border-l h-20 sm:h-32 md:h-32 lg:h-20 w-full sm:w-3/12 border-l-gray-300 font-medium" @click="openTabs('editCommentBtn','editComment'); scrollTo('editComment')" id="editCommentBtn">Editer un commen&shy;taire</button>
          <button class="tablink p-4 text-base hover:bg-gray-50 transition-all border-l h-20 sm:h-32 md:h-32 lg:h-20 w-full sm:w-3/12 border-l-gray-300 font-medium" @click="openTabs('deleteCommentBtn','deleteComment'); scrollTo('deleteComment')" id="deleteCommentBtn">Supprimer un commen&shy;taire</button>
          <button class="tablink p-4 hover:rounded-br-xl text-base hover:bg-gray-50 transition-all border-l h-20 sm:h-32 md:h-32 lg:h-20 w-full sm:w-3/12 border-l-gray-300 font-medium" @click="openTabs('reportCommentBtn','reportComment'); scrollTo('reportComment')" id="reportCommentBtn">Signaler un commen&shy;taire</button>
        </div>
        <!--PUBLISH-->
        <div id="publishComment" class="tabcontents border border-t-0 border-gray-300">
          <h3 class="border-b border-t-none p-2 border-gray-300 bg-gray-300 w-full text-base text-left">Publier un commentaire</h3>
          <div class="flex  sm:flex-row sm:justify-evenly flex-col justify-center items-center mt-10 mb-10">
            <div class="flex flex-col justify-center items-center order-2 sm:order-1">
              <img src="../assets/img/comments.png" class="rounded-xl h-44" alt="image illustration zone de texte commentaires">
            </div>
            <p class="order-1 sm:order-2 sm:w-6/12">Sous le post que vous souhaitez commenter vous trouverez une zone de texte :<br>
            Tapez votre commentaire puis cliquez sur "Commenter"</p>
          </div>
        </div>
        <!--EDIT-->
        <div id="editComment" class="tabcontents border border-t-0 border-gray-300">
          <h3 class="border-b border-t-none p-2 border-gray-300 bg-gray-300 w-full text-base text-left">Editer un commentaire</h3>
          <div class="flex  sm:flex-row sm:justify-evenly flex-col justify-center items-center mt-10 mb-10">
            <div class="flex flex-col order-2 sm:order-1 justify-center items-center">
              <img src="../assets/img/commentsOptions.png" class="rounded-xl h-44 mb-5" alt="image illustration options des commentaires">
              <img src="../assets/img/commentsOptionsEdit.png" class="rounded-xl h-44" alt="image illustration options des commentaires - editer le commentaire">
            </div>
            <p class="order-1 sm:order-2 sm:w-6/12">Si vous êtes bien l'auteur du commentaire,  cliquer sur le bouton options du commentaire : <i class="fa-solid fa-ellipsis"></i><br>
              Puis cliquez sur "Editer le commentaire"
            </p>
          </div>
        </div>
        <!--DELETE-->
        <div id="deleteComment" class="tabcontents border border-t-0 border-gray-300">
          <h3 class="border-b border-t-none p-2 border-gray-300 bg-gray-300 w-full text-base text-left">Supprimer un commentaire</h3>
          <div class="flex sm:flex-row sm:justify-evenly flex-col justify-center items-center mt-10 mb-10">
            <div class="flex flex-col order-2 sm:order-1 justify-center items-center">
              <img src="../assets/img/commentsOptions.png" class="rounded-xl h-44 mb-5" alt="image illustration options des commentaires">
              <img src="../assets/img/commentsOptionsDelete.png" class="rounded-xl h-44" alt="image illustration options des commentaires - supprimer le commentaire">
            </div>
            <p class="order-1 sm:order-2 sm:w-6/12">Si vous êtes bien l'auteur du commentaire,  cliquer sur le bouton options du commentaire : <i class="fa-solid fa-ellipsis"></i><br>
              Puis cliquez sur "Supprimer le commentaire"
            </p>
          </div>
        </div>
        <!--REPORT-->
        <div id="reportComment" class="tabcontents border border-t-0 border-gray-300">
          <h3 class="border-b border-t-none p-2 border-gray-300 bg-gray-300 w-full text-base text-left">Signaler un commentaire</h3>
          <div class="flex  sm:flex-row sm:justify-evenly flex-col justify-center items-center mt-10 mb-10">
            <div class="flex flex-col order-2 sm:order-1 justify-center items-center">
              <img src="../assets/img/commentsOptions.png" class="rounded-xl h-44 mb-5" alt="image illustration options des commentaires">
              <img src="../assets/img/commentsOptionsReport.png" class="rounded-xl h-44" alt="image illustration options des commentaires - signaler le commentaire">
            </div>
            <p class="order-1 sm:order-2 sm:w-6/12">Cliquer sur le bouton options du commentaire : <i class="fa-solid fa-ellipsis"></i><br>
              Puis cliquez sur "Signaler le commentaire"
            </p>
          </div>
        </div>
      </div>

      <!--LIKES-->
      <div id="likes" class="tabcontent rounded-b-xl bg-white border border-t-0 border-gray-300 w-full sm:w-9/12 mr-auto ml-auto">
        <div class="tab overflow-hidden flex sm:flex-row flex-col justify-center w-full items-center border-b border-b-gray-300">
          <button class="tablink p-4 text-base hover:rounded-bl-xl hover:bg-gray-50 transition-all font-medium h-20 w-full sm:w-6/12" @click="openTabs('addLikeBtn','addLike');scrollTo('addLike')" id="addLikeBtn">Ajouter un like</button>
          <button class="tablink p-4 text-base hover:rounded-br-xl hover:bg-gray-50 transition-all border-l h-20 w-full sm:w-6/12 border-l-gray-300 font-medium" @click="openTabs('deleteLikeBtn','deleteLike');scrollTo('deleteLike') " id="deleteLikeBtn">Supprimer un Like</button>
        </div>
        <!--ADD-->
        <div id="addLike" class="tabcontents border border-t-0 border-gray-300">
          <h3 class="border-b border-t-none p-2 border-gray-300 bg-gray-300 w-full text-base text-left">Ajouter un like</h3>
          <div class="flex  sm:flex-row sm:justify-evenly flex-col justify-center items-center mt-10 mb-10">
            <div class="flex flex-col order-2 sm:order-1 justify-center items-center">
              <img src="../assets/img/like.png" class="rounded-xl h-44" alt="image d'illustration bouton like">
            </div>
            <p class="order-1 sm:order-2 sm:w-6/12">Sous l'image du post que vous souhaitez liker, cliquez sur le bouton "Like"
            </p>
          </div>
        </div>
        <!--DELETE-->
        <div id="deleteLike" class="tabcontents border border-t-0 border-gray-300">
          <h3 class="border-b border-t-none p-2 border-gray-300 bg-gray-300 w-full text-base text-left">Supprimer un like</h3>
          <div class="flex  sm:flex-row sm:justify-evenly flex-col justify-center items-center mt-10 mb-10">
            <div class="flex flex-col order-2 sm:order-1 justify-center items-center">
              <img src="../assets/img/dislike.png" class="rounded-xl h-44" alt="image d'illustration bouton Retirer le like">
            </div>
            <p class="order-1 sm:order-2 sm:w-6/12">Sous l'image du post que vous souhaitez disliker, cliquez sur le bouton "Retirer le like" :
            </p>
          </div>
        </div>
      </div>

      <!--ACCOUNT-->
      <div id="account" class="tabcontent rounded-b-xl bg-white border border-t-0 border-gray-300 w-full md:w-9/12 mr-auto ml-auto">
        <div class="tab overflow-hidden flex flex-col sm:flex-row justify-center w-full items-center border-b border-b-gray-300">
          <button class="tablink p-2 md:p-1 xl:p-4 text-sm hover:bg-gray-50 hover:rounded-bl-xl transition-all font-medium h-20 sm:h-32 w-full sm:w-2/12" @click="openTabs('disconnectBtn','disconnect');scrollTo('disconnect')" id="disconnectBtn">Se déconnec&shy;ter</button>
          <button class="tablink p-2 md:p-1 xl:p-4 text-sm hover:bg-gray-50 transition-all border-l h-20 sm:h-32 w-full sm:w-2/12 border-l-gray-300 font-medium" @click="openTabs('profileBtn','profile');scrollTo('profile') " id="profileBtn">Aller sur mon profil</button>
          <button class="tablink p-2 md:p-1 xl:p-4 text-sm hover:bg-gray-50 transition-all border-l h-20 sm:h-32 w-full sm:w-2/12 border-l-gray-300 font-medium" @click="openTabs('editProfileBtn','editProfile');scrollTo('editProfile') " id="editProfileBtn">Editer mon profil</button>
          <button class="tablink p-2 md:p-1 xl:p-4 text-sm hover:bg-gray-50 transition-all border-l h-20 sm:h-32 w-full sm:w-2/12 border-l-gray-300 font-medium" @click="openTabs('downloadBtn','download');scrollTo('download') " id="downloadBtn">Télé&shy;charger mes infor&shy;mations</button>
          <button class="tablink p-2 md:p-1 xl:p-4 text-sm hover:bg-gray-50 transition-all border-l h-20 sm:h-32 w-full sm:w-2/12 border-l-gray-300 font-medium" @click="openTabs('deleteProfileBtn','deleteProfile');scrollTo('deleteProfile') " id="deleteProfileBtn">Supprimer mon profil</button>
          <button class="tablink p-2 md:p-1 xl:p-4 text-sm hover:bg-gray-50 hover:rounded-br-xl transition-all border-l h-20 sm:h-32 w-full sm:w-2/12 border-l-gray-300 font-medium" @click="openTabs('editConsentsBtn','editConsents');scrollTo('editConsents') " id="editConsentsBtn">Editer mes consente&shy;ments</button>
        </div>
        <!--DISCONNECT-->
        <div id="disconnect" class="tabcontents border border-t-0 border-gray-300">
          <h3 class="border-b border-t-none p-2 border-gray-300 bg-gray-300 w-full text-base text-left">Se déconnecter</h3>
          <div class="flex  sm:flex-row sm:justify-evenly flex-col justify-center items-center mt-10 mb-10">
            <div class="flex flex-col justify-center items-center order-2 sm:order-1">
              <img src="../assets/img/disconnect.png" alt="disconnect" class="rounded-xl w-44"/>
            </div>
            <p class="order-1 sm:order-2 sm:w-6/12">Pour vous déconnecter, il vous suffit de cliquer sur le bouton placé dans la barre de navigation (haut d'écran) : <br><br>
            </p>
          </div>
        </div>
        <!--PROFILE-->
        <div id="profile" class="tabcontents border border-t-0 border-gray-300">
          <h3 class="border-b border-t-none p-2 border-gray-300 bg-gray-300 w-full text-base text-left">Aller sur mon profil</h3>
          <div class="flex  sm:flex-row sm:justify-evenly flex-col justify-center items-center mt-10 mb-10">
            <div class="flex order-2 sm:order-1 flex-col justify-center items-center">
              <img src="../assets/img/account.png" alt="Accès compte" class="rounded-xl w-44"/>
            </div>
            <p class="order-1 sm:order-2 sm:w-6/12">Pour accéder à votre compte, cliquez sur l'icône : <i class="fas fa-user text-white bg-blue-900 p-2 text-lg"></i> dans la barre de navigation ou bien cliquez simplement sur votre photo de profil
          </p>
          </div>
        </div>
        <!--EDIT-->
        <div id="editProfile" class="tabcontents border border-t-0 border-gray-300">
          <h3 class="border-b border-t-none p-2 border-gray-300 bg-gray-300 w-full text-base text-left">Editer mon profil</h3>
          <div class="flex  sm:flex-row sm:justify-evenly flex-col justify-center items-center mt-10 mb-10">
            <div class="flex order-2 sm:order-1 sm:w-5/12 flex-col justify-center items-center">
              <img src="../assets/img/editAccount.png" alt="update info" class="rounded-xl h-44 sm:h-auto"/>
            </div>
            <p class="order-1 sm:order-2 sm:w-6/12">Pour modifier vos informations, rendez-vous sur la page de votre compte puis cliquer sur "Editer les informations" :<br>
          </p>
          </div>
        </div>
        <!--DOWNLOAD-->
        <div id="download" class="tabcontents border border-t-0 border-gray-300">
          <h3 class="border-b border-t-none p-2 border-gray-300 bg-gray-300 w-full text-base text-left">Télécharger mes informations</h3>
          <div class="flex  sm:flex-row sm:justify-evenly flex-col justify-center items-center mt-10 mb-10">
            <div class="flex order-2 sm:order-1 sm:w-5/12 flex-col justify-center items-center">
              <img src="../assets/img/download.png" alt="download info" class="rounded-xl sm:h-auto h-44"/>
            </div>
            <p class="order-1 sm:order-2 sm:w-6/12">Pour télécharger vos informations, rendez-vous sur la page de votre compte dans la partie "Paramètres du compte" puis cliquer sur "Télécharger les informations du compte" <br>
            Votre navigateur devrait lancer le téléchargement du fichier PDF automatiquement !</p>
          </div>
        </div>
        <!--DELETE-->
        <div id="deleteProfile" class="tabcontents border border-t-0 border-gray-300">
          <h3 class="border-b border-t-none p-2 border-gray-300 bg-gray-300 w-full text-base text-left">Supprimer mon profil</h3>
          <div class="flex  sm:flex-row sm:justify-evenly flex-col justify-center items-center mt-10 mb-10">
            <div class="flex order-2 sm:order-2 sm:w-5/12 flex-col justify-center items-center">
              <img src="../assets/img/delete.png" alt="delete account" class="rounded-xl sm:h-auto h-44"/>
            </div>
            <p class="order-1 sm:order-2 sm:w-6/12">Pour supprimer votre compte, rendez-vous sur la page de votre compte dans la partie "Paramètres du compte" puis cliquer sur "Supprimer le compte"<br>
            Validez votre choix en cliquant sur "Supprimer", votre compte est supprimé !</p>
          </div>
        </div>
        <!--EDIT CONSENTS-->
        <div id="editConsents" class="tabcontents border border-t-0 border-gray-300">
          <h3 class="border-b border-t-none p-2 border-gray-300 bg-gray-300 w-full text-base text-left">Editer mes consentements</h3>
          <div class="flex  sm:flex-row sm:justify-evenly flex-col justify-center items-center mt-10 mb-10">
            <div class="flex order-2 sm:order-1 sm:w-5/12 flex-col justify-center items-center">
              <img src="../assets/img/consents.png" alt="update consents" class="rounded-xl sm:h-auto h-44"/>
            </div>
            <p class="order-1 sm:order-2 sm:w-6/12">Pour modifier votre consentement pour le traitement de vos données, rendez-vous sur la page de votre compte dans la partie "Paramètres du compte"<br>
            Le réglage par défaut est sur "Non", cliquez sur l'option désirée puis sur "Valider les changements" !</p>
          </div>
        </div>
      </div>

      <!--OTHER USERS-->
      <div id="otherUsers" class="tabcontent rounded-b-xl bg-white border border-t-0 border-gray-300 w-full sm:w-9/12 mr-auto ml-auto">
        <div class="tab overflow-hidden flex flex-col sm:flex-row justify-center w-full items-center border-b border-b-gray-300">
          <button class="tablink p-4 hover:rounded-bl-xl text-base hover:bg-gray-50 transition-all font-medium h-20 w-full sm:w-6/12" @click="openTabs('researchUsersBtn','researchUsers');scrollTo('researchUsers')" id="researchUsersBtn">Rechercher un utilisateur</button>
          <button class="tablink p-4 hover:rounded-br-xl text-base hover:bg-gray-50 transition-all border-l h-20 w-full sm:w-6/12 border-l-gray-300 font-medium" @click="openTabs('goProfileBtn','goProfile');scrollTo('goProfile') " id="goProfileBtn">Aller sur le profil d'un autre utilisateur</button>
        </div>
        <!--RESEARCH USERS-->
        <div id="researchUsers" class="tabcontents border border-t-0 border-gray-300">
          <h3 class="border-b border-t-none p-2 border-gray-300 bg-gray-300 w-full text-base text-left">Rechercher un utilisateur</h3>
          <div class="flex  sm:flex-row sm:justify-evenly flex-col justify-center items-center mt-10 mb-10">
            <div class="flex flex-col order-2 sm:w-5/12 sm:order-1 justify-center items-center">
              <img src="../assets/img/search.png" alt="search bar" class="rounded-xl w-72 mb-5"/>
              <img src="../assets/img/searchBtn.png" alt="search button" class="rounded-xl w-36"/>
            </div>
            <p class="order-1 sm:order-2 sm:w-6/12">Pour rechercher un utilisateur, cliquez sur le champ de la barre de recherche : <br>
            Saisissez le nom (ou partie du nom) de l'utilisateur que vous recherchez, cliquez sur la loupe :<br>
            L'application vous proposera la liste des utilisateurs correspondants à votre recherche !</p>
          </div>
        </div>
        <!--GO PROFILE-->
        <div id="goProfile" class="tabcontents border border-t-0 border-gray-300">
          <h3 class="border-b border-t-none p-2 border-gray-300 bg-gray-300 w-full text-base text-left">Aller sur le profil d'un autre utilisateur</h3>
          <div class="flex sm:flex-row sm:justify-evenly flex-col justify-center items-center mt-10 mb-10">
            <div class="flex order-2 sm:order-1 flex-col justify-center items-center">
              <img src="../assets/img/goToProfile.png" class="rounded-xl h-44 mb-5" alt="image illustratrice aller sur un profil utilisateur">
              <img src="../assets/img/goToProfile2.png" class="rounded-xl h-44" alt="image illustratrice aller sur un profil utilisateur">
            </div>
            <p class="order-1 sm:order-2 sm:w-6/12">Pour accéder à la page profil d'un autre utilisateur cliquez simplement sur sa photo de profil !</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: 'faq',
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
    openTabs(id, tabName) {
      let i, tabcontents, tablink;
      tabcontents = document.getElementsByClassName("tabcontents");
      for (i = 0; i < tabcontents.length; i++) {
        tabcontents[i].style.display = "none";
      }
      tablink = document.getElementsByClassName("tablink");
      for (i = 0; i < tablink.length; i++) {
        tablink[i].className = tablink[i].className.replace(" actives", "");
      }
      document.getElementById(tabName).style.display = "block";
      document.getElementById(id).className += " actives";
    },
    scrollTo(id){
      let element = document.getElementById(id)
      element.scrollIntoView({behavior: "smooth"})
    }
  },
  mounted() {
    document.getElementById('loginSignUpBtn').className += " active"
    document.getElementById('loginSignUp').style.display = " block"
    document.getElementById('loginBtn').className += " actives"
    document.getElementById('login').style.display = " block"
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
.tab button.actives {
  background-color: rgba(68, 130, 215, 0.66);
}
.tabcontent, .tabcontents {
  display: none;
}
  h1{
    margin: 2%;
    color: #2C3F5F;
  }
  .card-header{
    border: none;
  }
  #faq{
    flex-grow: 1;
  }
  #tab2{
    margin: 5% auto;
  }
  .fa-thumbs-up{
    color: cornflowerblue;
  }
  .fa-comments{
    color: darkcyan;
  }
  .fa-trash-alt{
    margin-top: 5%;
    color: red;
  }
  .fa-trash-alt, .fa-trash-alt span, .fa-edit, .fa-edit span{
    font-size: 14px;
    margin-bottom: 5%;
  }
  .fa-edit{
    margin-top: 5%;
    color: #2C3F5F;
  }
  .fa-flag{
    color: red;
    margin: 2%;
  }
  i span{
    font-family: Chewy;
  }
</style>
