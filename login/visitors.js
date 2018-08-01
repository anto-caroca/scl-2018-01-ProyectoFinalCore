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
        <button id="cierre-${newVisita.key}" onclick="salidaVisita('${newVisita.key}')" class="waves-effect btn yellow accent-3 grey-text text-darken-2">Marcar</button>
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
let llegada = 0; //declaramos variables globales de llegada y salida
let salida="0";

var HoraActual = new Date(); // rescata la fecha y hora
//let Ano = HoraActual.getFullYear().toString();
//let Mes = HoraActual.getMonth().toString();
//let Dia = HoraActual.getDate().toString();
let hora = HoraActual.getHours().toString(); // rescatamos la hora
let minutos = HoraActual.getMinutes().toString(); // y los minutos

llegada = hora + ":" + minutos; // declaramos la hora de llegada

if (minutos < 10) { // cuando son las 15:06 el js muestra 15:6, este if es para que se vea el 0
  llegada = hora + ":0" + minutos;
}

function salidaVisita (key){ // funcion de salida

  salida=hora + ":" + minutos;
  if (minutos < 10) {
    salida = hora + ":0" + minutos; // idem a lo anterior
  }

 

  document.getElementById("salida-"+key).innerHTML=salida; // muestra la hora de salida en un id, revisa linea 33
  document.getElementById("cierre-"+key).disabled = true;
// al poner key, nos identifica la publicacion, si el key solo nos marca el primer id que pilla

// estoy tratando de poner el .set() para guardar la hora de salida, pero no me funciona aun :c
// pero puedes guiarte con la funcion de guardar texto :)

}

// MUY IMPORTANTE: .ref() . set() .database() etc... son funciones de firebase

// Para registrar visita
function sendText() { // por aqui debería estar la funcion de send email (?)
  const nombre = nombreUsuario.value; // recibe el nombre del usuario en el input
  const rut = rutVisita.value; // idem
  const patente = pat.value; // idem
  const horaLLegada=llegada; // guarda la hora actual
  //const horaSalida=salida;
  const newVisitorKey = firebase.database().ref().child("visitas").push().key; // aqui declaramos una variable que va a almacenar datos con un push y su key (que es como el id de la publicacion)
  const currentUser = firebase.auth().currentUser; // esta indica si estamos logeadas

  firebase.database().ref(`visitas/${newVisitorKey}`).set({ // esta linea es la que guarda los objetos .set() hace la magia de guardar
    nameURL: nombre, // estos son los objetos que vamos guardando
    rutURL: rut,
    patenteURL: patente,
    llegadaURL: horaLLegada,
    //salidaURL: horaSalida, //porque no esta declarada aun, porque no tenemos la hora de salida
    creator: currentUser.uid, // el uid. es el id del usuario y el key es como el id de la publicacion

  });

  

  

  location.reload(); // refresca la pantalla para mostrar la hora actual
};

