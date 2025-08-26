<div id="MyWidget_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="MyWidget.instance()">
<div class="cards-container">
  <div class="card-widget" onclick="location.href='${(params.urlCadastroProdutos!'#/cadastro-produtos')}'">
    <#-- Use imagem OU ícone -->
    <#if (params.usaIcones!'N') == 'S'>
      <i class="fluigicon fluigicon-box fluigicon-3x"></i>
    <#else>
      <img src="${(params.iconCadastroProdutos!'/resources/images/cards/produtos.png')}" alt="Cadastro de Produtos">
    </#if>
    <h3>Cadastro de Produtos</h3>
    <p>Adicione e gerencie produtos de maneira centralizada.</p>
  </div>

  <div class="card-widget" onclick="location.href='${(params.urlSolicitacao!'#/solicitacao-compras')}'">
    <#if (params.usaIcones!'N') == 'S'>
      <i class="fluigicon fluigicon-cart fluigicon-3x"></i>
    <#else>
      <img src="${(params.iconSolicitacao!'/resources/images/cards/solicitacao.png')}" alt="Solicitação de Compras">
    </#if>
    <h3>Solicitação de Compras</h3>
    <p>Faça suas solicitações de compra de forma rápida e eficiente.</p>
  </div>

  <div class="card-widget" onclick="location.href='${(params.urlCotacoes!'#/cotacoes')}'">
    <#if (params.usaIcones!'N') == 'S'>
      <i class="fluigicon fluigicon-handshake fluigicon-3x"></i>
    <#else>
      <img src="${(params.iconCotacoes!'/resources/images/cards/cotacoes.png')}" alt="Cotações">
    </#if>
    <h3>Cotações</h3>
    <p>Compare orçamentos e encontre as melhores ofertas.</p>
  </div>

  <div class="card-widget" onclick="location.href='${(params.urlPedidos!'#/pedidos-compras')}'">
    <#if (params.usaIcones!'N') == 'S'>
      <i class="fluigicon fluigicon-checked fluigicon-3x"></i>
    <#else>
      <img src="${(params.iconPedidos!'/resources/images/cards/pedidos.png')}" alt="Pedidos de Compras">
    </#if>
    <h3>Pedidos de Compras</h3>
    <p>Acompanhe e confirme seus pedidos.</p>
  </div>

  <div class="card-widget" onclick="location.href='${(params.urlNotas!'#/notas-fiscais')}'">
    <#if (params.usaIcones!'N') == 'S'>
      <i class="fluigicon fluigicon-doc fluigicon-3x"></i>
    <#else>
      <img src="${(params.iconNotas!'/resources/images/cards/notas.png')}" alt="Notas Fiscais">
    </#if>
    <h3>Notas Fiscais</h3>
    <p>Simplifique o processo de entrada de notas.</p>
  </div>

  <div class="card-widget" onclick="location.href='${(params.urlParametros!'#/parametros')}'">
    <#if (params.usaIcones!'N') == 'S'>
      <i class="fluigicon fluigicon-config fluigicon-3x"></i>
    <#else>
      <img src="${(params.iconParametros!'/resources/images/cards/parametros.png')}" alt="Parâmetros">
    </#if>
    <h3>Parâmetros</h3>
    <p>Personalize suas configurações.</p>
  </div>
</div>
<link rel="stylesheet" type="text/css" href="/webdesk/widget/cards-compras/resources/css/style.css">


</div>

