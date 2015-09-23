import React from 'react/addons';

/* NOTE request-promise npm package fails with "tls module not supported in browsers"
 *, so we use axios 
 */
import axios from 'axios';

var SearchTerm = React.createClass({
    getInitialState: function() {
         return { text: '' };
    },
    npmStatsURL: "https://api.npmjs.org/downloads/point",

    render: function() {
        return (
            <form className="form-horizontal"
                onSubmit={this.handleSubmit}
                >
                <div className="form-group">
                    <div className="col-sm-12">
                        <input
                            value={this.state.text}
                            onChange={this.onChangeInput}
                            type="text"
                            className="form-control"
                            placeholder="Search pkg"
                        />
                    </div>
                </div>
            </form>
        );
    },
    onChangeInput: function(event) {
        this.setState({
            text: event.target.value
        });
    },
    handleSubmit: function(evt) {
        evt.preventDefault();
        var packageName = this.state.text;
        if (!packageName) return;
        this.retrievePackageStats(packageName);
    },
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
    }
});

var Stats = React.createClass({
    render: function() {
        var stats = '';
        if (this.props.period) {
            stats = (<span>
                Last {this.props.period.name}<br/>
                <strong>{this.props.period.counts.toLocaleString()}</strong><br/><br/>
            </span>)
        }
        return (
            <div>
                {stats}
            </div>
        );
    }
});

var ResultSet = React.createClass({
    render: function() {
        var focusedTermId = this.props.focusedTermId,
            thisId = this.props.keyIndex,
            stats = [];

        if (this.props.data) {
            stats[0] = <Stats period={this.props.data.last_month} />
            stats[1] = <Stats period={this.props.data.last_week} />
            stats[2] = <Stats period={this.props.data.last_week} />
        } else 
            return (
                <div></div>
            );
        return (
            <div className="panel panel-default">
                <div className="panel-heading"># of Downloads</div>
                <div className="panel-body">
                    {stats}
                </div>
            </div>
        );
    }
});

var SearchBar = React.createClass({
    maxSearchTerms: 6,

    getInitialState: function() {
        return {
            termCount: 1,
            focusedTermId: 0, 
            results: { }
        };
    },
    render: function() {
        var count = this.state.termCount,
            terms = Array.from(Array(count), (v, k) => {
                return (
                    <div className="col-sm-2">
                        <SearchTerm
                            key={k}
                            onResults={this.onResults.bind(this, k)} />
                    </div>
                )
            }),
            results = Array.from(Array(count), (v, k) => {
                return (
                    <div className="col-sm-2">
                        <ResultSet
                            key={k}
                            keyIndex={k}
                            data={this.state.results[k]}
                            focusedTermId={this.state.focusedTermId} />
                    </div>
                );      
            });

        return (
            <div>
                <div className="row">
                    {terms}
                    {this.addButton()}
                </div>
                <div className="row">
                    {results}
                </div>
            </div>
        );
    },
    addButton: function() {
        if (this.state.termCount >= this.maxSearchTerms) return;

        return (
            <div className="col-sm-2">
                <button className="btn btn-info"
                        onClick={this.onClickAddSearchTerm}>+ More 
                </button>
            </div>
        );
    },
    onClickAddSearchTerm: function() {
        if (this.state.termCount >= this.maxSearchTerms) return;

        var newCount = this.state.termCount + 1;

        this.setState({
            termCount: newCount
        });
    },
    onResults: function(focusedTermId, searchResults) {
        // NOTE: how do we reference runtime properties?
        // var newState = React.addons.update(this.state, {
            // results:  {
            //     $merge: {focusedTermId: results}
            // }
        // });
        // 

        var results = this.state.results;
        results[focusedTermId] = searchResults;

        this.setState({ 
            termCount: this.state.termCount,
            focusedTermId: focusedTermId,
            results: results
        });
    }

});

export default SearchBar;
