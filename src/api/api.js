import axios from 'axios';


export async function fetchData(mainUrl){
  try {
    const response = await axios.get(`${mainUrl}`);
    // 更新响应式对象中的数据
    // 如果只有一行代码的时候，不会被vue认为是array，所以需要特殊处理
    // 观察结构发现应该赋值data.data
    return Array.isArray(response.data) ? response.data : [response.data]; 
  }
  catch (error) {  
    console.error(error);  
    throw new Error('请求失败: ' + error.message); // 重新抛出错误，以便调用者可以处理  
  }  
}

export async function delData(mainUrl,id){
  try {
    console.log(`${mainUrl}?id=${id}`);
    await axios.get(`${mainUrl}?id=${id}`);
  }
  catch (error) {  
    console.error(error);  
    throw new Error('删除失败: ' + error.message); // 重新抛出错误，以便调用者可以处理  
  }  
}