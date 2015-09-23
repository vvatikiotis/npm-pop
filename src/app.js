import React from 'react';
import Results from './results';
import SearchBar from './search';

/* TODO how do we include css in JSPM? Already installed jspm css plugin */
import "bootstrap/css/bootstrap.css!";


var App = React.createClass({
    getInitialState: function() {
        return {
            searchResults: {}
        };
    },
    render: function() {
        return (
            <div className="container">
                <div className="page-header">
                    <h4 className="text-center">Compare NPM packages</h4>
                </div>
                <SearchBar
                    onResults={this.onResults} />
                {/* <Results
                     packageInfo={this.state.searchResults} /> */}
            </div>
        );
    },
    onResults: function(searchResults) {
        this.setState({
            searchResults: searchResults
        });
    }
});

React.render(
    <App />,
    document.querySelector('#root')
);

