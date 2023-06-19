// PUNTOS
    var puntos = 1000;
    var puntosTotales = puntos;
    var puntosEspeciales = 0;
    var limitePuntosEspeciales = 1000;

//TIEMPO
    var tiempo_1s = 1000;
    var nivelTiempo_1s = 0;
    var tiempo_5s = 5000;
    var nivelTiempo_5s = 0;
    var tiempo_10s = 10000;
    var nivelTiempo_10s = 0;

// HABILIDADES
    //Multiplicador de clicks
    var clicksMultiplicador = 1;
    var nivelMultiplicador = 1;
    var precioMultiplicador = 10;

    //Bots
    var sumaBots = 0;
    var nivelBots = 0;
    var precioBots = 1000;

    //Editor
    var sumaEditor = 0;
    var nivelEditor = 0;
    var precioEditor = 20000;

    //Patrocinador
    var sumaPatrocinador = 0;
    var nivelPatrocinador = 0;
    var precioPatrocinador = 100000;

//INTERVALOS
    var intervaloBots;
    var internaloEditor;
    var intervaloPatrocinador;

// FUNCIONES DE HABILIDADES
    function clickadas(click)   //Suma puntos con un click según el nivel de la habilidad "Multiplicador de clicks"
    {
        puntos = puntos + click*clicksMultiplicador;
        puntosTotales = puntosTotales + click*clicksMultiplicador;
        document.getElementById("contadorPuntos").innerHTML= puntos + "<img class=" + "iconoMoneda" +  "src=" + "./imagenes/monedaEspecial.png" + "/>";
    };

    function autoPuntuar(sumar) //Suma puntos automáticamente, se puede utilizar para toda habilidad automática
    {
        puntos = puntos + sumar;
        puntosTotales = puntosTotales + sumar;
    }

    function sumaPuntosEspeciales(puntosTotales)
    {
        if(puntosTotales >= limitePuntosEspeciales)
        {
            puntosEspeciales = puntosEspeciales + 50;
            limitePuntosEspeciales = limitePuntosEspeciales*5;
            document.getElementById("contadorPuntosEspeciales").innerHTML= puntosEspeciales;
        }
    }

// FUNCIONES DE TIENDA
    function mejorarMultiplicador()    //Mejora la habilidad "Multiplicador de clicks"
    {
        var nivelAntes = nivelMultiplicador;

        if(puntos>=precioMultiplicador)
        {
            puntos = puntos - precioMultiplicador;
            document.getElementById("contadorPuntos").innerHTML= puntos + "<img class=" + "iconoMoneda" +  "src=" + "./imagenes/monedaEspecial.png" + "/>";

            nivelMultiplicador++;
            document.getElementById("nivelMultiplicador").innerHTML = "Nivel " + nivelMultiplicador;
            clicksMultiplicador = clicksMultiplicador*2;
            precioMultiplicador = precioMultiplicador*3;
            document.getElementById("precioMultiplicador").innerHTML = "Precio de mejora: " + precioMultiplicador;
        }

        if(nivelMultiplicador%10==0 && nivelMultiplicador>=10 && nivelAntes!=nivelMultiplicador)
        {
            puntosEspeciales=puntosEspeciales+100;
        }
    }

    function mejorarBots()     //Mejora la habilidad "Bots"
    {
        var nivelAntes = nivelBots;

        if(puntos>=precioBots)
        {
            puntos = puntos - precioBots;
            document.getElementById("contadorPuntos").innerHTML= puntos + "<img class=" + "iconoMoneda" +  "src=" + "./imagenes/monedaEspecial.png" + "/>";

            nivelBots++;
            document.getElementById("nivelBots").innerHTML = "Nivel " + nivelBots;
            sumaBots = sumaBots + 100;
            precioBots = precioBots*2;
            document.getElementById("precioBots").innerHTML = "Precio de mejora: " + precioBots;

            clearInterval(intervaloBots);

            intervaloBots = 
                setInterval(function(){
            
                    //Puntos automaticos
                    autoPuntuar(sumaBots);
            
                    //Puntos especiales
                    sumaPuntosEspeciales(puntosTotales);
                    
                    //Sumar puntos
                    document.getElementById("contadorPuntos").innerHTML= puntos + "<img class=" + "iconoMoneda" +  "src=" + "./imagenes/monedaEspecial.png" + "/>";
                    document.getElementById("contadorPuntosEspeciales").innerHTML= puntosEspeciales + "<img class=" + "iconoMoneda" +  "src=" + "./imagenes/monedaEspecial.png" + "/>";
            
                    mostrarHabilidades();
                }, tiempo_1s);

            

            if(nivelBots%10==0 && nivelBots>=10 && nivelAntes!=nivelBots)
            {
                puntosEspeciales=puntosEspeciales+100;
            }
        }


    }

    function mejorarEditor()     //Mejora la habilidad "Editor"
    {
        var nivelAntes = nivelEditor;

        if(puntos>=precioEditor)
        {
            puntos = puntos - precioEditor;
            document.getElementById("contadorPuntos").innerHTML= puntos + "<img class=" + "iconoMoneda" +  "src=" + "./imagenes/monedaEspecial.png" + "/>";

            nivelEditor++;
            document.getElementById("nivelEditor").innerHTML = "Nivel " + nivelEditor;
            sumaEditor = sumaEditor + 400;
            precioEditor = precioEditor*3;
            document.getElementById("precioEditor").innerHTML = "Precio de mejora: " + precioEditor;

            
            clearInterval(intervaloEditor);
            intervaloEditor =
                setInterval(function(){
                    //Puntos automaticos
                    autoPuntuar(sumaEditor);
            
                    //Sumar puntos
                    document.getElementById("contadorPuntos").innerHTML= puntos + "<img class=" + "iconoMoneda" +  "src=" + "./imagenes/monedaEspecial.png" + "/>";
                    document.getElementById("contadorPuntosEspeciales").innerHTML= puntosEspeciales + "<img class=" + "iconoMoneda" +  "src=" + "./imagenes/monedaEspecial.png" + "/>";
                }, tiempo_5s);

            if(nivelEditor%10==0 && nivelEditor>=10 && nivelAntes!=nivelEditor)
            {
                puntosEspeciales=puntosEspeciales+200;
            }
        }
    }

    function mejorarPatrocinador()     //Mejora la habilidad "Patrocinador"
    {
        var nivelAntes = nivelPatrocinador;

        if(puntos>=precioPatrocinador)
        {
            puntos = puntos - precioPatrocinador;
            document.getElementById("contadorPuntos").innerHTML= puntos + "<img class=" + "iconoMoneda" +  "src=" + "./imagenes/monedaEspecial.png" + "/>";

            nivelPatrocinador++;
            document.getElementById("nivelPatrocinador").innerHTML = "Nivel " + nivelPatrocinador;
            sumaPatrocinador = sumaPatrocinador + 600;
            precioPatrocinador = precioPatrocinador*4;
            document.getElementById("precioPatrocinador").innerHTML = "Precio de mejora: " + precioPatrocinador;

            clearInterval(intervaloPatrocinador);
            intervaloPatrocinador =
                setInterval(function(){
                    //Puntos automaticos
                    autoPuntuar(sumaPatrocinador);
            
                    //Sumar puntos
                    document.getElementById("contadorPuntos").innerHTML= puntos + "<img class=" + "iconoMoneda" +  "src=" + "./imagenes/monedaEspecial.png" + "/>";
                    document.getElementById("contadorPuntosEspeciales").innerHTML= puntosEspeciales + "<img class=" + "iconoMoneda" +  "src=" + "./imagenes/monedaEspecial.png" + "/>";
                }, tiempo_10s);

            if(nivelPatrocinador%10==0 && nivelPatrocinador>=10 && nivelAntes!=nivelPatrocinador)
            {
                puntosEspeciales=puntosEspeciales+300;
            }
        }


    }

