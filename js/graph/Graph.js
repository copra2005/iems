var Graph = React.createClass({
  mixins: [React.addons.PureRenderMixin],

  componentDidMount: function() {
    this.refs.container.getDOMNode().focus();
  },

  onKeyDown: function(e) {
    if (e.keyCode == 46) {
      deleteAction();
    }
  },

  render: function() {
    var size = this.props.graph.getSize();
    return (
      <div ref="container" onKeyDown={this.onKeyDown} style={{height: '100%'}} tabIndex="0">
        <svg style={{width: size.width+'px', height: size.height+'px'}} {...this.props}>{this.props.children}</svg>
      </div>
    );
  }
});