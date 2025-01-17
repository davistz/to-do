package br.davi.to_do.to_do.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import br.davi.to_do.to_do.models.dto.StatusDto;
import br.davi.to_do.to_do.models.dto.TaskDto;
import br.davi.to_do.to_do.models.entity.Task;
import br.davi.to_do.to_do.models.enums.TaskStatus;
import br.davi.to_do.to_do.repositorys.TaskRepository;
import br.davi.to_do.to_do.services.exception.ApiException;
import jakarta.transaction.Transactional;


@Service
public class TaskServices {
    private final TaskRepository repository;

    public TaskServices(TaskRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public TaskDto addTask(TaskDto taskDto) {

        if (taskDto.getTitle().isEmpty()) {
            throw new ApiException("bad_request", "Title is empty", HttpStatus.BAD_REQUEST.value());
        }

        if(!repository.findByTitle(taskDto.getTitle()).isEmpty()){
            throw new ApiException("conflict", "The task already exists", HttpStatus.CONFLICT.value());
        }

        Task task = new Task();
        task.setTitle(taskDto.getTitle());
        task.setDescription(taskDto.getDescription());
        task.setStatus(TaskStatus.NAO_INICIADO);

        repository.save(task);

        return getTaskDto(task);
    }

    @Transactional
    public TaskDto findTask(Long id){
        Task task = repository.findById(id).orElseThrow(() -> new ApiException("not_found", "Id not found", HttpStatus.BAD_REQUEST.value()));
        return getTaskDto(task);
    }
    @Transactional
    public TaskDto findTaskByTitle(String title) {
        Task task = repository
                .findFirstByTitleContainingIgnoreCase(title)
                .orElseThrow(() -> new ApiException("not_found", 
                        "Title not found", 
                        HttpStatus.BAD_REQUEST.value()));

      
        return getTaskDto(task);
    }
    @Transactional
    public Page<TaskDto> findAllTasks(Pageable pageable){
        Page<Task> all = repository.findAll(pageable);
        return all.map(TaskDto::new);
    }
    @Transactional
    public TaskDto updateTask(TaskDto taskDto, Long id) {
        Task task = getTask(taskDto, id);
        repository.save(task);
        return getTaskDto(task);
    }
    @Transactional
    public void deleteTask(Long id){
        Task task = repository.findById(id).orElseThrow(() -> new ApiException("not_found", "Id not found", HttpStatus.BAD_REQUEST.value()));
        repository.delete(task);
    }
    @Transactional
    public TaskDto changeStatusTask(Long id, StatusDto status){
        Task task = repository.findById(id).orElseThrow(() -> new ApiException("not_found", "Id not found", HttpStatus.BAD_REQUEST.value()));
        task.setStatus(status.getStatus());

        repository.save(task);
        return getTaskDto(task);
    }

    private static TaskDto getTaskDto(Task task) {
        TaskDto save = new TaskDto();
        save.setTitle(task.getTitle());
        save.setDescription(task.getDescription());
        save.setStatus(task.getStatus());
        save.setId(task.getId());
        return save;
    }

    private Task getTask(TaskDto taskDto, Long id) {
        Task task = repository.findById(id).orElseThrow(() -> new ApiException("not_found", "Id not found", HttpStatus.BAD_REQUEST.value()));
        task.setStatus(taskDto.getStatus());
        task.setTitle(taskDto.getTitle());
        task.setDescription(taskDto.getDescription());
        return task;
    }
}
