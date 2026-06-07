export const DraggableNode = ({ type, label, accent = '#5a7a9a' }) => {
  const onDragStart = (event) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify({ nodeType: type }));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className={type}
      onDragStart={onDragStart}
      draggable
      style={{
        cursor: 'grab',
        padding: '3px 10px',
        height: 26,
        display: 'flex',
        alignItems: 'center',
        gap: 5,
        borderRadius: 20,
        background: `${accent}12`,
        border: `0.5px solid ${accent}28`,
        transition: 'background 0.12s, border-color 0.12s',
        userSelect: 'none',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = `${accent}22`;
        e.currentTarget.style.borderColor = `${accent}50`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = `${accent}12`;
        e.currentTarget.style.borderColor = `${accent}28`;
      }}
    >
      <span style={{
        width: 5, height: 5, borderRadius: '50%',
        background: accent, flexShrink: 0,
      }} />
      <span style={{
        color: `${accent}cc`,
        fontSize: 11,
        fontWeight: 500,
        fontFamily: "'Inter','Segoe UI',sans-serif",
        letterSpacing: '0.04em',
      }}>{label}</span>
    </div>
  );
};
