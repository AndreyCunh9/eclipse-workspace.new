function validateForm(form) {
    var atividade = parseInt(getValue("WKNumState"));
    var nextAtividade = getValue("WKNextState");
    var completTask = getValue("WKCompletTask");

    var hasErros = false;
    var message = "";

    log.info("Atividade Inicial Para Transferência de Mercadoria");
    log.info("Abertura de solcitação: " + atividade);

    if (completTask.equals("true")) {

        switch (atividade) {
            case EMISSAO:

                // log.info("Abertura de Chamado CAERN - Área do Solicitante: " + form.getValue("areaSolicitante"));
                // if (form.getValue("areaSolicitante") == "") {
                //     message += getMessage("Área do Solicitante", 2, form);
                //     hasErros = true;
                // }
                
                log.info("Por favor, anexar a nota fiscal" + form.getValue("fnAnexo_Nfe"));
                if (form.getValue("fnAnexo_Nfe") == "") {
                    message += getMessage("Nota Fiscal", 3, form);
                    hasErros = true;
                }

                // var tabelaAnexos = form.getChildrenIndexes("tabelaAnexoOcorrencia")

                // if (tabelaAnexos.length > 0) {

                //     for (var i = 0; i < tabelaAnexos.length; i++) {

                //         if (form.getValue("fnAnexoOcorrencia" + "" + tabelaAnexos[i]) == null || form.getValue("fnAnexoOcorrencia" + "" + tabelaAnexos[i]) == "") {
                //             message += getMessage("Anexo " + tabelaAnexos[i], 1, form)
                //             hasErros = true;
                //         }

                //     }

                // } else {

                //     message += getMessage("A tabela de Anexos esta vazia", 0, form)
                //     hasErros = true;

                // }

            break;
                
            case COLETA:
                log.info("Por favor, registre o momento da coleta" + form.getValue("fdAnexo_Coleta"));
            if (form.getValue("fdAnexo_Coleta") == "") {
                message += getMessage("Coleta", 3, form);
                hasErros = true;
            }

            case ENTREGA:
                log.info("Por favor, registre o momento da entrega" + form.getValue("fdAnexo_Entrega"));
            if (form.getValue("fdAnexo_Entrega") == "") {
                message += getMessage("Entrega", 3, form);
                hasErros = true;
            }

            case RECEBIMENTO:
                log.info("Por favor, registre o recebimento do material" + form.getValue("fdAnexo_recebimento"));
            if (form.getValue("fdAnexo_recebimento") == "") {
                message += getMessage("Recebimento", 3, form);
                hasErros = true;
            }
            default:
                break;
        }

        if (hasErros) {
            if (isMobile(form)) throw message;
            throw (
                "<ul style='list-style-type: disc; padding-left: 90px;' class='alert alert-danger'>" +
                message +
                "</ul>"
            )
        }

    }

}

function isMobile(form) {
    return form.getMobile() != null && form.getMobile();
}

function getMessage(texto, tipo, form) {
    if (tipo == 1) {
        return 'Campo "' + texto + '" nao pode estar vazio.<br>';
    } else if (tipo == 2) {
        return 'Selecione uma das opcoes do Campo "' + texto + '".<br>';
    } else if (tipo == 3) {
        return 'Campo "' + texto + '" nao pode estar sem anexo.<br>';
    } else {
        return 'A quantidade existente de campos "' + texto + '" deve ser maior do que 0.'
    }
}