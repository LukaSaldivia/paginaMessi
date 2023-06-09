class Producto{
    constructor(nombre = 'Indefinido',descripcion = 'Descripción indefinida',path = 'default.jpg',precio = 0, isPack = false){

        this.id = 0
        
        this.isPack = isPack
        this.nombre = nombre
        this.descripcion = descripcion
        this.path = `src/products/${path}`
        this.unidades = 0
        this.precio = this.isPack ? '' : precio; 
        this.subtotal = 0;


    }
    getCard(){
        if(!this.isPack){
        return `
        <div  class="card">
        <div class="image-container">
            <img src="${this.path}" alt="${this.nombre}">
        </div>
        <div class="resto">
            <div class="details">
                <p class="producto-nombre">${this.nombre}</p>
                <p class="producto-descripcion">${this.descripcion}</p>
                <p class="producto-precio">$${this.precio}</p>
            </div>
            <form data-id="${this.id}" class="compra">
                <input type="number" name="units" min="1" value="1">
                <input type="submit" value="Añadir al carrito">
            </form>
        </div>
    </div>
        `}else{
            return `
        <div  class="card">
        <div class="image-container">
            <img src="${this.path}" alt="${this.nombre}">
        </div>
        <div class="resto">
            <div class="details">
                <p>${this.nombre}</p>
                <p class="producto-descripcion">${this.descripcion}</p>
            </div>
            <form data-id="-1" class="compra">
                <input type="submit" value="Añadir al carrito">
            </form>
        </div>
    </div>
        `
        }
    }
}




// 

class Carrito{
    constructor(query){
        this.productos = [];
        this.query = query;
    }

    sortAll(prop){
        return this.productos.sort((a,b) => {
            return a[prop]>b[prop]?1:a[prop]<b[prop]?-1:0})
    }

    add(id,q = 1){
        
        let producto = new Producto;
        Object.assign(producto,productosLista[id])

        producto.unidades = q;
        producto.subtotal = producto.precio*producto.unidades

        this.productos.push(producto);

        this.mergeAllUnits()
        this.sortAll('unidades')

    }

    reset(){
        this.productos = [];
    }

    deleteProduct(id){
        this.productos = this.productos.filter((prod) => prod.id != id);
    }

    deleteUnits(id,q = 1){
        let obj = this.getProduct(id)[0];
        this.deleteProduct(id);
        let units = obj.unidades-q < 0 ? 0 : obj.unidades -q;
        if(units > 0){
            this.add(obj.id,units);
        }
    }

    mergeUnits(id){
        let objArray = this.getProduct(id)
        
        if(objArray.length>1){
            let suma = 0;

            objArray.forEach(e=>suma+=e.unidades)

            this.deleteProduct(objArray[0].id)
            this.add(objArray[0].id,suma);
        }

    }

    mergeAllUnits(){
        this.productos.forEach(e=>{
            this.mergeUnits(e.id) 
        })
    }


    getProduct(id){
        return this.productos.filter((prod) => prod.id == id);
    }


    showProducts(){
        let html = '<tr><th>Producto</th><th>Precio</th><th>Unidades</th><th>Subtotal</th><th>Acción</th></tr>';
        let suma = 0;
        this.productos.forEach(e=>{
            html+=`<tr><td class="not-number">${e.nombre}</td><td>$${e.precio}</td><td>${e.unidades}</td><td>$${e.subtotal}</td><td><button data-id="${e.id}">Eliminar producto</button></td></tr>`
            suma+=e.subtotal
        })

        html+=
        `
        <tr class="total"><td colspan="3" class="not-number">Total</td><td>$${suma}</td></tr>
        <tr><td colspan="99" class="not-number"><button id="vaciarCarrito">Vaciar Carrito</button></td></tr>
        
        `


        while(document.querySelector(this.query).firstChild){
            document.querySelector(this.query).removeChild(document.querySelector(this.query).firstChild)
        }

        document.querySelector(this.query).insertAdjacentHTML('beforeend',html);



    }

}

let carrito = new Carrito('#carrito');

let productosLista = [
    new Producto('Camiseta Messi Campeón del Mundo','Desde talle S hasta XXL','camisetaSeleccion.webp',3500),
    new Producto('Camiseta Messi Barcelona 2009','Desde talle S hasta XXL','camisetaBarcelona2009.webp',3000),
    new Producto('Camiseta Messi Inter Miami 2023','Desde talle S hasta XXL',undefined,3000),
    new Producto('Camiseta Messi PSG','Desde talle S hasta XXL','camisetaPSG.webp',2700),
    new Producto('Balón de Oro (Réplica)','40cm x 40cm, réplica de plástico','balonDeOro.webp',1200),
    new Producto('Copa del Mundo (Réplica)','40cm x 75cm, réplica de plástico','copaDelMundo.webp',2500),
    new Producto('Messi Figura de Acción','Diviértete con este juguete con articulaciones','jugueteDeMessi.webp',900),
    new Producto('GOAT en el PSG','Muñeco para divertirte','jugueteDeMessiPSG.webp',900),
    new Producto('Pelota de la Final del Mundial Qatar 2022','Pelota icónica','pelotaFinal.webp',2000),
    new Producto(`Remera "¿Qué mira' bobo?"`,'Remera con épica frase del 10','remeraQueMiras.webp',1200),
    new Producto('Taza de él y ella','Hermosa taza para madrugar con ese recuerdo','tazaCopa.webp',1000),
    new Producto('Buzo de Messi','Buzo que tiene al mejor de la historia','buzoMessi.webp',2700),
    new Producto('Cuadro de una obra de arte','Messi posando con nuestra camiseta','messiCuadroArg.webp',4200),
    new Producto('Messi Pop','Funko Pop de D10S','messiFunkoPop.webp',8200),
    new Producto('Pack Sorpresa','Productos sorprendentes te esperan','regalo.jpg',0, true),

]


setIDs(productosLista);

showCards(productosLista)

productosLista.forEach(e=>{
    if(!e.isPack){
        carrito.add(e.id)
    }
});





carrito.showProducts()


function setIDs(arr) {
    arr.forEach((e,i) => e.id = i);
}

function showCards(arr) {
    html=''
    arr.forEach(e=>{
        html+=e.getCard();
    })

    document.querySelector('#productos').innerHTML = html;
}


const forms = document.querySelectorAll('.compra');



forms.forEach(form=>{
    form.addEventListener('submit',(e)=>{
        e.preventDefault()

        const id = form.getAttribute('data-id');
        const formData = new FormData(form);

        const units = +formData.get('units')

        if(id==-1){

            Array(5).fill().forEach(()=>{
                let random = Math.floor(Math.random()*productosLista.length)
                while (productosLista[random].isPack) {
                    random = Math.floor(Math.random()*productosLista.length)
                }
                carrito.add(random)
            })

        }else{
            carrito.add(id,units)
        }
        carrito.showProducts()
    })
})

const switcher = document.querySelector('#switch');


switcher.addEventListener('click',()=>{
    document.querySelector('#carrito-container').classList.toggle('active')
})

const carritoTable = document.querySelector('#carrito');

carritoTable.addEventListener('click',(e)=>{

    if(e.target.nodeName == "BUTTON"){
        if(e.target.id == 'vaciarCarrito'){
                carrito.reset();
                carrito.showProducts();
        
            }else{
            const id= e.target.getAttribute('data-id');
            carrito.deleteProduct(id)
            carrito.showProducts()
        }


    }
})