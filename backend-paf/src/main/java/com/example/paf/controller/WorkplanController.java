package com.example.paf.controller;

import com.example.paf.model.Workplan;
import com.example.paf.service.WorkplanService;
import com.example.paf.repository.WorkplanRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workplans")
public class WorkplanController {

    @Autowired
    private WorkplanService workplanService;

    // Get all workplans
    @GetMapping
    public ResponseEntity<List<Workplan>> getAllWorkplans() {
        List<Workplan> workplans = workplanService.getAllWorkplans();
        return new ResponseEntity<>(workplans, HttpStatus.OK);
    }

    // Get workplan by ID
    @GetMapping("/{id}")
    public ResponseEntity<Workplan> getWorkplanById(@PathVariable String id) {
        return workplanService.getWorkplanById(id)
                .map(workplan -> new ResponseEntity<>(workplan, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Get workplans by user ID
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Workplan>> getWorkplansByUser(@PathVariable Long userId) {
        List<Workplan> workplans = workplanService.getWorkplansByUser(userId);
        return new ResponseEntity<>(workplans, HttpStatus.OK);
    }

    // Create a new workplan
    @PostMapping
    public ResponseEntity<Workplan> createWorkplan(@RequestBody Workplan workplan) {
        Workplan newWorkplan = workplanService.createWorkplan(workplan);
        return new ResponseEntity<>(newWorkplan, HttpStatus.CREATED);
    }

    // Update a workplan
    @PutMapping("/{id}")
    public ResponseEntity<Workplan> updateWorkplan(@PathVariable String id, @RequestBody Workplan workplan) {
        return workplanService.updateWorkplan(id, workplan)
                .map(updatedWorkplan -> new ResponseEntity<>(updatedWorkplan, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Delete a workplan
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWorkplan(@PathVariable String id) {
        if (workplanService.deleteWorkplan(id)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Get completed workplans
    @GetMapping("/completed")
    public ResponseEntity<List<Workplan>> getCompletedWorkplans() {
        List<Workplan> workplans = workplanService.getCompletedWorkplans();
        return new ResponseEntity<>(workplans, HttpStatus.OK);
    }

    // Get pending workplans
    @GetMapping("/pending")
    public ResponseEntity<List<Workplan>> getPendingWorkplans() {
        List<Workplan> workplans = workplanService.getPendingWorkplans();
        return new ResponseEntity<>(workplans, HttpStatus.OK);
    }

    // Mark a workplan as completed
    @PatchMapping("/{id}/complete")
    public ResponseEntity<Workplan> markWorkplanAsCompleted(@PathVariable String id) {
        return workplanService.markWorkplanAsCompleted(id)
                .map(updatedWorkplan -> new ResponseEntity<>(updatedWorkplan, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
