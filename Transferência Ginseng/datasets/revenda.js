function defineStructure() {
    addColumn("codigo");
    addColumn("descricao");
}

function onSync(lastSyncDate) {}

function createDataset(fields, constraints, sortFields) {
    var dataset = DatasetBuilder.newDataset();
    var dataSource = "/jdbc/ProtheusDS"; // Nome da conexão cadastrada no Fluig
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    var conn = ds.getConnection();
    var stmt = null;
    var rs = null;

    try {
        log.info("Iniciando execução do dataset...");

        var sql = "SELECT b1_cod, b1_desc FROM sb1010 WHERE LEN(b1_cod) = 5 ";
        log.info("Query SQL: " + sql);

        stmt = conn.prepareStatement(sql);
        rs = stmt.executeQuery();

        dataset.addColumn("codigo");
        dataset.addColumn("descricao");

        var encontrados = {}; // Usando um objeto para evitar duplicação

        while (rs.next()) {
            var codigo = rs.getString("b1_cod");
            var descricao = rs.getString("b1_desc");

            if (!encontrados[codigo]) { // Verifica se já foi adicionado
                encontrados[codigo] = true; // Marca como processado
                log.info("Registro encontrado: " + codigo + " - " + descricao);
                dataset.addRow([codigo, descricao]);
            }
        }

        if (Object.keys(encontrados).length === 0) {
            log.info("Nenhum registro encontrado para a consulta.");
        }

    } catch (e) {
        log.error("Erro ao executar dataset: " + e.message);
    } finally {
        try {
            if (rs) rs.close();
            if (stmt) stmt.close();
            if (conn) conn.close();
        } catch (e) {
            log.error("Erro ao fechar recursos: " + e.message);
        }
    }

    return dataset;
}

function onMobileSync(user) {}
