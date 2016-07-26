package br.com.leona.Service;

import br.com.leona.Dao.DaoUsuario;
import br.com.leona.Model.Usuario;
import java.io.Serializable;
import java.util.List;
import org.esfinge.querybuilder.QueryBuilder;

public class ServiceUsuario implements Serializable {

    DaoUsuario daoUser = QueryBuilder.create(DaoUsuario.class);

    public Boolean cadastrarUsuario(Usuario usuario) {
        usuario.setStatus("Inativo");
        usuario.setTipo("Comum");
        usuario.setSenha(usuario.getSenha()); //criptrografar
        daoUser.save(usuario);
        return true;
    }

    public Usuario buscarUsuarioEmail(String email) {
        List<Usuario> listUsuario = daoUser.getUsuarioByEmail(email);
        if (listUsuario.isEmpty()) {
            return null;
        } else {
            return listUsuario.get(0);
        }

    }

    public Usuario logarUsuario(Usuario login) {
        List<Usuario> listUsuario = daoUser.getUsuarioByEmailAndSenha(login.getEmail(), login.getSenha());
        if (listUsuario.isEmpty()) {
            return null;
        } else {
            return listUsuario.get(0);
        }
    }

    public List<Usuario> buscarUsuarios() {
        return daoUser.list();
    }

    public Boolean mudarStatusUsuario(String email) {
        List<Usuario> listUser = daoUser.getUsuarioByEmail(email);
        if (listUser.isEmpty()) {
            return false;
        } else {
            Usuario user = listUser.get(0);
            if (user.getStatus().equals("Ativo")) {
                user.setStatus("Inativo");
            } else {
                user.setStatus("Ativo");
            }
            daoUser.save(user);
            return true;
        }
    }

    public Usuario editarDadosUsuario(Usuario usuario) {
        List<Usuario> listUser = daoUser.getUsuarioByEmail(usuario.getEmail());
        Usuario user = listUser.get(0);
        user.setCidade(usuario.getCidade());
        user.setInstituicao(usuario.getInstituicao());
        user.setNome(usuario.getNome());
        user.setSobrenome(usuario.getSobrenome());
        user.setPais(usuario.getPais());
        return daoUser.save(user);
    }
}
