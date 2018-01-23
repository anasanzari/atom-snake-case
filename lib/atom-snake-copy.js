'use babel';

import AtomSnakeCopyView from './atom-snake-copy-view';
import { CompositeDisposable } from 'atom';

export default {

  atomSnakeCopyView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomSnakeCopyView = new AtomSnakeCopyView(state.atomSnakeCopyViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomSnakeCopyView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-snake-copy:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomSnakeCopyView.destroy();
  },

  serialize() {
    return {
      atomSnakeCopyViewState: this.atomSnakeCopyView.serialize()
    };
  },

  toggle() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      let clipboardvalue = atom.clipboard.read();
      let key = clipboardvalue.replace(" ", "_");
      let finalValue = `"${key.toUpperCase()}" : "${clipboardvalue}",\n`;
      editor.insertText(finalValue);
    }
  }

};
