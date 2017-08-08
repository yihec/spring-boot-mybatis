   之前使用springMVC+spring+mybatis，总是被一些繁琐的xml配置，有时候如果配置出错，还要检查各种xml配置，偶然接触到了spring boot 后发现搭建一个web项目真的是1分钟的事情，再也不用去管那么多xml配置，简直神清气爽，不用看那么多一坨xml，下面是我把以前的一些ssm项目改成了spring boot + mybatis，相对于来说优点太明显了

1. 创建独立的Spring应用程序
2. 嵌入的Tomcat，无需部署WAR文件
3. 简化Maven配置
4. 自动配置Spring
5. 提供生产就绪型功能，如指标，健康检查和外部配置
6. 绝对没有代码生成和对XML没有要求配置
这个是百度百科上面对spring boot 优点的描述，其实我感觉也是这样，大家可以试一下。

这里主要就是把框架建立起来了，可以直接跑的，里面主要整合了spring boot 整合mybatis + swagger2 然后 就是 spring boot-aop 跟log4j日志打印，满足基本的web开发需求，然后配置文件可以根据自己的业务去修改，包括业务逻辑部分。


首页地址：localhost:8080/page/login
swagger页面地址： http://localhost:8080/swagger-ui.html
