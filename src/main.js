import { resolve } from "dns";
import Task from "./task/task.js";
import readline from "readline";
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const tasksList = [];

const menu = () => {
    console.log(    
    `    **************************
    Welcome to JS TODO-APP 
    ***************************
    Select an action:
    1. Add a new task
    2. List all tasks
    3. List completed tasks
    4. Mark the task as done
    5. Delete a task
    6. Sort tasks by the due date
    7. Sort tasks by priority
    8. Clear all tasks
    9. Exit
    ***************************`);
};

const addTask = () => {
  return new Promise(resolve => {
    rl.question("Enter description: ", description => {
      rl.question("Enter due date yyyy-mm-dd: ", dueDate => {
        rl.question("Enter priority: ", priority => {
          tasksList.push(new Task(description, dueDate, priority));
          resolve();
        });
      });
    });
  });
};

const listAllTasks = () => {
    tasksList.forEach(task => console.log(task.printTask()));
};

const listComletedTasks = () => {
    const completedTasks = tasksList.filter(task => task.completed);
    completedTasks.forEach(task => console.log(task.printTask()));
};

const markTheTaskAsDone = () => {
  tasksList.forEach((task, i) => {
    if (!task.completed)
      console.log(`${i + 1}. ${task.printTask()}`);
  });

  return new Promise(resolve => {
    rl.question("Enter the task number to mark it as completed: ", (taskNumber) => {
      tasksList[taskNumber - 1].completed = true;
      resolve();
    });
  });
};

const deleteTask = () => {
    tasksList.forEach((task, i) => {
        console.log(`${i + 1}. ${task.printTask()}`);
    });
    return new Promise(resolve => {
        rl.question("Enter the task number to delete task: ", (taskNumber) => {
            tasksList.splice(taskNumber - 1, 1);
            resolve();
        });
    });
};

const sortTasksByDueDate = () => {
  tasksList.sort((first, second) => {
    if (first.dueDate > second.dueDate) {
      return 1;
    }
    if (first.dueDate < second.dueDate) {
      return -1;
    }
    return 0;
});
  console.log("Sorted tasks:");
  tasksList.forEach((task, i) => {
    console.log(`${i + 1}. ${task.printTask()}`);
  });
};

const sortTasksByPriority = () => {
  tasksList.sort((first, second) => {
    if (first.priority < second.priority) {
      return 1;
    }
    if (first.priority > second.priority) {
      return -1;
    }
    return 0;
});

  console.log("Sorted tasks:");
  tasksList.forEach((task, i) => {
    console.log(`${i + 1}. ${task.printTask()}`);
  });
};

const clearAllTasks = () => {
    tasksList.splice(0, tasksList.length);
};

function getUserInput() {
    return new Promise(resolve => {
      rl.question("What's your choice? ", answer => {
            resolve(answer);
        });
    });
}

async function handleUserChoice() {
    let choice = await getUserInput();
  
    while (choice !== '9') {
      switch (choice) {
        case '1':
          await addTask();
          break;
        case '2':
          listAllTasks();
          break;
        case '3':
          listComletedTasks();
          break;
        case '4':
          await markTheTaskAsDone();
          break;
        case '5':
          await deleteTask();
          break;
        case '6':
          sortTasksByDueDate();
          break;
        case '7':
          sortTasksByPriority();
          break;
        case '8':
          clearAllTasks();
          break;
        default:
          console.log('Invalid input');
          break;
      }
      choice = await getUserInput();
    }
    rl.close();
}

menu();
handleUserChoice();