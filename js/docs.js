/**
 * Copyright 2016, Jayson Falkner - jfalkner@gmail.com
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const isBlank = Window.App.isBlank
const getUrlParameter = Window.App.getUrlParameter

// updates what is shown in the search box and highlighted
function matches(ns, name, tags) {
    var q = Window.App.query
    // if no query, just show everything
    if (isBlank(q)) {
        return false
    }
    // if any query, only show the matches
    else {
        // check if the namespace is as exact match
        if (ns == q) {
            return true
        }
        // check if any tags are an exact match
        if (tags != null) {
            for (var i = 0, len = tags.length; i < len; i++) {
                if (tags[i] == q) {
                    return true
                }
            }
        }
        // check if the query is in any metric name
        if (~name.indexOf(q)) {
            return true
        }
        return false
    }
}

// Method shared between searchInput and searchButton
function validateAndSubmit(e) {
    var val = document.getElementById('search').value;
    // set the search location to make this search easily bookmarked
    window.history.pushState("No content", "No title", "?q="+val);
    // udpate global flags once that are used in all match checks
    Window.App.query = val;
    Window.App.blankQuery = isBlank(val);
    // re-render the DOM
    React.render(<SearchForm />, document.getElementById('content'));
}

function updateSearch(q) {
    document.getElementById('search').value = q
    validateAndSubmit()
}

var Search = React.createClass({
    render: function () {
        var term = this.props.term
        return (<a onClick={(e) => updateSearch(term)}>{this.props.children}</a>)
    }
})

var SearchForm = React.createClass({
    render: function () {
        return (
            <div className="search">
                <div className="search__query">
                    <div>
                        <div className="search-title">Metrics Docs</div>
                    </div>
                    <div className="search-box">
                        <div className="search-box__icon"></div>
                        <SearchInput />
                    </div>
                </div>
                <div className="search__results">
                    <Description>
                        <p>Metrics documentation. Designed to show everything but let you quickly search to find what is of interest.</p>
                        <p>You can search by the following.</p>
                        <ul>
                            <li><u>Metric Name</u>: Type in the full or partial name of the metric. e.g. <Search term="Accuracy">"Accuracy"</Search>, "<Search term="Acc">Acc</Search>" or "<Search term="Read Length">Read Length</Search>".</li>
                            <li><u>Metric Namespace</u>: These metrics are pulled from many files. The namespace filters to show a particular set of metrics.</li>
                            <ul>
                                <li><Search term="EXAMPLE">EXAMPLE</Search> = Contrived examples.</li>
                                <li><Search term="BAM">BAM</Search> = A few examples based on <a href="http://samtools.github.io/hts-specs/SAMv1.pdf">commonly used DNA sequencer output</a>.</li>
                            </ul>
                            <li><u>Tag</u>: Arbitrary tag that has been added. e.g. "<Search term="Popular">Popular</Search>" shows the short list of most commonly asked for metrics.</li>
                        </ul>
                    <p>Hide or show more verbose metrics details by clicking on a metric. If your search shows exactly one metric, then it is auto-displayed in verbose mode.</p>
                    <p>Questions, comments or want to help improve these docs? Contact Jayson Falkner - jfalkner@gmail.com</p>
                    </Description>
                    <BamMetrics />
                    <ExampleMetrics />
                </div>
            </div>
        );
    }
});

var SearchInput = React.createClass({
    render: function () {
        return (
            <input type="text" className="search-box__text" id="search" placeholder="Search by name (e.g. 'Accuracy'), namespace (e.g. 'BAM') or tag (e.g. 'Popular')" onKeyDown={this.handleKeyDown}/>
        );
    },
    handleKeyDown: function (e) {
        if (typeof e == 'undefined' && window.event) {
            e = window.event;
        }
        if (e.keyCode == 13) {
            validateAndSubmit(e);
        }
    }
});

var Metric = React.createClass({
    getInitialState: function() {
        return { showResults: false };
    },
    onClick: function() {
        this.setState({ showResults: !this.state.showResults });
    },
    render() {
        // set the name
        var name = this.props.name
        var desc = this.props.desc
        // set the namespace
        var ns = this.props.ns
        // make the unique URI
        var uri = ns + ": " + name
        // set the tags
        var tags = this.props.tags

        // toggle select status based on if query is exact match to name
        var verbose = this.state.showResults || name == Window.App.query
        var c =  verbose ? (<div className="metric-verbose">{this.props.children}</div>) : null

        // check if this matches or not for rendering
        if (matches(ns, name, tags) || Window.App.blankQuery) {
            return (
                <div className="metric" id={uri} onClick={this.onClick}>
                    <div className="metric-name"><span className="ns">{ns}:</span> {name}</div>
                    <div className="metric-desc" style={{ color: '#d0d0d0' }}>{desc}</div>
                    {c}
                </div>
            );
        }
        else {
            return (<div className="metric" id={uri}></div>);
        }
    }
})


var Description = React.createClass({
    getInitialState: function() {
        return { showResults: true };
    },
    onClick: function() {
        this.setState({ showResults: !this.state.showResults });
    },
    render() {
        // toggle select status based on if query is exact match to name
        var verbose = this.state.showResults && Window.App.blankQuery

        // show if there is no query and the user hasn't clicked to hide
        return (
            <div className="desc" id="description" onClick={this.onClick}>
                <div className="desc-header">
                    Type in the box above and hit enter. Click on a metric to see the verbose description. Try <Search term="">All</Search> and <Search term="Popular">Popular</Search>.
                </div>
                <div className="desc-verbose">{verbose ? this.props.children : null }</div>
            </div>
        );
    }
})


React.render(
    <SearchForm files={[]} widgets={[]} highlight=""/>,
    document.getElementById('content')
);
// set the default search, if `q` param exists
if (getUrlParameter("q") != undefined) {
    document.getElementById('search').value = getUrlParameter("q")
    validateAndSubmit()
}