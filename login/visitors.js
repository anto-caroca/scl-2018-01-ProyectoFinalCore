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
                  <div class = "col m3 s8">
                      <p> ${newVisita.val().nameURL}</p>   
                  </div>

                  <div class = "col m2 hide-on-small-only hide-on-med-only">
                     <p> ${newVisita.val().rutURL}</p>   
                  </div>

                  
                  <div class = "col m2 hide-on-small-only hide-on-med-only">
                     <p> Laboratoria</p>   
                  </div>

                  <div class = "col m2 hide-on-small-only hide-on-med-only">
                      <p> ${newVisita.val().patenteURL}</p>   
                  </div>

                  <div class = "col m1 hide-on-small-only">
                     <p> 14:30</p>  
                  </div>


                  <div class = "col m1 hide-on-small-only">
                  <p> 16:30</p>   
                  </div>

               <div class = "col m1 s4">
               <p><button>Marcar</button>   </p>
               </div>
 
              </div>
              <hr>
          </div>
      ` + contenido.innerHTML;
    });
};

// Para publicar texto
function sendText() { // por aqui debería estar la funcion de send email
  const nombre = nombreUsuario.value;
  const rut = rutVisita.value;
  const patente = pat.value;
  const newVisitorKey = firebase.database().ref().child("visitas").push().key;
  const currentUser = firebase.auth().currentUser;

  firebase.database().ref(`visitas/${newVisitorKey}`).set({
    nameURL: nombre,
    rutURL: rut,
    patenteURL: patente,
    creator: currentUser.uid,
    photoUrl: currentUser.photoURL
  });
};