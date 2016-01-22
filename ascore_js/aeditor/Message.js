import React, { Component } from 'react';
import classNames from 'classnames';
import './Message.less';

export default class Message extends Component {
  static propTypes = {
    handleClose: React.PropTypes.func.isRequired,
    ready: React.PropTypes.bool,
    visible: React.PropTypes.bool,
    success: React.PropTypes.bool,
    message: React.PropTypes.string
  };

  render() {
    if (!this.props.message || !this.props.visible) {
      return <div></div>;
    }

    const messageClass = classNames({
      'Message-component': true,
      'error': this.props.ready && !this.props.success,
      'success': this.props.ready && this.props.success
    });

    return (
      <div className={messageClass}>
        <div className="relative-container">
          <span className="close" onClick={this.props.handleClose}>x</span>
          {this.props.message}
        </div>
      </div>
    );
  }
}
