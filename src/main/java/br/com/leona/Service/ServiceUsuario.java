package br.com.leona.Service;

import br.com.leona.Dao.DaoUsuario;
import br.com.leona.Model.Usuario;
import java.io.Serializable;
import java.util.List;
import org.esfinge.querybuilder.QueryBuilder;

public class ServiceUsuario implements Serializable{
    
    DaoUsuario daoUser = QueryBuilder.create(DaoUsuario.class);
    
    public Boolean cadastrarUsuario(Usuario usuario){
        usuario.setStatus("Inativo");
        usuario.setTipo("Comum");
        usuario.setSenha(usuario.getSenha()); //criptrografar
        daoUser.save(usuario);
        return true;
    }          
         
    public Usuario buscarUsuarioEmail(String email){
        List<Usuario> listUsuario = daoUser.getUsuarioByEmail(email);
        if (listUsuario.isEmpty()){
            return null;    
        }else{
            return listUsuario.get(0);
        }
        
    }
}
