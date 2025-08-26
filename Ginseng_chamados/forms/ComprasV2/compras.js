// ======== DATASETS (troque aqui se o id for diferente) ========
const DS_EMPRESAS = 'dsSyscompany';
const DS_FILIAIS  = 'dsFiliais';        // se o seu for outro, troque aqui
const DS_CC       = 'ds_centroCusto';
const DS_PRODUTOS = 'ProdutoTI';        // se o id for "ProdutosTI", troque aqui

// ======== MAPEAMENTO DE CAMPOS (ajuste se seus datasets usam nomes diferentes) ========
// Empresas / Filiais / Centro de Custo
const EMP_FIELDS = { code: 'codigo', desc: 'descricao' };
const FIL_FIELDS = { code: 'codigo', desc: 'descricao' };
const CC_FIELDS  = { code: 'codigo', desc: 'descricao' };

// Produtos (inclui alternativas típicas do Protheus)
const PROD_FIELDS = {
  code:      ['codigo','B1_COD','CODIGO'],
  desc:      ['descricao','B1_DESC','DESCRICAO'],
  um:        ['um','B1_UM','UM'],
  lastPrice: ['ultimoPreco','ULTIMO_PRECO','ULT_PRECO','ULTIMOPRECO']
};

// ======== INIT ========
$(document).ready(function () {
  FLUIGC.calendar('#dataNec');

  // qty/preço
  $('#precoRef').on('blur', recalcTotal);
  $('#quantidade').on('input', recalcTotal);
  $('#qtdMais').on('click', () => stepQtd(1));
  $('#qtdMenos').on('click', () => stepQtd(-1));

  // produto
  $('#btnBuscaProd').on('click', openZoomProduto);
  $('#btnLimpaProd').on('click', () => {
    $('#produtoCod,#produtoDesc').val('');
    $('#ultimoPreco').val('0,00');
    recalcTotal();
  });

  // zooms
  bindZoom($('#empresaDesc'), DS_EMPRESAS, EMP_FIELDS, 'empresaCodigo','empresaDesc');
  bindZoom($('#filialDesc'),  DS_FILIAIS,  FIL_FIELDS, 'filialCodigo','filialDesc');
  bindZoom($('#ccDesc'),      DS_CC,       CC_FIELDS,  'ccCod','ccDesc');

  // itens
  $('#btnAddItem').on('click', addItem);
});

// ======== HELPERS ========
function stepQtd(n){
  const $q = $('#quantidade');
  let v = parseInt($q.val()||'0',10)+n;
  if (v < 0) v = 0;
  $q.val(v);
  recalcTotal();
}

function parseMoneyBR(s){
  if(!s) return 0;
  s = (''+s).replace(/[^\d,,-]/g,'').replace(/\./g,'').replace(',', '.');
  const v = Number(s);
  return isNaN(v) ? 0 : v;
}
function formatMoneyBR(v){
  return v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
}
function recalcTotal(){
  const qtd   = parseFloat($('#quantidade').val()||'0');
  const preco = parseMoneyBR($('#precoRef').val());
  const tot   = (qtd * preco) || 0;
  $('#total').val(formatMoneyBR(tot));
}

// Compat: usa filtermodal OU filterModal, dependendo da versão do SG
function openFilterModalCompat(opts){
  var fn = (FLUIGC && (FLUIGC.filtermodal || FLUIGC.filterModal));
  if (!fn) {
    FLUIGC.toast({
      title: 'Erro: ',
      message: 'Plugin de filtro (filtermodal) não está carregado. Verifique os includes do Style Guide.',
      type: 'danger'
    });
    return { onSelected: function(){} };
  }
  return fn(opts);
}

// pega a primeira chave existente no item
function pick(obj, keys){
  if (!Array.isArray(keys)) return obj[keys];
  for (const k of keys) if (obj[k] !== undefined && obj[k] !== null) return obj[k];
  return '';
}
function firstKey(keys){ return Array.isArray(keys) ? keys[0] : keys; }

