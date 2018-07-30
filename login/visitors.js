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
  //Hay que poner funcion de hora en linea 34 y salida en linea 39
  firebase.database().ref("visitas")
    .on("child_added", (newVisita) => {
      contenido.innerHTML = `
          <div id="publicacion-${newVisita.key}"> </div>
              <div class="row">
                  <div>
                      <p>Nombre : ${newVisita.val().nameURL}<p>   
                  </div>

                  <div>
                     <p>Rut : ${newVisita.val().rutURL}<p>   
                  </div>

                  <div>
                      <p>patente : ${newVisita.val().credencialURL}<p>   
                  </div>

                  <div>
                     <p>credencial : ${newVisita.val().patenteURL}<p>   
                  </div>

                  <div>
                     <p>LLegada : FUNCION DE MARCAR LLEGADA<p>  
                  </div>


                  <div>
                  <p>Salida : FUNCION DE MARCAR SALIDA<p>   
                  </div>

               <div>
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


// //var d = new Date(); // se crea objeto fecha
// var hora = d.getHours(); // se obtiene hora de la fecha
// var minutos = d.getMinutes(); // se obtoienen minutos de la fecha
// Post.metric = {};// se crea obj metric que guarda las metricas (fecha, hora post)

// let fecha = d.getFullYear()+"-"+d.getMonth()+"-"+d.getDay();// se le
// Post.metric.time = fecha+"--"+hora+"."+minutos;// se guarda fecha y hora
// let user = firebase.auth().currentUser;// obtenemos usuario logado
// var ref = firebase.database().ref("Muro/"+ user.uid + "/Posts");// referenciamos posicion de la base de datos
// var newRef = ref.push();// sube los datos
// console.log(Post.date);
// newRef.set(Post);//set se guardan datos en lugar de la referencia
// }

// function ObtenerPostUser()
// {
// let user = firebase.auth().currentUser;// obtener usuario
// console.log(user.uid)
// var ref = firebase.database().ref("Muro/"+user.uid);// se referencia posicion de la base de datos muro user
// ref.orderByChild('metric/time').on("child_added", function(snapshot){// se obtiene obj de la base de datos
//     console.log(snapshot.val());
// });
// }