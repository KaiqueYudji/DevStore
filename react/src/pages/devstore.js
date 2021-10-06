import './dev.css'

import LoadingBar from 'react-top-loading-bar'
import {useRef} from 'react';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Api from "../services/api"
import { useState, useEffect } from 'react';
const api = new Api();


export default function Devjs(){
    const[produtos, SetProdutos] = useState([])

    const[idalterando,setIdAlterando] = useState(0)
    const[nomep,setNomep] = useState('')
    const[categoriap,setCategoriap] = useState('')
    const[precode,setPrecode] = useState(0)
    const[precopor,setPrecopor] = useState(0)
    const[avaliacao,setAvaliacao] = useState(0)
    const[dsproduto,setDsproduto] = useState('')
    const[qtdestoque,setQtdEstoque] = useState(0)
    const[imgproduto,setImgProduto] = useState('')
    const[btativo] = useState(true)
    const[dtinclusao] = useState(new Date())

    const loading = useRef(null);
    
    async function listar(){
        let r = await api.listar();
       SetProdutos(r)
    }

    useEffect(() =>{
        listar();
    },[])
   

    async function inserir(){
        loading.current.continuousStart();
            if(idalterando === 0){
                 let i =  await api.inserir(nomep,categoriap,precode,precopor,avaliacao,dsproduto,qtdestoque,imgproduto,btativo,dtinclusao);
                 if(i.erro){
                     toast.error(i.erro)
                 }else{
                    toast('⭐ Produto casdastrado!');
                 }
        }else{

            let i = await api.alterar(idalterando,nomep,categoriap,precode,precopor,avaliacao,dsproduto,qtdestoque,imgproduto,btativo,dtinclusao);
            if(i.erro){
                toast.error(i.erro)
            }else{
                toast('⭐ Produto alterado!');
            }
           
            loading.current.complete();
            setIdAlterando(0)
        }
        loading.current.complete();
        listar()
        limpar()
        
        
    }
   
    async function remover(id){
        confirmAlert({
            title: 'Remover Produto',
            message: `Tem certeza que deseja remover o Produto ${id} ?`,
            buttons: [
                {
                    label:'Sim',
                    onClick: async () =>{
                        let r = await api.deletar(id);
                        if(r.erro)
                        toast.error(`${r.erro}`);
                        else{
                            toast('💕 Produto removido!');
                            listar();
                        }
                    }
                },
                {
                    label:'Não'
                }
            ]
        });
       
    }

    
    async function editar(item){
        setNomep(item.nm_produto)
        setCategoriap(item.ds_categoria)
        setPrecode(item.vl_preco_de)
        setPrecopor(item.vl_preco_por)
        setAvaliacao(item.vl_avaliacao)
        setDsproduto(item.ds_produto)
        setQtdEstoque(item.qtd_estoque)
        setImgProduto(item.img_produto)

        setIdAlterando(item.id_produto)
    }

    async function limpar(){
        setNomep('')
        setCategoriap('')
        setPrecode('')
        setPrecopor('')
        setAvaliacao('')
        setDsproduto('')
        setQtdEstoque('')
        setImgProduto('')
    }




    return(
        <div className="container">
          <ToastContainer />
          <LoadingBar color="#119FDC" ref={loading} />
            <div className="ladoesquerdo">

                <div className="cabecalho-le"> <img src="/assets/images/Vector (5).png" alt=""/> <div className="palavra-cabeca"><b>Dev</b>Store</div> </div>
               
                <div className="espaco-preto"></div>
               
                <div className="ultparte-cab">
                    <div className="ger"> Gerenciamento <div className="seta"> <img src="/assets/images/Vector (4).png" alt=""/></div> </div>
                    <div className="alunos"> <div className="barrinha"></div>Alunos </div>    
                 </div> 

            </div>


            <div className="ladodireito">
                <div className="cabecalho-ld">
                  <div className="cima">
                    <div className="lado-usu">
                        <div className="foto"><img src="/assets/images/Ellipse.png" alt=""/> <div className="bolinha">3</div> <div className="name-usu"> Olá, Bruno Oliveira </div> </div>
                    </div>

                    <div className="lado-botao">
                        <div className="bot1"><button><img src="/assets/images/Vector (2).png" alt=""/></button></div>
                        <div className="bot2"><button><img src="/assets/images/sair.svg" alt=""/></button></div>
                    </div>
                  </div>
                  <hr/>
                 </div>

                   <div className="conteudo-ld">
                    <div className="form">
                        <div className="titulo-form">
                            <div className="barrona"></div>
                            <div className="texto"> { idalterando === 0 ?"Novo Produto" :"Alterando Produto " + idalterando} </div>
                        </div>

                      <div className="tudin">
                        <div className="inputs">
                         <div className="container-f1">

                            <div className="bloco1">
                               <label for="nome"> <b>Nome:</b> </label>
                               <input className="nome-b1" name="nome" type="text" value={nomep} onChange={ e => setNomep(e.target.value)} />
                            </div>

                            <div className="bloco">
                               <label for="chamada"> <b>Categoria:</b> </label>
                               <input className="nome-b1" name="chamada" type="text" value={categoriap} onChange={ e => setCategoriap(e.target.value)} />
                            </div>

                            <div className="bloco">
                               <label for="chamada"> <b>Avaliação:</b> </label>
                               <input className="nome-b1" name="chamada" type="text" value={avaliacao} onChange={ e => setAvaliacao(e.target.value)} />
                            </div>
                          </div>

                      <div className="container-f2">

                        <div className="bloco3">
                               <label for="curso"> <b>Preço DE:</b> </label>
                               <input className="nome-b1" name="curso" type="text" value={precode} onChange={ e => setPrecode(e.target.value)}  />
                            </div>

                            <div className="bloco">
                               <label for="turma"> <b>Preço POR:</b> </label>
                               <input className="nome-b1" name="turma" type="text" value={precopor} onChange={ e => setPrecopor(e.target.value)} />
                            </div>

                            <div className="blocoe">
                               <label for="turma"> <b>Estoque:</b> </label>
                               <input className="nome-b1" name="turma" type="text" value={qtdestoque} onChange={ e => setQtdEstoque(e.target.value)} />
                            </div>
                        </div>

                        
                     </div>

                     
                     <div className="blocod">
                       <label for="chamada"> <b>Link imagem:</b> </label>
                        <input className="nome-b1" name="chamada" type="text" value={imgproduto} onChange={ e => setImgProduto(e.target.value)} />
                    </div>


                    <div className="ooi">
                    <div className="blocodd">
                       <label className="textinhoo" for="chamada"> <b>Descrição:</b> </label>
                        <input className="nome-b1" name="chamada" type="text" value={dsproduto} onChange={ e => setDsproduto(e.target.value)} />
                    </div>

                      <button onClick={inserir} className="cadastrar"> { idalterando === 0 ?"Cadastrar" :"Alterar Produto"} </button>
                  
                    </div>
                       

                  </div> 

                    </div>

                 <div className="tabela">
                  <div className="titulo-tb">
                            <div className="barrona"></div>
                            <div className="texto"> Produtos Cadastrados </div>
                        </div>
                        <table class ="table-user">
                    <thead>
                        <tr>
                            <th class="img"> </th>
                            <th > ID </th>
                            <th> Produto </th>
                            <th> Categoria </th>
                            <th> Preço</th>
                            <th> Estoque </th>
                            <th className="a"> </th>
                            <th className="a"> </th>
                        </tr>
                    </thead>
            
                    <tbody>

                    {produtos.map((item, i )=>
                    
                        <tr className={i %2 === 0 ?"linha-alternada" :""} >
                            <td> <img style={{height:'3em', width:'3em'}} src={item.img_produto} alt="img-produto"/> </td>
                            <td> {item.id_produto} </td>
                            <td title={item.nm_produto.length >= 25 ?item.nm_produto :''}> { item.nm_produto != null && item.nm_produto.length >=25 ?item.nm_produto.substr(0,25) + '...' :item.nm_produto } </td>
                            <td> {item.ds_categoria} </td>
                            <td> {item.vl_preco_por} </td>
                            <td > {item.qtd_estoque} </td>
                            <td className="aa"><button onClick={() =>{editar(item)}}><img src="/assets/images/edit.svg" alt="" /> </button>  </td>
                            <td className="aa"><button onClick={() =>{remover(item.id_produto)}}><img src="/assets/images/del.svg" alt="" /> </button>   </td>
                        </tr>
                    )}


                        
                    </tbody> 

                </table>
          

                </div>
              </div>

            </div>







        </div>
    )
}