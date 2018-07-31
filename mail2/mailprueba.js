function Enviar(){
    var correo = 'antonellacaroca@gmail.com';//aca podemos dejar los emails por defecto
    var mensaje = '*IF BLANCO ANUNCIA*';
    var nombreVisita = '***Juanita Perez  ***';
    var nombreEmpresa = '***Pollitos bebes***';
    EnvioCorreo(correo, mensaje, nombreVisita, nombreEmpresa);
}

function EnvioCorreo(correo, mensaje, nombreVisita, nombreEmpresa) {
    var data = {
        service_id: 'gmail',
        template_id: 'template_UvyNc9vo',
        user_id: 'user_7Uu73PbDST5Inw94aPO0Z',
        template_params: {
            "to_email": correo,
            "to_name": nombreEmpresa,
            "from_name": nombreVisita,
            "message_html": mensaje
        }
    };
    $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json'
    }).done(function () {
        alert('Your mail is sent!');
    }).fail(function (error) {
        alert('Oops... ' + JSON.stringify(error));
    });
}