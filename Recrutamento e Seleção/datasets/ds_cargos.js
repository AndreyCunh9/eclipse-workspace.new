function defineStructure() {
    addColumn("codigo");
    addColumn("descricao");
}

function onSync(lastSyncDate) {}

function createDataset(fields, constraints, sortFields) {
    var dataset = DatasetBuilder.newDataset();
    var dataSource = "/jdbc/ProtheusDSs"; // Nome da conexão cadastrada no Fluig
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    var conn = ds.getConnection();
    var stmt = null;
    var rs = null;

    try {
        log.info("Iniciando execução do dataset...");

        var sql = "select C8V_CODIGO, C8V_DESCRI from C8V010 where D_E_L_E_T_= '' and C8V_FILIAL = '01'";
        log.info("Query SQL: " + sql);

        stmt = conn.prepareStatement(sql);
        rs = stmt.executeQuery();

        dataset.addColumn("codigo");
        dataset.addColumn("descricao");

        var encontrados = {}; // Usando um objeto para evitar duplicação

        while (rs.next()) {
            var codigo = rs.getString("C8V_CODIGO");
            var descricao = rs.getString("C8V_DESCRI");

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
