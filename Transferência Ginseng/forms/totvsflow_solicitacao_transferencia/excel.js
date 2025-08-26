function carregarItensDoExcel(fileInputId) {
    const file = document.getElementById(fileInputId).files[0];
    if (!file) {
        FLUIGC.toast({ title: 'Erro', message: 'Nenhum arquivo selecionado.', type: 'danger' });
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const linhas = XLSX.utils.sheet_to_json(sheet);

        // Limpa a tabela (sem usar form)
        const indices = $("input[id^='codigoItem___']").map(function() {
            return $(this).attr("id").split("___")[1];
        }).get();
        indices.forEach(idx => fnWdkRemoveChild(idx));

        // Adiciona os itens da planilha
        linhas.forEach(item => {
            const idx = wdkAddChild('tabelaItens');
            window[`descricao___${idx}`].setValue(item.codigoItem);

            // $(`#codigoItem___${idx}`).val(item.codigoItem);
            $(`#quantidadeItem___${idx}`).val(item.quantidadeItem);
            $(`#codigoItem___${idx}`).val(item.descricao);
        });

        FLUIGC.toast({ title: 'Sucesso', message: 'Itens carregados com sucesso!', type: 'success' });
    };

    reader.readAsArrayBuffer(file);
}
