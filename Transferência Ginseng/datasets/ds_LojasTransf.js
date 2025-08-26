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
        ["3546", "LJ HIPER FAROL - (CARREFOUR)", "3546 Ginseng", "3546@grupoginseng.com.br", "1"],
        ["4560", "LJ MACEIÓ SHOPPING TERREO", "4560 Ginseng", "4560@grupoginseng.com.br", "2"],
        ["5699", "LJ MOREIRA LIMA", "5699 Ginseng", "5699@grupoginseng.com.br", "3", "5699"],
        ["12522", "LJ MACEIÓ SHOPPING EXPANSÃO", "12522 Ginseng", "12522@grupoginseng.com.br", "4"],
        ["12817", "LJ SHOPPING PÁTIO", "12817 Ginseng", "12817@grupoginseng.com.br", "5"],
        ["12818", "LJ GBARBOSA SERRARIA", "12818 Ginseng", "12818@grupoginseng.com.br", "6"],
        ["12820", "LJ MÁRIO DE GUSMÃO(ATACADO)", "12820 Ginseng", "12820@grupoginseng.com.br", "7"],
        ["12823", "LJ PONTA VERDE", "12823 Ginseng", "12823@grupoginseng.com.br", "8"],
        ["12824", "LJ GBARBOSA TABULEIRO", "12824 Ginseng", "12824@grupoginseng.com.br", "9"],
        ["12826", "LJ HIPER JATIÚCA (ASSAÍ)", "12826 Ginseng", "12826@grupoginseng.com.br", "10"],
        ["12828", "LJ GBARBOSA S.MARIS", "12828 Ginseng", "12828@grupoginseng.com.br", "11"],
        ["12829", "LJ JACINTINHO", "12829 Ginseng", "12829@grupoginseng.com.br", "12"],
        ["12830", "LJ LIVRAMENTO", "12830 Ginseng", "12830@grupoginseng.com.br", "13"],
        ["12838", "LJ RIO LARGO", "12838 Ginseng", "12838@grupoginseng.com.br", "14"],
        ["13427", "LJ SHOPPING CIDADE", "13427 Ginseng", "13427@grupoginseng.com.br", "15"],
        ["14617", "LJ PARQUE SHOPPING", "14617 Ginseng", "14617@grupoginseng.com.br", "16"],
        ["14668", "LJ HIPER ANTARES", "14668 Ginseng", "14668@grupoginseng.com.br", "17"],
        ["19103", "LJ UNICOMPRA PONTA VERDE", "19103 Ginseng", "19103@grupoginseng.com.br", "18"],
        ["20858", "LJ SUPER GIRO", "20858 Ginseng", "20858@grupoginseng.com.br", "19"],
        ["20969", "HIB MARECHAL DEODORO", "20969 Ginseng", "20969@grupoginseng.com.br", "20"],
        ["20991", "HIB CAMPO ALEGRE", "20991 Ginseng", "20991@grupoginseng.com.br", "21"],
        ["20996", "ER ANTARES", "20996 Ginseng", "20996@grupoginseng.com.br", "22"],
        ["20997", "ER PITANGUINHA", "20997 Ginseng", "20997@grupoginseng.com.br", "23"],
        ["20998", "CD SERRARIA", "20998 Ginseng", "20998@grupoginseng.com.br", "24"],
        ["21007", "TÔ QUE TÔ MACEIÓ CENTRO", "21007 Ginseng", "21007@grupoginseng.com.br", "25"],
        ["21624", "LJ MIX MATEUS", "21624 Ginseng", "21624@grupoginseng.com.br", "27"],
        ["21647", "LJ CARAJÁS", "21647 Ginseng", "21647@grupoginseng.com.br", "28"],
        ["22541", "ER RIO LARGO", "22541 Ginseng", "22541@grupoginseng.com.br", "29"],
        ["910173", "QDB PARQUE SHOPPING", "910173 Ginseng", "910173@grupoginseng.com.br", "30"],
        ["910291", "QDB MACEIO SHOPPING", "910291 Ginseng", "910291@grupoginseng.com.br", "31"]
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