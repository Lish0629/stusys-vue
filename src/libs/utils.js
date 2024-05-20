import { ElMessage, ElLoading } from 'element-plus'
// 消息提示函数  
function openMessage(text, type) {  
  if (typeof text !== 'string' || !['success', 'warning', 'error', 'info'].includes(type)) {  
    throw new Error('Invalid arguments for openMessage');  
  }  
  ElMessage({  
    message: text,  
    grouping: true,  
    type  
  });  
}  
  
// 加载提示函数  
function openLoading(text) {  
  text = text || 'Loading'; // 如果未提供文本，则使用默认文本  
  const loading = ElLoading.service({  
    lock: true,  
    text,  
    background: 'rgba(0, 0, 0, 0.7)'  
  });  
  return loading;  
}  

export { openMessage, openLoading };