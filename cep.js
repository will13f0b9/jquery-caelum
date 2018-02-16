//jQuery wrapper ===== jQuery(document).ready(function(){});
jQuery(document).ready(function(){

    var onlyNumbers = function(e){
            //console.log(e.target.value); pega o valor q ativou o evento
            this.value = this.value.replace(/\D/g,"");//sempre retorna string
            this.value = this.value.replace(/^(\d{5})(\d)/,"$1-$2");//coloca o hifen
    }

    var cepIsValid = function(){

        if(this.value.length !== 9){
            $(this).addClass("error").focus();
        }
        else{
            $("#cep").removeClass("error");
            getAddress(this.value);
        }

    }

    var getAddress = function(cep){

        $.ajax({
            url : `https://viacep.com.br/ws/${cep}/json/`,
            dataType: "json",
            method: "get",
            error: getAddressError, //error chama uma function de callback
            success: getAddressSuccess
           // data: "dados que quer passar se for via POST" 
        }); //
     }
     var getAddressError = (error)=>console.log(error);
     var getAddressSuccess = function(address){
         
        $.each(address,function(key,value){
            //console.log(key,value);
            $(`#${key}`).val(value);
        });

        //mt repetitivo
        //  $("#logradouro").val(address.logradouro);        
        /*  $("#bairro").val(address.bairro);
            $("#cidade").val(address.localidade);
            $("#estado").val(address.uf);
        */

     };




    //mapeando eventos
    $("#cep")
        .on("input",onlyNumbers)
        .on("focusout",cepIsValid);


});