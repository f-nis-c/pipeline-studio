import { useState } from 'react';
import { BaseNode, nodeInputStyle, nodeLabelStyle } from './BaseNode';
import { useStore } from '../store';

export const MathNode = ({ id, data }) => {
  const [expr, setExpr] = useState(data?.expr || '');
  const updateNodeField = useStore(s => s.updateNodeField);
  return (
    <BaseNode id={id} type="math"
      inputHandles={[
        { id: 'a', label: 'a', top: '40%' },
        { id: 'b', label: 'b', top: '70%' },
      ]}
      outputHandles={[{ id: 'result', label: 'result' }]}
    >
      <div>
        <span style={nodeLabelStyle}>Expression</span>
        <input style={nodeInputStyle} value={expr} placeholder="a + b * 2"
          onChange={e => { setExpr(e.target.value); updateNodeField(id, 'expr', e.target.value); }} />
      </div>
    </BaseNode>
  );
};
