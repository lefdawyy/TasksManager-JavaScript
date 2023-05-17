function Task (description, dueDate, priority) {
    this.description = description;
    this.dueDate = new Date(dueDate);
    this.priority = priority;
}

Task.prototype.getDescription = function () {
    return this.description;
};

Task.prototype.getPriority = function () {
    return this.priority;
};

Task.prototype.getDueDate = function () {
    return this.dueDate;
};

Task.prototype.printTask = function () {
    return this.getDescription() + ' due date in ' + this.getDueDate() + ' and priority is ' + this.getPriority();
};

Task.prototype.completed = false;

export default Task;