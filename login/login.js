window.onload = () => {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            location.href="visitors.html";// aqui se debe redireccionar a hoja de login
        }
    });
}

function registerWithFirebase() {

const emailValue = txtEmail.value
const passwordValue = txtPassword.value

firebase.auth().createUserWithEmailAndPassword(emailValue, passwordValue)
    .then(() => {
        console.log('usuario creado con exito')
        redirectFromLogin()
    })
    .catch((error) => {
        console.log("Error de firebase > Código > "+error.code);
        console.log('error de firebase > codigo ' + error.message)
        // document.getElementById('message').innerHTML = error.message
        
        if (error.code === "auth/email-already-in-use") {
            
            alert('usuario registrado')
         }

         if (error.code === "auth/invalid-email") {
             
             alert('Debes ingresar tus datos')
         }
         if (error.code === "auth/weak-password") {
             
             alert('Ingresa contraseña numérica de al menos 6 carácteres')
         }
    })
}

function loginWithFirebase() {

const emailValue = txtEmail.value
const passwordValue = txtPassword.value

firebase.auth().signInWithEmailAndPassword(emailValue, passwordValue)
    .then((e) => {
        console.log('usuario inicio sesion con exito')
        redirectFromLogin()
        document.getElementById('message').innerHTML = e.message
    })
    .catch((error) => {
        console.log('error de firebase > codigo ' + error.message)
        document.getElementById('message').innerHTML = error.message
        alert('contraseña inválida')
    })
}
// login with facebook
function facebookLoginwithFireBase() {
const provider = new firebase.auth.FacebookAuthProvider();
provider.setCustomParameters({
    'display': 'popup'
})
firebase.auth().signInWithPopup(provider)
    .then(() => {
        console.log('login con facebook exitoso')
        redirectFromLogin()
    })
    .catch((error) => {
        console.log('error de firebase > codigo ' + error.code)
        console.log('error de firebase > codigo ' + error.message)
        
    })
}
// login with google
function googleLoginwithFireBase() {

let provider = new firebase.auth.GoogleAuthProvider();

firebase.auth().signInWithPopup(provider).then(function(result) {
    let token = result.credential.accessToken;
    let user = result.user;
    
}).catch(function(error) {
    let errorCode = error.code;
    let errorMessage = error.message;
    let email = error.email;
    let credential = error.credential;
});
}