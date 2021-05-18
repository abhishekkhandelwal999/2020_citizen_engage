package models;

import play.db.jpa.JPAApi;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.xml.soap.Name;
import java.util.List;
import java.util.concurrent.CompletionStage;
import java.util.function.Function;
import java.util.stream.Stream;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;
import java.lang.Exception;
import javax.persistence.NoResultException;

import static java.util.concurrent.CompletableFuture.supplyAsync;

/**
 * Provide JPA operations running inside of a thread pool sized to the connection pool
 */
public class JPAWardRepository implements WardRepository {

    private final JPAApi jpaApi;
    private final DatabaseExecutionContext executionContext;

    @Inject
    public JPAWardRepository(JPAApi jpaApi, DatabaseExecutionContext executionContext) {
        this.jpaApi = jpaApi;
        this.executionContext = executionContext;
    }


    @Override
    public CompletionStage<Ward> login(String Wardname,String Password) {
        return supplyAsync(() -> wrap(em -> log(em,Wardname,Password)), executionContext);
    }



    private <T> T wrap(Function<EntityManager, T> function) {
        return jpaApi.withTransaction(function);
    }



    private Ward log(EntityManager em,String Wardname,String Password)
    {
        Ward ward = em.createQuery("select p from Ward p where p.Name= :Wardname and p.Password = :Password", Ward.class).setParameter("Wardname",Wardname).setParameter("Password",Password).getSingleResult();
        return ward;
    }


}
