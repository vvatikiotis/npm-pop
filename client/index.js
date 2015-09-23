import React from 'react';

/* TODO how do we include css in JSPM? Already installed jspm css plugin */
import "bootstrap/css/bootstrap.css!";

/* NOTE request-promise npm package fails with "tls module not supported in browsrs", so we use axios */
import axios from 'axios';

var Search = React.createClass({
    npmStatsURL: "https://api.npmjs.org/downloads/point",

    retrievePackageStats: function(packageName) {
        var stats = {
            last_day: { name: 'Day', counts: null },
            last_week: { name: 'Week', counts: null },
            last_month: { name: 'Month', counts: null }
        },
        month_promise = axios.get(this.npmStatsURL + '/last-month/' + packageName)
            .then((response) => { stats.last_month.counts = response.data.downloads;}),
        week_promise = axios.get(this.npmStatsURL + '/last-week/' + packageName)
            .then((response) => { stats.last_week.counts = response.data.downloads;}),
        day_promise = axios.get(this.npmStatsURL + '/last-day/' + packageName)
            .then((response) => { stats.last_day.counts = response.data.downloads;});

        axios.all([month_promise, week_promise, day_promise])
            .then( () => { this.props.onResults(stats); } );
    },
    handleSubmit: function(evt) {
            evt.preventDefault();
            var packageName = React.findDOMNode(this.refs.package).value.trim();
            if (!packageName) return;
            this.retrievePackageStats(packageName);
    },
    render: function() {
        return (
            <div className="row">
                <div className="col-sm-2">
            <form className="form-horizontal"
                onSubmit={this.handleSubmit}
            >
                <div className="form-group">
                <div className="col-sm-12">
                        <input className="form-control"
                            id="packageName"
                            placeholder="Search package..."
                            ref="package"
                            type="text"
                        />
                    </div>
                </div>
            </form>
        </div>
    </div>
        );
    }
});

var Results = React.createClass({
    render: function() {
        console.log('Results ', this.props.packageInfo);
        //var packageInfo = this.props.packageInfo || '';
        //console.dir(packageInfo);
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

var Stats = React.createClass({
    render: function() {
        var stats = '';
        if (this.props.period) {
            stats = <span>
                Last {this.props.period.name}:&nbsp;
                <strong>{this.props.period.counts.toLocaleString()}</strong> downloads
            </span>
        }
        // console.log('period ',period);;
        return (
            <div>
                {stats}
            </div>
        );
    }
});

var App = React.createClass({
    getInitialState: function() {
        return {
            searchResults: {}
        };
    },
    onResults: function(searchResults) {
        console.log('searchResults ', searchResults);
        this.setState({
            searchResults: searchResults
        });
    },
    render: function() {
        return (
            <div className="container">
                <Search
                    onResults={this.onResults} />
                <Results
                    packageInfo={this.state.searchResults} />
            </div>
        )
    }
});

React.render(
    <App />,
    document.getElementById('root')
);
