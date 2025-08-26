function defineStructure() {
	addColumn("codigo");
    addColumn("nome");

}
function onSync(lastSyncDate) {

}
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

        var sql = "SELECT a2_cod, a2_nome FROM SA2010 where D_E_L_E_T_ = '';"
        log.info("Query SQL: " + sql);

        stmt = conn.prepareStatement(sql);
        rs = stmt.executeQuery();

        dataset.addColumn("codigo");
        dataset.addColumn("nome");

        var encontrouResultados = false;
        while (rs.next()) {
            encontrouResultados = true;
            log.info("Registro encontrado: " + rs.getString("a2_cod") + " - " + rs.getString("a2_nome"));
            dataset.addRow([rs.getString("a2_cod"), rs.getString("a2_nome")]);
        }

        if (!encontrouResultados) {
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

function onMobileSync(user) {

}