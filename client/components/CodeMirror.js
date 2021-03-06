/*
  CodeMirror
*/

var React = require('react');
var ReactCodeMirror = require('react-codemirror');
require('codemirror/mode/javascript/javascript');
require('codemirror/addon/edit/matchbrackets.js');
require('codemirror/addon/edit/closebrackets.js');
require('../styles/codemirror.css');

var CodeMirror = React.createClass({
  getInitialState: function() {
    return {
      code: 'Write your algorithm here.',
      mode: 'javascript'
    }
  },
  handleClick: function() {
    this.props.getCode(this.state.code);
  },

  updateCode: function(newCode) {
    this.setState({
      code: newCode
    });
  },

  render: function() {
    var options = {
      lineNumbers: true,
      mode: 'javascript',
      tabSize: 2,
      matchBrackets: true,
      autoCloseBrackets: true
    };

    var style = {
      container: {
        textAlign: 'center'
      },
      editor: {
        boxShadow: '0 0.1rem 0.6rem rgba(0, 0, 0, 0.12), 0 0.1rem 0.4rem rgba(0, 0, 0, 0.24)',
        transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
      },
      button: {
        backgroundColor: '#a1a0a0',
        border: '1rem',
        borderRadius: '0.2rem',
        boxShadow: 'rgba(0, 0, 0, 0.117647) 0 0.1rem 0.6rem, rgba(0, 0, 0, 0.239216) 0 0.1rem 0.4rem',
        color: '#fffdfd',
        cursor: 'pointer',
        fontFamily: 'Roboto',
        fontSize: '1.4rem',
        fontWeight: 500,
        lineHeight: '3.6rem',
        marginTop: '1.6rem',
        outline: 'none',
        padding: '0 1.6rem',
        textTransform: 'uppercase',
        transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
      }
    };

    return (
      <div className="codeMirror-container" style={style.container}>
        <div style={style.editor}>
          <ReactCodeMirror ref="editor" value={this.state.code} onChange={this.updateCode} options={options} />
        </div>
        <button style={style.button} onClick={this.handleClick}>plexIt</button>
      </div>
    )
  }
});

module.exports = CodeMirror;
