import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import Swal from 'sweetalert2'

export default function List() {

    const [supports, setSupports] = useState([])

    useEffect(()=>{
        fetchSupports() 
    },[])

    const fetchSupports= async () => {
        await axios.get(`http://localhost:8000/api/supports`).then(({data})=>{
            setSupports(data)
        })
    }

    const deleteSupport = async (id) => {
        const isConfirm = await Swal.fire({
            title: 'Você realmente deseja excluir esse item?',
            text: "Você não pode reverter essa ação!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Excluir Agora!'
          }).then((result) => {
            return result.isConfirmed
          });

          if(!isConfirm){
            return;
          }

          await axios.delete(`http://localhost:8000/api/supports/${id}`).then(({data})=>{
            Swal.fire({
                icon:"success",
                text:data.message
            })
            fetchSupports()
          }).catch(({response:{data}})=>{
            Swal.fire({
                text:data.message,
                icon:"error"
            })
          })
    }

    return (
      <div className="container">
          <div className="row">
            <div className='col-12'>
                <Link className='btn btn-primary mb-2 float-end' to={"/support/create"}>
                    Criar Suporte
                </Link>
            </div>
            <div className="col-12">
                <div className="card card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered mb-0 text-center">
                            <thead>
                                <tr>
                                    <th>Titulo</th>
                                    <th>Descrição</th>
                                    <th>Foto de Referência</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    supports.length > 0 && (
                                        supports.map((row, key)=>(
                                            <tr key={key}>
                                                <td>{row.title}</td>
                                                <td>{row.description}</td>
                                                <td>
                                                    <img width="50px" src={`http://localhost:8000/storage/support/image/${row.image}`} />
                                                </td>
                                                <td>
                                                    <Link to={`/support/edit/${row.id}`} className='btn btn-success me-2'>
                                                        Editar
                                                    </Link>
                                                    <Button variant="danger" onClick={()=>deleteSupport(row.id)}>
                                                        Excluir
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
          </div>
      </div>
    )
}