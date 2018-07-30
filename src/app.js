
//Opción para enviar foto
function sendPhotoToStorage(){
    const photoFile = photoFileSelector.files[0];
    const fileName = photoFile.name; // nombre del archivo, sirve para armar la ruta
    const metadata = { // datos sobre el archivo que estamos subiendo
        contentType : photoFile.type// tipo de archivo que estamos subiendo
    };
    // va a retornar una tarea= task (objeto)
    const task = firebase.storage().ref('images') //Corresponden a las carpetas que tenemos dentro del storage
        .child(fileName)
        .put(photoFile, metadata);
 
    task.then(snapshot => snapshot.ref.getDownloadURL())  //obtenemos la url de descarga (de la imagen)
        .then(url => {
            console.log("URL del archivo > "+url);
            document.getElementById('divImagen').innerHTML += `<img style="width: 200px" src="${url}">`;
        });
}

