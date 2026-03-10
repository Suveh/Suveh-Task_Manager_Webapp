package com.protonest.taskmanager.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.protonest.taskmanager.model.Role;
import com.protonest.taskmanager.model.Task;
import com.protonest.taskmanager.model.TaskPriority;
import com.protonest.taskmanager.model.TaskStatus;
import com.protonest.taskmanager.model.User;
import com.protonest.taskmanager.repository.TaskRepository;
import com.protonest.taskmanager.repository.UserRepository;
@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskService(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    public Task createTask(Task task) {

    Authentication authentication = SecurityContextHolder
            .getContext()
            .getAuthentication();

    String email = authentication.getName();

    User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

    task.setUser(user);

    task.setCreatedAt(LocalDateTime.now());
    task.setUpdatedAt(LocalDateTime.now());

    return taskRepository.save(task);
}

public List<Task> getTasksSorted(String field) {

    Authentication authentication = SecurityContextHolder
            .getContext()
            .getAuthentication();

    String email = authentication.getName();

    User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

    // ADMIN → see all tasks
    if (user.getRole() == Role.ADMIN) {
        return taskRepository.findAll(Sort.by(field));
    }

    // USER → only their tasks
    return taskRepository.findByUser(user, Sort.by(field));
}

public void deleteTask(Long id) {

    Authentication authentication = SecurityContextHolder
            .getContext()
            .getAuthentication();

    String email = authentication.getName();

    User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

    Task task = taskRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Task not found"));

    if (user.getRole() == Role.ADMIN || task.getUser().getId().equals(user.getId())) {
        taskRepository.delete(task);
    } else {
        throw new RuntimeException("You cannot delete this task");
    }
}

public Task updateTask(Long id, Task updatedTask) {

    Authentication authentication = SecurityContextHolder
            .getContext()
            .getAuthentication();

    String email = authentication.getName();

    User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

    Task task = taskRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Task not found"));

    if (user.getRole() != Role.ADMIN &&
        !task.getUser().getId().equals(user.getId())) {

        throw new RuntimeException("You cannot update this task");
    }

    task.setTitle(updatedTask.getTitle());
    task.setDescription(updatedTask.getDescription());
    task.setStatus(updatedTask.getStatus());
    task.setPriority(updatedTask.getPriority());

    return taskRepository.save(task);
}

  public Page<Task> getTasks(int page, int size) {

    Authentication authentication = SecurityContextHolder
            .getContext()
            .getAuthentication();

    String email = authentication.getName();

    User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

    if (user.getRole() == Role.ADMIN) {
        return taskRepository.findAll(PageRequest.of(page, size));
    }

    return taskRepository.findByUser(user, PageRequest.of(page, size));
}

public List<Task> filterTasks(TaskStatus status, TaskPriority priority) {

    Authentication authentication = SecurityContextHolder
            .getContext()
            .getAuthentication();

    String email = authentication.getName();

    User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

    // ADMIN → can see all tasks
    if (user.getRole() == Role.ADMIN) {

        if (status != null && priority != null) {
            return taskRepository.findByStatusAndPriority(status, priority);
        }

        if (status != null) {
            return taskRepository.findByStatus(status);
        }

        if (priority != null) {
            return taskRepository.findByPriority(priority);
        }

        return taskRepository.findAll();
    }

    // USER → only their tasks

    List<Task> tasks = taskRepository.findByUser(user);

    if (status != null) {
        tasks = tasks.stream()
                .filter(t -> t.getStatus() == status)
                .toList();
    }

    if (priority != null) {
        tasks = tasks.stream()
                .filter(t -> t.getPriority() == priority)
                .toList();
    }

    return tasks;
}
public Task markCompleted(Long id) {

    Task task = taskRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Task not found"));

    task.setStatus(TaskStatus.DONE);

    return taskRepository.save(task);
}
public List<Task> getTasks() {

    Authentication authentication = SecurityContextHolder
            .getContext()
            .getAuthentication();

    String email = authentication.getName();

    User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

    if (user.getRole() == Role.ADMIN) {
        return taskRepository.findAll();
    }

    return taskRepository.findByUser(user);
}

}
