$(document).ready(function () {
    if ($("#formMode").val() == "VIEW") {
        showAndBlock(["all"]);
        $(".ratingAction").hide();
        if ($("input[name=situacaoResolvida]:checked").val() == "sim") {
          $(".ratingAction").show();
        }
        let ratingValue;
        if ($("#ratingValue").val() == "" || $("#ratingValue").val() == 0) {
          ratingValue = 0;
        } else {
          ratingValue = $("#ratingValue").val();
        }
        let html = "";
        for (let i = 0; i < 5; i++) {
          if (i < ratingValue) {
            html +=
              '<i class="flaticon flaticon-star-active icon-md" aria-hidden="true"></i>';
          } else {
            html +=
              '<i class="flaticon flaticon-star icon-md" aria-hidden="true"></i>';
          }
        }
        console.log(html);
        $(".minha-avaliacao").html(html);
    } else {
        //show the right fields
        var activity = $("#activity").val();
        var requestDate = getCurrentDate();
        var ratingStars;
        var servicoNaoValidado =
            $("input[name=situacaoResolvida]:checked").val() == "nao";

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
            $("#userValidacao").val($("#currentUserName").val());
            $("#dataUserValidacao").val(
                requestDate[0] + " - " + requestDate[1]
            );
            if ($("#justificativaDecisaoGestor").val() == "") {
                $(".justificativa-activity-4").hide();
            }
            if ($("#justificativaDecisaoCompras").val() == "") {
                $(".justificativa-activity-6").hide();
            }
            showAndBlock([0, 4, 6, 31, 24, 18]);

            let ratingValue;
            if ($("#ratingValue").val() == "" || $("#ratingValue").val() == 0) {
                ratingValue = 0;
            } else {
                ratingValue = $("#ratingValue").val();
            }
            ratingStars = FLUIGC.stars(".minha-avaliacao", {
                stars: 5,
                value: ratingValue,
                sizeClass: "icon-md",
            });
            ratingStars.on("click", (obj) => {
                let countCurrentRating = 0;
                $(".fluigicon-star").each(() => {
                    countCurrentRating++;
                });
                $("#ratingValue").val(countCurrentRating);
            });
            $("input[name=consegueResolver]").on("change", function () {
                $(".consegueResolverMotivo").hide();
                if ($(`input[name=${$(this).attr("name")}]:checked`).val() == "nao")
                    $(".consegueResolverMotivo").show();
            });
            $("input[name=consegueResolver]").trigger("change");

            $("input[name=situacaoResolvida]").on("change", function () {
                $(".explainAction, .ratingAction").hide();
                if ($("input[name=situacaoResolvida]:checked").val() == "nao") {
                    $(".explainAction").show();
                } else if (
                    $("input[name=situacaoResolvida]:checked").val() == "sim"
                ) {
                $(".ratingAction").show();
            }
            });
            $("input[name=situacaoResolvida]").trigger("change");
            
            updt_line();

        } else if (activity == 31) {
            $("#userRealizacaoCompras").val($("#currentUserName").val());
            $("#dataRealizacaoCompras").val(
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
        } else if (activity == 18) {
            if ($("justificativaValidaProblema") != "") {
                showAndBlock([0, 4, 6, 24, 31]);
            } else {
                showAndBlock([0, 4, 6, 31]);
            }
            $("#userValidacaofunc").val($("#currentUserName").val());
            $("#dataValidacaofunc").val(requestDate[0] + " - " + requestDate[1]);

            if ($("#justificativaDecisaoGestor").val() == "") {
               $(".justificativa-activity-4").hide();
            } 
            if ($("#justificativaDecisaoCompras").val() == "") {
                $(".justificativa-activity-6").hide();
            }
            if ($("#consideracoesCompras").val() == "") {
                $(".justificativa-activity-31").hide();
            }

            $("input[name=validacaoFunc]").on("change", function () {
                $(".justificativaDecisaoFunc").hide();
                if (
                    $("input[name=validacaoFunc]:checked").val() == "incorreto" ||
                    $("input[name=validacaoFunc]:checked").val() == "naoEntregue"
                ) {
                    $(".justificativaDecisaoFunc").show();
                }
            });
            $("input[name=validacaoFunc]").trigger("change");

            updt_line();
        } else if (activity == 24) {
            showAndBlock([0, 4, 6, 31]);
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
            updt_line();
        } else if (activity == 114) {
            showAndBlock([0, 4, 6, 31, 24, 57, 18]);
            $("#userValidacaoCorre").val($("#currentUserName").val());
            $("#dataValidacaoCorre").val(requestDate[0] + " - " + requestDate[1]);
            
            if ($("#justificativaDecisaoGestor").val() == "") {
               $(".justificativa-activity-4").hide();
            } 
            if ($("#justificativaDecisaoCompras").val() == "") {
                $(".justificativa-activity-6").hide();
            }
            if ($("#consideracoesCompras").val() == "") {
                $(".justificativa-activity-31").hide();
            }

            $("input[name=validacaoCorre]").on("change", function () {
                $(".justificativaDecisaoCorre").hide();
                if (
                    $("input[name=validacaoCorre]:checked").val() == "entregue" ||
                    $("input[name=validacaoCorre]:checked").val() == "naoEntregue"
                ) {
                    $(".justificativaDecisaoCorre").show();
                }
            });
            $("input[name=validacaoCorre]").trigger("change");

            updt_line();
        }
    }
    
});



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
        } else if ($("#complemento").val() == "") {
            $("#complemento").parent("div").addClass("errorValidate");
            throw "'Complemento' é obrigatório.";
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
        }
    } else if (numState == 4) {
        //
    } else if (numState == 6) {
        //
    } else if (numState == 18) {
        $('#justificativaValidaProblema').parent().removeClass('has-error errorValidate');
        if ($('#justificativaValidaProblema').val() == "") {
            $('#justificativaValidaProblema').parent().addClass('has-error errorValidate');
            throw "Preencha os campos obrigatórios."
        }

    } else if (numState == 24) {

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
    }
};

