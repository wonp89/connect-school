//XMLhttprequest require JSON.object data. image file needs to be converted into object instead of array.
export const formatListing = (values) => {
    const formData = new FormData();
    for (let name in values) {
      if (name === 'image') {
        formData.append(name, values[name][0], values[name][0].name);
      } else {
        formData.append(name, values[name]);
      }
    }
    return formData;
  }