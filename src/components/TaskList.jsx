import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { formatDistanceToNow } from "date-fns";
import { az } from "date-fns/locale";
import { GripVertical, Trash2, Edit3, CheckCircle2, Circle } from "lucide-react";

// Hər bir Task üçün ayrı Sürüklənə bilən Komponent
function SortableTaskItem({
  task,
  toggleTask,
  deleteTask,
  editingId,
  editText,
  setEditText,
  startEdit,
  saveEdit,
  cancelEdit,
  colors,
  editInputRef,
  handleKeyDown
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    position: "relative",
  };

  const isEditing = editingId === task.id;

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      layout
    >
      <div
        style={{
          border: `1px solid ${colors.border}`,
          borderRadius: "14px",
          padding: "12px",
          background: colors.cardBg,
          boxShadow: isDragging ? "0 10px 20px rgba(0,0,0,0.1)" : "none",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        {/* Drag Handle - Sürükləmə Tutacağı */}
        <div
          {...attributes}
          {...listeners}
          style={{ cursor: "grab", color: colors.muted, display: "flex" }}
        >
          <GripVertical size={18} />
        </div>

        {isEditing ? (
          <div style={{ display: "flex", gap: "8px", flex: 1, alignItems: "center" }}>
            <input
              ref={editInputRef}
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, task.id)}
              style={{
                flex: 1,
                padding: "8px 12px",
                borderRadius: "8px",
                border: `1px solid ${colors.border}`,
                background: colors.inputBg,
                color: colors.text,
                outline: "none"
              }}
            />
            <button onClick={() => saveEdit(task.id)} style={{ color: colors.success, background: "none", border: "none", cursor: "pointer" }}>Save</button>
            <button onClick={cancelEdit} style={{ color: colors.muted, background: "none", border: "none", cursor: "pointer" }}>Cancel</button>
          </div>
        ) : (
          <>
            {/* Custom Checkbox */}
            <div onClick={() => toggleTask(task.id)} style={{ cursor: "pointer", color: task.completed ? colors.success : colors.muted }}>
              {task.completed ? <CheckCircle2 size={20} /> : <Circle size={20} />}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  color: colors.text,
                  textDecoration: task.completed ? "line-through" : "none",
                  opacity: task.completed ? 0.5 : 1,
                  fontSize: "15px",
                  wordBreak: "break-word"
                }}
              >
                {task.text}
              </div>
              {/* Vaxt göstəricisi */}
              <div style={{ fontSize: "10px", color: colors.muted, marginTop: "2px" }}>
                {task.createdAt ? formatDistanceToNow(new Date(task.createdAt), { addSuffix: true, locale: az }) : "az öncə"}
              </div>
            </div>

            <div style={{ display: "flex", gap: "4px" }}>
              {!task.completed && (
                <button
                  onClick={() => startEdit(task)}
                  style={{ background: "none", border: "none", cursor: "pointer", color: colors.muted, padding: "5px" }}
                >
                  <Edit3 size={16} />
                </button>
              )}
              <button
                onClick={() => deleteTask(task.id)}
                style={{ background: "none", border: "none", cursor: "pointer", color: colors.danger, padding: "5px" }}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}

function TaskList({
  tasks,
  toggleTask,
  deleteTask,
  editingId,
  editText,
  setEditText,
  startEdit,
  saveEdit,
  cancelEdit,
  colors,
}) {
  const editInputRef = useRef(null);

  useEffect(() => {
    if (editingId !== null && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [editingId]);

  const handleKeyDown = (e, id) => {
    if (e.key === "Enter") saveEdit(id);
    if (e.key === "Escape") cancelEdit();
  };

  return (
    <div style={{ display: "grid", gap: "10px" }}>
      <AnimatePresence mode="popLayout">
        {tasks.map((task) => (
          <SortableTaskItem
            key={task.id}
            task={task}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
            editingId={editingId}
            editText={editText}
            setEditText={setEditText}
            startEdit={startEdit}
            saveEdit={saveEdit}
            cancelEdit={cancelEdit}
            colors={colors}
            editInputRef={editInputRef}
            handleKeyDown={handleKeyDown}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

export default TaskList;