import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { az } from "date-fns/locale";
import { GripVertical, Trash2, CheckCircle2, Circle } from "lucide-react"; // İkonlar üçün

function TaskItem({ task, toggleTask, deleteTask, editingId, editText, setEditText, startEdit, saveEdit, cancelEdit, colors }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.6 : 1,
  };

  const isEditing = editingId === task.id;

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      layout
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "12px",
          background: colors.cardBg,
          border: `1px solid ${colors.border}`,
          borderRadius: "12px",
          boxShadow: isDragging ? "0 5px 15px rgba(0,0,0,0.1)" : "none",
        }}
      >
        {/* Sürükləmə tutacağı */}
        <div {...attributes} {...listeners} style={{ cursor: "grab", color: colors.muted }}>
          <GripVertical size={18} />
        </div>

        {/* Checkbox */}
        <div onClick={() => toggleTask(task.id)} style={{ cursor: "pointer", color: task.completed ? colors.success : colors.muted }}>
          {task.completed ? <CheckCircle2 size={20} /> : <Circle size={20} />}
        </div>

        {/* Task Mətni və Tarix */}
        <div style={{ flex: 1 }}>
          {isEditing ? (
            <input
              autoFocus
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={() => saveEdit(task.id)}
              onKeyDown={(e) => e.key === "Enter" && saveEdit(task.id)}
              style={{ width: "100%", background: "transparent", border: "none", color: colors.text, outline: "none" }}
            />
          ) : (
            <>
              <div
                onClick={() => startEdit(task)}
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                  opacity: task.completed ? 0.5 : 1,
                  fontSize: "15px",
                  cursor: "text"
                }}
              >
                {task.text}
              </div>
              <div style={{ fontSize: "10px", color: colors.muted, marginTop: "4px" }}>
                {task.createdAt ? formatDistanceToNow(new Date(task.createdAt), { addSuffix: true }) : "just now"}
              </div>
            </>
          )}
        </div>

        {/* Silmə Düyməsi */}
        <button
          onClick={() => deleteTask(task.id)}
          style={{ background: "none", border: "none", cursor: "pointer", color: colors.danger, padding: "5px" }}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </motion.div>
  );
}

export default TaskItem;