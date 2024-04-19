const div_data = document.querySelector(".data");
const div_hora = document.querySelector(".cronometro");

const diaDaSemana = (dow) =>{
    switch (dow) {
        case 0:
            return "Domingo";
            break;
        case 1:
            return "Segunda";
            break;
        case 2:
            return "Terça";
            break;
        case 3:
            return "Quarta";
            break;
        case 4:
            return "Quinta";
            break;
        case 5:
            return "Sexta";
            break;
        case 6:
            return "Sábado";
            break;
    }
}

setInterval(() => {
    /* captura a data */
    let tempo = new Date;
    /* fragmenta a data */
    let dow = tempo.getDay();
    let dia = tempo.getDate().toString().padStart(2,'0');
    let mes = tempo.getMonth().toString().padStart(2,'0');
    let ano = tempo.getFullYear().toString();
    /* fragmenta a hora */
    let hora = tempo.getHours().toString().padStart(2,'0');
    let minuto = tempo.getMinutes().toString().padStart(2,'0');
    let segundos = tempo.getSeconds().toString().padStart(2,'0');
    /* exibe a hora */
    div_hora.innerHTML = `${hora} : ${minuto} : ${segundos}`;
    div_data.innerHTML = `${diaDaSemana(dow)} - ${dia} / ${mes} / ${ano}`;
}, 1000);