package br.davi.to_do.to_do.repositorys;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.davi.to_do.to_do.models.entity.Task;


public interface TaskRepository extends JpaRepository<Task, Long> {
    Optional<Task> findByTitle(String title);
   
    Optional<Task> findFirstByTitleContainingIgnoreCase(String title);
}
