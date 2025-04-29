package com.example.paf.service;

import com.example.paf.model.Workplan;
import com.example.paf.repository.WorkplanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WorkplanService {

    @Autowired
    private WorkplanRepository workplanRepository;

    public List<Workplan> getAllWorkplans() {
        return workplanRepository.findAll();
    }

    public Optional<Workplan> getWorkplanById(String id) {
        return workplanRepository.findById(id);
    }

    public List<Workplan> getWorkplansByUser(Long userId) {
        return workplanRepository.findByCreatedBy(userId);
    }

    public Workplan createWorkplan(Workplan workplan) {
        return workplanRepository.save(workplan);
    }

    public Optional<Workplan> updateWorkplan(String id, Workplan workplanDetails) {
        return workplanRepository.findById(id)
                .map(existingWorkplan -> {
                    existingWorkplan.setTitle(workplanDetails.getTitle());
                    existingWorkplan.setDescription(workplanDetails.getDescription());
                    existingWorkplan.setStartDate(workplanDetails.getStartDate());
                    existingWorkplan.setEndDate(workplanDetails.getEndDate());
                    existingWorkplan.setCompleted(workplanDetails.isCompleted());
                    return workplanRepository.save(existingWorkplan);
                });
    }

    public boolean deleteWorkplan(String id) {
        return workplanRepository.findById(id)
                .map(workplan -> {
                    workplanRepository.delete(workplan);
                    return true;
                })
                .orElse(false);
    }

    public List<Workplan> getCompletedWorkplans() {
        return workplanRepository.findByCompletedTrue();
    }

    public List<Workplan> getPendingWorkplans() {
        return workplanRepository.findByCompletedFalse();
    }

    public Optional<Workplan> markWorkplanAsCompleted(String id) {
        return workplanRepository.findById(id)
                .map(workplan -> {
                    workplan.setCompleted(true);
                    return workplanRepository.save(workplan);
                });
    }
}