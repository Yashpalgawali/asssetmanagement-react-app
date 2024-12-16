// import logo from './logo.svg';
import { Component } from 'react';
import './App.css';
import ToDoApp from './Components/todo/ToDoApp';

function App() {
  return (
    <div className="App">
      {/* Asset Managment Application
      <FirstComponent/>
      <SecondComponent/>
      <ThirdComponent/>
      <FourthComponent/> */}

      <ToDoApp></ToDoApp>
      {/* <AssetManagement /> */}
    </div>
  );
}

// function FirstComponent() {
//   return (
//     <div className="FirstComponent">First Component</div>
//   )
// }

// function SecondComponent() {
//   return (
//     <>
//       <div className='SecondComponent'> <strong> Second Component</strong></div>
//       <div className='SecondComponent'> <strong> Second Component</strong></div>
//     </>
//   )
// }


// class ThirdComponent extends Component {
//    render() {
//     return (
//       <div className='ThirdComponent'> <strong> Third Component</strong></div>
//     )
//   }
// }


// class FourthComponent extends Component{
//   render(){
//     return(
//       <div className='FourthComponent'> Fourth Component</div>
//     )
//   }

// }


export default App;
