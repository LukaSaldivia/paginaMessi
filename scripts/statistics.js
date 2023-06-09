const tabla_premios = document.querySelector('#tabla_premios');
const message = document.querySelector('#message')
const message_box = document.querySelector('#message-box')

class Estadistica{
    constructor(temporada,partidos,goles,asistencias,rojas,amarillas){
        this.temporada = temporada;
        this.partidos = partidos;
        this.goles = goles;
        this.asistencias = asistencias;
        this.golesMasAsistencias = this.goles+this.asistencias;
        this.amarillas = amarillas;
        this.rojas = rojas;
    }
}
class Premio{
    constructor(nombre,cantidad,descripcion){
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.descripcion = descripcion;
    }
}






function devolverLinea(obj,index) {
    let txt = `<tr data-index=${index}>`;
    for(const prop in obj){
        if(prop != 'descripcion'){
            if(prop == 'golesMasAsistencias' || prop == 'amarillas' || prop == 'rojas'){
                txt+=`<td class="notImportant">${obj[prop]}</td>`;
            }else{
                txt+=`<td>${obj[prop]}</td>`;
            }
        }
    }
    txt+='</tr>';
    return txt;
}

function mostrarEstadisticas(arr,query){
    let html = '';
    arr.forEach((e,i)=>{
        html += devolverLinea(e,i);
    })

    const table = document.querySelector(query);
    const tbody = table.querySelector('tbody');

    tbody.insertAdjacentHTML("beforeend",html);
}

function devolverDescripcion(arr,index){
    return arr[index].descripcion;
}


const estadisticasClub = [
    new Estadistica('04/05',9,1,0,0,0),
    new Estadistica('05/06',25,8,5,0,2),
    new Estadistica('06/07',36,17,3,0,4),
    new Estadistica('07/08',40,16,16,0,4),
    new Estadistica('08/09',51,38,19,0,4),
    new Estadistica('09/10',53,47,12,0,6),
    new Estadistica('10/11',55,53,27,0,4),
    new Estadistica('11/12',60,73,32,0,9),
    new Estadistica('12/13',50,60,17,0,2),
    new Estadistica('13/14',46,41,14,0,3),
    new Estadistica('14/15',57,58,31,0,6),
    new Estadistica('15/16',49,41,24,0,5),
    new Estadistica('16/17',52,54,20,0,9),
    new Estadistica('17/18',54,45,20,0,7),
    new Estadistica('18/19',50,51,22,0,3),
    new Estadistica('19/20',44,31,27,0,7),
    new Estadistica('20/21',47,38,14,0,6),
    new Estadistica('21/22',34,11,15,0,1),
    new Estadistica('22/23',37,20,19,0,0),
]
const estadisticasSeleccion = [
    new Estadistica('2004',2,3,3,0,0),
    new Estadistica('2005',21,11,3,0,0),
    new Estadistica('2006',7,2,2,0,0),
    new Estadistica('2007',14,6,4,0,0),
    new Estadistica('2008',13,4,5,0,0),
    new Estadistica('2009',10,3,1,0,0),
    new Estadistica('2010',10,2,1,0,0),
    new Estadistica('2011',13,4,9,0,0),
    new Estadistica('2012',9,12,1,0,0),
    new Estadistica('2013',7,6,4,0,0),
    new Estadistica('2014',14,8,3,0,0),
    new Estadistica('2015',8,4,3,0,0),
    new Estadistica('2016',11,8,6,0,0),
    new Estadistica('2017',7,4,0,0,0),
    new Estadistica('2018',5,4,3,0,0),
    new Estadistica('2019',10,5,2,0,0),
    new Estadistica('2020',4,1,0,0,0),
    new Estadistica('2021',16,9,5,0,0),
    new Estadistica('2022',14,18,6,0,0),
    new Estadistica('2023',2,4,1,0,0),

]
const premios = [
    new Premio('Balón de oro',7,'Messi es el máximo ganador de la historia de este premio'),
    new Premio('Bota de oro',6,'Messi es el máximo ganador de este premio'),
    new Premio('Premio Laureus',2,'Es el primer futbolista en ganar 2 veces este premio'),
    new Premio('Jugador mundial de FIFA',2),
    new Premio('The Best FIFA',2,'Es el máximo ganador de este premio, junto a Cristiano Ronaldo y Robert Lewandowski'),
    new Premio('Liga BBVA',10,'Es el máximo goleador de la liga, el jugador con más goles en una temporada y con más hat-tricks'),
    new Premio('Copa del rey',9),
    new Premio('Super copa de España',8),
    new Premio('Ligue 1',1),
    new Premio('Super copa de Francia',1),
    new Premio('Champions League',4,'La gana en 2006, 2009, 2011 y 2015'),
    new Premio('Super copa de la UEFA',3),
    new Premio('Mundial de clubes',3),
    new Premio('Copa América',1,'La gana en 2021, a Brasil, siendo este su primer título con la selección, y rompiendo con la sequía de títulos de Argentina luego de 36 años'),
    new Premio('Finalissima',1,'La gana en 2022, a Italia'),
    new Premio('Mundial',1,'Lo gana en 2022, a Francia, siendo el campeon de América, intercontinental y del mundo al mismo tiempo'),
    new Premio('Mundial sub-20',1),
]
window.addEventListener('load', mostrarEstadisticas(estadisticasClub, '#tabla_club'));
window.addEventListener('load', mostrarEstadisticas(estadisticasSeleccion, '#tabla_seleccion'));
window.addEventListener('load', mostrarEstadisticas(premios, '#tabla_premios'));

tabla_premios.addEventListener('mousemove',(e)=>{

    
    if(e.target.parentElement.querySelector('th') == null ){
        const index = e.target.parentElement.getAttribute('data-index')
        const descripcion = devolverDescripcion(premios,index);
        if(descripcion != undefined){
            message_box.classList.add('active');    
            message_box.style.transform = `translate3d(${e.clientX+150}px, ${e.clientY-50}px, 0)`;
            message.innerHTML = descripcion;
        }else{
            message_box.classList.remove('active');
        }
        
        
    }else{        
        message_box.classList.remove('active');
    }
        
})
    
    tabla_premios.addEventListener('mouseleave',()=>{
        message_box.classList.remove('active');
})