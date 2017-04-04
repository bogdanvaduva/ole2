window.ole = {};

import Editor from './editor.js';
import Control from './control/control.js';
import CadControl from './control/cad.js';
import RotateControl from './control/rotate.js';
import DrawControl from './control/draw.js';

window.ole = {
  Editor: Editor,
  Control: Control,
  CadControl: CadControl,
  RotateControl: RotateControl,
  DrawControl: DrawControl
};