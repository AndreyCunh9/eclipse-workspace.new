$(document).ready(function () {
    if ($("#formMode").val() == "VIEW") {
        showAndBlock(["all"]);
    } else {
        //show the right fields
        var activity = $("#activity").val();
        var requestDate = getCurrentDate();

        $(".activity").hide();

        $(".activity-" + activity).show();

        if (activity == 0 || activity == 1) {
            //primeira atividade
            //$("#dataAbertura").val(requestDate[0] + " - " + requestDate[1]);
            $("#dataAbertura").val(requestDate[0]);
            add_new_row("tabelaItens");
        } else if (activity == 4) {
            showAndBlock([0]);
            $("#userValidacaoGestor").val($("#currentUserName").val());
            $("#dataValidacaoGestor").val(
                requestDate[0] + " - " + requestDate[1]
            );
            updt_line();
        } else if (activity == 6) {
            showAndBlock([0, 4]);
            $("#userValidacaoCompras").val($("#currentUserName").val());
            $("#dataValidacaoCompras").val(
                requestDate[0] + " - " + requestDate[1]
            );

            if ($("#justificativaDecisaoGestor").val() == "") {
                $(".justificativa-activity-4").hide();
            }
            updt_line();
        
        } else if (activity == 57) {
            $("#userCotacaoGestor").val($("#currentUserName").val());
            $("#dataAprovCompras").val(
                requestDate[0] + " - " + requestDate[1]
            );
            showAndBlock([0, 4, 6]);

            if ($("#justificativaDecisaoGestor").val() == "") {
                $(".justificativa-activity-4").hide();
            }
            if ($("#justificativaDecisaoCompras").val() == "") {
                $(".justificativa-activity-6").hide();
            }
            updt_line();

        } else if (activity == 31) {
            $("#userRealizacaoCompras").val($("#currentUserName").val());
            $("#dataRealizacaoCompras").val(
                requestDate[0] + " - " + requestDate[1]
            );
            showAndBlock([0, 4, 6, 57]);

            if ($("#justificativaDecisaoGestor").val() == "") {
                $(".justificativa-activity-4").hide();
            }
            if ($("#justificativaDecisaoCompras").val() == "") {
                $(".justificativa-activity-6").hide();
            }
            updt_line();
        } else if (activity == 18) {
            if ($("justificativaValidaProblema") != "") {
                showAndBlock([0, 4, 6, 24, 57, 31]);
            } else {
                showAndBlock([0, 4, 6, 31]);
            }
            $("#userValidacaoItens").val($("#currentUserName").val());
            $("#dataValidacaoItens").val(requestDate[0] + " - " + requestDate[1]);

            if ($("#justificativaDecisaoGestor").val() == "") {
               $(".justificativa-activity-4").hide();
            } 
            if ($("#justificativaDecisaoCompras").val() == "") {
                $(".justificativa-activity-6").hide();
            }
            if ($("#consideracoesCompras").val() == "") {
                $(".justificativa-activity-31").hide();
            }

            $("input[name=validacaoItens]").on("change", function () {
                $(".justificativaDecisaoItens").hide();
                if (
                    $("input[name=validacaoItens]:checked").val() == "incorreto" ||
                    $("input[name=validacaoItens]:checked").val() == "naoEntregue"
                ) {
                    $(".justificativaDecisaoItens").show();
                }
            });
            $("input[name=validacaoItens]").trigger("change");

            updt_line();
        } else if (activity == 24) {
            showAndBlock([0, 4, 6, 31, 18]);

            if ($("#justificativaDecisaoGestor").val() == "") {
                $(".justificativa-activity-4").hide();
            }
            if ($("#justificativaDecisaoCompras").val() == "") {
                $(".justificativa-activity-6").hide();
            }
            if ($("#consideracoesCompras").val() == "") {
                $(".justificativa-activity-31").hide();
            }
            updt_line();
        }
    }

    formatarMoedasTabela("preco___");
    //formatarMoedasTabela("precoIndica___");
    formatarMoedasTabela("ValorTotal");

    gerarTabelaCotacaoIndica("tabelaCotacaoIndica", "tabelaItens");

    
});

function formatarMoedasTabela(ids) {
    $(document).on('input', `[id^="${ids}"]`, function() {
        let valor = $(this).val();

        // Remove tudo que não for número
        valor = valor.replace(/\D/g, '');

        // Converte para número decimal
        let numero = parseFloat(valor) / 100;

        // Formata para Real Brasileiro
        if (!isNaN(numero)) {
            valor = numero.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }

        // Atualiza o campo com a formatação correta
        $(this).val(valor);
    });
}


//show the activity and then block the fields
function showAndBlock(activity) {
    for (var i = 0, l = activity.length; i < l; i++) {
        $(".activity-" + activity[i]).show();
        $(".hideButton").hide();
        $(".activity-" + activity[i] + " :input").each(function () {
            $(this).attr("readonly", "readonly");
            $(this)
                .css("background-color", "#eee")
                .children("option:not(:selected)")
                .prop("disabled", true);
            $(this).on("mousedown", function (e) {
                this.blur();
                window.focus();
            });
            if ($(this).is(":checkbox")) {
                $(this).attr("disabled", true);
            } else if ($(this).is(":radio")) {
                $(this).on("click", function () {
                    return false;
                });
            }
        });
    }
}

function getCurrentDate() {
    var newDate = new Date();
    var h = newDate.getHours();
    if (h < 10) {
        h = "0" + h;
    }
    var m = newDate.getMinutes();
    if (m < 10) {
        m = "0" + m;
    }
    var hour = h + ":" + m; // + ":" + s;
    var day = newDate.getDate();
    if (day < 10) {
        day = "0" + day;
    }
    var month = newDate.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    newDate = day + "/" + month + "/" + newDate.getFullYear();
    var currentDate = [newDate, hour];
    return currentDate;
}

