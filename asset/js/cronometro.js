const div_data = document.querySelector(".data");
const div_hora = document.querySelector(".cronometro");
const input_radio = document.querySelectorAll("input[name*=cronometro]");
const inputs_tempo = document.querySelectorAll('input[name=def_time]');
const btn_start = document.querySelector('#botao_start');

const iniciarContagem = (tipo) => {
    let hora = parseInt(document.querySelector('[hora]').value);
    let minuto = parseInt(document.querySelector('[minuto]').value);
    let segundo = parseInt(document.querySelector('[segundo]').value);
    let tempo_total = (hora*60*60 + minuto*60 + segundo)*1000;
    const d = new Date();
    const agora = new Date(d.getFullYear(),d.getMonth(),d.getDate(),0,0,0);
    let milisegundos = Date.parse(agora);
    tempo_total += milisegundos;
    const contador = setInterval(() => {
        let tempo_crono = new Date(tempo_total);
        div_hora.innerHTML = tempo_crono.toLocaleString('pt-BR',
                {
                    hourCycle: 'h23',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    timeZone: 'America/Fortaleza',
                }
            );
        tempo_total--;    
    }, 1000);
}

btn_start.addEventListener('click', iniciarContagem);

input_radio.forEach(el => {
    el.addEventListener('click', () => {
        if(el.value !== 'Hora'){
            clearInterval(data_hora);
            document.querySelector('.def_time').classList.remove('hide');
            div_hora.innerHTML = "";
        } else {
            document.querySelector('.def_time').classList.add('hide');
            iniciaHora();
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

let data_hora;
const iniciaHora = () => {
    data_hora = setInterval(() => {
        /* captura a data */
        let tempo = new Date();
        /* fragmenta a data */
        let dow = tempo.getDay();
        let dia = tempo.getDate().toString().padStart(2,'0');
        let mes = (tempo.getMonth() + 1).toString().padStart(2,'0');
        let ano = tempo.getFullYear().toString();
        /* fragmenta a hora */
        let hora = tempo.getHours().toString().padStart(2,'0');
        let minuto = tempo.getMinutes().toString().padStart(2,'0');
        let segundos = tempo.getSeconds().toString().padStart(2,'0');
        let milisegundos = tempo.getMilliseconds().toString().padStart(3,'0');
        /* exibe a hora */
        div_hora.innerHTML = `${hora}:${minuto}:${segundos}`;
        div_data.innerHTML = `${diaDaSemana(dow)} - ${dia}/${mes}/${ano}`;
    }, 1000);
}
iniciaHora();