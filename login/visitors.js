window.onload = () => {
  //Base de datos para consultar 1 vez
  firebase.database().ref("visitas")
    .once("value")
    .then((visitas) => {
      console.log("visitas >" + JSON.stringify(visitas))
    })
    .catch((error) => {
      console.log("Database error >" + error);
    });
  //Hay que poner funcion de hora en lina 34 y salida en linea 39
  firebase.database().ref("visitas")
    .on("child_added", (newVisita) => {
      contenido.innerHTML = `
      <div class="row">
          <div id="publicacion-${newVisita.key}"> </div>
                  <div class = "col m3">
                      <p> ${newVisita.val().nameURL}</p>   
                  </div>

                  <div class = "col m2">
                     <p> ${newVisita.val().rutURL}</p>   
                  </div>

                  <div class = "col m2">
                      <p> ${newVisita.val().credencialURL}</p>   
                  </div>

                  <div class = "col m2">
                     <p> ${newVisita.val().patenteURL}</p>   
                  </div>

                  <div class = "col m1">
                     <p> 14:30</p>  
                  </div>


                  <div class = "col m1">
                  <p> 16:30<p>   
                  </div>

               <div class = "col m1">
               <button>marcar salida</button>   
               </div>
 
              </div>
              <hr>
          </div>
      ` + contenido.innerHTML;
    });
};

// Para publicar texto
function sendText() {
  const nombre = nombreUsuario.value;
  const rut = rutVisita.value;
  const credencial= cre.value;
  const patente = pat.value;
  const newVisitorKey = firebase.database().ref().child("visitas").push().key;
  const currentUser = firebase.auth().currentUser;

  firebase.database().ref(`visitas/${newVisitorKey}`).set({
    nameURL: nombre,
    rutURL: rut,
    credencialURL:credencial,
    patenteURL: patente,
    creator: currentUser.uid,
    photoUrl: currentUser.photoURL
  });
};