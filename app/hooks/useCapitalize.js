export const useCapitalize = () => {
    try {
      const capitalize = (string) => {
        if (string) {
          return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
        }
        return '';
      };
  
      const capitalizeEachWord = (string) => {
        if (string) {
          return string
            .split(' ') // Divide el texto en palabras
            .map((word) => capitalize(word)) // Aplica capitalización a cada palabra
            .join(' '); // Une las palabras capitalizadas
        }
        return '';
      };
  
      return { capitalize, capitalizeEachWord };
      
    } catch (error) {
      console.log("useCapitalize", error.message);
    }
};