var beforeSendValidate = function (numState, nextState) {
    $(".errorValidate").removeClass("errorValidate");
    if (numState == 0 || numState == 1) {
        if ($("#estabelecimento ").val() == "") {
            $("#estabelecimento ").parent("div").addClass("errorValidate");
            throw "'Estabelecimento/filial ' é obrigatório.";
        } else if ($("#enderecoSolicitante").val() == "") {
            $("#enderecoSolicitante").parent("div").addClass("errorValidate");
            throw "'Endereço do solicitante' é obrigatório.";
        } else if ($("#cnpj").val() == "") {
            $("#cnpj").parent("div").addClass("errorValidate");
            throw "'CNPJ' é obrigatório.";
        } else if ($("#justificativa").val() == "") {
            $("#justificativa").parent("div").addClass("errorValidate");
            throw "'Qual o motivo da compra?' é obrigatório.";
        } else {
            $("input[id^='quantidadeItem___']").each(function (index, value) {
                var linha = $(value).attr("name").split("___")[1];

                if (
                    $("#descricao___" + linha).val() == "" &&
                    $("#quantidadeItem___" + linha).val() == ""
                ) {
                    remove_row(value);
                }
            });

            $("input[id^='quantidadeItem___']").each(function (index, value) {
                var linha = $(value).attr("name").split("___")[1];

                if ($("#descricao___" + linha).val() == "") {
                    $("#descricao___" + linha)
                        .parent("div")
                        .addClass("errorValidate");
                    throw "Selecione o item " + (index + 1) + ".";
                } else if ($("#quantidadeItem___" + linha).val() == "") {
                    $("#quantidadeItem___" + linha)
                        .parent("div")
                        .addClass("errorValidate");
                    throw "Preencha a quantidade do item " + (index + 1) + ".";
                }
            });

            if ($("input[name^='quantidadeItem___']").length == 0) {
                throw "Ao menos um item é necessário para iniciar a solicitação.";
            }
        }
    } else if (numState == 4) {
        //
    } else if (numState == 6) {
        //
    } else if (numState == 18) {
        if (
            $("input[name='validacaoItens']:checked").val() == "" ||
            $("input[name='validacaoItens']:checked").val() == undefined
        ) {
            throw "'Consegue resolver?' é obrigatório.";
        } else if (
            $("input[name='validacaoItens']:checked").val() == "naoEntregue" ||
            $("input[name='validacaoItens']:checked").val() == "incorreto"
        ) {
            if ($("#justificativaDecisaoItens").val() == "") {
                $("#justificativaDecisaoItens")
                    .parent("div")
                    .addClass("errorValidate");
                throw "'Justificativa' é obrigatório.";
            }
        }
    } else if (numState == 24) {
        $('#justificativaValidaProblema').parent().removeClass('has-error errorValidate');
        if ($('#justificativaValidaProblema').val() == "") {
            $('#justificativaValidaProblema').parent().addClass('has-error errorValidate');
            throw "Preencha os campos obrigatórios."
        }
    }
};

function setSelectedZoomItem(selectedItem) {
    var name_item = selectedItem.inputId;
    var ehItem = name_item.indexOf("___") >= 0;
	var indice = "";
	if (ehItem){
		var valores = name_item.split("___");
		name_item = valores[0];
		indice = valores[1];
	}

    var dtsCentroCusto = DatasetFactory.getDataset(
        "ds_centroCusto",
        null,
        null,
        null
    ).values;

    var nomeGestorComercial = dtsCentroCusto[0].gestorCentroCusto;
    var emailGestorComercial = dtsCentroCusto[0].emailGestor;
    var idGestorComercial = dtsCentroCusto[0].idGestor;

    var nomeGestorOperacoes = dtsCentroCusto[2].gestorCentroCusto;
    var emailGestorOperacoes = dtsCentroCusto[2].emailGestor;
    var idGestorOperacoes = dtsCentroCusto[2].idGestor;

    if (name_item == "estabelecimento") {
        let estabelecimento = selectedItem["estabelecimento"];
        let cnpj = selectedItem["CNPJ"];
        let protheus = selectedItem["CODIGO"]
        $("#cnpj").val(cnpj);
        $("#protheus").val(protheus);


    
        if (estabelecimento.includes("MATRIZ")) {
        } else if (estabelecimento.includes("CD")) {
            window["centroCusto"].setValue("Operações");
            $("#gestorNome").val(nomeGestorOperacoes);
            $("#gestorEmail").val(emailGestorOperacoes);
            $("#gestor_cc").val(idGestorOperacoes);
        } else {
            window["centroCusto"].setValue("Comercial");
            $("#gestorNome").val(nomeGestorComercial);
            $("#gestorEmail").val(emailGestorComercial);
            $("#gestor_cc").val(idGestorComercial);
        }
    }
    
    if (name_item == "centroCusto") {
        $("#gestorNome").val(selectedItem["gestorCentroCusto"]);
        $("#gestorEmail").val(selectedItem["emailGestor"]);
        $("#gestor_cc").val(selectedItem["idGestor"]);
    }

    if (name_item == "userSolicitante") {
        $("#emailSolicitante").val(selectedItem.mail);
    }
    
    if (name_item == "descricao") {
        $("#codigoItem" + "___" + indice).val(selectedItem["descricao"]);
    }
    
}

