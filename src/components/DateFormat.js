import { format } from "date-fns";

const formateDate = (data) => {
  if (data && !isNaN(new Date(data))) {
    return format(new Date(data), "dd/MM/yyyy HH:mm");
  } else {
    console.error(`Invalid date: ${data}`);
    return data;
  }
};

const formateTime = (data) => {
  if (data && !isNaN(new Date(data))) {
    return format(new Date(data), "HH:mm:ss");
  } else {
    console.error(`Invalid date: ${data}`);
    return data;
  }
};

export { formateDate, formateTime };
