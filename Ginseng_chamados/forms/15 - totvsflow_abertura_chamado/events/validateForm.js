function validateForm(form){
	
	function validateForm(form){

		var msg ="";

		if(form.getValue("nomeGestorArea") == ""){
			msg +=  "Campo Nome do Gestor não foi preenchido"
		}

		if(form.getValue("tipoOcorrencia") == ""){
			msg += "Campo Tipo Ocorrencia não foi preenchido"
		}

		if(form.getValue("detalheSolicitacao") == ""){
			msg += "Campo Detalhamento da situação da situação não foi preenchido"
		}
		
		if (msg!="") {
			throw msg;
		}
		
	}
}