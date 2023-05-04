// Declaración de botones

const falsoSubmit = document.querySelector('#falsoSubmit');
const inputCaptcha = document.querySelector('#testCaptcha');

// Declarando una clase para los captchas

class Verifier{
    constructor(path,text,input){
        this.path = path; //Ruta hacia la imagen
        this.text = text; //Texto de la imagen
        this.input = input || ''; //Input del usuario
    }

    checkAnswer(){
        return this.text == this.input;
    }

    showImage(query){
        document.querySelector(query).src = this.path;
    }
}

// Arreglo con los Verifiers posibles que aparezca

const captchas = [
    new Verifier('./src/captchas/captcha1.jpg','Lf8gE'),
    new Verifier('./src/captchas/captcha2.jpg','a94i6'),
    new Verifier('./src/captchas/captcha3.jpg','ph1y'),
    new Verifier('./src/captchas/captcha4.jpg','aF6fR'),
    new Verifier('./src/captchas/captcha5.jpg','m63B'),
    new Verifier('./src/captchas/captcha6.jpg','XxDi34'),
]

// Se obtiene un captcha aleatorio que se muestra en la página

let randomCaptcha = getRandom(captchas);

window.addEventListener('load',()=>{
    randomCaptcha.showImage('#captchaImage'); // Se muestra la imagen en la imagen con la id "captchaImage"
})

function getRandom(arr) {
    return arr[Math.floor(Math.random()*arr.length)]; //Devuelve cualquier elemento del arreglo
}

function captcha(element) {
    randomCaptcha.input = element.value; //Del objeto Verifier seleccionado, se le asigna el valor del input del form como propiedad "input" del objeto
    return randomCaptcha.checkAnswer(); //Acá se llama al método del objeto con la propiedad "input" actualizada
}

function cambiaColores(color,paragraph,mensaje) {
    paragraph.style.color = color;
    paragraph.innerHTML = mensaje;
    inputCaptcha.style.borderColor = color;
}



// Form

falsoSubmit.addEventListener('click',(e)=>{
    e.preventDefault(); //Esto es para que no reinicie la página
    let inputs = e.target.parentElement.querySelectorAll('input'); //Selecciona únicamente los inputs del formulario
    let valueOfInputs = []; //Se declara un arreglo vacío

    inputs.forEach(e=>{
        valueOfInputs.push(e.value); //Le asigna al arreglo vacío valueOfInputs el texto de los inputs del form
    })

    if(valueOfInputs.filter(e=>e.trim()).length == valueOfInputs.length){ //Verifica si todos los arreglos luego de pasarse por un filtro tiene la misma longitud que el arreglo ejecutado en un principio
        //trim() elimina los espacios en blanco del principio y final del string

        const responseCaptcha = document.querySelector('#responseCaptcha'); //Se selecciona el <p> que devuelve la resolución del captcha
        if(captcha(inputCaptcha)){ //Se verifica si sale true
            cambiaColores('green',responseCaptcha,'Captcha verificado correctamente');

            // Comportamiento del aviso
            document.querySelector('#modal').classList.add('appear')
            setInterval(()=>{
                document.querySelector('#modal').classList.remove('appear')
            },5000);
            
            //Se deshabilita el boton 
            e.target.disabled=true;
        }else{
        cambiaColores('red',responseCaptcha,'Captcha verificado erronéamente');
        }
        document.querySelector('#responseForm').innerText='';
    }else{
        document.querySelector('#responseForm').innerText='Complete todos los datos';
    }
    

})