package com.protonest.taskmanager.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import com.protonest.taskmanager.model.Task;
import com.protonest.taskmanager.model.TaskPriority;
import com.protonest.taskmanager.model.TaskStatus;
import com.protonest.taskmanager.service.TaskService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping
    public Task createTask(@Valid@RequestBody Task task) {
        return taskService.createTask(task);
    }

    @GetMapping
    public List<Task> getTasks() {
        return taskService.getTasks();
    }
    ///

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
    }

    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task task) {
        return taskService.updateTask(id, task);
    }

    @GetMapping("/page")
    public Page<Task> getTasksPage(
            @RequestParam int page,
            @RequestParam int size) {

        return taskService.getTasks(page, size);
    }

    @GetMapping("/sort")
    public List<Task> getTasksSorted(
            @RequestParam String field) {

        return taskService.getTasksSorted(field);

    }

    @GetMapping("/filter")
public List<Task> filterTasks(
        @RequestParam(required = false) TaskStatus status,
        @RequestParam(required = false) TaskPriority priority) {

    return taskService.filterTasks(status, priority);
}
@PutMapping("/{id}/complete")
public Task completeTask(@PathVariable Long id) {
    return taskService.markCompleted(id);
}
}