import api from '../services/api';
import GenerateListByUrlForm from './GenerateListByUrlForm';

const GenerateListByUrl = () => {
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    url: string,
  ) => {
    try {
      e.preventDefault();
      console.log(url);
      const respone = await api.generateShoppingListByUrl(url);
      console.log(respone);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  return (
    <>
      <GenerateListByUrlForm handleSubmit={handleSubmit} isLoading={false} />
    </>
  );
};

export default GenerateListByUrl;
