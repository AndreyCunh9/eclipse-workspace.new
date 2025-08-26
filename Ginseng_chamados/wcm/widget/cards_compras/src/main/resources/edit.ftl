<div id="MyWidget_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="MyWidget.instance()">
<h3>Configuração dos links dos processos</h3>

<div class="form-group">
  <label>Cadastro de Produtos</label>
  <input type="text" class="form-control" name="urlCadastroProdutos" 
         value="${(params.urlCadastroProdutos!'')}" 
         placeholder="/portal/p/1/workflowstart?processId=CadastroProdutos"/>
</div>

<div class="form-group">
  <label>Solicitação de Compras</label>
  <input type="text" class="form-control" name="urlSolicitacao" 
         value="${(params.urlSolicitacao!'')}" 
         placeholder="/portal/p/1/workflowstart?processId=SolicitacaoCompras"/>
</div>

<div class="form-group">
  <label>Cotações</label>
  <input type="text" class="form-control" name="urlCotacoes" 
         value="${(params.urlCotacoes!'')}" 
         placeholder="/portal/p/1/workflowstart?processId=Cotacoes"/>
</div>

<div class="form-group">
  <label>Pedidos de Compras</label>
  <input type="text" class="form-control" name="urlPedidos" 
         value="${(params.urlPedidos!'')}" 
         placeholder="/portal/p/1/workflowstart?processId=PedidosCompras"/>
</div>

<div class="form-group">
  <label>Notas Fiscais</label>
  <input type="text" class="form-control" name="urlNotas" 
         value="${(params.urlNotas!'')}" 
         placeholder="/portal/p/1/workflowstart?processId=NotasFiscais"/>
</div>

<div class="form-group">
  <label>Parâmetros</label>
  <input type="text" class="form-control" name="urlParametros" 
         value="${(params.urlParametros!'')}" 
         placeholder="/portal/p/1/workflowstart?processId=Parametros"/>
</div>

</div>

