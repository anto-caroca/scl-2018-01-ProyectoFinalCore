  // logout
  function logoutWithFireBase() {
    firebase.auth().signOut()
        .then(() => {
            location.href = "logout.html";
            console.log('usuario finalizo su sesion')
        })
        .catch();
    }