

// import Diagram, { store } from './diagram/component';
import Diagram, { workflowReducer } from './diagram/component';
import { setEntities, setCustom } from './entity/reducer';
import { setConfig } from './config/reducer';
// import diagramOn from './diagramOn/';

// export { Diagram, diagramOn, store, setEntities, setConfig, setCustom };
export { Diagram, workflowReducer, setEntities, setConfig, setCustom };