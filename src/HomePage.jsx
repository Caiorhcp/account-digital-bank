// HomePage.jsx
import LeftSide from './LeftSide';
import RightSide from './RightSide';


{/* Preferi componentizar apenas em 2 partes o codigo do html para ficar mais facil lidar com o codigo */}

const HomePage = () => {
  return (
    <main className="flex">
      <LeftSide />
      <RightSide />
    </main>
  );
};

export default HomePage;
