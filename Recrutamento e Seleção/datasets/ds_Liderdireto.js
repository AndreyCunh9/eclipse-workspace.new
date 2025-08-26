function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
    var dataset = DatasetBuilder.newDataset();

    // Definir as colunas
    dataset.addColumn("codigoCentroCusto");
    dataset.addColumn("centroCusto");
    dataset.addColumn("gestorCentroCusto");
    dataset.addColumn("emailGestor");
    dataset.addColumn("id");
    dataset.addColumn("idGestor"); // Aqui será armazenada a matrícula do gestor

    // Lista dos centros de custo
    var dados = [
        ["41101", "Comercial", "Analanny Magalhães", "analanny.magalhaes@grupoginseng.com.br", "1"],
        ["41101", "Comercial BA", "Arianne Sodre", "arianne.sodre@grupoginseng.com.br", "2"],
        ["41101", "Comercial SE", "Iolanda Bezerra", "iolanda.bezerra@grupoginseng.com.br", "3"],
        ["41101", "Comercial AL", "Raquel Tenório", "raquel.tenorio@grupoginseng.com.br", "4"],
        ["51101", "Diretoria e Gestão", "João Marcelo", "joao.loureiro@grupoginseng.com.br", "5"],
        ["51102", "Operações", "Diogo Demetrio", "diogo.martins@grupoginseng.com.br", "6"],
        ["51103", "Controladoria", "Ariklenyo Nascimento", "ari.nascimento@grupoginseng.com.br", "7"],
        ["51104", "Compliance", "Marla Palma", "marla.palma@grupoginseng.com.br", "8"],
        ["51107", "Administrativo", "Lucila Brandão", "lucila.brandao@grupoginseng.com.br", "9"],
        ["51110", "Gente e Cultura", "Francine Peiter", "francine.silva@grupoginseng.com.br", "10"],
        ["51113", "TI", "Igor Oliveira", "igor.oliveira@grupoginseng.com.br", "11"],
        ["51114", "Projetos e Performance", "Lucas Rocha", "lucas.rocha@grupoginseng.com.br", "12"],
        ["41101", "Treinamento", "Analanny Magalhães", "analanny.magalhaes@grupoginseng.com.br", "13"],
        ["41101", "Marketing", "Analanny Magalhães", "analanny.magalhaes@grupoginseng.com.br", "14"]

    ];

    // Buscar matrícula do gestor no dataset "colleague"
    function getMatricula(gestorNome) {
        var c1 = DatasetFactory.createConstraint("colleagueName", gestorNome, gestorNome, ConstraintType.MUST);
        var dsUser = DatasetFactory.getDataset("colleague", ["colleagueId"], [c1], null);
        return dsUser.rowsCount > 0 ? dsUser.getValue(0, "colleagueId") : "";
    }

    // Percorrer a lista e adicionar ao dataset
    for (var i = 0; i < dados.length; i++) {
        var matricula = getMatricula(dados[i][2]); // Obtém a matrícula do gestor
        dataset.addRow([dados[i][0], dados[i][1], dados[i][2], dados[i][3], dados[i][4], matricula]);
    }

    return dataset;
}

function onMobileSync(user) {

}