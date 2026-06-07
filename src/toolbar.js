import { DraggableNode } from './draggableNode';

const NODES = [
  { type: 'customInput',  label: 'Input',   accent: '#1D9E75' },
  { type: 'customOutput', label: 'Output',  accent: '#BA7517' },
  { type: 'llm',          label: 'LLM',     accent: '#378ADD' },
  { type: 'text',         label: 'Text',    accent: '#5a7a9a' },
  { type: 'image',        label: 'Image',   accent: '#D4537E' },
  { type: 'filter',       label: 'Filter',  accent: '#7F77DD' },
  { type: 'merge',        label: 'Merge',   accent: '#9F6FDD' },
  { type: 'math',         label: 'Math',    accent: '#1D9E75' },
  { type: 'webhook',      label: 'Webhook', accent: '#BA7517' },
  { type: 'note',         label: 'Note',    accent: '#5a7a9a' },
];

export const PipelineToolbar = () => (
  <div style={{
    background: '#080e1a',
    borderBottom: '0.5px solid #1a2538',
    padding: '7px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    flexShrink: 0,
    flexWrap: 'wrap',
  }}>
    <span style={{
      fontSize: 10,
      color: '#3a5070',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      marginRight: 4,
      whiteSpace: 'nowrap',
      fontFamily: "'Inter','Segoe UI',sans-serif",
    }}>Nodes</span>
    {NODES.map(n => (
      <DraggableNode key={n.type} type={n.type} label={n.label} accent={n.accent} />
    ))}
  </div>
);