function removedZoomItem(removedItem) {
    var name_item = removedItem.inputId;
    var ehItem = name_item.indexOf("___") >= 0;
	var indice = "";
	if (ehItem){
		var valores = name_item.split("___");
		name_item = valores[0];
		indice = valores[1];
	}

    if (name_item == "userSolicitante") {
        $("#emailSolicitante").val("");
    } else if (name_item == "centroCusto") {
        $("#gestorNome").val("");
        $("#gestorEmail").val("");
        $("#gestor_cc").val("");
    } else if (~name_item.indexOf("___")) {
        var linha = name_item.split("___");

        if (linha[0] == "descricao") {
            $("#codigoItem___" + linha[1]).val("");
            $("#quantidadeItem___" + linha[1]).val("");
        }
    }

    if (name_item == "descricao") {
        $("#codigoItem" + "___" + indice).val("");
    }
}

function add_new_row(table) {
    var row = wdkAddChild(table);
    updt_line();
}

function updt_line() {
    $(".tabela_itens_id").each(function (index, item) {
        if (index == 0) return;
        $(item)[0].innerHTML = index;
    });
}

function remove_row(element) {
    fnWdkRemoveChild(element);
    updt_line();
}


// function setSelectedZoomItem(selectedItem) {
//       if (selectedItem.inputId === "estabelecimento") {
//           var estabelecimento = selectedItem.estabelecimento.trim();
//           var setorContainer = document.getElementById("setor-container");

//           if (estabelecimento === "ESCRITÓRIO MATRIZ") {
//               setorContainer.style.display = "block"; // Mostra o campo de setor
//           } else {
//               setorContainer.style.display = "none"; // Oculta o campo de setor
//           }
//       }
//   }

// Andrey, nao esqueca de ver isso
// function removedZoomItem(removedItem) {
// //     if (removedItem.inputId === "estabelecimento") {
// //         document.getElementById("setor-container").style.display = "none"; // Oculta ao remover
//         window["centroCusto"].setValue("")[0]
// //     }
// }

$(document).ready(function() {
    // $('#gerarTabela').click(function() {
    //     var numCotacoes = $('#numCotacoes').val();
    //     var tbody = $("#tabelaCotacao tbody");
    //     tbody.empty(); // Limpa a tabela antes de gerar novas linhas

    //     // Supondo que você já tenha uma tabela de origem com os produtos
    //     $('table.table[tablename="tabelaItens"] tbody tr:visible').each(function(index, element) {
    //         var nomeItem = $(element).find('input[name^="nomeItem"]').val();
    //         var quantidadeItem = $(element).find('input[name^="quantidadeItem"]').val();

    //         for (var i = 0; i < numCotacoes; i++) {
    //             var row = `<tr>
    //                 <td>${index + 1}.${i + 1}</td>
    //                 <td>${nomeItem}</td>
    //                 <td>${quantidadeItem}</td>
    //                 <td><input type="text" class="form-control" name="fornecedor_${index}_${i}" /></td>
    //                 <td><input type="number" class="form-control" name="preco_${index}_${i}" /></td>
    //                 <td><input type="date" class="form-control" name="dataEntrega_${index}_${i}" /></td>
    //                 <td><input type="email" class="form-control" name="email_${index}_${i}" /></td>
    //             </tr>`;
    //             tbody.append(row);
    //         }
    //     });
    // });

    $('#gerarTabela').click(function() {
        
    });
});
function gerarTabelaCotacaoComNumeracao(tabelaCotacao, tabelaItens) {
    // Obtém a quantidade de cotações informada no input
    var numCotacoes = parseInt($("#numCotacoes").val());

    // Valida se o número de cotações é válido
    if (isNaN(numCotacoes) || numCotacoes < 1) {
        alert("Por favor, insira um número válido de cotações (mínimo 1).");
        return;
    }

    var contador = 1; // Controla a numeração correta dos itens

    // Percorre cada linha da tabela de itens
    $(`#${tabelaItens} tbody tr`).each(function (index) {
        var linha = $(this);
        var descricao = linha.find("input[name^='codigo']").val();
        var quantidadeItem = linha.find("input[name^='quantidadeItem']").val();

        // Verifica se o item está preenchido antes de adicionar à tabela de cotações
        if (!descricao || !quantidadeItem) {
            console.warn(`Item na linha ${index + 1} ignorado por falta de dados.`);
            return; // Se não houver nome ou quantidade, pula esta linha
        }

        // Para cada item, cria as linhas na tabela de cotações
        for (var i = 0; i < numCotacoes; i++) {
            var indexLinha = wdkAddChild(tabelaCotacao); // Adiciona uma nova linha na tabela de cotações

            console.log(`Adicionando linha ${contador}.${i + 1} - ${descricao}, Qtd: ${quantidadeItem}`);

            // Preenche a numeração no campo da coluna #
            $(`#numCotacao___${indexLinha}`).text(`${contador}.${i + 1}`);

            // Preenche o campo "ItemCompra" com o nome do item
            $(`#itemCompra___${indexLinha}`).val(descricao);

            // Preenche o campo "Quantidade" com o valor da quantidade original
            $(`#quantidade___${indexLinha}`).val(quantidadeItem);
        }

        contador++; // Incrementa para garantir que os itens estejam na ordem correta
    });

    // Limpa o campo de número de cotações após gerar a tabela
    $("#numCotacoes").val("");

}

