 // Initialize Cloud Firestore through Firebase
  var db = firebase.firestore();
   
  db.collection("users").add({
    first: "cynthia",
    last: "Rojas",
    born: 1988
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});

//este codigo es de prueba ya que buscamos usar esta funcion de firebase
//este codido da error en consola (se repite la app) favor revisarase.initializeApp({
