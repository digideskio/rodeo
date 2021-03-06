import React from 'react';
import {connect} from 'react-redux';
import Setup from '../../components/setup/setup.jsx';
import setupActions from './setup-viewer.actions';
import unixExamples from './unix-examples.md';
import win32Examples from './win32-examples.md';
import installInstructions from './install-instructions.md';
import rejectedInstructions from './rejected-instructions.md';

function mapStateToProps(state) {
  return state.setup;
}

function mapDispatchToProps(dispatch) {
  return {
    onAsk: (question) => dispatch(setupActions.ask(question)),
    onInstall: () => dispatch(setupActions.testInstall()),
    onTest: (cmd) => dispatch(setupActions.test(cmd)),
    onReady: () => dispatch(setupActions.closeWindow()),
    onCmd: (text) => dispatch(setupActions.setCmd(text)),
    onSaveTest: (text) => dispatch(setupActions.saveTest(text))
  };
}

/**
 * @class SetupViewer
 * @extends ReactComponent
 * @property props
 */
export default connect(mapStateToProps, mapDispatchToProps)(React.createClass({
  displayName: 'SetupViewer',
  propTypes: {
    ask: React.PropTypes.string,
    onAsk: React.PropTypes.func,
    onCmd: React.PropTypes.func,
    onInstall: React.PropTypes.func,
    onReady: React.PropTypes.func,
    onSaveTest: React.PropTypes.func,
    onTest: React.PropTypes.func,
    pythonTest: React.PropTypes.shape({
      cmd: React.PropTypes.string,
      status: React.PropTypes.string
    }),
    pythonValidity: React.PropTypes.oneOf(['good', 'bad', 'ugly'])
  },
  getDefaultProps: function () {
    return {
      examples: process.platform === 'win32' ?  win32Examples : unixExamples,
      installInstructions,
      rejectedInstructions
    };
  },
  render: function () {
    const props = this.props;

    return <Setup {...props}/>;
  }
}));
