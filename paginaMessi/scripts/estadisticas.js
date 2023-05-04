class Estadistica{
    constructor(temporada,partidos,goles,asistencias,rojas,amarillas){
        this.temporada = temporada;
        this.partidos = partidos;
        this.goles = goles;
        this.asistencias = asistencias;
        this.rojas = rojas;
        this.amarillas = amarillas;
        this.golesMasAsistencias = this.goles+this.asistencias;
    }

    devolverLinea(){
        let txt = '<tr>';
        for(const prop in this){
            txt+=`<td>${this[prop]}</td>`;
        }
        txt+='</tr>';
        return txt;
    }
}

function mostrarEstadisticas(arr,query){
    let html = '';
    arr.forEach(e=>{
        html += e.devolverLinea();
    })

    document.querySelector(query).insertAdjacentHtml("beforeend",html);
}


const estadisticas = [
    new Estadistica('08/09',50,25,2,0,0),
    new Estadistica('09/10',54,12,30,0,4),

]


window.addEventListener('load', mostrarEstadisticas(estadisticas));