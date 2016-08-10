package br.com.leona.Service;

import br.com.leona.Dao.DaoLogObservacao;
import br.com.leona.Model.LogObservacao;
import java.io.Serializable;
import java.io.StringReader;
import java.util.Iterator;
import java.util.List;
import javax.json.Json;
import javax.json.JsonObject;
import org.esfinge.querybuilder.QueryBuilder;

public class ServiceLogObservacao implements Serializable {

    DaoLogObservacao daoLogObs = QueryBuilder.create(DaoLogObservacao.class);
    private LogObservacao log;
    
    public ServiceLogObservacao(){
        this.log = new LogObservacao();
    }
    
    public void salvarAcaoObs(String data) {
        JsonObject jsonObject = Json.createReader(new StringReader(data)).readObject();
        log.setDataHora(jsonObject.getString("datahora"));
        log.setEmailUsuario(jsonObject.getString("emailusuario"));
        log.setGraus(jsonObject.getString("graus"));
        log.setIdObservacao(jsonObject.getInt("idobservacao"));
        log.setMovimento(jsonObject.getString("movimento"));     
        log.setUsuario(jsonObject.getString("usuario"));
        
        daoLogObs.save(log);
    }
    
    public List<LogObservacao> retornarLogObs(int obs){
        List<LogObservacao> listObs = daoLogObs.list();        
        for(LogObservacao log : listObs){
            if (log.getIdObservacao()!=obs){
                listObs.remove(log);
            }
        }            
        return listObs;
    }
}
