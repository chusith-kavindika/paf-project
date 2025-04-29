package com.example.paf.repository;

import com.example.paf.model.Workplan;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkplanRepository extends MongoRepository<Workplan, String> {
    List<Workplan> findByCreatedBy(Long userId);
    List<Workplan> findByCompletedTrue();
    List<Workplan> findByCompletedFalse();
}
