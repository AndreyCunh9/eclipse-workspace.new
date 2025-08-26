function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	
	var dataset = DatasetBuilder.newDataset();
	  
	  dataset.addColumn("nomeOcorrencia");

	  // Adicione dados para o dataset, exemplo:
	  dataset.addRow(["Rádio Parada"]);
	  dataset.addRow(["Câmera Parada"]);
	  dataset.addRow(["Organização do Rack"]);
	  dataset.addRow(["PDV Não Liga"]);
	  dataset.addRow(["PDV Vencido"]);
	  dataset.addRow(["PDV Lento"]);
	  dataset.addRow(["Adquirir PDV"]);
	  dataset.addRow(["Ativar PDV"]);
	  dataset.addRow(["Computador de ER parado"]);
	  dataset.addRow(["Nobreak Apitando"]);
	  dataset.addRow(["Nobreak Não liga"]);
	  dataset.addRow(["Manutenção Periódica do Nobreak"]);
	  dataset.addRow(["Impressora 4200"]);
	  dataset.addRow(["Impressora 5100"]);
	  dataset.addRow(["Impressora Brother HL-L5102DW"]);
	  dataset.addRow(["Impressora sem imprimir"]);
	  dataset.addRow(["Mobshop Parado"]);
	  dataset.addRow(["Mobpin Parado"]);
	  dataset.addRow(["Ativar Mobshop"]);
	  dataset.addRow(["Trocar Mobshop"]);
	  dataset.addRow(["Solicitar Equipamentos"]);
	  dataset.addRow(["Entregar Equipamentos"]);
	  dataset.addRow(["Solicitar chip"]);
	  dataset.addRow(["Email sem acesso"]);
	  dataset.addRow(["Internet sem funcionar"]);
	  dataset.addRow(["Resgatar Imagens"]);
	  dataset.addRow(["Internet"]);
	  dataset.addRow(["Outros"]);
	  dataset.addRow(["Criar Email de colaborador"]);
	  dataset.addRow(["Acesso a VPN"]);
	  dataset.addRow(["Acesso as Pastas da Rede"]);
	  dataset.addRow(["Protheus"]);
	  dataset.addRow(["Instalação de Desktop"]);
	  dataset.addRow(["Instalação de Equipamentos"]);
	  dataset.addRow(["Instalação Câmera"]);
	  dataset.addRow(["Instalação de Impressora"]);
	  dataset.addRow(["Configuração de RB"]);





	  return dataset;
	}

function onMobileSync(user) {

}