function gerarTabelaCotacaoIndica(tabelaCotacaoIndica, tabelaItens) {
    console.log("Função gerarTabelaCotacaoIndica chamada");

    // Percorre cada linha da tabela de itens
    $(`#${tabelaItens} tbody tr`).each(function () {
        var linha = $(this);
        var descricao = linha.find("input[name^='descricao']").val();
        var quantidadeItem = linha.find("input[name^='quantidadeItem']").val();
        
        console.log("Descrição:", descricao, "Quantidade:", quantidadeItem);
        
        // Verifica se o item está preenchido antes de adicionar à tabela de cotações
        if (!descricao || !quantidadeItem) {
            console.warn(`Item ignorado por falta de dados.`);
            return; // Se não houver nome ou quantidade, pula esta linha
        }

        // **Verifica se o item já foi adicionado**
        var jaExiste = false;
        $(`#${tabelaCotacaoIndica} tbody tr`).each(function () {
            var descricaoExistente = $(this).find("input[name^='itemCompraIndica']").val();
            if (descricaoExistente === descricao) {
                jaExiste = true;
            }
        });

        if (jaExiste) {
            console.warn(`Item já existe na tabela: ${descricao}`);
            return; // Evita duplicação
        }

        // Adiciona uma nova linha na tabela de cotações
        var indexLinha = wdkAddChild(tabelaCotacaoIndica);
        console.log(`Adicionando linha - ${descricao}, Qtd: ${quantidadeItem}`);

        // Preenche os campos
        $(`#itemCompraIndica___${indexLinha}`).val(descricao);
        $(`#quantidadeIndica___${indexLinha}`).val(quantidadeItem);
    });
}

