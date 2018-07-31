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
  
  firebase.database().ref("visitas")
    .on("child_added", (newVisita) => {
      contenido.innerHTML = `
      <div class="row">
  <div id="publicacion-${newVisita.key}">
    <div class="col m3 s8">
      <p> ${newVisita.val().nameURL}</p>
    </div>
    <div class="col m2 hide-on-small-only hide-on-med-only">
      <p> ${newVisita.val().rutURL}</p>
    </div>
    <div class="col m2 hide-on-small-only hide-on-med-only">
      <p> Laboratoria</p>
    </div>
    <div class="col m2 hide-on-small-only hide-on-med-only">
      <p> ${newVisita.val().patenteURL}</p>
    </div>
    <div class="col m1 hide-on-small-only">
      <p> ${newVisita.val().llegadaURL}</p>
    </div>
    <div class="col m1 hide-on-small-only">
      <p id="salida-${newVisita.key}">${newVisita.val().salidaURL} </p>
    </div>
    <div class="col m1 s4">
      <p>
        <button onclick="salidaVisita('${newVisita.key}')">Marcar</button>
      </p>
    </div>
  </div>
  <hr>
</div>
<div>
      ` + contenido.innerHTML;
    });
};

//marcar llegada y salida
let llegada = 0;
let salida=0;

var HoraActual = new Date();
//let Ano = HoraActual.getFullYear().toString();
//let Mes = HoraActual.getMonth().toString();
//let Dia = HoraActual.getDate().toString();
let hora = HoraActual.getHours().toString();
let minutos = HoraActual.getMinutes().toString();

llegada = hora + ":" + minutos;

if (minutos < 10) {
  llegada = hora + ":0" + minutos;
}

function salidaVisita (key){

  const newVisitorKey = firebase.database().ref().child("visitas").push().key;
  
  salida=hora + ":" + minutos;
  if (minutos < 10) {
    salida = hora + ":0" + minutos;
  }

  document.getElementById("salida-"+key).innerHTML=salida;



}

// Para registrar visita
function sendText() { // por aqui debería estar la funcion de send email (?)
  const nombre = nombreUsuario.value;
  const rut = rutVisita.value;
  const credencial= cre.value;
  const patente = pat.value;
  const horaLLegada=llegada;
  
  const newVisitorKey = firebase.database().ref().child("visitas").push().key;
  const currentUser = firebase.auth().currentUser;

  firebase.database().ref(`visitas/${newVisitorKey}`).set({
    nameURL: nombre,
    rutURL: rut,
    credencialURL:credencial,
    patenteURL: patente,
    llegadaURL: horaLLegada,
    //salidaURL: horaSalida,
    creator: currentUser.uid,

  });

  

  

  location.reload(); // refresca la pantalla para mostrar la hora actual
};

