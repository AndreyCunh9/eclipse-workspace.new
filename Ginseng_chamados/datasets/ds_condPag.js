function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
    dataset.addColumn("codigo");
    dataset.addColumn("descricao");

    log.info("### Iniciando criação do dataset de Condições de Pagamento ###");

    var servicecode = 'API_CONDICAO_PAGAMENTO'; // Nome do serviço cadastrado no Fluig
    var usuario = "ezequiel.falcao"; 
    var senha = "Ginseng@"; 

    try {
        log.info("Iniciando chamada para o clientService...");
        var clientService = fluigAPI.getAuthorizeClientService();
        var data = {
            companyId: "1",
            serviceCode: servicecode,
            endpoint: "http://187.72.204.233:8089/rest/api/fat/v1/paymentcondition?Fields=Code,Plots.Description&Page=1&PageSize=100",
            method: 'get',
            timeoutService: '60000',
            params: {},
            options: {
                encoding: 'UTF-8',
                useBasicAuth: true,
                username: usuario,
                password: senha
            }
        };

        log.info("Parâmetros da chamada: " + JSON.stringify(data));

        var vo = clientService.invoke(JSON.stringify(data));
        var retorno = vo.getResult();
        log.info("Retorno da chamada: " + retorno);

        if (retorno) {
            var objData = JSON.parse(retorno);
            var itens = objData["items"];

            log.info("Número de itens retornados: " + itens.length);

            for (var i = 0; i < itens.length; i++) {
                dataset.addRow([
                    itens[i]["Code"], 
                    itens[i]["Description"]
                ]);
            }
            log.info("Dataset preenchido com sucesso");
        } else {
            log.warn("A API retornou uma resposta vazia.");
        }

    } catch (error) {
        log.error("Erro na chamada do clientService: " + error.message);
        dataset = DatasetBuilder.newDataset();
        dataset.addColumn('ERRO');
        dataset.addRow([error.toString()]);
    }

    return dataset;
	

}

function onMobileSync(user) {

}