$(document).ready(function () {
    function formatarNumero(valor) {
        let numero = parseFloat(valor);
        if (isNaN(numero)) return "";
        return numero.toFixed(2); // Mantém duas casas decimais com ponto
    }

    function formatarMoeda(valor) {
        let numero = parseFloat(valor);
        if (isNaN(numero)) return "";
        return numero.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    function calcularTotal() {
        let total = 0;
        $("input[id^='precoIndica___']").each(function () {
            let preco = $(this).val().replace(",", "."); // garante que vírgula seja interpretada como ponto
            let quantidade = $(this).closest("tr").find("input[id^='quantidadeIndica___']").val().trim();

            let precoNumero = parseFloat(preco) || 0;
            let quantidadeNumero = parseInt(quantidade) || 1;

            total += precoNumero * quantidadeNumero;
        });

        $("#valorTotal").val(formatarMoeda(total)); // Exibe o total formatado
        $("#valorTotalsemformat").val(total.toFixed(2)); // Mantém o total sem formatação
    }

    // Permite digitação livre e só calcula o total
    $(document).on("input", "input[id^='precoIndica___']", function () {
        calcularTotal();
    });

    // Formata o valor somente ao sair do campo
    $(document).on("blur", "input[id^='precoIndica___']", function () {
        let campo = $(this);
        let valor = campo.val().replace(/[^0-9.,]/g, "").replace(",", ".");

        if (valor) {
            let numero = parseFloat(valor).toFixed(2);
            campo.val(numero);
        } else {
            campo.val("");
        }
        calcularTotal();
    });

    $(document).on("input", "input[id^='quantidadeIndica___']", function () {
        calcularTotal(); // Recalcula o total sempre que a quantidade for alterada
    });

    calcularTotal(); // Calcula o total ao carregar a página
});

/**
 * Toda a lógica para o correto funcionamento desse componente foi feito em cima das classes abaixo:
 * .componentAnexo, .descAnexo, .inputAnexo, .btnUpFile, .btnViewerFile, .btnDownloadFile e o atributo data-acao
 * Sem elas o código não irá funcionar, então se por acaso você quiser alterar os nomes dessas classes
 * lembre-se de alterar nas funções desse arquivo e também no css
 */
 
/**
 * Direciona para cada função correspondente ao valor que esta no atributo data-acao do botão
 * @param {object} event Parâmetro obrigatório, o própio elemento que sofreu o evento click
 * @return {void}
 * @author Sérgio Machado
 */
function anexo(event){
    console.log("event")
    console.log(event)
    try{
        const acao = event.currentTarget.getAttribute("data-acao");
        const inputFile = $(event.currentTarget).parent().parent().find(".inputAnexo")[0]
        const fileDescription = $(event.currentTarget).parent().parent().find(".descAnexo").val()
        if(acao == "upload"){
            uploadFile(fileDescription, inputFile.id)
        }
        if(acao == "viewer"){
            viewerFile(fileDescription)
        }
        if(acao == "download"){
            downloadFile(fileDescription, inputFile.id)
        }
        if(acao == "delete"){
            removeFileConfirm(fileDescription, inputFile.id)
        }
    }catch(e){
        console.error("Houve um erro inesperado na função anexo")
        console.error(e)
    }
}
 
 
/**
 * Envia arquivos para a aba Anexos do Fluig
 * Função adaptada por Sérgio Machado
 * @param {String} fileDescription Parâmetro obrigatório, Descrição do arquivo que ficará na aba anexos do Fluig
 * @param {String} idInput Parâmetro obrigatório, Id do campo em que o nome do arquivo fisico é gravado
 * @return {void}
 */
function uploadFile(fileDescription, idInput) {
    try{
        var tabAttachments = parent.document.getElementById("tab-attachments");
        if (tabAttachments) {
            //Verifica se o navegador é o Ie9 para realizar o devido tratamento
            if (parent.WCMAPI.isIe9()) {
                $(".ecm-navigation-silverlight", parent.document).show("fade").css("top", 0);
                $("#ecm-navigation-silverlight", parent.document).attr({
                    "data-on-camera": "true", "data-file-name-camera": fileDescription, "data-inputNameFile": idInput
                });
                $(parent.document).on("keyup", this.actionKeyup)
            } else {
                var element = parent.document.getElementById("ecm-navigation-inputFile-clone");
                if (element && document.createEvent) {
                    element.setAttribute("data-on-camera", "true");
                    if (fileDescription && idInput) {
                        element.setAttribute("data-file-name-camera", fileDescription)
                        element.setAttribute("data-inputNameFile", idInput)
                    }
                    //Realiza o click no botão "Carregar arquivos" que tem na aba de anexos
                    element.click();
                }
            }
        }
    }catch(e){
        console.error("Houve um erro inesperado na função uploadFile")
        console.error(e)
    }
}
 
 
 
/**
 * Função executada após a escolha do arquivo a ser enviado para o Fluig.
 * Verifica se o anexo já existe, seta o valor do arquivo fisico no campo e altera o estado dos botões
 * @return {void}
 */
$(function(){
    try{
        window.parent.$("#ecm-navigation-inputFile-clone").on('change', function(e) {
        const inputNameFile = this.getAttribute("data-inputNameFile");
        const fileDescription = this.getAttribute("data-file-name-camera");
        const filePhisical = this.files[0].name;
        if(fileDescription && fileDescription){
            /**
             * O trecho de código abaixo percorre os anexos do Fluig e caso já exista um anexo com a mesma descrição, ele será removido.
             * Em seguida limpa o campo onde é armazenado o nome fisico do arquivo
             */
            $.each(parent.ECM.attachmentTable.getData(), function(i, attachment) {
                var descricao = attachment.description;
                if (fileDescription == descricao) {
                    parent.WKFViewAttachment.removeAttach([i]);
                    setFilePhisicalName(inputNameFile, "");
                }
            });
            setFilePhisicalName(inputNameFile, filePhisical)
            if(getFormMode() == "ADD"){
                btnState(inputNameFile, 'delete', 'download');
            }
            if(getFormMode() == "MOD"){
                btnState(inputNameFile, 'delete', 'viewer');
            }
            if(getFormMode() == "VIEW"){
                btnState(inputNameFile, 'download', 'viewer');
            }
        }
    });
    }catch(e){
        console.error("Houve um erro inesperado ao selecionar o arquivo")
        console.error(e)
    }
});
 
 
/**
 * Visualizar arquivos que esta na aba Anexos do Fluig
 * @param {String} fileDescription Parâmetro obrigatório, Descrição do anexo
 * @return {void}
 */
function viewerFile(fileDescription) {
    try{
        if(hasFileFluig(fileDescription)){
            const anexos = parent.ECM.attachmentTable.getData();
            for(let i = 0; i < anexos.length; i++){
                var descricao = anexos[i].description;
                if (fileDescription == descricao) {
                    parent.WKFViewAttachment.openAttachmentView('adm', anexos[i].documentId);
                    return
                }
            }
        }else{
            FLUIGC.toast({
                title: "Atenção",
                message: "Anexo não encontrado",
                type: "warning"
            });
        }
    }catch(e){
        console.error("Houve um erro inesperado na função viewerFile")
        console.error(e)
    }
}
 
 
/**
 * Realiza o download do arquivo que esta na aba Anexos do Fluig
 * @param {String} idInput Parâmetro obrigatório, Id do campo em que o nome do arquivo fisico é gravado
 * @param {String} fileDescription Parâmetro obrigatório, Descrição do arquivo que esta na aba anexos do Fluig
 * @return {void}
 */
function downloadFile(fileDescription, idInput) {
    try{
        const filename = getFormMode() == "VIEW" ? $(`#${idInput}`).text() : $(`#${idInput}`).val()
        FLUIGC.message.confirm({
            message: `Deseja baixar o anexo <b>${filename}</b>?`,
            title: 'Confirmação',
            labelYes: 'Sim, quero baixar',
            labelNo: 'Não, quero cancelar',
        }, function(result) {
            if (result) {
                $.each(parent.ECM.attachmentTable.getData(), function(i, attachment) {
                    var descricao = attachment.description;
                    if (fileDescription == descricao) {
                        parent.WKFViewAttachment.downloadAttach([i]);
                    }
                });
            }
        });
    }catch(e){
        console.error("Houve um erro inesperado na função downloadFile")
        console.error(e)
    }
}
 
/**
 * Confirmação para Remove arquivo que esta na aba Anexos do Fluig
 * @param {String} idInput Parâmetro obrigatório, Id do campo em que o nome do arquivo fisico é gravado
 * @param {String} fileDescription Parâmetro obrigatório, Descrição do arquivo que esta na aba anexos do Fluig
 * @return {void}
 * @author Sérgio Machado
 */
function removeFileConfirm(fileDescription, idInput) {
    try{
        const filename = $(`#${idInput}`).val()
        FLUIGC.message.confirm({
            message: `Deseja remover o anexo <b>${filename}</b>?`,
            title: 'Confirmação',
            labelYes: 'Sim, quero remover',
            labelNo: 'Não, quero cancelar',
        }, function(result) {
            if (result) {
                removeFile(fileDescription)
                setFilePhisicalName(idInput, "")
                btnState(idInput, "upload", "download")
            }
        });
    }catch(e){
        console.error("Houve um erro inesperado na função removeFileConfirm")
        console.error(e)
    }
}
 
/**
 * Remove arquivo que esta na aba Anexos do Fluig
 * @param {String} fileDescription Parâmetro obrigatório, Descrição do arquivo que esta na aba anexos do Fluig
 * @return {void}
 * @author Sérgio Machado
 */
function removeFile(fileDescription) {
    try{
        $.each(parent.ECM.attachmentTable.getData(), function(i, attachment) {
            if (attachment.description == fileDescription) {
                parent.WKFViewAttachment.removeAttach([i]);
            }
        });
    }catch(e){
        console.error("Houve um erro inesperado na função removeFile")
        console.error(e)
    }
}
 
 
/**
 * Seta o nome do arquivo fisico no campo e realiza tratativa caso o campo esteja bloqueado pelo enableFields
 * @param {String} idInput Parâmetro obrigatório, Id do campo em que o nome do arquivo fisico é gravado
 * @param {String} filePhisical Parâmetro obrigatório, nome do arquivo fisico
 * @return {void}
 * @author Sérgio Machado
 */
function setFilePhisicalName(idInput, filePhisical){
    try{
        if(idInput.indexOf("_") == 0){
            $("#" + idInput.substring(1)).val(filePhisical);
        }
        $("#" + idInput).val(filePhisical);
    }catch(e){
        console.error("Houve um erro inesperado na função setFilePhisicalName")
        console.error(e)
    }
}
 
 
/**
 * Altera o estado e visibilidade dos botões de anexos
 * @param {String} idInput Parâmetro obrigatório, Id do campo em que o nome do arquivo fisico é gravado
 * @param {String} acao Parâmetro obrigatório, ação para ser executada no momento do click, se é delete ou upload
 * @param {String} btn Parâmetro obrigatório, botão secundário que deve sofrer ação de ficar visível ou não. Botão de Download ou Viewer
 * @return {void}
 * @author Sérgio Machado
 */
function btnState(idInput, acao, btn){
    try{
        let btnUpFile = $(`#${idInput}`).parent().parent().find(".btnUpFile");
        let btnDownloadFile = $(`#${idInput}`).parent().parent().find(".btnDownloadFile");
        let btnViewerFile = $(`#${idInput}`).parent().parent().find(".btnViewerFile");
        if(acao == "delete"){
            btnUpFile.removeClass("btn-success").addClass("btn-danger");
            btnUpFile.attr({'data-acao': acao, 'title': 'Excluir'});
            btnUpFile.find("i").removeClass("fluigicon-file-upload").addClass("fluigicon-trash");
            if(btn == "download"){
                btnDownloadFile.prop("disabled", false);
                btnDownloadFile.show()
            }
            if(btn == "viewer"){
                btnViewerFile.prop("disabled", false);
                btnViewerFile.show()
            }
        }
        if(acao == "upload"){
            btnUpFile.removeClass("btn-danger").addClass("btn-success");
            btnUpFile.attr({'data-acao': acao, 'title': 'Selecionar'});
            btnUpFile.find("i").removeClass("fluigicon-trash").addClass("fluigicon-file-upload");
            btnDownloadFile.prop("disabled", true);
            btnDownloadFile.hide()
            btnViewerFile.prop("disabled", true);
            btnViewerFile.hide()
        }
    }catch(e){
        console.error("Houve um erro inesperado na função btnState")
        console.error(e)
    }
}
 
 
/**
 * Faz tratativa nos botões do anexos percorrente cada class .componentAnexo
 * Em modo de visualização o botão de upload é removido, e caso tenha anexo, habilita o botão de visualização do anexo
 * Se em modo de edição e conter anexo o botão de upload é alterado para o botão de deletar anexos e habilita o botão de visualização
 * @return {void}
 * @author Sérgio Machado
 */
function displayBtnFiles(){
    try{
        $('.componentAnexo').each(function(i, element) {
            let inputFile = $(element).find(".inputAnexo")
            let inputFileVew = $(element).find(".componentAnexo")
            let btnUpFile = $(element).find(".btnUpFile");
            let btnViewerFile = $(element).find(".btnViewerFile");
            let btnDownloadFile = $(element).find(".btnDownloadFile");
           
            if(getFormMode() == "VIEW"){
                btnUpFile.remove();
                if(inputFileVew.val() != ""){
                    btnViewerFile.prop("disabled", false);
                    btnViewerFile.show()
                }
            }
            if(getFormMode() == "MOD" && inputFile.val() != ""){
                btnUpFile.remove();
                // btnState(inputFile[0].id, "delete", "viewer")
                btnViewerFile.prop("disabled", false);
                btnViewerFile.show()
                btnDownloadFile.prop("disabled", false);
                btnDownloadFile.show()
            }
        });
    }catch(e){
        console.error("Houve um erro inesperado na função displayBtnFiles")
        console.error(e)
    }
}
 
 
/**
 * Remove o botão de upload/delete
 * @param {String} inputFile Parâmetro obrigatório, Id do campo
 * @return {void}
 * @author Sérgio Machado
 */
function invisibleBtnUpload(inputFile){
    try{
        if(getFormMode() == "MOD" || getFormMode() == "VIEW"){
            if($(`#_${inputFile}`).length){
                let btnUpFile = $(`#_${inputFile}`).parent().parent().find(".btnUpFile");
                btnUpFile.remove();
            } else{
                let btnUpFile = $(`#${inputFile}`).parent().parent().find(".btnUpFile");
                btnUpFile.remove();
            }
        }
        if($(`#_${inputFile}`).length){
            if($(`#_${inputFile}`).val() == ""){
                $(`#_${inputFile}`).attr({placeholder:"Nenhum anexo selecionado"});
            }
        } else{
            if($(`#${inputFile}`).val() == ""){
                $(`#${inputFile}`).attr({placeholder:"Nenhum anexo selecionado"});
            }
        }
    }catch(e){
        console.error("Houve um erro inesperado na função invisibleBtnUpload")
        console.error(e)
    }
}
 
 
/**
 * Verifica se os campos do anexo de uma tabela pai e filho esta preenchido,
 * caso esteja, ele verifica se o anexo esta presente na aba de anexos do Fluig
 * @param {String} tablename Parâmetro obrigatório, tablename da tabela pai e filho.
 * @param {String} idInput Parâmetro obrigatório, Id do campo de anexo que deseja verificar
 * @return {String} - Retorna string de erros caso apresente erros
 * @author Sérgio Machado
 */
function invalidFilesTable(tablename, idInput){
    try {
        let errors = "";
        const countRows = $(`[tablename='${tablename}']`).find('tbody tr').not(':first');
        for(let i = 0; i < countRows.length; i++){
            let indice = getIndice(countRows.eq(i).find("input")[0].id);
            let inputNameFile = $(`#_${idInput}___${indice}`).length ? $(`#_${idInput}___${indice}`) : $(`#${idInput}___${indice}`)
            let fileDescription = inputNameFile.parent().find(".descAnexo").val()
            if(inputNameFile.val() && !hasFileFluig(fileDescription)){
                 errors += `<li style='margin-bottom: 5px;'>O anexo <b>${inputNameFile.val()}</b> da linha <b>${i+1}</b> não foi encontrado</li>`
            }
        }
        return errors
    } catch (e) {
        console.error('Houve um erro inesperado na função invalidFileTable')
        console.error(e)
    }
}
 
/**
 * Verifica se o campo do anexo esta preenchido, caso esteja, ele verifica se o anexo esta válido
 * @param {String} idInput Parâmetro obrigatório, Id do campo em que o nome do arquivo fisico é gravado
 * @return {Boolean}
 * @author Sérgio Machado
 */
function invalidFile(idInput){
    try {
        const inputNameFile = $(`#${idInput}`).val()
        if(inputNameFile){
            if($(`#_${idInput}`).length){
                let fileDescription = $(`#_${idInput}`).parent().find(".descAnexo").val()
                return !hasFileFluig(fileDescription)
            } else{
                let fileDescription = $(`#${idInput}`).parent().find(".descAnexo").val()
                return !hasFileFluig(fileDescription)
            }
        }else{
            return false
        }
    } catch (e) {
        console.error('Houve um erro inesperado na função invalidFile')
        console.error(e)
    }
}
 
 
/**
 * Verifica se o anexo existe na aba de anexos do Fluig
 * @param {String} fileDescription Parâmetro obrigatório, Descrição do arquivo
 * @return {Boolean} - Retorna verdadeiro caso o arquivo exista
 * @author Sérgio Machado
 */
function hasFileFluig(fileDescription){
    try {
        const anexos = parent.ECM.attachmentTable.getData();
        for(let i = 0; i < anexos.length; i++){
            var descricao = anexos[i].description;
            if (fileDescription == descricao) {
                return true
            }
        }
        return false
    } catch (e) {
        console.error('Houve um erro inesperado na função hasFileFluig')
        console.error(e)
    }
}
var todosProdutos = [];
var paginaAtual = 1;
var itensPorPagina = 20;

function consultarProdutos() {
    FLUIGC.modal({
        title: 'Consulta de Produtos',
        content: '<div id="buscaProduto" style="margin-bottom:10px;">' +
                 '<input type="text" id="filtroDescricao" class="form-control" placeholder="Buscar por descrição..." onkeyup="filtrarProdutos()">' +
                 '</div>' +
                 '<div id="listaProdutos"></div>' +
                 '<div id="paginacaoProdutos" style="margin-top:10px; text-align:center;"></div>',
        id: 'modalConsultaProdutos',
        size: 'large',
        actions: [{
            'label': 'Fechar',
            'autoClose': true
        }]
    }, function(err, data) {
        if (!err) {
            carregaListaProdutos();
        }
    });
}

function carregaListaProdutos() {
    var dataset = DatasetFactory.getDataset('ProdutosTI', null, null, null);
    todosProdutos = dataset.values;
    paginaAtual = 1;
    renderizaProdutos();
}

function renderizaProdutos() {
    var filtro = $('#filtroDescricao').val() || '';
    var produtosFiltrados = todosProdutos.filter(function(produto) {
        return produto['descricao'].toLowerCase().includes(filtro.toLowerCase());
    });

    var inicio = (paginaAtual - 1) * itensPorPagina;
    var fim = inicio + itensPorPagina;
    var produtosPagina = produtosFiltrados.slice(inicio, fim);

    var html = '<table class="table table-striped">' +
               '<thead><tr><th>Código</th><th>Descrição</th><th>Ação</th></tr></thead><tbody>';

    produtosPagina.forEach(function(produto) {
        var codigo = produto['codigo'];
        var descricao = produto['descricao'];
        html += '<tr>' +
            '<td>' + $('<div>').text(codigo).html() + '</td>' +
            '<td>' + $('<div>').text(descricao).html() + '</td>' +
            '<td>' +
            '<button class="btn btn-sm btn-success btn-selecionar-produto" data-codigo="' + $('<div>').text(codigo).html() + '" data-descricao="' + $('<div>').text(descricao).html() + '">Selecionar</button>' +
            '</td>' +
            '</tr>';
    });

    html += '</tbody></table>';
    $('#listaProdutos').html(html);

    // Ativa o evento DEPOIS de montar a tabela
    $('.btn-selecionar-produto').off('click').on('click', function(e) {
        e.stopPropagation();
        var $btn = $(this);
        var codigo = $btn.attr('data-codigo');
        var descricao = $btn.attr('data-descricao');
        
        adicionarProdutoTabela(codigo, descricao);
        
        // Altera o botão para "Selecionado"
        $btn
            .removeClass('btn-success')
            .addClass('btn-secondary')
            .text('Selecionado')
            .prop('disabled', true);
    });

    renderizaPaginacao(produtosFiltrados.length);
}

function renderizaPaginacao(totalItens) {
    var totalPaginas = Math.ceil(totalItens / itensPorPagina);
    var html = '';

    if (totalPaginas > 1) {
        if (paginaAtual > 1) {
            html += '<button class="btn btn-sm btn-default" onclick="mudarPagina(' + (paginaAtual - 1) + ')">Anterior</button> ';
        }
        html += ' Página ' + paginaAtual + ' de ' + totalPaginas + ' ';
        if (paginaAtual < totalPaginas) {
            html += '<button class="btn btn-sm btn-default" onclick="mudarPagina(' + (paginaAtual + 1) + ')">Próxima</button>';
        }
    }

    $('#paginacaoProdutos').html(html);
}

function mudarPagina(novaPagina) {
    paginaAtual = novaPagina;
    renderizaProdutos();
}

function filtrarProdutos() {
    paginaAtual = 1;
    renderizaProdutos();
}

function copiarCodigo(codigo) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(codigo).then(function() {
            FLUIGC.toast({
                message: 'Código "' + codigo + '" copiado!',
                type: 'success'
            });
        }, function() {
            fallbackCopy(codigo);
        });
    } else {
        fallbackCopy(codigo);
    }
}

