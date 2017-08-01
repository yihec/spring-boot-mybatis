/**
 * Created by Administrator on 2017/7/28 0028.
 */
$(document).ready(function(){
    $("#selYearCount").select2({
    });
    $("input").attr("readonly","readonly");
    $("#selMonthCount").select2({
        minimumResultsForSearch: -1
    });
    laodTable("","","");
});
$("#prev_pager").on('click', function () {
    var page = $(".ui-pg-input").val();
    if (page > 1) {
        var pager = parseInt(page) - 1;
        $("#tbDeptTable").jqGrid('setGridParam', {
            page: pager
        }).trigger("reloadGrid");
    }
})
$("#first_pager").on('click', function () {
    var page = $(".ui-pg-input").val();
    if (page > 1) {
        $("#tbDeptTable").jqGrid('setGridParam', {
            page: 1
        }).trigger("reloadGrid");
    }
})
$("#last_pager").on('click', function () {
    var page = $(".ui-pg-input").val();
    var maxPage = $("#sp_1_pager").text();
    if (page != maxPage) {
        $("#tbDeptTable").jqGrid('setGridParam', {
            page: maxPage
        }).trigger("reloadGrid");
    }
})
$("#next_pager").on('click', function () {
    var page = $(".ui-pg-input").val();
    var maxPage = $("#sp_1_pager").text();
    if (page < maxPage) {
        var pager = parseInt(page) + 1;
        $("#tbDeptTable").jqGrid('setGridParam', {
            page: pager
        }).trigger("reloadGrid");
    }
})
$("#selMonthCount").change(function(){
    var checkYearValue=$("#selYearCount").val();
    if(checkYearValue==null||checkYearValue.length==0){
        alert("请先选择年份");
        $("#selMonthCount").select2("val","-1");
        return
    }
    if(checkYearValue.length==3){
        alert("只能选择两个年份");
        $("#selMonthCount").select2("val","-1");
        return
    }
    if(checkYearValue.length==1){
        alert("请选择两个年份");
        $("#selMonthCount").select2("val","-1");
        return
    }

});
$("#reloadChartBar").on('click',function(){
    var checkMonthValue=$("#selMonthCount").val();
    var checkYearValue=$("#selYearCount").val();
    if(checkYearValue!=null&&checkYearValue.length==3){
        alert("只能选择两个年份");
        return
    }
    if(checkYearValue==null||checkYearValue.length==0){
        alert("请先选择年份");
        $("#selMonthCount").select2("val","-1");
        return
    }
    if(checkYearValue.length==3){
        alert("只能选择两个年份");
        $("#selMonthCount").select2("val","-1");
        return
    }
    if(checkYearValue.length==1){
        alert("请选择两个年份");
        $("#selMonthCount").select2("val","-1");
        return
    }
    if (checkMonthValue == "-1") {
        alert("请先选择月份");
        return
    }
    reloadCharBar();
})

$("#selYearCount").change(function(){
    var checkYearValue=$("#selYearCount").val();
    if(checkYearValue!=null&&checkYearValue.length==3){
        alert("只能选择两个年份");
        return
    }
});

