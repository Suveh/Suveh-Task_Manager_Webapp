package com.protonest.taskmanager.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import com.protonest.taskmanager.model.Task;
import com.protonest.taskmanager.model.TaskPriority;
import com.protonest.taskmanager.model.TaskStatus;
import com.protonest.taskmanager.model.User;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByUser(User user);
    
    List<Task> findByUser(User user, Sort sort);

    List<Task> findByStatus(TaskStatus status);

    List<Task> findByPriority(TaskPriority priority);

    List<Task> findByStatusAndPriority(TaskStatus status, TaskPriority priority);

    Page<Task> findByUser(User user, Pageable pageable);

}