// FUNCIONES DE TIENDA ESPECIAL
    function mejorarTiempo_1s() 
    {  
        if(puntosEspeciales>=200)
        {
            nivelTiempo_1s++;

            puntosEspeciales = puntosEspeciales - 200;
            document.getElementById("nivelTiempo1").innerHTML = "Nivel " + nivelTiempo_1s;
            document.getElementById("contadorPuntosEspeciales").innerHTML= puntosEspeciales + "<img class=" + "iconoMoneda" +  "src=" + "./imagenes/monedaEspecial.png" + "/>";
            tiempo_1s = tiempo_1s - 100;

            clearInterval(intervaloBots);
            intervaloBots =
                setInterval(function(){
            
                    //Puntos automaticos
                    autoPuntuar(sumaBots);
            
                    //Puntos especiales
                    sumaPuntosEspeciales(puntosTotales);
                    
                    //Sumar puntos
                    document.getElementById("contadorPuntos").innerHTML= puntos + "<img class=" + "iconoMoneda" +  "src=" + "./imagenes/monedaEspecial.png" + "/>";
                    document.getElementById("contadorPuntosEspeciales").innerHTML= puntosEspeciales + "<img class=" + "iconoMoneda" +  "src=" + "./imagenes/monedaEspecial.png" + "/>";
            
                    mostrarHabilidades();
                }, tiempo_1s);
        }
    }

    function mejorarTiempo_5s() 
    {  
        if(puntosEspeciales>=400)
        {

            nivelTiempo_5s++;
            
            puntosEspeciales = puntosEspeciales - 400;
            document.getElementById("nivelTiempo5").innerHTML = "Nivel" + nivelTiempo_5s;
            document.getElementById("contadorPuntosEspeciales").innerHTML= puntosEspeciales + "<img class=" + "iconoMoneda" +  "src=" + "./imagenes/monedaEspecial.png" + "/>";
            tiempo_5s = tiempo_5s - 250;

            clearInterval(intervaloEditor);
            intervaloEditor =
                setInterval(function(){
                    //Puntos automaticos
                    autoPuntuar(sumaEditor);
            
                    //Sumar puntos
                    document.getElementById("contadorPuntos").innerHTML= puntos + "<img class=" + "iconoMoneda" +  "src=" + "./imagenes/monedaEspecial.png" + "/>";
                    document.getElementById("contadorPuntosEspeciales").innerHTML= puntosEspeciales + "<img class=" + "iconoMoneda" +  "src=" + "./imagenes/monedaEspecial.png" + "/>";
                }, tiempo_5s);

        }
    }

    function mejorarTiempo_10s() 
    {  
        if(puntosEspeciales>=600)
        {

            nivelTiempo_10s++;

            puntosEspeciales = puntosEspeciales - 600;
            document.getElementById("nivelTiempo10").innerHTML = "Nivel" + nivelTiempo_10s;
            document.getElementById("contadorPuntosEspeciales").innerHTML= puntosEspeciales + "<img class=" + "iconoMoneda" +  "src=" + "./imagenes/monedaEspecial.png" + "/>";
            tiempo_10s = tiempo_10s - 500;

            clearInterval(intervaloPatrocinador);
            intervaloPatrocinador =
                setInterval(function(){
                    //Puntos automaticos
                    autoPuntuar(sumaPatrocinador);
            
                    //Sumar puntos
                    document.getElementById("contadorPuntos").innerHTML= puntos + "<img class=" + "iconoMoneda" +  "src=" + "./imagenes/monedaEspecial.png" + "/>";
                    document.getElementById("contadorPuntosEspeciales").innerHTML= puntosEspeciales + "<img class=" + "iconoMoneda" +  "src=" + "./imagenes/monedaEspecial.png" + "/>";
                }, tiempo_10s);
        }
    }

