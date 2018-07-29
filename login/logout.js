// logout
function logoutWithFireBase() {
    firebase.auth().signOut()
        .then(() => {
            location.href = "login.html";
            console.log('usuario finalizo su sesion')
        })
        .catch();
    }