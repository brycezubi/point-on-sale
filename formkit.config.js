import { generateClasses } from "@formkit/themes";
const config = {
  config: {
    classes: generateClasses({
      global: {
        label: "block mb-1 font-medium text-lg",
        message: "text-red-600 italic mb-2",
        wrapper: "space-y-2 mb-3",
        input:
          "w-full p-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-500",
      },
      file: {
        noFiles: "block my-2",
        fileItem: "hidden",
      },
      select:{
        input:"font-medium",
        option:"text-center font-medium"
      },
      submit: {
        input:
          "$reset text-center text-white font-medium text-lg bg-green-400 hover:bg-green-500 rounded-md p-2 w-full disabled:opacity-50",
      },
    }),
  },
};

export default config;
