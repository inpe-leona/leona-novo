package br.com.leona.Validation;

import br.com.leona.Model.Usuario;

public class ValidationUsuario {

    public String validarCadastroUsuario(Usuario usuario) {        
        if (usuario.getNome().equals("")||usuario.getSobrenome().equals("")||usuario.getEmail().equals("")||usuario.getSenha().equals("")){
            return "Todos Campos são Obrigatórios";
        }else{
            if (!usuario.getEmail().contains("@")){
                return "Campo e-mail está incorreto";
            }else{
                if (usuario.getSenha().length()<6){
                    return "Senha deve conter mais de 6 caracteres";
                }else{
                    return "";
                }                
            }                
        }        
    }
    
}