//加载数据  设置图表  checkValue 下拉框选中的值
function loadData(chartData){
    //总体图表，柱状
    var chartBar = echarts.init(document.getElementById('oneDeptChart_bar'));
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
            data: []
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [{
            'type':'category',
            'axisLabel':{'interval':0},
            'data':[],
            splitLine: {show: false}
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
            name: '',
            type: 'bar',
            barMinHeight:10,
            data: []
        }, {
            name: '',
            type: 'bar',
            barMinHeight:10,
            data: []
        }, {
            name: '同比增长率',
            type: 'line',
            yAxisIndex:0,
            data: []
        }
        ]
    };
    chartBar.setOption(option);
    var HZB = [];
    var HZB1 = [];
    var HBV = [];
    var deptName = [];
    for(var i=0;i<chartData.rows.length; i++){
        HZB[i] = ((chartData.rows[i].HIGH_HZB*100*10000)/10000).toFixed(2);
        HZB1[i] = ((chartData.rows[i].HIGH_HZB1*100*10000)/10000).toFixed(2);
        HBV[i] =  ((chartData.rows[i].TB1*100*10000)/10000).toFixed(2);
        deptName[i] = chartData.rows[i].DEPT_NAME;
    }
    for(var i in  deptName){
        if(i%2==0){
            deptName[i]="\n"+deptName[i];
        }

    }
    var legend = [];
    var nyOne = chartData.nyOne+"";
    var nyTwo = chartData.nyTwo+"";
    legend.push(nyOne+"耗占比");
    legend.push(nyTwo+"耗占比");
    legend.push("同比增长率");

    //年度
    option.xAxis[0].data=deptName;
    option.legend.data=legend;
    option.series[0].data=HZB;
    option.series[0].name=chartData.nyOne+"耗占比";
    option.series[1].data=HZB1;
    option.series[1].name=chartData.nyTwo+"耗占比";
    option.series[2].data=HBV;
    chartBar.setOption(option);
}
function laodTable(year,month,soreType){
    $("#tbDeptTable").jqGrid({
        url:'tbHigeDeptTable',
        postData:{year:year,month:month,soreType:soreType},
        datatype: "json",
        sortable:false,
        width:$(window).width()-350,
        height:$(window).height(),
        colNames:["",'科室','全部收入', '耗材收入', '耗占比','全部收入','耗材收入','耗占比',"同比增长率"],
        colModel:[
            {name:'DEPT_ID',label:'DEPT_ID',index:'DEPT_ID', width:50,align:'center',hidden:true},
            {name:'DEPT_NAME',label:'科室',index:'DEPT_NAME', width:90,align:'center'},
            {name:'HISJE',label:'全部收入',index:'HISJE', width:50,align:'center'},
            {name:'HIGH_JE',label:'耗材收入',index:'WZ_JE', width:90,align:'right'},
            {name:'HIGH_HZB',label:'耗占比',index:'HZB', width:70,align:'right',
                formatter:function(cellValue,options,rowObject){
                    return ((cellValue*100*10000)/10000).toFixed(2)+'%';
                }
            },
            {name:'HISJE1',label:'全部收入',index:'HISJE1', width:50,align:'center'},
            {name:'HIGH_JE1',label:'耗材收入',index:'WZ_JE1', width:90,align:'right'},
            {name:'HIGH_HZB1',label:'耗占比',index:'HZB1', width:70,align:'right',
                formatter:function(cellValue,options,rowObject){
                    return ((cellValue*10000*100 )/10000).toFixed(2)+'%';
                }
            },
            {name:'TB1',label:'同比增长率',index:'TB1', width:90,align:'right',
                formatter:function(cellValue,options,rowObject){
                    return ((cellValue*10000*100 )/10000).toFixed(2)+'%';
                }
            }
        ],
        rownumbers:true,
        pager: '#pager', //分页工具栏
        rowNum:15, //每页显示记录数
        viewrecords: true, //是否显示行数
        styleUI:'Bootstrap',
        sortorder: "desc",
        jsonReader : {
            root: "rows",
            page: "page",
            total: "total",
            records: "records",
            repeatitems: false,
            //cell: "cell",
            id: "DEPT_ID"
        },
        gridComplete: function () {
            var page = $('#tbDeptTable').getGridParam('page');
            $(".ui-pg-input").val(page)
            var ids = $("#tbDeptTable").jqGrid("getDataIDs");
            var rowDatas = $("#tbDeptTable").jqGrid("getRowData");
            for(var i=0;i <rowDatas.length;i++){
                if(i%2==0){
                    $("#"+ids[i]+ " td").css("background-color","rgba(75, 232, 248, 0.58)");
                }
            }
        },
        loadComplete : function(data){
            $("#count").text("共"+data.records+"条数据");
            loadData(data)
            $(".ui-jqgrid").removeClass("ui-widget ui-widget-content");
            $(".ui-jqgrid-view").children().removeClass("ui-widget-header ui-state-default");
            $(".ui-jqgrid-labels, .ui-search-toolbar").children().removeClass("ui-state-default ui-th-column ui-th-ltr");
            $(".ui-jqgrid-pager").removeClass("ui-state-default");
            $(".ui-jqgrid").removeClass("ui-widget-content");
            $(".ui-jqgrid-htable").addClass("table table-bordered table-hover");
        }

    });
    reloadTableHead();
}
function  reloadCharBar(){
    var checkMonthValue=$("#selMonthCount").val();
    var checkYearValue=$("#selYearCount").val();
    var soreType=$("#soreType").val();
    $("#tbDeptTable").GridUnload();
    laodTable(checkYearValue[0]+","+checkYearValue[1],checkMonthValue,soreType);

}
function reloadTableHead(){
    var time1="";
    var time2="";
    var checkMonthValue=$("#selMonthCount").val();
    var checkYearValue=$("#selYearCount").val();
    var type=$("#type").val();
    if(checkYearValue!=null&&checkMonthValue!='-1'){
        var year1 = checkYearValue[0];
        var year2 = checkYearValue[1];
        time1=year1+checkMonthValue;
        time2=year2+checkMonthValue;
    }
    var tempTime="";
    if(parseInt(time1)>parseInt(time2)){
        tempTime=time2;
        time2=time1;
        time1=tempTime;
    }
    $("#tbDeptTable").jqGrid('setGroupHeaders', {
        useColSpanStyle: true,
        groupHeaders:[
            {startColumnName:'HISJE', numberOfColumns:3, titleText: time1},
            {startColumnName:'HISJE1', numberOfColumns: 3, titleText: time2}
        ]
    })
    $(".ui-jqgrid-sortable").attr("style","");
    $("#jqgh_tbDeptTable_DEPT_NAME").attr("style","top: 13px;");
    $("#jqgh_tbDeptTable_TB1").attr("style","top: 13px;");
    $(".ui-th-column-header").attr("style","*border-top-width: 1px;border-top-color: black;border-top-style: solid;")
}
