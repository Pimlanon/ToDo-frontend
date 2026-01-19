import React from "react";
import KanbanColumn from "./components/column.comp/KanbanColumn";
import CreateTaskCard from "./components/card.comp/CreateTaskCard";
import ReadTaskCard from "./components/card.comp/ReadTaskCard";
import { useIndexKanbanBoard } from "./hooks/index.hook";
import ConnectionsPopover from "./components/connection.comp/ConnectionsPopover";
import SkeletonColumn from "./components/column.comp/SkeletonColumn";
import { Pencil } from "lucide-react";

const TodoIndex = () => {
  const {
    board,
    editingTask,
    setEditingTask,
    pageId,
    title,
    setTitle,
    editTaskMutation,
    isTaskLoading,
    connections,
  } = useIndexKanbanBoard();

  const renderColumn = (columnKey) => {
    const column = board[columnKey];

    return (
      <KanbanColumn
        statusKey={columnKey}
        pageId={pageId}
        count={column?.count}
        connectionsList={connections}
      >
        {column?.items
          .sort((a, b) => a.position - b.position)
          .map((task) =>
            editingTask?.id === task.id ? (
              <CreateTaskCard
                key={task.id}
                data={task}
                onClose={() => setEditingTask(null)}
                onSave={(data) =>
                  editTaskMutation.mutate({
                    id: task.id,
                    body: data,
                  })
                }
                pageId={pageId}
                connectionsList={connections}
              />
            ) : (
              <ReadTaskCard
                key={task.id}
                {...task}
                onClick={() => setEditingTask(task)}
              />
            ),
          )}
      </KanbanColumn>
    );
  };

  return (
    <div className="h-full pb-10 flex flex-col">
      <div className="font-bold text-3xl flex gap-2 items-center">
        <Pencil />

        <input
          value={title || ""}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full  xl:w-1/2 text-3xl font-bold bg-transparent border-none outline-none focus:ring-0 truncate"
          placeholder="Untitled Page"
        />
      </div>
      <div className="mt-2 flex justify-end">
        <ConnectionsPopover connections={connections} pageId={pageId} />
      </div>
      <div className="mt-5 flex-1 overflow-x-auto overflow-y-hidden ">
        <div className="flex gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10 min-w-max h-full">
          {isTaskLoading ? (
            <>
              <SkeletonColumn />
              <SkeletonColumn />
              <SkeletonColumn />
            </>
          ) : (
            <>
              {renderColumn("todo")}
              {renderColumn("in_progress")}
              {renderColumn("done")}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoIndex;
