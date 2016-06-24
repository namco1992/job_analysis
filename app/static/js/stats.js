function raiser(fn){
    return function (error, data){
        if (error){
            throw new Error(error);
        }
        fn(data);
    }
}

function plot_keywords(json_path, bindto){
    function _plot(data) {
    c3.generate({
        bindto: bindto,
        data: {
            x: 'keywords',
            json: {
                keywords: data.keywords,
                counts: data.counts
            },
            names: {
                counts: 'counts'
            },
            axes: {
                    'counts': 'y'
                },
            types: {'counts':'bar'},
            order: 'desc'
        },
        // bar: {
        //         width: {ratio: 0.04}
        //     },
        axis: {
          x: {
            type: 'category',
            categories: data.keywords,
            show: false
          }
        }
      });

    }
    d3.json(json_path, raiser(_plot));
}


function plot_salary(json_path, bindto){
    function _plot(data) {
    c3.generate({
        bindto: bindto,
        data: {
            json: data,
            type: 'bar',
            order: 'desc'
        },
      });

    }
    d3.json(json_path, raiser(_plot));
}



function plot_pie_chart(json_path, bindto){
    function _plot(data){
        var pie_chart = c3.generate({
            bindto: bindto,
            data: {
                json: data,
                type: 'pie'
            }
        });

    }
    d3.json(json_path, raiser(_plot));
}

function transform(chart_type) {
    chart.transform(chart_type);
}

function plot_keywords_cloud(json_path, $sel){
    function _plot(words){
        var fill = d3.scale.category20();
        var width = $($sel).width();
        function draw(words){
            console.log();
            d3.select($sel).append("svg")
                .attr("viewBox", "0 0 2000 1000")
                .attr("width", width)
                .attr("height", width*0.65)
                .append("g")
                .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
                .selectAll("text")
                .data(words)
                .enter().append("text")
                .style("font-size", function(d) { return d.size + "px"; })
                .style("font-family", "Impact")
                .style("fill", function(d, i) { return fill(i); })
                .attr("text-anchor", "middle")
                .attr("transform", function(d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .text(function(d) { return d.text; });
        };

        var layout = d3.layout.cloud()
            .size([2000, 1000])
            .spiral("rectangular")
            .random(function (x) {return 0.5;})
            .words(words)
            .padding(10)
            .rotate(0)
            .font("Impact")
            .fontSize(function(d) { return 1.5*Math.sqrt(Math.pow(d.size, 1.4));})
            .on("end", draw);

        layout.start();
    }

    d3.json(json_path, raiser(_plot));
}