function servicetask70(attempt, message) {
    log.info("🚀 Iniciando servicetask70");

    var fornecedores = {};
    var qtdItens = hAPI.getChildrenIndexes("tabelaItens");
    log.info("📦 Total de itens na tabela: " + qtdItens.length);

    for (var i = 0; i < qtdItens.length; i++) {
        var index = qtdItens[i];
        log.info("🔄 Processando item índice: " + index);

        var fornecedor = String(hAPI.getCardValue("fornecedorIndica___" + index)).trim();

        if (!fornecedor) {
            log.warn("⚠️ Item ignorado: fornecedor vazio no índice [" + index + "]");
            continue; // Pula para o próximo item
        }

        var item = {
            "produto": String(hAPI.getCardValue("itemCompraIndica___"+index)).trim(),
            "qtdVen": Number(hAPI.getCardValue("quantidadeIndica___"+ index)),
            "preco": Number(hAPI.getCardValue("precoIndica___" +index))
        };

        log.info("📌 Item coletado para fornecedor [" + fornecedor + "]: " + JSON.stringify(item));

        // 🔍 Garante que o fornecedor tenha um array antes de adicionar itens
        if (!(fornecedor in fornecedores)) {
            fornecedores[fornecedor] = [];
            log.info("➕ Novo fornecedor adicionado: " + fornecedor);
        }

        // 🔄 Adiciona o item ao fornecedor correspondente
        fornecedores[fornecedor].push(item);
        log.info("📌 Item adicionado ao fornecedor [" + fornecedor + "]: " + JSON.stringify(item));
    }

    log.dir(fornecedores);

    var numBase = String(getValue("WKNumProces"));
    log.info("📄 Número base do processo: " + numBase);

    var contador = 0;

    for (var fornecedor in fornecedores) {
        var numeroPedido = numBase + (contador > 0 ? String.fromCharCode(65 + contador - 1) : "");
        log.info("📝 Gerando pedido [" + numeroPedido + "] para fornecedor [" + fornecedor + "]");

        var payload = {
            "filial": String(hAPI.getCardValue("estabelecimento")),
            "numero": numeroPedido,
            "emissao": String(hAPI.getCardValue("dataAbertura")),
            "fornece": fornecedor,
            "loja": "01",
            "contato": String(hAPI.getCardValue("userValidacaoCompras")),
            "filialent": String(hAPI.getCardValue("estabelecimento")),
            "tipofrete": "C",
            "frete": 0,
            "cond": String(hAPI.getCardValue("condPagamentoIndica___"+ index)),
            "itens": fornecedores[fornecedor]
        };

        log.info("📦 Payload montado para envio:");
        log.dir(payload);

        var data1 = {
            companyId: '1',
            serviceCode: 'Integrador Pedido de compra',
            endpoint: 'http://187.72.204.233:8089/rest/pedido/',
            method: 'post',
            timeoutService: '1000000',
            params: payload,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        log.info("📡 Enviando requisição para o Protheus...");
        log.dir(data1);

        try {
            var clientService = fluigAPI.getAuthorizeClientService();
            var response = clientService.invoke(JSON.stringify(data1));

            log.info("📬 Resposta da API Protheus:");
            log.dir(response);

            if (response && response.getResult()) {
                log.info("✅ Pedido [" + numeroPedido + "] enviado com sucesso para [" + fornecedor + "]");
                log.info("📬 Resposta: " + response.getResult());
            } else {
                log.warn("⚠️ API Protheus não retornou dados para fornecedor [" + fornecedor + "]");
            }
        } catch (e) {
            log.error("❌ Erro ao enviar pedido [" + numeroPedido + "] para fornecedor [" + fornecedor + "]: " + e.message);
        }

        contador++;
    }

    log.info("🏁 Finalização da servicetask70");
}