// FUNCIONES DE MUESTRA

    function mostrarHabilidades()
    {
        //Habilidad "Bots"
        var mejoraTiempoBots = document.getElementById("mejoraTiempoBots");
        var habilidadBots = document.getElementById("habilidadBots");
        //Habilidad "Editor"
        var mejoraTiempoEditor = document.getElementById("mejoraTiempoEditor");
        var habilidadEditor = document.getElementById("habilidadEditor");
        //Habilidad "Patrocinador"
        var mejoraTiempoPatrocinador = document.getElementById("mejoraTiempoPatrocinador");
        var habilidadPatrocinador = document.getElementById("habilidadPatrocinador");

        // Mostrar "Bots"
        if(puntosTotales <= 1000)
        {
            mejoraTiempoBots.hidden = true
            habilidadBots.hidden = true;
        }
        else
        {
            mejoraTiempoBots.hidden = false;
            habilidadBots.hidden = false;
        }

        // Mostrar "Editor"
        if(puntosTotales <= 20000)
        {
            mejoraTiempoEditor.hidden = true;
            habilidadEditor.hidden = true;
        }
        else
        {
            mejoraTiempoEditor.hidden = false;
            habilidadEditor.hidden = false;
        }

        // Mostrar "Patrocinador"
        if(puntosTotales <= 100000)
        {
            mejoraTiempoPatrocinador.hidden = true;
            habilidadPatrocinador.hidden = true;
        }
        else
        {
            mejoraTiempoPatrocinador.hidden = false;
            habilidadPatrocinador.hidden = false;
        }
    }

// INTERVALOS

    //Intervalo cada segundo
    window.setInterval(function(){
        
        //Puntos automaticos
        // autoPuntuar(sumaBots);

        //Puntos especiales
        sumaPuntosEspeciales(puntosTotales);
        
        //Sumar puntos
        document.getElementById("contadorPuntos").innerHTML= puntos + "<img class=" + "iconoMoneda" +  "src=" + "./imagenes/monedaEspecial.png" + "/>";
        document.getElementById("contadorPuntosEspeciales").innerHTML= puntosEspeciales + "<img class=" + "iconoMoneda" +  "src=" + "./imagenes/monedaEspecial.png" + "/>";

        mostrarHabilidades();
    }, 1000);

    // //Intervalo cada 5 segundos
    // window.setInterval(function(){
    //     //Puntos automaticos
    //     autoPuntuar(sumaEditor);

    //     //Sumar puntos
    //     document.getElementById("contadorPuntos").innerHTML= puntos + "<img class=" + "iconoMoneda" +  "src=" + "./imagenes/monedaEspecial.png" + "/>";
    //     document.getElementById("contadorPuntosEspeciales").innerHTML= puntosEspeciales + "<img class=" + "iconoMoneda" +  "src=" + "./imagenes/monedaEspecial.png" + "/>";
    // }, tiempo_5s);

    // //Intervalo cada 10 segundos
    // window.setInterval(function(){
    //     //Puntos automaticos
    //     autoPuntuar(sumaPatrocinador);

    //     //Sumar puntos
    //     document.getElementById("contadorPuntos").innerHTML= puntos + "<img class=" + "iconoMoneda" +  "src=" + "./imagenes/monedaEspecial.png" + "/>";
    //     document.getElementById("contadorPuntosEspeciales").innerHTML= puntosEspeciales + "<img class=" + "iconoMoneda" +  "src=" + "./imagenes/monedaEspecial.png" + "/>";
    // }, tiempo_10s);
