$(document).ready(function(){
    //加载图表数据
    loadTable();
    $(".ui-jqgrid").removeClass("ui-widget ui-widget-content");
    $(".ui-jqgrid-view").children().removeClass("ui-widget-header ui-state-default");
    $(".ui-jqgrid-labels, .ui-search-toolbar").children().removeClass("ui-state-default ui-th-column ui-th-ltr");
    $(".ui-jqgrid-pager").removeClass("ui-state-default");
    $(".ui-jqgrid").removeClass("ui-widget-content");
    // add classes
    $(".ui-jqgrid-htable").addClass("table table-bordered table-hover");
})
function loadData(chartData){
    var chartBar = echarts.init(document.getElementById('allYearChart_bar'));
    option = {
        title: {
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data: [  '物资占比','高值占比','基准值']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            data: []
        }],
        yAxis: [{
            type: 'value',
            name: '占比',
            position: 'left',
            axisLabel: {
                formatter: '{value}%'
            }
        }],
        series: [ {
            name: '物资占比',
            type: 'bar',
            tooltip:{
                show : false,
                trigger: 'item'
            },
            data: []
        }, {
            name: '高值占比',
            type: 'bar',
            tooltip:{
                show : false,
                trigger: 'item'
            },
            data: []
        }, {
            name: '物资占比',
            type: 'line',
            yAxisIndex:0,
            symbol:'emptyCircle',
            data: []
        }, {
            name: '高值占比',
            type: 'line',
            yAxisIndex:0,
            data: []
        }, {
            name: '基准值',
            type: 'line',
            yAxisIndex:0,
            data: []
        }
        ]
    };
    var jzz = $("#jzz").val();
    var YEAR = [];
    var JZZ = [];
    var WZ = [];
    var HWZ = [];
    var  length = chartData.rows.length;
    for(var i=0;i <length; i++){
        YEAR[i] = chartData.rows[i].Y+'年度';
        JZZ[i] = jzz;
        WZ[i] = chartData.rows[i].HZB;
        HWZ[i] = chartData.rows[i].HIGH_HZB;
    }
    //年度
    option.xAxis[0].data=YEAR;
    option.series[0].data=WZ;
    option.series[1].data=HWZ;
    option.series[2].data=WZ;
    option.series[3].data=HWZ;
    option.series[4].data=JZZ;
    chartBar.setOption(option);
}

$("#reloadChartBar").on('click',function(){
    var jzz = $("#jzz").val();
    var reg=/^\d\.([1-9]{1,2}|[0-9][1-9])$|^[1-9]\d{0,1}(\.\d{1,2}){0,1}$|^100(\.0{1,2}){0,1}$/;
    if(jzz.match(reg)==null){
        alert("请输入大于0小于或等于100之间的数字,最多保留两位小数！")
        return;
    }else{
        $("#allYearTable").jqGrid('setGridParam', {
            postData:{jzz:jzz},
            page:1
        }).trigger("reloadGrid");
    }

})
function loadTable(){
    //初始化数据表格
    $("#allYearTable").jqGrid({
        url:'allYearTable',
        postData:{jzz:"20"},
        datatype: "json",
        sortable:true,
        width:$(window).width()-400,
        height:$(window).height()-500,
        colNames:['日期','院区', '消耗总额', '物资总额','物资占比','高值总额','高值占比','基准值'],
        colModel:[
            {name:'Y',index:'Y',lable:'日期', width:50,align:'center'},
            {name:'ORG_ALIAS',lable:'院区',index:'ORG_ALIAS', width:100,align:'center',sortable:false},
            {name:'HISJE',lable:'消耗总额',index:'HISJE', width:90,align:'right',sortable:true,sortorder:"desc"},
            {name:'WZ_JE',lable:'物资总额',index:'WZ_JE', width:90,align:'right',sortable:true},
            {name:'HZB',lable:'物资占比',index:'HZB', width:50,align:'right',sortable:true,formatter:function(cellValue,options,rowObject){
                return cellValue+'%';
            }},
            {name:'HIGH_JE',lable:'高值总额',index:'HIGH_JE', sortable:true,width:100,align:'right'},
            {name:'HIGH_HZB',lable:'高值占比',index:'HIGH_HZB',sortable:true, width:50,align:'right',formatter:function(cellValue,options,rowObject){
                return cellValue+'%';
            }},
            {name:'jzz',lable:'基准值',index:'jzz',sortable:false, width:50,align:'right',formatter:function(cellValue,options,rowObject){
                return cellValue+'%';
            }}
        ],
        viewrecords: true,
        rownumbers:true,
        styleUI:'Bootstrap',
        sortorder: "desc",
        jsonReader : {
            root: "rows",
            page: "page",
            total: "total",
            records: "records",
            repeatitems: false,
            //cell: "cell",
            id: "Y"
        },
        loadComplete:function(data){
            loadData(data)
        },
        gridComplete: function () {
            var ids =  $("#allYearTable").jqGrid("getDataIDs");
            var rowDatas = $("#allYearTable").jqGrid("getRowData");
            for(var i=0;i<rowDatas.length;i++){
                if(i%2==0){
                    $("#"+ids[i]+ " td").css("background-color","rgba(75, 232, 248, 0.58)");
                }
            }
        }
    });

}