function setSelectedZoomItem(selectedItem) {
    console.log("Campo selecionado:", name_item);
    var name_item = selectedItem.inputId;
    var ehItem = name_item.indexOf("___") >= 0;
	var indice = "";
	if (ehItem){
		var valores = name_item.split("___");
		name_item = valores[0];
		indice = valores[1];
	}

    var dtsCentroCusto = DatasetFactory.getDataset(
        "ds_Liderdireto",
        null,
        null,
        null
    ).values;

    var nomeGestorComercialBA = dtsCentroCusto[1].gestorCentroCusto;
    var emailGestorComercialBA = dtsCentroCusto[1].emailGestor;
    var idGestorComercialBA = dtsCentroCusto[1].idGestor;

    var nomeGestorComercialSE = dtsCentroCusto[2].gestorCentroCusto;
    var emailGestorComercialSE = dtsCentroCusto[2].emailGestor;
    var idGestorComercialSE = dtsCentroCusto[2].idGestor;

    var nomeGestorComercialAL = dtsCentroCusto[3].gestorCentroCusto;
    var emailGestorComercialAL = dtsCentroCusto[3].emailGestor;
    var idGestorComercialAL = dtsCentroCusto[3].idGestor;


    if (name_item == "estabelecimento") {
        let estabelecimento = selectedItem["estabelecimento"];
        let estado = selectedItem["estado"];
        $("#estado").val(estado);

        // Só executa a lógica do centro de custo se não for "Escritório"
        if (estabelecimento !== "ESCRITÓRIO MATRIZ") {
            // Executa manualmente a lógica do estado aqui
            if (estado.includes("AL")) {
                window["centroCusto"].setValue("Comercial AL");
                $("#gestorNome").val(nomeGestorComercialAL);
                $("#gestorEmail").val(emailGestorComercialAL);
                $("#gestor_cc").val(idGestorComercialAL);
            } else if (estado.includes("SE")) {
                window["centroCusto"].setValue("Comercial SE");
                $("#gestorNome").val(nomeGestorComercialSE);
                $("#gestorEmail").val(emailGestorComercialSE);
                $("#gestor_cc").val(idGestorComercialSE);
            } else if (estado.includes("BA")) {
                window["centroCusto"].setValue("Comercial BA");
                $("#gestorNome").val(nomeGestorComercialBA);
                $("#gestorEmail").val(emailGestorComercialBA);
                $("#gestor_cc").val(idGestorComercialBA);
            }
        }   
    }
    if (name_item == "centroCusto") {
        $("#gestorNome").val(selectedItem["gestorCentroCusto"]);
        $("#gestorEmail").val(selectedItem["emailGestor"]);
        $("#gestor_cc").val(selectedItem["idGestor"]);
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


function gerarTabelaCotacaoComNumeracao(tabelarecrutamento) {
  wdkAddChild(tabelarecrutamento);
}


function removeLinhaComAnexo(event) {
    fnWdkRemoveChild(event);
}


