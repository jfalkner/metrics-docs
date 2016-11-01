/**
 * Example metrics related to analyzing BAM files
 */
var BamMetrics = React.createClass({
    render() {
        return (
            <div id={"BAM"}>
                <Metric ns="BAM" name="Read Length" desc="Length of the mapped sequence."/>
                <Metric ns="BAM" name="Accuracy" tags={["Popular"]}
                        desc="An estimate of how well mapped reads match known reference sequence.">
                    <p>"Accuracy" is a score from [0-1] with 1 meaning that the sequence matched exactly. It is
                        calculated as follows.</p>
                    <code>
                        (mutation + insert + del) / (ref length) = Accuracy (aka "Concordance")
                    </code>
                    <p>The above equation purposely divides by the reference length because that will remain a consistent
                        size but the read length will fluctuate as the various modes of incorrect base calling. If
                        dividing by read length,results may be misleading because dels will appear to improve the
                        score.</p>
                </Metric>
            </div>
        );
    }
})