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