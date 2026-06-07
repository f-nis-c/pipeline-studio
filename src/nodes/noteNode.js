import { useState } from 'react';
import { BaseNode, nodeInputStyle } from './BaseNode';
import { useStore } from '../store';

export const NoteNode = ({ id, data }) => {
  const [note, setNote] = useState(data?.note || '');
  const updateNodeField = useStore(s => s.updateNodeField);
  return (
    <BaseNode id={id} type="note">
      <textarea value={note}
        onChange={e => { setNote(e.target.value); updateNodeField(id, 'note', e.target.value); }}
        placeholder="Add a note…"
        style={{
          ...nodeInputStyle,
          resize: 'vertical',
          minHeight: 56,
          lineHeight: 1.5,
        }}
      />
    </BaseNode>
  );
};
