import { Axios } from '../../axiosInstance';

export const getTodo = async () => {
  try {
    const response = await Axios.get('/todo'); // Your todo api path of getting todo
    return {
      success: true,
      data: response.data,
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      data: null,
    };
  }
};

export const createTodo = async (newTodoName: string) => {
  try {
    const response = await Axios.post('/todo', {
      name: newTodoName,
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      data: null,
    };
  }
};
