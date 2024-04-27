import axios from 'axios';
const mainUrl="http://localhost:8087";

export async function fetchData(hashUrl){

  try {
    const response = await axios.get(`${mainUrl}${hashUrl}`);
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

export async function delData(hashUrl,id){

  try {
    //console.log(`${mainUrl}?id=${id}`);
    await axios.get(`${mainUrl}${hashUrl}?id=${id}`);
  }
  catch (error) {  
    console.error(error);  
    throw new Error('删除失败: ' + error.message); // 重新抛出错误，以便调用者可以处理  
  }  
}

export async function altData(hashUrl,pack){
  try{
    await axios.post(`${mainUrl}${hashUrl}`,pack);
  }
  catch (error){
    console.error(error);
    throw new Error('修改失败：'+error.message);
  }
}

export async function insData(hashUrl,pack){
  try{
    await axios.post(`${mainUrl}${hashUrl}`,pack);
  }
  catch (error){
    console.error(error);
    throw new Error('插入失败：'+error.message);
  }
}

export async function findData(hashUrl,id){
  try{
    let res = await axios.get(`${mainUrl}${hashUrl}\\${id}`);

    console.log(res)
    return res.data;
  }
  catch (error){
    console.error(error);
    throw new Error('修改失败：'+error.message);

  }
}