function fallbackCopy(codigo) {
    var tempInput = document.createElement('input');
    tempInput.value = codigo;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    FLUIGC.toast({
        message: 'Código "' + codigo + '" copiado!',
        type: 'success'
    });
}

function adicionarProdutoTabela(codigo, descricao) {
    var idx = wdkAddChild('tabelaItens');

    // Preenche o campo codigoItem
    $('#codigoItem___' + idx).val(descricao);

    // Preenche o campo zoom descricao
    $('#descricao___' + idx).val(codigo);

}

function cadastrarProduto() {
    FLUIGC.modal({
        title: 'Cadastro de Produto',
        content: '<div class="form-group">' +
                    '<label>Descrição</label>' +
                    '<input type="text" id="novoProdutoDescricao" class="form-control" placeholder="Descrição do Produto">' +
                 '</div>' +
                 '<div class="form-group">' +
                    '<label>Tipo</label>' +
                    '<input type="text" id="novoProdutoTipo" class="form-control" value="ME" readonly>' +
                 '</div>' +
                 '<div class="form-group">' +
                    '<label>Unidade de Medida</label>' +
                    '<input type="text" id="novoProdutoUM" class="form-control" value="UN" readonly>' +
                 '</div>' +
                 '<div class="form-group">' +
                    '<label>Local Padrão</label>' +
                    '<input type="text" id="novoProdutoLocPad" class="form-control" value="01" readonly>' +
                 '</div>',
        id: 'modalCadastroProduto',
        size: 'large',
        actions: [{
            'label': 'Salvar',
            'bind': 'data-salvar-produto'
        }, {
            'label': 'Cancelar',
            'autoClose': true
        }]
    }, function(err, data) {
        if (!err) {
            // Bind do botão salvar
            $('[data-salvar-produto]').on('click', function() {
                enviarProduto();
            });
        }
    });
}

