package br.davi.to_do.to_do.models.dto;

import br.davi.to_do.to_do.models.enums.TaskStatus;

public class StatusDto {
   private TaskStatus status;

    public StatusDto() {
    }

    public TaskStatus getStatus() {
        return status;
    }

    public void setStatus(TaskStatus status) {
        this.status = status;
    }
}
