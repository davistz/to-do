package br.davi.to_do.to_do.controllers;

import java.net.URI;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import br.davi.to_do.to_do.models.dto.StatusDto;
import br.davi.to_do.to_do.models.dto.TaskDto;
import br.davi.to_do.to_do.services.TaskServices;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    private final TaskServices services;

    public TaskController(TaskServices services) {
        this.services = services;
    }

    @GetMapping()
    public ResponseEntity<Page<TaskDto>> findAllTasks(Pageable pageable) {
        Page<TaskDto> tasks = services.findAllTasks(pageable);

        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskDto> findTaskById(@PathVariable Long id){
        TaskDto taskDto = services.findTask(id);
        return ResponseEntity.ok(taskDto);
    }

    @GetMapping("/title/{title}")
    public ResponseEntity<TaskDto> findTaskByTitle(@PathVariable String title){
        TaskDto taskDto = services.findTaskByTitle(title);
        return ResponseEntity.ok(taskDto);
    }

    @PostMapping()
    public ResponseEntity<TaskDto> addTask(@RequestBody TaskDto taskDto) {
        TaskDto taskCreated = services.addTask(taskDto);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(taskDto.getId()).toUri();

        return ResponseEntity.created(uri).body(taskCreated);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskDto> updateTask(@RequestBody TaskDto taskDto,@PathVariable Long id) {
        TaskDto updatedTask = services.updateTask(taskDto, id);
        return ResponseEntity.ok(updatedTask);
    }

    @PutMapping("/change/{id}")
    public ResponseEntity<TaskDto> changeTaskStatus(@RequestBody StatusDto statusDto, @PathVariable Long id) {
        TaskDto changedTaskStatus = services.changeStatusTask(id, statusDto);
        return ResponseEntity.ok(changedTaskStatus);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        services.deleteTask(id);

        return ResponseEntity.noContent().build();
    }
}
