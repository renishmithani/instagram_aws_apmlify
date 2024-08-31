export const extractErrorMessage = (errorMessage: string) => {
  try {
    console.log("Extract Error", errorMessage);
    const result = errorMessage.split(": ")[1];
    return result;
  } catch (error) {
    return "Something went wrong...";
  }
};

export const showToast = (data: any) => {
  console.log("Press");
  const { type = "success", message = "Test" } = data;
};
