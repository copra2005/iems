var Process = React.createClass({
  mixins: [React.addons.PureRenderMixin],

  getDefaultProps: function () {
    return { ports: { in: [], out: [] }, draggable: true, x: 0, y: 0 };
  },

  onMove: function(pos) {
    Actions.move(pos, this.props.graph, this.props.parent);
  },

  onClick: function(e) {
    Actions.select(this.props.graph);
  },

  goIntoGroup: function(e) {
    Actions.goIntoGroup(this.props.graph);
    e.preventDefault();
    e.stopPropagation();
  },

  portName: function(process, type, port) {
    var tpl = Tools.processes[process.name];
    if (tpl && tpl[type]) {
      var portinfo = tpl[type][port];
      if (portinfo.title) {
        return portinfo.title(process);
      }
    }
    return port;
  },

  render: function() {
    var width = this.props.width;
    var height = this.props.height;

    var ports = this.props.ports;
    var offset = {
      x: width / (ports.in.length+1),
      y: width / (ports.out.length+1)
    };
    var classes = ['process'];
    if (this.props.blank) classes.push('blank');
    if (this.props.graph.id == 0) classes.push('main');
    if (this.props.selected) classes.push('selected');
    if (this.props.status) classes.push(this.props.status);

    var min, max;
    var padding = 10;
    min = { x: padding, y: padding};
    if (this.props.parent) {
      max = {
        x: this.props.parent.width - width - padding,
        y: this.props.parent.height - height - padding
      };
    }

    return (
      <Draggable className={classes.join(' ')}
                 pos={{x: this.props.x, y: this.props.y}} min={min} max={max}
                 onMove={this.onMove}>
        <g>
          <rect x="0" y="0" width={width} height={height} onDoubleClick={this.onClick}/>
          <g className={this.props.graph.collapsed?'zoom-in':''} onClick={this.goIntoGroup}><text x="10" y="30">{!this.props.blank ? this.props.name : ''}</text></g>
          <g>{ports.in.map((port, index) => <Port process={this.props.graph} group={this.props.group} key={port} label={this.portName(this.props.graph, 'input', port)} type="in" x={(index+1)*offset.x} y={0}/>)}</g>
          <g>{ports.out.map((port, index) => <Port process={this.props.graph} group={this.props.group} key={port} label={this.portName(this.props.graph, 'output', port)} type="out" x={(index+1)*offset.y} y={height}/>)}</g>
        </g>
        <g>
          {this.props.children}
        </g>
      </Draggable>
    );
  }
});
