package br.com.leona.WebApi;

import br.com.leona.Model.Observacao;
import br.com.leona.Service.ServiceObservacao;
import br.com.leona.Validation.ValidationObservacao;
import com.google.gson.Gson;
import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/observacao")
public class ApiObservacao {
    
    Gson gs = new Gson();
    ValidationObservacao validationObs;
    ServiceObservacao serviceObs;
    
    public ApiObservacao(){
        this.validationObs = new ValidationObservacao();
        this.serviceObs = new ServiceObservacao();
    }
    
    @POST
    @Path("/cadastrarObservacao")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response cadastrarObservacao(String data) {
        Observacao obs = gs.fromJson(data, Observacao.class);
        String verifica = validationObs.validarCadastroObservacao(obs);
        if (!verifica.equals("")){
            return Response.status(201).entity("{\"status\":\"1\",\"resposta\":\""+verifica+"\"}").build();
        }else{
            if (!serviceObs.cadastrarObservacao(obs)){
                return Response.status(201).entity("{\"status\":\"1\",\"resposta\":\"Erro! Tente novamente mais tarde\"}").build();        
            }else{
                return Response.status(201).entity("{\"status\":\"0\",\"resposta\":\"Sucesso\"}").build();        
            }
        }       
    }
    
    @GET
    @Path("/retornarObservacoesRealizadas")
    public Response retornarObservacoesRealizadas(){
        List<Observacao> listO = serviceObs.retornarObservacoes();
         String lista = gs.toJson(listO);
        return Response.status(201).entity(lista).build();   
    }
    
    @GET
    @Path("/retornarObservacoesAndamento")
    public Response retornarObservacoesAndamento(){
        return Response.status(201).entity("{\"status\":\"0\",\"resposta\":\"Sucesso\"}").build();   
    }
    
    @GET
    @Path("/retornarObservacoesFuturas")
    public Response retornarObservacoesFuturas(){
        return Response.status(201).entity("{\"status\":\"0\",\"resposta\":\"Sucesso\"}").build();   
    }
}
