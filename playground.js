const tasks = {
  tasks: [{
      text: "Grocery Store",
      completed: true
  }, {
      text: "Clean Yard",
      completed: false
  }, {
      text: "Film Courses",
      completed: false
  }],
  getTasksTodo() {
      return this.tasks.filter((task) => !task.completed)
  }
};

console.log(tasks.getTasksTodo());