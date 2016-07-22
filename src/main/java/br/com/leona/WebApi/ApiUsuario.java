package br.com.leona.WebApi;

import br.com.leona.Model.Usuario;
import br.com.leona.Service.ServiceUsuario;
import br.com.leona.Validation.ValidationUsuario;
import com.google.gson.Gson;
import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.json.JSONObject;

@Path("/usuario")
public class ApiUsuario {
    
    private ValidationUsuario validationUsuario;
    private ServiceUsuario serviceUsuario;
    Gson gs = new Gson(); 
    
    public ApiUsuario(){
        this.validationUsuario = new ValidationUsuario();    
        this.serviceUsuario = new ServiceUsuario();
    }
    
    @POST
    @Path("/logarUsuario")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response logarUsuario(String data){     
        Usuario login = gs.fromJson(data,Usuario.class);
        String validaLogin = validationUsuario.validarLoginUsuario(login);
        if (!validaLogin.equals("")){
            return Response.status(201).entity("{\"status\":\"1\",\"resposta\":\""+validaLogin+"\"}").build(); 
        }else{
            Usuario usuario = serviceUsuario.logarUsuario(login);
            if (usuario==null){
                return Response.status(201).entity("{\"status\":\"1\",\"resposta\":\"E-mail/Senha não encontrados\"}").build(); 
            }else{
                return Response.status(201).entity("{\"status\":\"0\",\"resposta\":\"ok\"}").build(); 
            }
        }
    }
    
    @POST
    @Path("/cadastrarUsuario")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response cadastrarUsuario(String data){            
        Usuario usuario = gs.fromJson(data,Usuario.class);
        String respostaValidation = validationUsuario.validarCadastroUsuario(usuario);
        if (!respostaValidation.equals("")){
            return Response.status(201).entity("{\"status\":\"1\",\"resposta\":\""+respostaValidation+"\"}").build(); 
        }else{
            if (serviceUsuario.buscarUsuarioEmail(usuario.getEmail())!=null){
                return Response.status(201).entity("{\"status\":\"1\",\"resposta\":\"E-mail já está cadastrado\"}").build(); 
            }else{
                serviceUsuario.cadastrarUsuario(usuario);
                return Response.status(201).entity("{\"status\":\"0\",\"resposta\":\"Sucesso\"}").build(); 
            }            
        }        
    }
    
    @GET
    @Path("/buscarUsuarios")
     @Consumes(MediaType.APPLICATION_JSON)
    public Response buscarUsuarios(){
        List<Usuario> listUsuarios = serviceUsuario.buscarUsuarios();          
        String listU = gs.toJson(listUsuarios);
        return Response.status(201).entity(listU).build(); 
    }
    
}
