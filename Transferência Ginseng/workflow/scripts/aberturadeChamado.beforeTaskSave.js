function beforeTaskSave(colleagueId,nextSequenceId,userList){
	 // Captura o ID do usuário logado
    var usuarioLogado = getValue("WKUser");

    // Busca os dados do dataset "colleague"
    var c1 = DatasetFactory.createConstraint("colleagueId", usuarioLogado, usuarioLogado, ConstraintType.MUST);
    var dataset = DatasetFactory.getDataset("colleague", null, [c1], null);

    if (dataset && dataset.rowsCount > 0) {
        // Obter informações do usuário logado
        var nome = dataset.getValue(0, "colleagueName");
        var email = dataset.getValue(0, "mail");

        // Preenche os campos do formulário
        hAPI.setCardValue("nome", nome);
        hAPI.setCardValue("email", email);
    } else {
        log.error("Erro ao buscar os dados do dataset 'colleague'.");
    }
	
}