function enviarProduto() {
    var descricao = $('#novoProdutoDescricao').val();
    var tipo = $('#novoProdutoTipo').val() || "ME";
    var unidade = $('#novoProdutoUM').val() || "UN";
    var localPadrao = $('#novoProdutoLocPad').val() || "01";

    if (!descricao) {
        FLUIGC.toast({
            title: 'Atenção!',
            message: 'Informe a descrição do produto.',
            type: 'warning'
        });
        return;
    }

    var dados = {
        "B1_DESC": descricao,
        "B1_TIPO": tipo,
        "B1_UM": unidade,
        "B1_LOCPAD": localPadrao
    };

    console.log("JSON montado:", JSON.stringify(dados));

    var constraints = [
        DatasetFactory.createConstraint("serviceCode", "Postprod", null, ConstraintType.MUST),
        DatasetFactory.createConstraint("endpoint", "/rest_teste/uf_mata010", null, ConstraintType.MUST),
        DatasetFactory.createConstraint("method", "post", null, ConstraintType.MUST),
        DatasetFactory.createConstraint("params", JSON.stringify(dados), null, ConstraintType.MUST)
    ];

    var ds = DatasetFactory.getDataset("dsRestPost", null, constraints, null);
    console.log("Dataset retorno:", ds);

    if (ds && ds.values && ds.values.length > 0) {
        var mensagem = ds.values[0][1];
        var erro = ds.values[0][2];

        var respostaJSON;
        try {
            respostaJSON = JSON.parse(mensagem);
        } catch (e) {
            console.warn("Não foi possível interpretar o JSON do Protheus:", e);
            respostaJSON = null;
        }

        if (respostaJSON && respostaJSON.sucesso) {
            FLUIGC.toast({
                title: 'Sucesso!',
                message: 'Produto cadastrado com sucesso! Código: ' + respostaJSON.B1_COD,
                type: 'success'
            });

            console.log("Retorno Protheus:", respostaJSON);

            // Fecha o modal após salvar
            FLUIGC.modal.hide($('#modalCadastroProduto'));

        } else {
            var msgErro = (respostaJSON && respostaJSON.mensagem) ? respostaJSON.mensagem : erro;
            FLUIGC.toast({
                title: 'Erro!',
                message: 'Falha ao cadastrar: ' + msgErro,
                type: 'danger'
            });
            console.error("Erro Protheus:", msgErro);
        }
    } else {
        FLUIGC.toast({
            title: 'Erro!',
            message: 'Nenhuma resposta do dataset.',
            type: 'danger'
        });
        console.error("Dataset vazio:", ds);
    }

}
