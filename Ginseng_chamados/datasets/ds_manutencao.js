function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	
	var dataset = DatasetBuilder.newDataset();
	  
	  dataset.addColumn("nomeOcorrenciaManutencao");

	  // Adicione dados para o dataset, exemplo:
	  dataset.addRow(["Substituição de lâmpada AR 111"]);
	  dataset.addRow(["Reparo em fita de led ( Serviço de solda )"]);
	  dataset.addRow(["Fonte de 5ap para fita de led dos móveis"]);
	  dataset.addRow(["Letreiro sem funcionar"]);
	  dataset.addRow(["Disjuntor desarmando"]);
	  dataset.addRow(["Tomadas do caixa sem funcionar"]);
	  dataset.addRow(["Troca de lâmpadas tubular branco frio - 6500k 9w ER salão de vendas"]);
	  dataset.addRow(["Substituição lâmpada bulbo 15w estoque"]);
	  dataset.addRow(["Substituição de Painel de led 62,5x62,5 40w 6500k branco frio (ER,CD )"]);
	  dataset.addRow(["Interruptor sem funcionar"]);
	  dataset.addRow(["Painel de led 30x30 24W 6500k ( wc, copa )"]);
	  dataset.addRow(["Ponto elétrico ( Copa, estoque, pdv , vendas)"]);
	  dataset.addRow(["Visita emergencial ( Disjuntor geral desarmando )"]);
	  dataset.addRow(["Fonte de 10ap para letreiro"]);
	  dataset.addRow(["Central Nobreak 2 Contr. Motor Dc Porta Aço Enrolar Aut. 24v"]);
	  dataset.addRow(["Central 2 Contr. Motor AC Porta Aço Enrolar Aut. 24v"]);
	  dataset.addRow(["Motor De Porta De Enrolar De Aço Ac de 100 á 500 Kg 220v"]);
	  dataset.addRow(["Motor P/porta De Aço De Enrolar Dc 100 á 800 kg 220v C/ com central Nobreak"]);
	  dataset.addRow(["Manutenção preventiva em porta de enrolar automática"]);
	  dataset.addRow(["Serviço emergencial porta de enrolar não quer abrir ou descer"]);
	  dataset.addRow(["Controle para porta de enrolar automática + configuração"]);
	  dataset.addRow(["Ar-condicionado"]);
	  dataset.addRow(["Vazamento no estoque"]);
	  dataset.addRow(["Torneira gotejando ( copa,wc )"]);
	  dataset.addRow(["Vaso sanitário entupido"]);
	  dataset.addRow(["Pintura da fachada"]);
	  dataset.addRow(["Pintura do estoque"]);
	  dataset.addRow(["Pintura geral da loja"]);
	  dataset.addRow(["Caixa de gordura entupida"]);
	  dataset.addRow(["Telhado com vazamento"]);
	  dataset.addRow(["Instalação de porta copo, papel toalha etc..."]);
	  dataset.addRow(["Reparo de gesso"]);
	  dataset.addRow(["Fechadura para porta de vidro"]);
	  dataset.addRow(["Puxador da porta caindo ( vidro, retaguarda, copa etc..."]);
	  dataset.addRow(["Porta de vidro arrastando"]);
	  dataset.addRow(["Cadeira de make com defeito"]);
	  dataset.addRow(["Porta dos móveis caindo"]);
	  dataset.addRow(["Confecção de móvel ( Copa, retaguarda etc...)"]);
	  dataset.addRow(["Outros"]);
	  dataset.addRow(["Demarcações"]);

	  return dataset;
}



function onMobileSync(user) {

}