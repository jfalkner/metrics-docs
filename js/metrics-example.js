/**
 * Example metrics. Made up for the README.md
 */
var ExampleMetrics = React.createClass({
    render() {
        return (
            <div id={"EXAMPLE"}>
                <Metric ns="EXAMPLE" name="Metric #1" desc="An example to show a basic metric."/>
                <Metric ns="EXAMPLE" name="Metric #2" tags={["Foo"]} desc="A tagged example. Search for 'Foo' to show this."/>
                <Metric ns="EXAMPLE" name="Metric #3" tags={["Foo"]}
                        desc="More verbose description example.">
                    <p>This is a metric with a more verbose HTML description. It could have any HTML/CSS/JS desired.</p>
                    <p>Below are made-up examples to link to other metrics</p>
                    <ul>
                        <li><Search term="Metric #1">#1</Search> = Show <code>Metric #1</code> without page reloading</li>
                        <li><Search term="Metric #2">#2</Search> = Show <code>Metric #2</code> without page reloading</li>
                    </ul>
                </Metric>
            </div>
        );
    }
})