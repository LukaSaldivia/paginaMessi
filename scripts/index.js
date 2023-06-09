// Declaración del botón y del input

const falsoSubmit = document.querySelector('#falsoSubmit');
const inputCaptcha = document.querySelector('#testCaptcha');

const suscripcion_form = document.querySelector('#suscripcion_form');

// Declaración de una clase para los captchas

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

function captcha(value) {
    randomCaptcha.input = value; //Del objeto Verifier seleccionado, se le asigna el valor del input del form como propiedad "input" del objeto
    return randomCaptcha.checkAnswer(); //Acá se llama al método del objeto con la propiedad "input" actualizada
}

function cambiaColores(color,paragraph,mensaje) {
    paragraph.style.color = color;
    paragraph.innerHTML = mensaje;
    inputCaptcha.style.borderColor = color;
}



// Form

suscripcion_form.addEventListener('submit',(e)=>{
    e.preventDefault();
    let formData = new FormData(suscripcion_form);
    const responseCaptcha = document.querySelector('#responseCaptcha');
    
    if(captcha(formData.get('captcha'))){ //Se verifica si sale true

        falsoSubmit.disabled = true
        
        cambiaColores('green',responseCaptcha,'Captcha verificado correctamente')

        document.querySelector('#spanNombre').innerHTML=formData.get('nombre');

        // Comportamiento del aviso
        document.querySelector('#modal').classList.add('appear')
        setTimeout(()=>{
            document.querySelector('#modal').classList.remove('appear')
        },5000);
                    
    }else{
        cambiaColores('red',responseCaptcha,'Captcha verificado erronéamente');
    }
})

