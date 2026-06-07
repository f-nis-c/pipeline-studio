import { useState } from 'react';
import { BaseNode, nodeLabelStyle, nodeSelectStyle } from './BaseNode';
import { useStore } from '../store';

export const MergeNode = ({ id, data }) => {
  const [strategy, setStrategy] = useState(data?.strategy || 'concat');
  const updateNodeField = useStore(s => s.updateNodeField);
  return (
    <BaseNode id={id} type="merge"
      inputHandles={[
        { id: 'a', label: 'a', top: '40%' },
        { id: 'b', label: 'b', top: '70%' },
      ]}
      outputHandles={[{ id: 'merged', label: 'merged' }]}
    >
      <div>
        <span style={nodeLabelStyle}>Strategy</span>
        <select style={nodeSelectStyle} value={strategy}
          onChange={e => { setStrategy(e.target.value); updateNodeField(id, 'strategy', e.target.value); }}>
          <option value="concat">Concatenate</option>
          <option value="json">JSON Array</option>
          <option value="newline">Newline Join</option>
          <option value="first">First Non-Empty</option>
        </select>
      </div>
    </BaseNode>
  );
};
