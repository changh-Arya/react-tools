由于URLSearchParams会自动将+号解释为空格，我们需要找到一种方法来手动解析查询字符串并保留特殊字符。
const originalUrl = "filePath=/content/dam/agency-digital-office/hk/content/department-function/compensation/_files/MBA+90+Days+Session+1_Digital+Tool+Application_Manutouch_202409.pdf";
const encodedUrl = encodeURIComponent(originalUrl);
const params = new URLSearchParams(`filePath=${encodedUrl}`);
const filePath = decodeURIComponent(params.get("filePath"));

console.log(filePath); // 输出 /content/dam/agency-digital-office/hk/content/department-function/compensation/_files/MBA+90+Days+Session+1_Digital+Tool+Application_Manutouch_202409.pdf

URLSearchParams(href)会把+号转为空格。只encode值，不encode key或者url 可以解决
 
+号放入url上会被转为%20，而%2B才是+号，获取到的又是空格
 
多个路由指向同一个组件，路由切换，组件没有重新渲染问题：  <ado-layout key={location?.pathname}>   const location = useLocation()
 
