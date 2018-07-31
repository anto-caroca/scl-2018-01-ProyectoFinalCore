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
                     <p>LLegada : <p>  
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


//hora

function ObtenerHora()
{
    var HoraActual = new Date();
    let Ano = HoraActual.getFullYear().toString();
    let Mes = HoraActual.getMonth().toString();
    let Dia = HoraActual.getDate().toString();
    let Hora = HoraActual.getHours().toString();
    let Minutos = HoraActual.getMinutes().toString();

    let TextHora = Ano + "-" + Mes + "-" + Dia + "--" + Hora + ":" + Minutos;
    return TextHora;
}

function BotonPrueba()
{
    let testo = ObtenerHora();
    console.log(testo);
}