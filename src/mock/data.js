import Mock from 'mockjs'
const template = {
    'date|+1': ['date01', 'date02', 'date03'], // 这里可以是你需要的日期模板
    'name|+1': ['name123', 'name456', 'name789'], // 这里可以是你需要的姓名模板
    'address|+1': ['123 Street, City', '456 Avenue, Town', '789 Road, Village'] // 这里可以是你需要的地址模板
};
//定义一个mockjs的随机结构
const student = {
    'id|+1': ['20240101', '20240102', '20240103'], // 这里可以是你需要的日期模板
    'name|+1': ['Jack', 'Tom', 'Shelly'], // 这里可以是你需要的姓名模板
    'gender|+1': ['1', '0', '1'], // 这里可以是你需要的地址模板
    'age|+1': ['18', '20', '19'],
    'phone|+1': ['1888888888', '16640404040', '13845645699'],
    'classid|+1': ['1', '0', '1'] 
};
const data = Mock.mock({
'data|100': [student]
});
// 生成10个随机数据

Mock.mock('http://localhost:8087/api/user', 'get', data.data);