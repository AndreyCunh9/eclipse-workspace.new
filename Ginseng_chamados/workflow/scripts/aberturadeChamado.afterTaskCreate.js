/**
* Configura o prazo das atividades com base no SLA definido
*
* @param {string} colleagueId Matrícula do Usuário
*/
function afterTaskCreate(colleagueId) {
	log.info("Brunote - ### Iniciando execução da função afterTaskCreate ###");
	var proximaAtividade = getValue("WKNextState");
	var atividades = getValue("WKNumState");

	log.info("Brunote - Valor de proximaAtividade: " + proximaAtividade);
	log.info("Brunote - Valor de atividades (WKNumState): " + atividades);

	// Definição dos SLAs com horas fixas e minutos sempre 00
	var slas = {
		"Rádio Parada": 1,
		"Câmera Parada": 2,
		"Organização do Rack": 3,
		"Formatar Computador": 4,
		"Email sem acesso": 5,
		"Internet sem funcionar": 6,
		"Adquirir internet": 7,
		"Resgatar Imagens": 8
	};

	log.info("Brunote - Objeto SLAs carregado com sucesso.");

	// Verifica se a atividade é relevante para o SLA
	if (atividades != 5) {
		log.info("Brunote - Atividade não corresponde a 5. Função encerrada.");
		return;
	}

	log.info("Brunote - Atividade corresponde a 5. Continuando processamento...");

	// Obtendo o motivo do chamado do formulário
	var motivodochamado = hAPI.getCardValue("motivodochamado");
	log.info("Brunote - Motivo do chamado obtido: " + motivodochamado);

	// Obtendo a hora baseada no SLA (default 1 hora se não houver correspondência)
	var hours = slas[motivodochamado] || 1; // Se não encontrar no objeto, assume 1 hora
	var minutes = 0; // Minutos sempre 00

	log.info("Brunote - SLA definido com base no motivo do chamado: " + hours + " hora(s)");

	// Obtendo o momento exato da execução da função
	var now = new Date();
	var dateString = now.toISOString(); // Formato ISO: "YYYY-MM-DDTHH:mm:ss.sssZ"
	log.info("Brunote - Data atual capturada (dateString): " + dateString);

	try {
		var dateFormat = new java.text.SimpleDateFormat("yyyy-MM-dd");
		var dueDate = dateFormat.parse(dateString.substring(0, 10)); // Obtém apenas a data (YYYY-MM-DD)
		log.info("Brunote - Data limite extraída: " + dueDate);

		var dueTimeInSeconds = ((hours * 60) + minutes) * 60; // Converte tempo para segundos
		log.info("Brunote - Tempo limite calculado em segundos: " + dueTimeInSeconds);

		// Definição do prazo da tarefa no Fluig
		log.info("Brunote - Definindo prazo da tarefa no Fluig...");
		hAPI.setDueDate(getValue("WKNumProces"), 0, colleagueId, dueDate, dueTimeInSeconds);
		log.info("Brunote - Prazo configurado com sucesso para o processo " + getValue("WKNumProces"));

	} catch (err) {
		log.error("Brunote - Erro ao configurar Prazo de Conclusão. Detalhes: " + err);
	}

	log.info("Brunote - ### Finalizando execução da função afterTaskCreate ###");
}