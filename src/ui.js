import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode }   from './nodes/inputNode';
import { LLMNode }     from './nodes/llmNode';
import { OutputNode }  from './nodes/outputNode';
import { TextNode }    from './nodes/textNode';
import { ImageNode }   from './nodes/imageNode';
import { FilterNode }  from './nodes/filterNode';
import { MergeNode }   from './nodes/mergeNode';
import { MathNode }    from './nodes/mathNode';
import { WebhookNode } from './nodes/webhookNode';
import { NoteNode }    from './nodes/noteNode';
import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode, llm: LLMNode, customOutput: OutputNode,
  text: TextNode, image: ImageNode, filter: FilterNode,
  merge: MergeNode, math: MathNode, webhook: WebhookNode, note: NoteNode,
};

const selector = (state) => ({
  nodes: state.nodes, edges: state.edges,
  getNodeID: state.getNodeID, addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const { nodes, edges, getNodeID, addNode, onNodesChange, onEdgesChange, onConnect } =
    useStore(selector, shallow);

  const onDrop = useCallback((event) => {
    event.preventDefault();
    const bounds = reactFlowWrapper.current.getBoundingClientRect();
    if (event?.dataTransfer?.getData('application/reactflow')) {
      const { nodeType: type } = JSON.parse(event.dataTransfer.getData('application/reactflow'));
      if (!type) return;
      const position = reactFlowInstance.project({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });
      const nodeID = getNodeID(type);
      addNode({ id: nodeID, type, position, data: { id: nodeID, nodeType: type } });
    }
  }, [reactFlowInstance]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div ref={reactFlowWrapper} style={{ flex: 1, minHeight: 0 }}>
      <ReactFlow
        nodes={nodes} edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType="smoothstep"
        fitView
      >
        <Background color="#0f1e30" gap={gridSize} variant="dots" />
        <Controls />
        <MiniMap nodeColor={(n) => {
          const colors = {
            customInput: '#1D9E75', customOutput: '#BA7517', llm: '#378ADD',
            text: '#5a7a9a', image: '#D4537E', filter: '#7F77DD',
            merge: '#9F6FDD', math: '#1D9E75', webhook: '#BA7517', note: '#5a7a9a',
          };
          return colors[n.type] || '#5a7a9a';
        }} />
      </ReactFlow>
    </div>
  );
};
