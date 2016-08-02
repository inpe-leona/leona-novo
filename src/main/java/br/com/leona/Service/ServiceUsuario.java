package br.com.leona.Service;

import br.com.leona.Dao.DaoUsuario;
import br.com.leona.Model.Usuario;
import java.io.Serializable;
import java.util.List;
import java.util.Properties;
import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import org.esfinge.querybuilder.QueryBuilder;

public class ServiceUsuario implements Serializable {

    DaoUsuario daoUsuario = QueryBuilder.create(DaoUsuario.class);

    public Boolean cadastrarUsuario(Usuario usuario) {
        usuario.setStatus("Inativo");
        usuario.setTipo("Comum");
        usuario.setSenha(usuario.getSenha()); //criptrografar
        daoUsuario.save(usuario);
        return true;
    }

    public Usuario buscarUsuarioEmail(String email) {
        List<Usuario> listUsuario = daoUsuario.getUsuarioByEmail(email);
        if (listUsuario.isEmpty()) {
            return null;
        } else {
            return listUsuario.get(0);
        }

    }

    public Usuario logarUsuario(Usuario login) {
        List<Usuario> listUsuario = daoUsuario.getUsuarioByEmailAndSenha(login.getEmail(), login.getSenha());
        if (listUsuario.isEmpty()) {
            return null;
        } else {
            return listUsuario.get(0);
        }
    }

    public List<Usuario> buscarUsuarios() {
        return daoUsuario.list();
    }

    public Boolean mudarStatusUsuario(String email) {
        List<Usuario> listUser = daoUsuario.getUsuarioByEmail(email);
        if (listUser.isEmpty()) {
            return false;
        } else {
            Usuario user = listUser.get(0);
            if (user.getStatus().equals("Ativo")) {
                user.setStatus("Inativo");
            } else {
                user.setStatus("Ativo");
            }
            daoUsuario.save(user);
            return true;
        }
    }

    public Usuario editarDadosUsuario(Usuario usuario) {
        List<Usuario> listUser = daoUsuario.getUsuarioByEmail(usuario.getEmail());
        Usuario user = listUser.get(0);
        user.setCidade(usuario.getCidade());
        user.setInstituicao(usuario.getInstituicao());
        user.setNome(usuario.getNome());
        user.setSobrenome(usuario.getSobrenome());
        user.setPais(usuario.getPais());
        return daoUsuario.save(user);
    }

    public String recuperarSenha(String email) {
        List<Usuario> listUser = daoUsuario.getUsuarioByEmail(email);
        if (listUser.isEmpty()) {
            return "E-mail não encontrado";
        } else {
            Usuario user = listUser.get(0);
            if (enviarEmail(user.getEmail(), "recuperarsenha", user.getNome(), user.getSenha())){
                return "Sua senha foi enviada para seu e-mail!";    
            }else{
                return "Erro ao enviar senha! Entre em contato pelo email redeleona@gmail.com";
            }
            
        }
    }

    private Boolean enviarEmail(String destinatário, String tipoEmail, String nome, String senha) { 
        String titulo = "";
        String mensagem = "";
        if ("recuperarsenha".equals(tipoEmail)){
            titulo = "Senha Rede Leona";
            mensagem = " Olá "+nome+"\n Sua senha é: "+senha;
        }
        
        Properties props = new Properties();
        /**
         * Parâmetros de conexão com servidor Gmail
         */
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.socketFactory.port", "465");
        props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.port", "465");

        Session session = Session.getDefaultInstance(props,
                new javax.mail.Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication("redeleona@gmail.com", "");//Colocar senha
                    }
                });

        /**
         * Ativa Debug para sessão
         */
        session.setDebug(true);

        try {

            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress("redeleona@gmail.com"));

            Address[] toUser = InternetAddress
                    .parse(destinatário);

            message.setRecipients(Message.RecipientType.TO, toUser);
            message.setSubject(titulo);
            message.setText(mensagem);
            /**
             * Método para enviar a mensagem criada
             */
            Transport.send(message);

            return true;

        } catch (MessagingException e) {
            System.out.println("Erro ao enviar email: "+e+" | Email: "+destinatário);
            return false;
        }       
    }
}
