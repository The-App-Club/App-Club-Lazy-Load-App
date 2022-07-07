import {Layout} from '../../layouts/default';
const HomePage = ({setIsLoading}) => {
  return (
    <Layout setIsLoading={setIsLoading}>
      <div>{'Home Page'}</div>
    </Layout>
  );
};

export {HomePage};
