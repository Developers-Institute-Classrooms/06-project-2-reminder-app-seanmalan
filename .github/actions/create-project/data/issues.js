const issues = [
  {
    title: "GROUP: Design studio collaborative design",
  },
  {
    title: "ALL INDIVIDUAL: Design studio design",
  },
  {
    title: "ALL INDIVIDUAL or GROUP: Bug investigation",
  },
  {
    title: "GROUP: Team formation",
  },
  {
    title: "Improve UI (create individual tasks for each part of the UI)",
  },
  {
    title:
      "Improve code quality. Refactor code. (create individual tasks for different files)",
  },
  {
    title:
      "C: Refactor App.js, create new component, new functions, rename variables.",
    body: "If 2 people team then assign to A",
  },
  {
    title: "A: On app load fetch all tasks from local storage and display it",
    labels: "enhancement",
  },
  {
    title: `C: If a task is due in less than 24 hours then instead of showing the due date on the task show "X hours, X minutes until due". (FOR 3 PEOPLE GROUPS)`,
    labels: "enhancement",
  },
  {
    title:
      "A: Highlight tasks that are due in less than 12 hours. (FOR 3 PEOPLE GROUPS)",
    labels: "enhancement",
  },
  {
    title: "B: Tasks that are deleted are removed from local storage",
    labels: "enhancement",
  },
  {
    title: "C: Tasks that are added are saved to local storage",
    body: "If 2 people team then assign to B",
    labels: "enhancement",
  },
  {
    title:
      "A: Customize notifications so they trigger when the task is due with the correct title. Dependent on setting up notification by person B first",
    labels: "enhancement",
  },
  {
    title: "B: Setup notification to trigger 5 sec after closing the app",
    labels: "enhancement",
  },
  {
    title: "A: Bugfix add task, all other bugfixes dependent on this",
    labels: "bug",
  },
  {
    title: "C: Bugfix delete task",
    body: "If 2 people team then assign to A",
    labels: "bug",
  },
  {
    title: "B: Bugfix due date when adding task.",
    labels: "bug",
  },
  {
    title: "A: Set up finger print auth failure & message",
    labels: "enhancement",
  },
  {
    title: "B: Unauthenticated users are restricted",
    labels: "enhancement",
  },
  {
    title:
      "C: Set up finger print auth success & message & access to restricted content",
    body: "If 2 people team then assign to B",
    labels: "enhancement",
  },
  {
    title:
      "B: If there are no finger print saved on the device, then display an error message (FOR 3 PEOPLE GROUPS)",
    labels: "enhancement",
  },
];

module.exports = {
  issues,
};
