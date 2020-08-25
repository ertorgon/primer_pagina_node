/*const express = require('express')
const app = express()

//rutas 
app.get('/',(require, response)=>{
    response.send('HOLA MUNDO NANCY')
})

//ACTIVAR LA APLICACIÓN
app.listen(3000,()=>{
    console.log('ESCUCHANDO EN EL PUERTO 3000')
})*/


//variable para llamar a la libreria express
const express = require('express')
const app = express()
const pug = require('pug')

const fs = require ('fs')
const { response } = require('express')


//para especificar una ruta con la libreria express
//express.static para llamar a todos nuestros archivos estaticos
app.use(express.static(__dirname + '/public'))

//definimos un arreglo

camisetasLista = [

    {color:"Naranja", imagen:"/images/GOKU1.jpg"},
    {color:"Verde", imagen:"/images/GOKU2.jpg"},
    {color:"Azul", imagen:"/images/GOKU3.jpg"}

]


//vista
/*app.get('/',(require,response)=>{
    response.sendfile('index.html')
})*/

//rutas con plantilla pug

app.get('/',(require,response)=>{

    response.render('index.pug',{
        titulo:"test",
        textoParrafo:"Somos tu mejor opcion para comprar playeras"
    })
})

app.get('/tienda.html',(require,response)=>{

    response.render('tienda.pug',{

        camisetas: camisetasLista
    })
})

//RUTA DINAMICA
app.get('/tienda/comprar/:color' , (require,response)=>{

    const datosCamiseta = camisetasLista.filter((item)=>{
        //los items son los que estan en el arreglo camisetas y son un objeto
        //el item del filter es para instanciar un objeto
       if(require.params.color == item.color){
           return item
       }
    })[0]

    response.render('detalles.pug', {

        color: require.params.color,
        datos: datosCamiseta
    })
})


//ruta de error
app.use((require,response)=>{
   response.status(400)
   const URLerror = require.originalUrl
   response.render('404.pug',{textoError : URLerror})
})


app.listen(3000,()=>{
    console.log('Este servidor corre en el puerto 3000')
})