// ======== ZOOMS GENÉRICOS (empresa, filial, centro de custo) ========
function bindZoom($input, datasetId, fieldsMap, hiddenIdFld, displayFld){
  const codeK = fieldsMap.code, descK = fieldsMap.desc;

  $input.on('click', function(){
    openFilterModalCompat({
      title: 'Selecionar',
      size: 'large',
      filterFields: codeK + ', ' + descK,
      source: {
        url: '/api/public/ecm/dataset/search',
        contentType: 'application/json',
        root: 'content',
        limit: 50,
        pattern: '',
        param: { datasetId: datasetId }
      },
      columns: [
        { title: 'Código',    data: codeK },
        { title: 'Descrição', data: descK }
      ],
      onSelected: function(data){
        $('#'+hiddenIdFld).val(data[codeK]);
        $('#'+displayFld).val(data[codeK] + ' - ' + data[descK]);
      }
    });
  });
}

// ======== ZOOM DE PRODUTO ========
function openZoomProduto(){
  openFilterModalCompat({
    title: 'Buscar Produto/Serviço',
    size: 'large',
    filterFields: firstKey(PROD_FIELDS.code) + ', ' + firstKey(PROD_FIELDS.desc),
    source: {
      url: '/api/public/ecm/dataset/search',
      contentType: 'application/json',
      root: 'content',
      limit: 50,
      param:{ datasetId: DS_PRODUTOS }
    },
    columns: [
      { title: 'Código',       data: firstKey(PROD_FIELDS.code) },
      { title: 'Descrição',    data: firstKey(PROD_FIELDS.desc) },
      { title: 'UM',           data: firstKey(PROD_FIELDS.um) },
      { title: 'Último Preço', data: firstKey(PROD_FIELDS.lastPrice) }
    ],
    onSelected: function(item){
      const cod  = pick(item, PROD_FIELDS.code);
      const desc = pick(item, PROD_FIELDS.desc);
      const ult  = pick(item, PROD_FIELDS.lastPrice);

      $('#produtoCod').val(cod);
      $('#produtoDesc').val(cod + ' - ' + desc);
      $('#ultimoPreco').val(ult || '0,00');
      recalcTotal();
    }
  });
}

// ======== ITENS (tabela filha) ========
function addItem(){
  if(!$('#produtoCod').val()){
    FLUIGC.toast({title:'Atenção: ', message:'Selecione um produto.', type:'warning'}); return;
  }
  if(!$('#ccCod').val()){
    FLUIGC.toast({title:'Atenção: ', message:'Selecione o centro de custo.', type:'warning'}); return;
  }
  const qtd = parseFloat($('#quantidade').val()||'0');
  if(qtd <= 0){
    FLUIGC.toast({title:'Atenção: ', message:'Quantidade deve ser > 0.', type:'warning'}); return;
  }

  const row = wdkAddChild('tbItens');
  $('#produtoCod___'+row).val($('#produtoCod').val());
  $('#produtoDesc___'+row).val($('#produtoDesc').val());
  $('#ccCod___'+row).val($('#ccCod').val());
  $('#ccDesc___'+row).val($('#ccDesc').val());
  $('#qtd___'+row).val(qtd);
  $('#precoRef___'+row).val($('#precoRef').val());
  $('#total___'+row).val($('#total').val());
}

// ======== VALIDAÇÃO (se usar o hook validateForm) ========
function validateForm(form){
  var msgs = [];
  function req(id, label){ if(!form.getValue(id)) msgs.push('Preencha "'+label+'".'); }
  req('tipoSolicitacao','Tipo de Solicitação');
  req('produtoCod','Produto/Serviço');
  req('quantidade','Quantidade');
  req('dataNec','Data da Necessidade');
  req('ccCod','Centro de Custo');
  if(msgs.length){ throw msgs.join('\n'); }
}

function setSelectedZoomItem(selectedItem) {
    var name_item = selectedItem.inputId;
    var ehItem = name_item.indexOf("___") >= 0;
	  var indice = "";
    if (ehItem){
      var valores = name_item.split("___");
      name_item = valores[0];
      indice = valores[1];
    }

    if (name_item == "estabelecimento") 
      { $("#filialDesc").val(selectedItem["CODIGO"]); }
}
