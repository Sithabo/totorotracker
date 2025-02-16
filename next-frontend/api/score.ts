export const fetchInteger = async () => {
  const response = await  fetch("/get_integer")
    .then((response) => response.json())
    .then((data) => {
      console.log(data.value); // Logs 42
      return data.value;
    });
    
    return response;
};
