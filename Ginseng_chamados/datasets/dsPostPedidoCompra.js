function createDataset(fields, constraints, sortFields) {
    var dataset = DatasetBuilder.newDataset();
    criarEstrutura(dataset);

    try {
        log.info("🚀 Iniciando dsPostPedidoCompra");

        // Captura os parâmetros via constraints
        var estabelecimento = trim(getParametro(constraints, "estabelecimento"));
        var numeroPedido    = trim(getParametro(constraints, "numeroPedido"));
        var dataAbertura    = trim(getParametro(constraints, "dataAbertura"));
        var fornecedor      = trim(getParametro(constraints, "fornecedor"));
        var condPagamento   = trim(getParametro(constraints, "condPagamentoIndica"));
        var userCompras     = trim(getParametro(constraints, "userValidacaoCompras"));

        // Monta o payload
        var payload = {
            "C7_FILIAL": estabelecimento,
            "C7_NUM": numeroPedido,
            "C7_EMISSAO": dataAbertura,
            "C7_FORNECE": fornecedor,
            "C7_LOJA": "01",
            "C7_COND": condPagamento,
            "C7_CONTATO": userCompras,
            "C7_FILENT": estabelecimento,
            "C7_TPFRETE": "C",
            "C7_FRETE": "0",
            "C7_ITENS": [fornecedor] // você pode ajustar isso para ser um array com objetos, se necessário
        };

        log.info("📤 Payload: " + JSON.stringify(payload));

        // Monta a chamada para o serviço
        var data = {
            companyId: "01",
            serviceCode: "Integrador Pedido de compra",
            endpoint: "/REST/PEDIDO/",
            method: "post",
            timeoutService: "100",
            params: payload,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        var clientService = fluigAPI.getAuthorizeClientService();
        var response = clientService.invoke(JSON.stringify(data));
        var result = response.getResult();

        log.info("✅ Retorno da API: " + result);

        if (!result || result.indexOf("ERRO") !== -1) {
            throw result || "Erro desconhecido na integração.";
        }

        dataset.addRow(["SUCESSO", result]);

    } catch (e) {
        var erro = "❌ Erro: " + e.message;
        log.error("[dsPostPedidoCompra] " + erro);
        dataset.addRow(["FALHA", erro]);
    }

    return dataset;
}

// Criação das colunas
function criarEstrutura(dataset) {
    dataset.addColumn("STATUS", DatasetFieldType.STRING);
    dataset.addColumn("RETORNO", DatasetFieldType.STRING);
}

// Função para buscar parâmetro nas constraints
function getParametro(constraints, campo) {
    var valor = "";
    if (constraints && constraints.length > 0) {
        for each (var c in constraints) {
            if (c.getFieldName().trim().toUpperCase() === campo.trim().toUpperCase()) {
                valor = c.getInitialValue();
                break;
            }
        }
    }
    return valor;
}

// Trim com segurança
function trim(valor) {
    if (!valor) return "";
    return valor.trim();
}
