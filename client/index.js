import React from 'react';

/* TODO how do we include css in JSPM? Already installed jspm css plugin */
import "bootstrap/css/bootstrap.css!";

/* NOTE request-promise npm package fails with "tls module not supported in browsrs", so we use axios */
import axios from 'axios';

var Search = React.createClass({
    npmStatsURL: "https://api.npmjs.org/downloads/point",

    retrievePackageStats: function(packageName) {
        axios.get(this.npmStatsURL + '/last-month/' + packageName)
            .then((response) => {
                console.dir(response.data);
                this.props.onResults(response.data);
            })
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
                <div className="col-sm-12">
            <form className="form-horizontal"
                onSubmit={this.handleSubmit}
            >
                <div className="form-group">
                    <label className="col-sm-2 control-label"
                        htmlFor="packageName"
                    >Search package</label>
                    <div className="col-sm-10">
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


var PackageInfo = React.createClass({
    render: function() {

        var obj = Object.keys(this.props.data).map((key) => {
            return (<div><strong>{key}</strong>: {this.props.data[key]}</div>);
        });
        console.dir(obj);
        return (
            <div>{obj}</div>
        );
    }
});

var Results = React.createClass({
    render: function() {
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



var PACKAGE_RESULTS = {
    downloads: 31241234,
    package: "request",
    start: "2015-09-21",
    end: "2015-09-21"
};

var App = React.createClass({
    getInitialState: function() {
        return {
            searchResults: ''
        };
    },
    onResults: function(searchResults) {
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
