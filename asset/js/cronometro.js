const div_data = document.querySelector(".data");
const div_hora = document.querySelector(".cronometro");
const input_radio = document.querySelectorAll("input[name*=cronometro]");
const inputs_tempo = document.querySelectorAll('input[name=def_time]');
const btn_start = document.querySelector('#botao_start');
const div_acoes_crono = document.querySelector('#acoes_crono');
let cronoId = null;
let tempo;
let data;

const startPause = () => {
    btn_start.querySelector('i').classList.toggle('fa-play');
    btn_start.querySelector('i').classList.toggle('fa-stop');
    if(cronoId){
        clearInterval(tempo);
        cronoId = null;
        return;
    }
    iniciarContagem();
}
const exibeTempo = (tempoAExibir) => {
    div_hora.innerHTML =tempoAExibir.toLocaleString('pt-BR',
                {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                }
            );
}
const iniciarContagem = () => {
    let hora = parseInt(document.querySelector('[hora]').value);
    let minuto = parseInt(document.querySelector('[minuto]').value);
    let segundo = parseInt(document.querySelector('[segundo]').value);
    let tempo_total = (hora*60*60 + minuto*60 + segundo)*1000;
    const d = new Date();
    const agora = new Date(d.getFullYear(),d.getMonth(),d.getDate(),0,0,0);
    let milisegundos = Date.parse(agora);
    tempo_total += milisegundos;
    tempo = setInterval(() => {
        cronoId = tempo_total;
        if(tempo_total - milisegundos == 0){
            clearInterval(tempo);
            cronoId = null;
            startPause();
        }
        let tempo_crono = new Date(tempo_total);
        exibeTempo(tempo_crono);
        let tipo = document.querySelector('[name="tipo_cronometro"]:checked').value;
        if(tipo === "Prog")
            tempo_total+=1000;
        else
            tempo_total-=1000;
    }, 1000);
}

input_radio.forEach(el => {
    el.addEventListener('click', () => {
        clearInterval(tempo);
        if(el.value !== 'Hora'){
            div_acoes_crono.classList.remove('hide');
            div_hora.innerHTML = "";
            btn_start.addEventListener('click', startPause);
        } else {
            iniciaHora();
            div_acoes_crono.classList.add('hide');
        }
    });
});

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

const iniciaHora = () => {
    tempo = setInterval(() => {
        /* captura a data */
        let tempo = new Date();
        /* fragmenta a hora */
        let hora = tempo.getHours().toString().padStart(2,'0');
        let minuto = tempo.getMinutes().toString().padStart(2,'0');
        let segundos = tempo.getSeconds().toString().padStart(2,'0');
        /* exibe a hora */
        div_hora.innerHTML = `${hora}:${minuto}:${segundos}`;
    }, 1000);
}
const iniciaData = () => {
    data = setInterval(() => {
        /* captura a data */
        let tempo = new Date();
        /* fragmenta a data */
        let dow = tempo.getDay();
        let dia = tempo.getDate().toString().padStart(2,'0');
        let mes = (tempo.getMonth() + 1).toString().padStart(2,'0');
        let ano = tempo.getFullYear().toString();
        /* exibe a data */
        div_data.innerHTML = `${diaDaSemana(dow)} - ${dia}/${mes}/${ano}`;
    }, 1000);
}
iniciaHora();
// iniciaData();