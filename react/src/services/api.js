import axios from 'axios'
const api = axios.create({
    baseURL:'https://devstoreisnf.herokuapp.com/'
});


export default class Api{

  async listar(){
  let r = await api.get('/produto')
  return r.data;
  } 

  async inserir(nomep,categoriap,precode,precopor,avaliacao,dsproduto,qtdestoque,imgproduto,btativo,dtinclusao){
      let r = await api.post('/produto', {nm_produto:nomep, ds_categoria:categoriap, vl_preco_de:precode,vl_preco_por:precopor, vl_avaliacao:avaliacao, ds_produto: dsproduto, qtd_estoque:qtdestoque,img_produto: imgproduto,bt_ativo:btativo,dt_inclusao:dtinclusao});
      return r.data;
  } 

  async alterar(id,nome,categoria,precode,precopor,avaliacao,dsproduto,qtdestoque,imgproduto,btativo,dtinclusao){
    let r = await api.put('/produto/' + id, {nm_produto:nome, ds_categoria:categoria, vl_preco_de:precode,vl_preco_por:precopor, vl_avaliacao:avaliacao, ds_produto: dsproduto, qtd_estoque:qtdestoque, img_produto: imgproduto, bt_ativo:btativo, dt_inclusao:dtinclusao   })
    return r.data;
  }

  async deletar(id){
      let r = await api.delete('/produto/' + id);
      return r.data;
  }
}