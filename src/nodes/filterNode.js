import { useState } from 'react';
import { BaseNode, nodeInputStyle, nodeLabelStyle, nodeSelectStyle } from './BaseNode';
import { useStore } from '../store';

export const FilterNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || '');
  const [op, setOp] = useState(data?.op || 'contains');
  const updateNodeField = useStore(s => s.updateNodeField);
  return (
    <BaseNode id={id} type="filter"
      inputHandles={[{ id: 'data', label: 'data' }]}
      outputHandles={[
        { id: 'pass', label: 'pass', top: '40%' },
        { id: 'fail', label: 'fail', top: '70%' },
      ]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div>
          <span style={nodeLabelStyle}>Operator</span>
          <select style={nodeSelectStyle} value={op}
            onChange={e => { setOp(e.target.value); updateNodeField(id, 'op', e.target.value); }}>
            <option value="contains">contains</option>
            <option value="equals">equals</option>
            <option value="startsWith">starts with</option>
            <option value="isEmpty">is empty</option>
          </select>
        </div>
        <div>
          <span style={nodeLabelStyle}>Value</span>
          <input style={nodeInputStyle} placeholder="condition…" value={condition}
            onChange={e => { setCondition(e.target.value); updateNodeField(id, 'condition', e.target.value); }} />
        </div>
      </div>
    </BaseNode>
  );
};
