document.addEventListener('DOMContentLoaded', function() {
    // Inicializando Materialize components
    M.AutoInit();

    // Seletores
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task');
    const pendingTasks = document.getElementById('pending-tasks');
    const inProgressTasks = document.getElementById('in-progress-tasks');
    const completedTasks = document.getElementById('completed-tasks');
    const errorMessage = document.getElementById('error-message');

    // Função para formatar a hora
    function getFormattedTime() {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }

    // Adiciona nova tarefa
    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();
        if (taskInput.value.trim() === '') {
            errorMessage.textContent = 'Por favor, insira uma descrição para a tarefa.';
            return;
        }
        errorMessage.textContent = ''; // Limpar mensagens de erro

        // Criação do item de tarefa
        const li = document.createElement('li');
        li.className = 'collection-item';

        li.innerHTML = `
            <div class="task-content">${taskInput.value}</div>
            <span class="task-timestamp">Criado em: ${getFormattedTime()}</span>
            <a href="#" class="btn-small blue lighten-1 move-task">Em Andamento</a>
            <a href="#" class="btn-small red lighten-1 delete-task">Excluir</a>
        `;

        // Adiciona tarefa na lista de pendentes e limpa o campo de entrada
        pendingTasks.appendChild(li);
        taskInput.value = '';
    });

    // Manipula ações nas tarefas (mover e excluir)
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('move-task')) {
            const task = event.target.parentElement;
            if (task.parentElement.id === 'pending-tasks') {
                // Adiciona o horário de início da tarefa
                const startTime = document.createElement('span');
                startTime.className = 'task-timestamp';
                startTime.textContent = `Iniciado em: ${getFormattedTime()}`;
                task.appendChild(startTime);

                event.target.textContent = 'Concluir';
                inProgressTasks.appendChild(task);
            } else if (task.parentElement.id === 'in-progress-tasks') {
                // Adiciona o horário de conclusão da tarefa
                const endTime = document.createElement('span');
                endTime.className = 'task-timestamp';
                endTime.textContent = `Concluído em: ${getFormattedTime()}`;
                task.appendChild(endTime);

                task.querySelector('.move-task').remove();
                completedTasks.appendChild(task);
                task.classList.add('completed');
            }
        } else if (event.target.classList.contains('delete-task')) {
            event.target.parentElement.remove();
        }
    });

    // Função do relógio
    setInterval(() => {
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        document.getElementById('clock').textContent = `Hora Atual: ${timeString}`;
    }, 1000);
});
