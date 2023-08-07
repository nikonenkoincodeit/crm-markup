$(document).ready(function () {
  $("kanban-body").sortable({
    revert: true,
  });
  $("kanban-content").draggable({
    connectToSortable: "kanban-body",
  });
});
