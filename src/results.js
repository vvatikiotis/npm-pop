import React from 'react';

var Stats = React.createClass({
    render: function() {
        var stats = '';
        if (this.props.period) {
            stats = (<span>
                Last {this.props.period.name}:&nbsp;
                <strong>{this.props.period.counts.toLocaleString()}</strong> downloads
            </span>)
        }
        // console.log('period ',period);;
        return (
            <div>
                {stats}
            </div>
        );
    }
});

var PackageInfo = React.createClass({
    render: function() {
        console.log('PackageInfo ', this.props);
        return (
            <div>
                <Stats period={this.props.data.last_month} />
                <Stats period={this.props.data.last_week} />
                <Stats period={this.props.data.last_week} />
            </div>
        );
    }
});

var Results = React.createClass({
    render: function() {
        console.log('Results ', this.props.packageInfo);

        return (
            <div className="row">
                <div className="col-sm-12">
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <PackageInfo data={this.props.packageInfo} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

export default Results;